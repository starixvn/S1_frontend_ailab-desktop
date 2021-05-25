import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "./context";
import { setCookie, deleteCookie } from "./common";
import config from "../../config";

export default ({ onClickClose, linkList }) => {
	const isMountedRef = useRef(null);
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [selectDontShow, setSelectDontShow] = useState(false);
	const settingCookie = `backupDomain_${userInfo.userName}`;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const onChangeDontShow = () => {
		setSelectDontShow(prev => {
			const check = !prev;
			if (check) {
				setCookie(settingCookie, "1", 1);
			} else {
				deleteCookie(settingCookie);
			}
			return check;
		});
	};

	const linksLayout = linkList?.map(_link => {
		const _linkValue = _link.domainName;

		const copyWelComeText = () => {
			const virtualInput = document.createElement("input");
			virtualInput.value = _linkValue;
			document.body.appendChild(virtualInput);
			virtualInput.select();
			document.execCommand("copy");
			document.body.removeChild(virtualInput);
		};

		return (
			<div className="url" key={`domainList-${_link.domainName}`}>
				{_linkValue}
				<button
					className="copyurl"
					onClick={copyWelComeText.bind(this)}>
					{t("lbl_Copy")}
				</button>
			</div>
		);
	});

	const closeAndDontShowAgain = () => {
		console.log("do");
		onClickClose();
		setCookie(settingCookie, "1", 1);
	};

	return (
		<div className="backupDomain active">
			<button className="icon icon-close" onClick={onClickClose} />
			<div className="poptit">{t("lbl_nova88_backup_website")}</div>
			<img
				src={`${config.bannerImgUrl}/img/backupDomain/backupDomain_${userInfo.langId}.jpg`}
				alt="backup-domain-Img"
			/>
			<div className="poptxt">
				<div>{t("lbl_DearValuedCustomers")}</div>
				<div>
					{t(
						"lbl_kindly_visit_alternate_link_for_better_performance"
					)}
				</div>
			</div>
			{linksLayout}
			<div className="checkbox">
				<input
					type="checkbox"
					id="home-popbox-joinReferral"
					onChange={onChangeDontShow}
					checked={selectDontShow}
				/>
				<label
					htmlFor="home-popbox-joinReferral"
					className="icon icon-checkbox-checked"
				/>
				{t("lbl_Dont_show_me_again")}
			</div>
		</div>
	);
};
