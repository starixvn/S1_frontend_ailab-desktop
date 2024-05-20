import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import { api_news_GetNews } from "../../../service/api/news";
import usePopBox from "../../hook/usePopBox";
import path from "../../../router";
import { userInfoContext } from "../../common/context";
import { getCurrencyCode } from "../../common/common";

const News = () => {
	const { t } = useTranslation();
	const [newsDatas, setNewsDatas] = useState([]);
	const isMountedRef = useRef(null);
	const { userInfo } = useContext(userInfoContext);
	const { errorPopBox } = usePopBox();
	const currencyId = userInfo.currencyId ?? getCurrencyCode(userInfo.langId);

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
			PageSize: 2,
			currencyId
		}).then(
			res => {
				if (!isMountedRef.current) return;
				const { errorCode, message, data } = res.data;

				if (errorCode === 0) {
					setNewsDatas(data);
				} else {
					errorPopBox(message || `error`, message);
				}
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
	}, [userInfo.langId]);

	return (
		<div className="home-news">
			<div>
				<div className="home-title">{t("lbl_News")}</div>
				<Link
					to={`/${userInfo.langId}/${path.news.root}`}
					className="btn-more-text"
				>
					{t("lbl_Home_More")}
					<i className="icon-dropdown" />
				</Link>
			</div>
			<div className="inner">
				{newsDatas.map(item => {
					return (
						<a
							className="item"
							key={`index-news-${item.newsId}-${userInfo.langId}`}
							href={`/${userInfo.langId}/${path.news.root}/${path.news.sub.newsInfo.root}?newsId=${item.newsId}`}
						>
							<div className="news-img">
								<img
									src={item.imageURL}
									alt={`news-img-${item.newsId}`}
								/>
							</div>
							<div className="title">
								<p>{item.title}</p>
							</div>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default News;
