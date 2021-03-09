import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import DateTime from "react-datetime";
import ClipboardJS from "../../lib/clipboard.min";
import Inputbox from "./inputbox";
import { number_format } from "./common";
import config from "../../config";

const PopBoxDepositUploadBankSlip = ({
	t,
	langId,
	localBankInfo,
	setPopBox,
	setInfoData,
	infoDataReceiptImgFile,
	infoDataDepositTime,
	infoDataDepositRefNo,
	picFileName = "",
	uploadLocalBankReceipt,
	getDepositInfoRecent,
	refId,
	amount,
	from,
	_isConvert,
	setLocalBankReceipt,
	historyDepositTime
}) => {
	const isMountedRef = useRef(null);

	const [depositTime, setDepositTime] = useState({
		value: moment(),
		checked: null,
		tip: ""
	});

	const [depositRefNo, setdepositRefNo] = useState({
		value: "",
		checked: null,
		tip: ""
	});

	const [depositImgFiles, setDepositImgFiles] = useState({
		value: null,
		name: "",
		checked: null,
		tip: ""
	});

	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const validate = datas => {
		const errors = {};

		// if (!datas.depositRefNo) {
		// 	errors.depositRefNo = t("lbl_RemindForRefNum");
		// }

		if (typeof datas.depositTime === "string") {
			errors.depositTime = t("lbl_DepositTimeToolTip");
		}

		return errors;
	};

	const onUploadFile = async e => {
		e.preventDefault();

		const file =
			e.dataTransfer?.files.length > 0
				? e.dataTransfer?.files[0]
				: e.target.files[0];

		const isValid = file?.type.includes("image");

		if (from === "history") {
			await uploadLocalBankReceipt({
				imgFile: file,
				transId: localBankInfo.transId
			});

			const recentDatas = await getDepositInfoRecent();

			const recentData = recentDatas.find(
				item => item.transId === localBankInfo.transId
			);
			setDepositImgFiles(prev => {
				return {
					...prev,
					name: recentData.picFileName
				};
			});
		} else if (isValid) {
			onImgFileReaderHandlar(file);

			setInfoData(prev => {
				return {
					...prev,
					infoDataReceiptImgFile: file
				};
			});
		} else {
			setDepositImgFiles({
				value: null,
				name: "",
				checked: isValid,
				tip: t("msg_ApiServerError")
			});
		}
	};

	const onImgFileReaderHandlar = imgFile => {
		const imgReader = new FileReader();

		imgReader.readAsDataURL(imgFile);
		imgReader.onload = () => {
			setDepositImgFiles({
				value: imgReader.result,
				name: imgFile.name,
				checked: true,
				tip: ""
			});
		};
	};

	const onSubmit = async e => {
		e.preventDefault();

		const errors = validate({
			depositTime: depositTime.value
			// depositRefNo: depositRefNo.value
		});

		const isValid = Object.keys(errors).length === 0;

		if (!isValid || !depositImgFiles.checked) {
			// if (errors.depositRefNo) {
			// 	setdepositRefNo(({ value }) => {
			// 		return {
			// 			value,
			// 			checked: !errors.depositRefNo,
			// 			tip: errors.depositRefNo
			// 		};
			// 	});
			// }

			if (errors.depositTime) {
				setDepositTime(({ value }) => {
					return {
						value,
						checked: !errors.depositTime,
						tip: errors.depositTime
					};
				});
			}

			if (!depositImgFiles.checked && from !== "history") {
				setDepositImgFiles({
					value: null,
					name: "",
					checked: false,
					tip: t("msg_ApiServerError")
				});
			}
		} else {
			if (from === "history") {
				await setLocalBankReceipt({
					transId: localBankInfo.transId,
					depositTime: depositTime.value,
					fefNo: depositRefNo.value
				});

				getDepositInfoRecent();
			}

			if (from === "new") {
				setInfoData(prev => {
					return {
						...prev,
						infoDataDepositTime: depositTime.value,
						infoDataDepositRefNo: depositRefNo.value
					};
				});
			}

			closePopBox();
		}
	};

	const imgResult =
		depositImgFiles.value ||
		`${config.apiURL}/${langId}/Cashier/DepositReceip.jpg?transId=${localBankInfo.transId}&FileName=${depositImgFiles.name}`;

	const imgRenderHandlar = () => {
		if (picFileName)
			return <img alt={depositImgFiles.name} src={imgResult} />;

		if (!depositImgFiles.checked && depositImgFiles.checked !== null)
			return <i className="icon icon-broken_image" />;

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
		if (from === "history") {
			setDepositImgFiles(prev => {
				return {
					...prev,
					name: picFileName,
					checked: true
				};
			});
			setdepositRefNo(prev => {
				return {
					...prev,
					value: refId
				};
			});
			setDepositTime(prev => {
				return {
					...prev,
					value: moment(historyDepositTime) || moment()
				};
			});
		} else {
			if (infoDataReceiptImgFile?.type.includes("image")) {
				onImgFileReaderHandlar(infoDataReceiptImgFile);
			}

			setDepositTime(prev => {
				return { ...prev, value: infoDataDepositTime || moment() };
			});

			setdepositRefNo(prev => {
				return {
					...prev,
					value: infoDataDepositRefNo
				};
			});
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const _clipboard = new ClipboardJS(".copyBtn");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="upload_new active">
			<div className="icon icon-close" onClick={closePopBox} />
			{/* <div className="smallList checkBankSlip">
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
				{from === "history" ? (
					<ul>
						<li>{t("lbl_DepositAmount")}</li>
						<li>{number_format(amount, _isConvert)}</li>
						<li>
							<button
								className="icon icon-files-empty copyBtn"
								data-clipboard-text={amount}>
								<span>{t("lbl_Copy")}</span>
							</button>
						</li>
					</ul>
				) : null}
			</div> */}
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
					</div>

					<Inputbox
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
						<button className="btn-cancel" onClick={closePopBox}>
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

PopBoxDepositUploadBankSlip.propTypes = {
	from: PropTypes.oneOf(["new", "history"]).isRequired
};

export default PopBoxDepositUploadBankSlip;
