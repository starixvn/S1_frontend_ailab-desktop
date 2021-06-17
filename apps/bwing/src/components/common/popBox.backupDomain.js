import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "./context";
import { setCookie, deleteCookie } from "./common";

import backupdomianImg from "../../styles/img/Epopup-banner.jpg";

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
		onClickClose();
		setCookie(settingCookie, "1", 1);
	};

	return (
		<div className="pop">
			<button
				className="icon icon-close"
				onClick={closeAndDontShowAgain}
			/>

			<div className="backupDomain active">
				<div className="poptit">{t("lbl_BackupDomain_Title")}</div>

				<img src={backupdomianImg} alt="backup-domain-Img" />

				<div className="poptxt">
					<div>{t("lbl_BackupDomain_description1")}</div>
					<div>{t("lbl_BackupDomain_description2")}</div>
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
		</div>
	);
};
