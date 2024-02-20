import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ClipboardJS from "../../lib/clipboard.min";
import { number_format } from "./common";
import config from "../../config";
import { currencyCode } from "../../datas/countryCode";

const PopBoxDepositUploadBankSlip = ({
	t,
	currencyId,
	langId,
	_isConvert,
	localBankInfo,
	setPopBox,
	formInfo,
	receiptInfo,
	resolve
}) => {
	const isMountedRef = useRef(null);

	// const [depositTime, setDepositTime] = useState({
	// 	value: moment(),
	// 	checked: null,
	// 	tip: ""
	// });

	// const [depositRefNo, setdepositRefNo] = useState({
	// 	value: "",
	// 	checked: null,
	// 	tip: ""
	// });

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

	const validate = datas => {
		const errors = {};

		// if (currencyId === currencyCode.TH && !datas.depositRefNo) {
		// 	errors.depositRefNo = t("lbl_RemindForRefNum");
		// }

		// if (typeof datas.depositTime === "string") {
		// 	errors.depositTime = t("lbl_DepositTimeToolTip");
		// }

		if (
			currencyId === currencyCode.TH &&
			(depositImgFiles.checked === null || !depositImgFiles.checked)
		) {
			errors.depositImgFiles = t(
				"lbl_File_format_error_please_try_again"
			);
		}

		return errors;
	};

	const onUploadFile = e => {
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
				file: null,
				checked: isValid,
				tip: t("lbl_File_format_error_please_try_again")
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

		const errors = validate({
			// depositTime: depositTime.value,
			// depositRefNo: depositRefNo.value,
			depositImgFiles
		});

		const isValid = Object.keys(errors).length === 0;

		if (!isValid) {
			// if (errors.depositRefNo) {
			// 	setdepositRefNo(({ value }) => {
			// 		return {
			// 			value,
			// 			checked: !errors.depositRefNo,
			// 			tip: errors.depositRefNo
			// 		};
			// 	});
			// }

			// if (errors.depositTime) {
			// 	setDepositTime(({ value }) => {
			// 		return {
			// 			value,
			// 			checked: !errors.depositTime,
			// 			tip: errors.depositTime
			// 		};
			// 	});
			// }

			if (errors.depositImgFiles) {
				setDepositImgFiles({
					value: null,
					name: "",
					checked: false,
					tip: errors.depositImgFiles
				});
			}
			return;
		}

		resolve({
			success: true,
			datas: {
				// depositTime,
				// depositRefNo,
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

		// if (refId) {
		// 	setdepositRefNo(prev => {
		// 		return {
		// 			...prev,
		// 			value: refId
		// 		};
		// 	});
		// }

		// if (time) {
		// 	setDepositTime(prev => {
		// 		return {
		// 			...prev,
		// 			value: moment(time) || moment()
		// 		};
		// 	});
		// }

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
				<div className="title">{t("lbl_BankAccount")}</div>
				<div className="txt-lightgray">{t("lbl_TransactionHint")}</div>
				<ul>
					<li>{t("lbl_BankName")}</li>
					<li>{localBankInfo.bankName}</li>
					<li>
						<a
							target="_blank"
							rel="noreferrer"
							href={localBankInfo.bankSite}
							className="icon icon-new-tab"
						/>
					</li>
				</ul>
				<ul>
					<li>{t("lbl_BankAccountName")}</li>
					<li>{localBankInfo.accountName}</li>
					<li>
						<button
							className="icon icon-files-empty copyBtn"
							data-clipboard-text={localBankInfo.accountName}>
							<span>{t("lbl_Copy")}</span>
						</button>
					</li>
				</ul>
				<ul>
					<li>{t("lbl_BankNumber")}</li>
					<li>{localBankInfo.accountNo}</li>
					<li>
						<button
							className="icon icon-files-empty copyBtn"
							data-clipboard-text={localBankInfo.accountNo}>
							<span>{t("lbl_Copy")}</span>
						</button>
					</li>
				</ul>
				{localBankInfo.amount ? (
					<ul>
						<li>{t("lbl_DepositAmount")}</li>
						<li>
							{number_format(localBankInfo.amount, _isConvert)}
						</li>
						<li>
							<button
								className="icon icon-files-empty copyBtn"
								data-clipboard-text={localBankInfo.amount}>
								<span>{t("lbl_Copy")}</span>
							</button>
						</li>
					</ul>
				) : null}

				{localBankInfo?.code && (
					<ul>
						<li>{t("Label_Remark")}</li>
						<li>{localBankInfo.code}</li>
						<li>
							<button
								className="icon icon-files-empty copyBtn"
								data-clipboard-text={localBankInfo.code}>
								<span>{t("lbl_Copy")}</span>
							</button>
						</li>
					</ul>
				)}
			</div>
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
					{/* <div className="inputBox-white">
						<i className="txt-blue">
							{t("lbl_DepositTime")}({moment().format("Z")})
						</i>
						<DateTime
							value={depositTime.value}
							dateFormat="YYYY-MM-DD"
							timeFormat={false}
							onChange={time =>
								setDepositTime({
									value: time,
									checked: true,
									tip: ""
								})
							}
							onBlur={time =>
								setDepositTime(() => {
									const errors = validate({
										depositTime: time
									});

									return {
										value: time,
										checked: !errors.depositTime,
										tip: errors.depositTime
									};
								})
							}
						/>
						<div className="iconModule">
							<i className="icon icon-calendar" />
							<i className="icon icon-information-solid" />
						</div>
					</div> */}

					{/* <div
						className={`tip${
							!depositTime.checked ? " active" : ""
						}`}>
						{depositTime.tip}
					</div> */}

					{/* <Inputbox
							className="inputBox-white"
							title={t("lbl_Refno")}
							value={depositRefNo.value}
							onChange={e =>
								setdepositRefNo({
									value: e.target.value,
									checked: true,
									tip: ""
								})
							}
							onBlur={e => {
								const error = validate({
									depositRefNo: e.target.value
								});
								setdepositRefNo({
									value: e.target.value,
									checked: !error.depositRefNo,
									tip: error.depositRefNo
								});
							}}
							checked={depositRefNo.checked}
							tip={depositRefNo.tip}
						/> */}

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
	currencyId: PropTypes.number.isRequired,
	langId: PropTypes.string.isRequired,
	_isConvert: PropTypes.bool.isRequired,

	formInfo: PropTypes.shape({
		imgFile: PropTypes.objectOf(PropTypes.any),
		time: PropTypes.objectOf(PropTypes.any),
		refId: PropTypes.string
	}).isRequired,
	receiptInfo: PropTypes.arrayOf(PropTypes.any),
	localBankInfo: PropTypes.shape({
		bankName: PropTypes.string,
		bankSite: PropTypes.string,
		accountNo: PropTypes.string,
		accountName: PropTypes.string,
		transId: PropTypes.string,
		amount: PropTypes.number
	}).isRequired,

	setPopBox: PropTypes.func.isRequired,
	resolve: PropTypes.func.isRequired
};

export default PopBoxDepositUploadBankSlip;
