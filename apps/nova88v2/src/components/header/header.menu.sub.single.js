import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, navigate } from "@reach/router";
import defPopBoxType from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";
import { GET_OPEN_RULE, OPEN_IN_BLANK } from "../../service/enterPage";
import productList from "../../datas/productList";
import path from "../../router";
import { defMenuLinks } from "./header.menu.def";

const SubMenuSingle = ({ menuKey, userInfo, t }) => {
	const { setPopBox } = useContext(popBoxContext);
	const pathLink = defMenuLinks[menuKey].path;

	const showLoginPopBox = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	if (menuKey === "poker") {
		const rule = GET_OPEN_RULE(
			userInfo.langId,
			productList.poker.tpId,
			null
		);
		const linkToPokerWeb = () => {
			userInfo.isLogin
				? OPEN_IN_BLANK(rule.entPageUrl, rule.windowKey)
				: showLoginPopBox();
		};

		const linkToPokerRoot = () => {
			userInfo.isLogin
				? navigate(`/${userInfo.langId}/${path.oneGame.root}`)
				: showLoginPopBox();
		};

		return (
			<div>
				<div>{t("lbl_BLUFF_RAISE_OR_CALL")}</div>
				<div>{t("lbl_KEEP_CALM_GO_ALL_IN")}</div>
				<div className="btnGroup">
					<button className="lightblue" onClick={linkToPokerWeb}>
						{t("lbl_POKER_NOW")}
					</button>
					<button className="lightblue" onClick={linkToPokerRoot}>
						{t("lbl_DOWNLOAD_APP_NOW")}
					</button>
				</div>
			</div>
		);
	}
	if (menuKey === "vip") {
		return (
			<div>
				<div>{t("lbl_VIP_CLUB")}</div>
				<div>
					<span className="txt-orange">
						{t("lbl_EARN_EXCLUSIVE_VIP_BENEFIT")}
					</span>
				</div>
				<div className="btnGroup">
					<Link
						className="lightblue"
						to={
							userInfo.isLogin
								? `/${userInfo.langId}/${pathLink}`
								: `/${userInfo.langId}/${path.join.root}`
						}>
						{t("lbl_JOIN_US_NOW")}
					</Link>
				</div>
			</div>
		);
	}
	if (menuKey === "ranking") {
		return (
			<div>
				<div>{t("lbl_THE_WORLD_CLASS_LEADERBOARD")}</div>
				<div>{t("lbl_Bring_you_the_best_experience")}</div>
			</div>
		);
	}
	return <div />;
};

SubMenuSingle.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	menuKey: PropTypes.string.isRequired
};

export default SubMenuSingle;
