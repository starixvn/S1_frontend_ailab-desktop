import React, { useContext, useEffect, useState } from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";
import { maintainListContext, userInfoContext } from "../common/context";
import { defSlotTpGameType, defTpGameType } from "../../datas/productList";
import { api_game_GetSlotGamePage } from "../../service/api/game";
import { langAndCurrMapping } from "../common/common";
import { defMenuLinks } from "../layout/header.menu.def";
import SwipperBanner from "../common/swipperBanner";
import { defBannerType } from "../../service/api/site";

const CasinoLobby = () => {
	const { t } = useTranslation();
	const [providerList, setProviderList] = useState([]);
	const { allMaintainList } = useContext(maintainListContext);
	const { userInfo } = useContext(userInfoContext);

	const getSlotData = async () => {
		const {
			data: { data: categoryObj }
		} = await api_game_GetSlotGamePage({
			currencyId: langAndCurrMapping[userInfo.langId]
		});
		setProviderList(categoryObj.providerList);
	};

	useEffect(() => {
		getSlotData();
	}, []);

	const getIsInMaintain = g =>
		allMaintainList?.some(
			item =>
				item.tpId === g.tpId &&
				(item.tpGameType ===
					Object.values(defSlotTpGameType).find(
						obj => obj.tpId === g.tpId
					).tpGameType ||
					item.tpGameType === defTpGameType.All)
		);

	const slotsTags = defMenuLinks.casino.subMenu.map(
		({ eventIcons, tpId }) => {
			let _iconClassName = "";
			if (eventIcons) {
				let iconStrings = "";
				for (let i = 0; i < eventIcons.length; i++) {
					if (eventIcons[i] !== "") {
						iconStrings += `${eventIcons[i]}`;
					}
				}
				_iconClassName = `${iconStrings}`;
			}

			let showIcon = null;
			if (_iconClassName.length > 0) {
				if (_iconClassName === "tag-new") {
					showIcon = "tag-new-pop";
				} else {
					showIcon = _iconClassName;
				}
			}
			return { showIcon, tpId };
		}
	);

	return (
		<>
			<div className="lobby-banner">
				<SwipperBanner
					ImgFolder={[defBannerType.Slots]}
					openInBlank={true}
				/>
			</div>
			<div className="wrapper mt-5">
				<div className="col-12">
					<div className="lobby-products">
						{providerList?.map(item => {
							const isMaintenance = getIsInMaintain(item);

							const target = slotsTags.find(
								({ tpId }) => item.tpId === tpId
							);

							return (
								<Link
									className={`lobby-products-items ${
										isMaintenance ? "maintain" : ""
									}`}
									to={
										item?.openPath
											? `/${userInfo.langId}/${item?.openPath}`
											: `/${userInfo.langId}/casino?tpId=${item.tpId}`
									}>
									{target?.showIcon && (
										<div className={target.showIcon} />
									)}

									<img
										src={`${bannerImgUrl}/desktop/img/4.0/lobby/slots/${
											item?.tpName?.toLowerCase() || ""
										}.png`}
										alt=""
									/>
									<div className="name" />
									{isMaintenance && (
										<div className="tag-maintain">
											{t("lbl_underMaintenance")}
										</div>
									)}
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default CasinoLobby;
