import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import { userInfoContext, popBoxContext } from "../common/context";
import { api_news_GetNews } from "../../service/api/news";
import { defPopBoxType } from "../common/popBox";
import path from "../../router";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { t } = useTranslation();
	const [getNews, setGetNews] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api_news_GetNews({
			langId: userInfo.langId,
			PageNumber: 1,
			PageSize: 4
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setGetNews(res.data.data);
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: res.data.message,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={ClickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={ClickClose}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	}, [userInfo.langId]);

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	return (
		<>
			<div className="moduleTitle icon icon-upcomingmatches">
				Upcoming Matches
			</div>
			<div className="swiper-container matchesSwiper">
				<div className="swiper-wrapper">
					<div className="swiper-slide">
						<div className="upcomingmatches">
							<div className="team">
								<div>ENGLISH PREMIER LEAGUE</div>
								<div>
									<div className="teamL">
										<img src="https://img.n88media.com/Sports/ENGLISH%20PREMIER%20LEAGUE/Tottenham%20Hotspur.png" />
										Tottenham Hotspur
									</div>
									<div className="btnGroup">
										<button className="orange">
											BET NOW
										</button>
									</div>
									<div className="teamR">
										<img src="https://img.n88media.com/Sports/ENGLISH%20PREMIER%20LEAGUE/Tottenham%20Hotspur.png" />
										Tottenham Hotspur
									</div>
								</div>
								<div> 21/02/2021 22:00</div>
							</div>
						</div>
					</div>
					<div className="swiper-slide">
						<div className="upcomingmatches">
							<div className="team">
								<div>ENGLISH PREMIER LEAGUE</div>
								<div>
									<div className="teamL">
										<img src="https://img.n88media.com/Sports/ENGLISH%20PREMIER%20LEAGUE/Tottenham%20Hotspur.png" />
										Tottenham Hotspur
									</div>
									<div className="btnGroup">
										<button className="orange">
											BET NOW
										</button>
									</div>
									<div className="teamR">
										<img src="https://img.n88media.com/Sports/ENGLISH%20PREMIER%20LEAGUE/Tottenham%20Hotspur.png" />
										Tottenham Hotspur
									</div>
								</div>
								<div> 21/02/2021 22:00</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
