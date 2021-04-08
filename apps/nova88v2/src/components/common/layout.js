import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Header from "../header/header";
import { Footer } from "../footer/footer";
import PopBox from "./popBox";
import Loading from "./loading";
import { api_site_GetTpIds } from "../../service/api/site";
import { userInfoContext } from "./context";

const Layout = ({ children, showFooter = false }) => {
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
			<Header productTpIds={productTpIds} />
			{children}
			{showFooter ? <Footer /> : null}
			<PopBox />
			<Loading />
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
