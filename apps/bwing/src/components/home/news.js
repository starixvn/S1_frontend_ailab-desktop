import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import path from "../../router";
import { userInfoContext } from "../common/context";

const News = ({ news }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="col-7 ml-4">
			<div className="home-title">
				<i className="icon-news" />
				{t("lbl_SiteNews")}
			</div>
			<div className="home-news">
				<div className="home-news-content">
					{news.map(({ imageURL, content, newsId, title }) => (
						<div key={newsId} className="home-news-item">
							<img src={imageURL} alt="" />
							<div className="home-news-info">
								<span>{content}</span>
								<a
									onClick={() =>
										navigate(
											`/${userInfo.langId}/${path.news.root}?newsId=${newsId}`
										)
									}
								>
									{t("lbl_Read_more")} &gt;&gt;
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

News.defaultProps = {
	news: []
};

News.propTypes = {
	news: PropTypes.arrayOf(PropTypes.any)
};

export default News;
