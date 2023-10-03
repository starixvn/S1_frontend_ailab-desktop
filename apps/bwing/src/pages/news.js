import React, { useContext, useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { useLocation } from "@reach/router";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import { api_news_GetNews } from "../service/api/news";
import { userInfoContext } from "../components/common/context";

export default () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<main className="lobby news">
					<div className="wrapper mt-5">
						<div className="col-12">
							<NewsPage />
						</div>
					</div>
				</main>
			</Layout>
		</Wrapper>
	);
};

const NewsPage = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const paramsNewsId = searchParams.get("newsId");
	const { userInfo } = useContext(userInfoContext);
	const [news, setNews] = useState([]);

	const newObject = () => {
		return news?.find(newObj => newObj?.newsId === Number(paramsNewsId));
	};

	const { title, imageURL, content } = newObject() || {};

	const getNews = async () => {
		try {
			const res = await api_news_GetNews({
				langId: userInfo.langId,
				PageNumber: 1,
				PageSize: 2,
				currencyId: userInfo.currencyId
			});
			setNews(res.data.data);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

	useEffect(() => {
		if (!paramsNewsId) {
			navigate("/");
		}
	}, []);

	useEffect(() => {
		getNews();
	}, [userInfo?.langId]);

	return (
		<div className="lobby-news">
			<Link to="/" className="back">
				<i className="icon-arrow-left" />
				{t("lbl_back")}
			</Link>

			<div className="lobby-news-title">{title}</div>
			<div className="lobby-news-bottom">
				<div className="lobby-news-content">{content}</div>
				<div className="lobby-news-img">
					<img src={imageURL} alt={title} />
				</div>
			</div>
		</div>
	);
};
