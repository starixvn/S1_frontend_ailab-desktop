import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { userInfoContext } from "../common/context";
import { defMenuLinks } from "./header.menu.def";
import LinkItems, { getCurrentPage } from "../common/linkItems";

const Main = ({ showSubMenu, productTpIds }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const currentPage = getCurrentPage();

	return (
		<>
			<Link
				to={`/${userInfo.langId}`}
				className={
					currentPage === `/${userInfo.langId}` ? "active" : ""
				}
			>
				<i className="icon icon-home" />
			</Link>
			{/* <Link
				to={`/${userInfo.langId}/${path.sports.root}?tpId=1&gameId=2002&tpGameType=1`}
				className={`event ${worldCupTag}`}>
				<img
					src={`${bannerImgUrl}/desktop/img/event/worldcup/xs-logo.png`}
					alt="world cup"
				/>
			</Link> */}
			<LinkItems
				defMenuLinks={defMenuLinks(userInfo.langId)}
				t={t}
				showSubMenu={showSubMenu}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				checkMatchPage={true}
				toUpperCase={true}
				productTpIds={productTpIds}
			/>
		</>
	);
};

Main.defaultProps = {
	showSubMenu: () => null,
	productTpIds: null
};

Main.propTypes = {
	showSubMenu: PropTypes.func,
	productTpIds: PropTypes.arrayOf(PropTypes.any)
};

export default Main;
