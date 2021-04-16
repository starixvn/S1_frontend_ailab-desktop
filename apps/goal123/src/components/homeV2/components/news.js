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
			PageSize: 4
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
		/*
content: "Although Tiger Woods' career sounds like a sure-fire Netflix hit drama -- with the dramatic highs and devasting lows -- the news that he is coming to the Ozarks has nothing to do with the Jason Bateman and Laura Linney-led series.↵↵Instead, it's the home of the first public golf course designed by Woods -- based in Ridgedale, Missouri near the Ozark Mountains -- which will play host to a Ryder Cup-style international charity match as its curtain raiser.↵The Payne's Valley Cup will take place at Big Cedar Lodge's Payne's Valley Course and will be contested between Team US vs. Team Europe on September 22, three days before the Ryder Cup -- which was postponed because of the coronavirus pandemic -- was scheduled to take place.↵Woods is partnered with Justin Thomas on Team US and the pair will face Justin Rose and Rory McIlroy who make up Team Europe.↵All four competitors have been world No. 1s, are major champions, have won the FedExCup and have been part of victorious Ryder Cup teams.↵READ: How Brendon Todd came in from the cold to grab himself a slice of the action on PGA Tour"
imageURL: "http://tv-go.org/wp-content/uploads/2018/10/hqdefault-1952.jpg"
newsId: 4
postTime: "2021-03-31T05:08:00+00:00"
sort: 0
title: "Tune in: Tiger Woods is coming to the Ozarks as his first public golf course opens"
        
        */
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
				<Link to={`${langId}/${path.news.root}`}>
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
