import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";
import productList from "../../datas/productList";

const ESportFooterList = ({
	t,
	eSportsSubMenu,
	tpGameTypeSettingList,
	clickItem
}) => {
	const eSportSabaItem =
		eSportsSubMenu?.find(
			item =>
				item.parameter.tpGameType ===
					productList.eSportAll.tpGameType &&
				item.parameter.tpId === productList.eSportAll.tpId
		) || {};

	if (tpGameTypeSettingList && tpGameTypeSettingList.length > 0) {
		tpGameTypeSettingList.forEach(settingItem => {
			if (
				settingItem.gameType ===
					productList.eSportAll.parameter.tpGameType &&
				settingItem.tpId === productList.eSportAll.parameter.tpId
			) {
				if (subMenuItem?.noShow) return null;
			}
		});
	}

	return (
		<>
			<a className={classNames({ under: eSportSabaItem?.isInMaintain })}>
				{eSportSabaItem.isInMaintain && (
					<div className="under-text">
						{t("lbl_underMaintenance")}
					</div>
				)}
				<img
					onClick={() => clickItem(eSportSabaItem)}
					src={`${bannerImgUrl}/desktop/img/4.0/lobby-esports/lol.png`}
					alt="lol"
				/>
			</a>
			<a className={classNames({ under: eSportSabaItem?.isInMaintain })}>
				{eSportSabaItem?.isInMaintain && (
					<div className="under-text">
						{t("lbl_underMaintenance")}
					</div>
				)}
				<img
					onClick={() => clickItem(eSportSabaItem)}
					src={`${bannerImgUrl}/desktop/img/4.0/lobby-esports/king.png`}
					alt="king"
				/>
			</a>
			<a className={classNames({ under: eSportSabaItem?.isInMaintain })}>
				{eSportSabaItem?.isInMaintain && (
					<div className="under-text">
						{t("lbl_underMaintenance")}
					</div>
				)}
				<img
					onClick={() => clickItem(eSportSabaItem)}
					src={`${bannerImgUrl}/desktop/img/4.0/lobby-esports/cs.png`}
					alt="cs"
				/>
			</a>
			<a className={classNames({ under: eSportSabaItem?.isInMaintain })}>
				{eSportSabaItem?.isInMaintain && (
					<div className="under-text">
						{t("lbl_underMaintenance")}
					</div>
				)}
				<img
					onClick={() => clickItem(eSportSabaItem)}
					src={`${bannerImgUrl}/desktop/img/4.0/lobby-esports/dota.png`}
					alt="dota"
				/>
			</a>
		</>
	);
};

ESportFooterList.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	eSportsSubMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	tpGameTypeSettingList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default ESportFooterList;
