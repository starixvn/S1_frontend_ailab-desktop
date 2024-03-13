import React, { useState, useEffect, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { api_message_GetAnnouncement } from "../../../service/api/message";
import { userInfoContext, popBoxContext } from "../../common/context";
import { GET_LANG_ID } from "../../../service/language";
import { getCurrencyCode } from "../../common/common";

// /api/Message/GetAnnouncement/{langId}

const HomeMarquee = () => {
	const [datas, setDatas] = useState([]);
	const { t } = useTranslation();
	const [isPaused, setIsPaused] = useState(false);
	const [marginLeft, setMarginLeft] = useState(0);
	const [shouldRestart, setShouldRestart] = useState(false);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const currencyId = userInfo.currencyId ?? getCurrencyCode(userInfo.langId);
	const langId = GET_LANG_ID(userInfo.langId);
	const speed = 7;
	const marqueeTextRef = useRef(null);

	useEffect(() => {
		if (isPaused) return;

		const textWidth = marqueeTextRef.current
			? marqueeTextRef.current.offsetWidth
			: 0;
		const parentWidth = marqueeTextRef.current
			? marqueeTextRef.current.parentElement.offsetWidth
			: 0;

		const interval = setInterval(() => {
			setMarginLeft(prevMargin => {
				if (-prevMargin >= textWidth) {
					return parentWidth;
				}
				return prevMargin - 1;
			});
		}, speed);
		return () => clearInterval(interval);
	}, [speed, isPaused]);

	useEffect(() => {
		if (shouldRestart) {
			setMarginLeft(0);
			setShouldRestart(false);
		}
	}, [shouldRestart]);

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
		<div id="Marquee" style={{ cursor: "pointer" }}>
			<div
				className="home-marquee"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
				style={{ overflow: "hidden" }}>
				<i className="icon-speaker" style={{ position: "absolute" }} />
				<div
					ref={marqueeTextRef}
					style={{
						display: "flex",
						marginLeft: `${marginLeft}px`
					}}>
					{datas && datas.map((data, index) => (
						<div
							key={index}
							style={{
								paddingLeft: "80px"
							}}>
							{data.subject}
						</div>
					))}
				</div>
				<button className="btn-info" onClick={clickMarquee}>
					{t("lbl_Home_More")}
				</button>
			</div>
		</div>
	);
};
export default HomeMarquee;
