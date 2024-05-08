import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import Marquee from "react-fast-marquee";
import { api_message_GetAnnouncement } from "../../../service/api/message";
import { userInfoContext, popBoxContext } from "../../common/context";
import { GET_LANG_ID } from "../../../service/language";
import { getCurrencyCode } from "../../common/common";

// api use here : /api/Message/GetAnnouncement/{langId}

const HomeMarquee = () => {
	const [datas, setDatas] = useState([]);
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const currencyId = userInfo.currencyId ?? getCurrencyCode(userInfo.langId);
	const langId = GET_LANG_ID(userInfo.langId);

	useEffect(() => {
		const getAnnouncement = async () => {
			try {
				const res = await api_message_GetAnnouncement({
					langId,
					currencyId
				});
				setDatas(res.data.data);
			} catch (error) {}
		};
		getAnnouncement();
	}, [langId, currencyId]);

	const clickMarquee = () => {
		if (userInfo.isLogin) {
			navigate(`/${langId}/announcement`);
		} else {
			setPopBox({
				isOpen: true,
				popBoxType: "Login"
			});
		}
		return null;
	};

	return (
		<div id="Marquee">
			<div className="home-marquee">
				<i className="icon-speaker" style={{ zIndex: "3" }} />
				<Marquee pauseOnHover={true} speed={75} gradient={false}>
					{datas &&
						datas.map(data => (
							<div key={data.subject}>{data.subject}</div>
						))}
				</Marquee>
				<button
					className="btn-info"
					onClick={clickMarquee}
					style={{ zIndex: "3" }}>
					{t("lbl_Home_More")}
				</button>
			</div>
		</div>
	);
};
export default HomeMarquee;
