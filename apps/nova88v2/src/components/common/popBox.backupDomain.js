import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { api_site_GetSupportDomainList } from "../../service/api/site";
import { userInfoContext } from "./context";
import { setCookie, deleteCookie } from "./common";
import config from "../../config";

export default ({ onClickClose }) => {
	const isMountedRef = useRef(null);
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [selectDontShow, setSelectDontShow] = useState(false);
	const [linkList, setLinkList] = useState([]);
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
				setCookie(settingCookie, "1", 7);
			} else {
				deleteCookie(settingCookie);
			}
			return check;
		});
	};

	let imgSrc = null;
	try {
		const imgLang = userInfo.langId === "en" ? "en" : "en";
		imgSrc = `${config.cloudImgUrl}/SiteSkin/img/backupimg_${imgLang}.jpg`;
	} catch (error) {}

	useEffect(() => {
		api_site_GetSupportDomainList().then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				setLinkList(res.data.data);
			}
		});
	}, []);

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
			<div className="url">
				{_linkValue}
				<button
					className="copyurl"
					onClick={copyWelComeText.bind(this)}>
					{t("lbl_Copy")}
				</button>
			</div>
		);
	});

	return (
		<div className="backupDomain active">
			<button className="icon icon-close" onClick={onClickClose} />
			<div className="poptit">
				{t("lbl_kindly_visit_alternate_link_for_better_performance")}
			</div>
			<img src={imgSrc} alt="backup-domain-Img" />
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
