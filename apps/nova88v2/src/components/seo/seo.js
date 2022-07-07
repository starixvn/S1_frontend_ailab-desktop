/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
// import { useLocation } from "@reach/router";
import { defMetaData } from "./def";
// import { defLangList } from "../../datas/languageData";
import { api_site_seo } from "../../service/api/site";
import usePopBox from "../hook/usePopBox";
import { bannerImgUrl } from "../../config";

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

function SEO({ lang, meta, getFromAPI }) {
	const { errorPopBox } = usePopBox();
	const { SEODatas } = useGetSEODatas({ getFromAPI, errorPopBox });

	// const isBrowser = () => typeof window !== "undefined";
	// const location =
	// 	isBrowser && window?.pathname?.split("/").filter(p => p !== "");

	if (getFromAPI && SEODatas === null) return null;

	const metaData = defMetaData["/"];
	const _title = SEODatas?.title ?? metaData?.[lang]?.title ?? "";
	const _keyword = SEODatas?.keyword ?? metaData?.[lang]?.keyword ?? "";
	const _description = SEODatas?.meta ?? metaData?.[lang]?.description ?? "";
	const links = metaData?.[lang]?.links ?? [];

	// if (
	// 	location &&
	// 	location.length >= 2 &&
	// 	defLangList.includes(location[0]) &&
	// 	defMetaData[location[1]]
	// ) {
	// 	metaData = defMetaData[location[1]] ?? metaData;
	// 	_title = defMetaData[location[1]]?.[lang]?.title ?? _title;

	// 	_keyword = defMetaData[location[1]]?.[lang]?.keyword ?? _keyword;

	// 	_description =
	// 		defMetaData[location[1]]?.[lang]?.description ?? _description;

	// 	links = defMetaData[location[1]]?.[lang]?.links ?? links;
	// }

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
					property: `og:type`,
					content: `website`
				},
				{
					name: `twitter:card`,
					content: `summary`
				},
				{
					name: `twitter:creator`,
					content: _title
				},
				{
					name: `twitter:title`,
					content: _title
				},
				{
					name: `twitter:description`,
					content: _description
				}
			].concat(meta)}
		/>
	);
}

SEO.defaultProps = {
	lang: `en`,
	meta: [],
	getFromAPI: true
};

SEO.propTypes = {
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	getFromAPI: PropTypes.bool
};

export default SEO;
