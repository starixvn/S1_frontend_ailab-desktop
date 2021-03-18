import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ClipboardJS from "../../lib/clipboard.min";
import config from "../../config";

const PopBoxDepositUploadBankSlip = ({
	t,
	langId,
	localBankInfo,
	setPopBox,
	infoDataReceiptImgFile,
	picFileName = "",
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

		if (
			(!depositImgFiles.name && !picFileName) ||
			!depositImgFiles.checked
		) {
			setDepositImgFiles({
				value: null,
				name: "",
				checked: false,
				tip: t("msg_ApiServerError")
			});
			return;
		}

		resolve({
			type: true,
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
		if (!depositImgFiles.checked && depositImgFiles.checked !== null)
			return <i className="icon icon-broken_image" />;

		if (picFileName)
			return <img alt={depositImgFiles.name} src={imgResult} />;

		if (!depositImgFiles.name) return <i className="icon icon-plus" />;

		return <img alt={depositImgFiles.name} src={imgResult} />;
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (picFileName) {
			setDepositImgFiles(prev => {
				return {
					...prev,
					name: picFileName,
					checked: true
				};
			});
		}

		if (infoDataReceiptImgFile?.type.includes("image")) {
			onImgFileReaderHandlar(infoDataReceiptImgFile);
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
					resolve({ type: false });
				}}
			/>

			<div className="smallList checkBankSlip">
				<span className="title">{t("lbl_SubmitProof")}</span>
				<div className="txt-lightgray">{t("lbl_AttachFile")}</div>
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
								resolve({ type: false });
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
	picFileName: "",
	infoDataReceiptImgFile: null
};

PopBoxDepositUploadBankSlip.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	localBankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setPopBox: PropTypes.func.isRequired,
	infoDataReceiptImgFile: PropTypes.objectOf(PropTypes.any),
	picFileName: PropTypes.string,
	resolve: PropTypes.func.isRequired
};

export default PopBoxDepositUploadBankSlip;
