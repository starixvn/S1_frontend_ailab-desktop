import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
// import { Link } from "@reach/router";
// import path from "../../router";
import { api_site_GetSupportDomainList } from "../../service/api/site";
import { userInfoContext } from "./context";
import { setCookie, deleteCookie } from "./common";
import proInfoImg from "../../styles/img/proInfoImg.jpg";

export default ({ onClickClose }) => {
	const isMountedRef = useRef(null);
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [selectDontShow, setSelectDontShow] = useState(false);
	const [linkList, setLinkList] = useState([]);
	const refeCookieName = `referral_${userInfo.userName}`;

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
				setCookie(refeCookieName, "1", 7);
			} else {
				deleteCookie(refeCookieName);
			}
			return check;
		});
	};

	let src = null;
	try {
		src = require(`../../styles/img/friend-${userInfo.langId}.jpg`);
	} catch (error) {}

	useEffect(() => {
		api_site_GetSupportDomainList().then(res => {
			if (res.data.errorCode === 0 && isMountedRef.current) {
				console.log(res.data.data);
				setLinkList(res.data.data);
			}
		});
	}, []);

	const linksLayout = linkList.map(_link => {
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
			{/* <Link className="" to={`/${userInfo.langId}/${path.referral.root}`}>
				<img src={src} alt="img_referral" />
			</Link> */}
			<div className="poptit">本月主打優惠</div>
			<img src={proInfoImg} alt="proInfo-Img" />
			<div className="btnGroup">
				<button className="btn-check">點擊查看</button>
				<button className="backupClick">進入遊戲</button>
			</div>
			<div className="text-center">最新NOVA88網址，請保存備用</div>
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
