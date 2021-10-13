import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { api_news_GetNews } from "../../../service/api/news";
import usePopBox from "../../hook/usePopBox";
import path from "../../../router";

const News = ({ t, langId }) => {
	const [newsDatas, setNewsDatas] = useState([]);
	const isMountedRef = useRef(null);

	const { errorPopBox } = usePopBox();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api_news_GetNews({
			langId,
			PageNumber: 1,
			PageSize: 3
		}).then(
			res => {
				if (!isMountedRef.current) return;
				const { errorCode, message, data } = res.data;

				if (errorCode === 0) {
					setNewsDatas(data);
				} else {
					errorPopBox(message || `[${errorCode}] error`, message);
				}
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
	}, [langId]);

	const row = newsDatas.map(item => {
		return (
			<Link
				key={`index-news-${item.newsId}-${langId}`}
				to={`/${langId}/${path.news.root}/${path.news.sub.newsInfo.root}?newsId=${item.newsId}`}>
				<img src={item.imageURL} alt={`news-img-${item.newsId}`} />
				<div className="title">
					<p>{item.title}</p>
				</div>
			</Link>
		);
	});

	return (
		<div className="news">
			<div>
				<div className="title">
					<i className="icon icon-newspaper" />
					{t("lbl_Goal123News")}
				</div>
			</div>
			<div className="articleModule">{row}</div>
			<div className="btnall">
				<Link to={`/${langId}/${path.news.root}`}>
					{t("lbl_ViewAll")}
				</Link>
			</div>
		</div>
	);
};

News.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired
};

export default News;
