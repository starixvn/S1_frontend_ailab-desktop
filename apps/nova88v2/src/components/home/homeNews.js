import React, { useContext, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { popBoxContext } from "../common/context";
import { api_news_GetNews } from "../../service/api/news";
import defPopBoxType from "../common/defPopBoxType";
import path from "../../router";

export const HomeNews = ({ t, userInfo }) => {
	const { setPopBox } = useContext(popBoxContext);
	const [getNews, setGetNews] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const ClickClose = () => {
			setPopBox({ isOpen: false });
		};
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
			() => {
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

	const clickToNews = _newsId => {
		navigate(`/${userInfo.langId}/${path.newsInfo.root}?newsId=${_newsId}`);
	};

	const newsRows = getNews.slice(0, 2).map((item, idx) => {
		return (
			<div key={`index-news-${item.newsId}-${userInfo.langId}`}>
				<div className="newsModule">
					<img src={item.imageURL} alt="news-img" />
					<div>
						<div>{item.postTime.slice(0, 10)}</div>
						<div>{item.title}</div>
						<div>{item.content}</div>
						<div className="btnGroup">
							<button
								className="lightblue"
								onClick={clickToNews.bind(this, item.newsId)}>
								{t("lbl_MoreDetails")}
							</button>
						</div>
					</div>
				</div>
				{idx === 0 ? <div className="newsBorder" /> : null}
			</div>
		);
	});

	return (
		<div className="newsList">
			<div className="moduleTitle icon icon-news">
				{t("lbl_SPORT_NEWS")}
			</div>
			{newsRows}
		</div>
	);
};

HomeNews.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default HomeNews;
