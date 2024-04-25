import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import Wrapper from "../../components/common/wrapper";
import Layout from "../../components/common/layout";
import HomeFooter from "../../components/footer/HomeFooter";

import {
	userInfoContext,
	popBoxContext
} from "../../components/common/context";
import {
	getCurrencyCode,
	getUrlParameter
} from "../../components/common/common";
import { api_news_GetNewsById } from "../../service/api/news";
import { defPopBoxType } from "../../components/common/popBox";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main>
					<section className="inside">
						<div className="rightModule">
							<Content />
						</div>
					</section>
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};

const Content = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [newsInfo, setNewsInfo] = useState({
		title: "",
		content: "",
		imgURL: ""
	});
	const isMountedRef = useRef(null);
	const currencyId = userInfo.currencyId ?? getCurrencyCode(userInfo.langId);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		openNews();
	}, []);

	const openNews = () => {
		const newsId = getUrlParameter("newsId");

		const ClickClose = () => {
			setPopBox({ isOpen: false });
		};

		api_news_GetNewsById({
			langId: userInfo.langId,
			NewsId: Number(newsId),
			currencyId
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const datas = res.data.data;
						setNewsInfo({
							title: datas.title,
							content: datas.content,
							imageURL: datas.imageURL
						});
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={ClickClose}
									>
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
									onClick={ClickClose}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	};

	return (
		<div className="infoModule">
			<article>
				<img src={newsInfo.imageURL} alt={newsInfo.title} />
				<h1>{newsInfo.title}</h1>
				<pre>{newsInfo.content}</pre>
			</article>
		</div>
	);
};
