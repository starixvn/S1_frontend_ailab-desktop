import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, navigate } from "@reach/router";
import { popBoxContext } from "../common/context";
import { api_news_GetNews } from "../../service/api/news";
import { defPopBoxType } from "../common/popBox";
import path from "../../router";

export default ({ t, userInfo }) => {
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

	const clickToNews = _newsId => {
		navigate(`/${userInfo.langId}/${path.newsInfo.root}?newsId=${_newsId}`);
	};

	// console.log("getNews:", getNews);

	const newsRows = getNews.map((item, idx) => {
		return (
			<>
				<div
					className="newsModule"
					key={`index-news-${item.newsId}-${userInfo.langId}`}>
					<img src={item.imageURL} />
					{/* <img src={require(`../../styles/img/news01.jpg`)} /> */}
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
				{idx < 2 ? <div className="newsBorder" /> : null}
			</>
		);
	});

	return (
		<>
			<div className="newsList">
				<div className="moduleTitle icon icon-news">SPORT NEWS</div>
				{newsRows}
			</div>
		</>
	);
};
