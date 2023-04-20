import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ClipboardJS from "../../lib/clipboard.min";
import config from "../../config";

const PopBoxDepositUploadBankSlip = ({
	t,
	langId,
	localBankInfo,
	setPopBox,
	formInfo,
	receiptInfo,
	resolve
}) => {
	const isMountedRef = useRef(null);

	const [depositImgFiles, setDepositImgFiles] = useState({
		value: null,
		name: "",
		file: null,
		checked: null,
		tip: ""
	});

	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const onUploadFile = async e => {
		e.preventDefault();

		const file =
			e.dataTransfer?.files.length > 0
				? e.dataTransfer?.files[0]
				: e.target.files[0];

		const isValid = file?.type.includes("image");

		if (!isValid) {
			setDepositImgFiles({
				value: null,
				name: "",
				checked: isValid,
				tip: t("msg_ApiServerError")
			});
		} else {
			onImgFileReaderHandlar(file);
		}
	};

	const onImgFileReaderHandlar = imgFile => {
		const imgReader = new FileReader();

		imgReader.readAsDataURL(imgFile);
		imgReader.onload = () => {
			setDepositImgFiles({
				value: imgReader.result,
				file: imgFile,
				name: imgFile.name,
				checked: true,
				tip: ""
			});
		};
	};

	const onSubmit = async e => {
		e.preventDefault();

		if (!depositImgFiles.name || !depositImgFiles.checked) {
			setDepositImgFiles({
				value: null,
				name: "",
				checked: false,
				tip: t("msg_ApiServerError")
			});
			return;
		}

		resolve({
			success: true,
			datas: {
				depositImgFiles
			}
		});

		closePopBox();
	};

	const imgResult =
		depositImgFiles.value ||
		`${config.apiURL}/${langId}/Cashier/DepositReceip.jpg?transId=${localBankInfo.transId}&FileName=${depositImgFiles.name}`;

	const imgRenderHandlar = () => {
		if (
			depositImgFiles.name &&
			!(!depositImgFiles.checked && depositImgFiles.checked !== null)
		) {
			return <img alt={depositImgFiles.name} src={imgResult} />;
		}
		return <i className="icon icon-plus" />;
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const { imgFile } = formInfo;

		if (imgFile?.type?.includes("image")) {
			onImgFileReaderHandlar(imgFile);
		} else if (imgFile?.name) {
			setDepositImgFiles(prev => {
				return {
					...prev,
					name: imgFile.name,
					checked: true
				};
			});
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const _clipboard = new ClipboardJS(".copyBtn");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="upload_new active">
			<div
				className="icon icon-close"
				onClick={() => {
					closePopBox();
					resolve({ success: false });
				}}
			/>

			<div className="smallList checkBankSlip">
				<span className="title">{t("lbl_SubmitProof")}</span>
				<div className="txt-lightgray">{t("lbl_AttachFile")}</div>
				{receiptInfo.length > 0 ? (
					<div className="uploadModule">
						{receiptInfo.length < 6 && (
							<label
								className={`upload_img${
									depositImgFiles.checked ||
									depositImgFiles.checked === null
										? ""
										: " error"
								}`}
								onDragOver={e => e.preventDefault()}
								onDrop={onUploadFile}>
								<input
									type="file"
									accept="image/*"
									onChange={onUploadFile}
								/>

								{imgRenderHandlar()}
							</label>
						)}
						{receiptInfo.map(({ receiptNo, depositPic }) => (
							<label key={receiptNo} className="upload_img">
								<input type="file" />
								<img src={depositPic} alt="" />
							</label>
						))}
					</div>
				) : (
					<label
						className={`upload_img${
							depositImgFiles.checked ||
							depositImgFiles.checked === null
								? ""
								: " error"
						}`}
						onDragOver={e => e.preventDefault()}
						onDrop={onUploadFile}>
						<input
							type="file"
							accept="image/*"
							onChange={onUploadFile}
						/>

						{imgRenderHandlar()}
					</label>
				)}

				<div
					className="txt-red"
					style={{
						visibility:
							depositImgFiles.checked ||
							depositImgFiles.checked === null
								? "hidden"
								: "visible"
					}}>
					{depositImgFiles.tip}
				</div>

				<div className="directions">
					<ul>
						<li>{t("BankSlipHint1")}</li>
						<li>{t("BankSlipHint2")}</li>
						<li>{t("BankSlipHint3")}</li>
					</ul>
				</div>
				<form onSubmit={onSubmit}>
					<div type="button" className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => {
								closePopBox();
								resolve({ success: false });
							}}>
							{t("lbl_Cancel")}
						</button>
						<button type="submit" className="btn-check">
							{t("lbl_Submit")}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
PopBoxDepositUploadBankSlip.defaultProps = {
	receiptInfo: []
};

PopBoxDepositUploadBankSlip.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,

	formInfo: PropTypes.shape({
		imgFile: PropTypes.objectOf(PropTypes.any)
	}).isRequired,
	receiptInfo: PropTypes.arrayOf(PropTypes.any),
	localBankInfo: PropTypes.shape({
		bankName: PropTypes.string,
		accountNo: PropTypes.string,
		accountName: PropTypes.string,
		transId: PropTypes.string
	}).isRequired,

	setPopBox: PropTypes.func.isRequired,
	resolve: PropTypes.func.isRequired
};

export default PopBoxDepositUploadBankSlip;
