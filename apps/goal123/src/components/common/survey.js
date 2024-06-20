import React, { useContext, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { api_survey_Set } from "../../service/api/survey";
import { bannerImgUrl } from "../../config";
import { popBoxContext, userInfoContext } from "./context";
import defPopBoxType from "./defPopBoxType";

const initStatus = {
	content: "",
	contactInfo: ""
};

const Survey = () => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const {
		userInfo: { isLogin }
	} = useContext(userInfoContext);
	const [isOpenSurvey, setIsOpenSurvey] = useState(false);
	const [isSubmit, setIsSubmit] = useState(false);
	const [surveyForm, setSurveyForm] = useState(initStatus);

	const onSubmit = async e => {
		e.preventDefault();

		const ClickClose = () => {
			setPopBox({ isOpen: false });
		};

		const errMessage = formValidate(surveyForm);
		if (errMessage) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: errMessage,
				btnBar: (
					<div className="btnGroup">
						<button className="btn-cancel" onClick={ClickClose}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
			return;
		}

		try {
			const res = await api_survey_Set(surveyForm);
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					setSurveyForm(initStatus);
					setIsSubmit(true);
				} else {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: `[${res.data.errorCode}] ${res.data.message}`,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={ClickClose}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		} catch (error) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: t("msg_ApiServerError"),
				btnBar: (
					<div className="btnGroup">
						<button className="btn-cancel" onClick={ClickClose}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	};

	const formValidate = form => {
		const EMAIL_OR_PHONE_REGEX =
			/^((\(?\+?[0-9]*\)?)?[0-9_]*|(\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+))$/;
		if (!form.content) {
			return t("lbl_Survey_Req_Content");
		}
		if (form.contactInfo && !EMAIL_OR_PHONE_REGEX.test(form.contactInfo)) {
			return t("lbl_Survey_Vld_Contact");
		}
		return null;
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		setSurveyForm(prev => ({
			...prev,
			[name]: value
		}));
	};

	const onCloseSurvey = () => {
		setSurveyForm(initStatus);
		setIsOpenSurvey(false);
		setIsSubmit(false);
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	if (!isLogin) {
		return null;
	}

	return (
		<div id="survey">
			<button
				className="survey-icon-btn"
				onClick={() => setIsOpenSurvey(true)}
			>
				<img
					src={`${bannerImgUrl}/desktop/img/home-page/survey-icon.svg`}
					alt="survey"
				/>
			</button>
			<div className={classNames("survey-box", { active: isOpenSurvey })}>
				<div
					className={classNames("survey-before", {
						close: isSubmit
					})}
				>
					<div>{t("lbl_Survey_Title")}</div>
					<div>{t("lbl_Survey_Hint1")}</div>
					<form className="survey-input" onSubmit={onSubmit}>
						<fieldset>
							<textarea
								name="content"
								placeholder={t("lbl_Survey_Phd_Content") ?? ""}
								value={surveyForm.content}
								maxLength={2000}
								onChange={e => handleInputChange(e)}
							/>
						</fieldset>
						<fieldset>
							<input
								type="text"
								name="contactInfo"
								placeholder={t("lbl_Survey_Phd_Contact") ?? ""}
								value={surveyForm.contactInfo}
								onChange={e => handleInputChange(e)}
							/>
						</fieldset>
						<fieldset className="survey-btn">
							<button type="submit">{t("lbl_Submit")}</button>
							<button type="button" onClick={onCloseSurvey}>
								{t("lbl_Cancel")}
							</button>
						</fieldset>
					</form>
				</div>
				<div
					className={classNames("survey-after", {
						close: !isSubmit
					})}
				>
					<button
						className="icon icon-close"
						onClick={onCloseSurvey}
					/>
					<div>
						<img
							src={`${bannerImgUrl}/desktop/img/home-page/thankyou.png`}
							alt="thankyou"
						/>
						<div>{t("lbl_Thankyou")}</div>
					</div>
					<div>{t("lbl_Survey_Hint2")}</div>
				</div>
			</div>
		</div>
	);
};

export default Survey;
