import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Header from "../layout/header";
import Footer from "../footer/footer";
import SEO from "../seo";
import PopBox from "./popBox";
import Loading from "./loading";
import { loadingContext, userInfoContext } from "./context";
import { api_site_GetTpIds } from "../../service/api/site";

const Layout = ({ children, showFooter = false }) => {
	const { loading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const [productTpIds, setProductTpIds] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin && productTpIds === null) {
			api_site_GetTpIds().then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setProductTpIds(res.data.data);
				}
			});
		} else if (userInfo.isLogin === false && productTpIds?.length > 0) {
			setProductTpIds(null);
		}
	}, [userInfo.isLogin, productTpIds]);

	return (
		<>
			<SEO />
			<Header productTpIds={productTpIds} />
			{children}
			{showFooter ? <Footer productTpIds={productTpIds} /> : null}
			<PopBox />
			{loading ? <Loading /> : null}
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
