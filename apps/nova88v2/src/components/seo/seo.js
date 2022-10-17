/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { defMetaData } from "./def";
import { api_site_seo } from "../../service/api/site";
import usePopBox from "../hook/usePopBox";
import { bannerImgUrl } from "../../config";

const url = "https://www.nova88.net/";

const metaData = defMetaData["/"];
const defSEOData = {
	title: metaData.en.title,
	description: metaData.en.description,
	keyword: metaData.en.keyword,
	links: metaData.en.links
};

export const useGetSEODatas = () => {
	const { i18n } = useTranslation();
	const { errorPopBox } = usePopBox();
	const [SEODatas, setSEODatas] = useState(defSEOData);

	const lang = i18n.language;

	let location = "";
	if (typeof window !== "undefined") {
		location = window.location.pathname;
	}
	const pathArr = location?.split("/").filter(p => p !== "");

	useEffect(() => {
		GetDatas();

		if (pathArr.length >= 2 && defMetaData[pathArr[1]]) {
			const allData = {
				title:
					defMetaData[pathArr[1]]?.[lang]?.title ??
					defMetaData[pathArr[1]]?.en?.title,
				keyword:
					defMetaData[pathArr[1]]?.[lang]?.keyword ??
					defMetaData[pathArr[1]]?.en?.keyword,
				description:
					defMetaData[pathArr[1]]?.[lang]?.description ??
					defMetaData[pathArr[1]]?.en?.description,
				links:
					defMetaData[pathArr[1]]?.[lang]?.links ??
					defMetaData[pathArr[1]]?.en?.links
			};
			setSEODatas({ ...SEODatas, ...allData } ?? {});
		}
	}, []);

	const GetDatas = async () => {
		try {
			const res = await api_site_seo();
			const { errorCode, data, message } = res.data;
			if (errorCode === 0) {
				if (pathArr.length < 2) {
					const allData = {
						...data,
						title: data?.title,
						keyword: data?.keyword,
						description: data?.meta,
						links: metaData?.[lang]?.links
					};

					setSEODatas(allData ?? {});
				}
			} else {
				errorPopBox(message || "error", errorCode);
			}
		} catch (err) {}
	};

	return { SEODatas };
};

function SEO({ meta }) {
	const { i18n } = useTranslation();
	const { SEODatas } = useGetSEODatas();
	const lang = i18n.language;

	// let location = "";
	// if (typeof window !== "undefined") {
	// 	location = window.location.pathname;
	// }
	// const pathArr = location?.split("/").filter(p => p !== "");

	// const metaData = defMetaData["/"];
	// let _title =
	// 	SEODatas?.title ?? metaData?.[lang]?.title ?? metaData.en.title;
	// let _keyword = SEODatas?.keyword ?? metaData?.[lang]?.keyword ?? "";
	// let _description = SEODatas?.meta ?? metaData?.[lang]?.description ?? "";
	// let links = metaData?.[lang]?.links ?? [];

	// if (pathArr.length >= 2 && defMetaData[pathArr[1]]) {
	// 	_title =
	// 		defMetaData[pathArr[1]]?.[lang]?.title ??
	// 		defMetaData[pathArr[1]]?.en?.title ??
	// 		_title;
	// 	_keyword =
	// 		defMetaData[pathArr[1]]?.[lang]?.keyword ??
	// 		defMetaData[pathArr[1]]?.en?.keyword ??
	// 		_keyword;
	// 	_description =
	// 		defMetaData[pathArr[1]]?.[lang]?.description ??
	// 		defMetaData[pathArr[1]]?.en?.description ??
	// 		_description;
	// 	links =
	// 		defMetaData[pathArr[1]]?.[lang]?.links ??
	// 		defMetaData[pathArr[1]]?.en?.links ??
	// 		links;
	// }

	// if (getFromAPI && SEODatas === null) return null;

	return (
		<Helmet
			htmlAttributes={{
				lang,
				class: "newIndex"
			}}
			title={SEODatas.title ?? defSEOData.title}
			link={[
				...SEODatas?.links,
				{
					rel: "icon",
					type: "image/x-icon",
					href: `${bannerImgUrl}/desktop/img/favicon.ico`
				}
			]}
			meta={[
				{
					name: `description`,
					content: SEODatas.description
				},
				{
					name: `keyword`,
					content: SEODatas.keyword
				},
				{
					property: `og:url`,
					content: url
				},
				{
					property: `og:type`,
					content: `website`
				},
				{
					property: `og:title`,
					content: SEODatas.title
				},
				{
					property: `og:description`,
					content: SEODatas.description
				},
				{
					property: `og:image`,
					content: `${bannerImgUrl}/img/thumbnail/thumbnail_001.jpg`
				},
				{
					name: `twitter:card`,
					content: `summary_large_image`
				},
				{
					name: `twitter:domain`,
					content: `nova88.net`
				},
				{
					name: `twitter:url`,
					content: url
				},
				{
					name: `twitter:title`,
					content: SEODatas.title
				},
				{
					name: `twitter:description`,
					content: SEODatas.description
				},
				{
					name: `twitter:image`,
					content: `${bannerImgUrl}/img/thumbnail/thumbnail_001.jpg`
				},
				...meta
			]}
		/>
	);
}

SEO.defaultProps = {
	meta: []
};

SEO.propTypes = {
	meta: PropTypes.arrayOf(PropTypes.object)
};

export default SEO;
