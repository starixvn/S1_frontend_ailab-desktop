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

export const useGetSEODatas = ({ getFromAPI = false, errorPopBox }) => {
	const [SEODatas, setSEODatas] = useState(null);
	useEffect(() => {
		const GetDatas = async () => {
			if (getFromAPI && SEODatas === null) {
				try {
					const res = await api_site_seo();
					if (res.data.errorCode === 0) {
						setSEODatas(res.data.data ?? {});
					} else {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
				} catch (err) {}
			}
		};
		GetDatas();
	}, [getFromAPI, SEODatas]);

	return { SEODatas };
};

function SEO({ meta, getFromAPI }) {
	const { i18n } = useTranslation();
	const { errorPopBox } = usePopBox();
	const { SEODatas } = useGetSEODatas({ getFromAPI, errorPopBox });
	const lang = i18n.language;

	let location = "";
	if (typeof window !== "undefined") {
		location = window.location.pathname;
	}
	const pathArr = location?.split("/").filter(p => p !== "");

	if (getFromAPI && SEODatas === null) return null;

	const metaData = defMetaData["/"];
	let _title =
		SEODatas?.title ?? metaData?.[lang]?.title ?? metaData.en.title;
	let _keyword = SEODatas?.keyword ?? metaData?.[lang]?.keyword ?? "";
	let _description = SEODatas?.meta ?? metaData?.[lang]?.description ?? "";
	let links = metaData?.[lang]?.links ?? [];

	if (pathArr.length >= 2 && defMetaData[pathArr[1]]) {
		_title =
			defMetaData[pathArr[1]]?.[lang]?.title ??
			defMetaData[pathArr[1]]?.en?.title ??
			_title;
		_keyword =
			defMetaData[pathArr[1]]?.[lang]?.keyword ??
			defMetaData[pathArr[1]]?.en?.keyword ??
			_keyword;
		_description =
			defMetaData[pathArr[1]]?.[lang]?.description ??
			defMetaData[pathArr[1]]?.en?.description ??
			_description;
		links =
			defMetaData[pathArr[1]]?.[lang]?.links ??
			defMetaData[pathArr[1]]?.en?.links ??
			links;
	}

	return (
		<Helmet
			htmlAttributes={{
				lang,
				class: "newIndex"
			}}
			title={_title}
			link={[
				...links,
				{
					rel: "icon",
					type: "image/x-icon",
					href: `${bannerImgUrl}/desktop/img/favicon.ico`
				}
			]}
			meta={[
				{
					name: `description`,
					content: _description
				},
				{
					name: `keyword`,
					content: _keyword
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
					content: _title
				},
				{
					property: `og:description`,
					content: _description
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
					content: _title
				},
				{
					name: `twitter:description`,
					content: _description
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
	meta: [],
	getFromAPI: true
};

SEO.propTypes = {
	meta: PropTypes.arrayOf(PropTypes.object),
	getFromAPI: PropTypes.bool
};

export default SEO;
