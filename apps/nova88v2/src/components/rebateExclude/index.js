import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { api_promotion_GetRebateExcludeGameList } from "../../service/api/promotion";

const RebateExclude = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [rebateExcludeList, setRebateExcludeList] = useState([]);

	useEffect(() => {
		const getExcludeList = async () => {
			const res = await api_promotion_GetRebateExcludeGameList({
				langId: userInfo.langId,
				currencyId: userInfo.currencyId
			});
			const originRebateExcludeList = res.data.data;

			const formatRebateExcludeList = originRebateExcludeList.reduce(
				(acc, cur) => {
					const {
						tpGameType,
						tpGameTypeName,
						gameName,
						tpCategoryName
					} = cur;
					const targetObj = acc.find(
						({ tpGameType: accTpGameType }) =>
							accTpGameType === cur.tpGameType
					);
					const getNewGameName = () => {
						if (gameName === null) {
							return "All Game";
						}
						if (tpCategoryName === "Live Casino") {
							return "All Blackjack";
						}
						return gameName;
					};
					const newGameName = getNewGameName();

					if (targetObj !== undefined) {
						if (tpCategoryName === "Live Casino") {
							targetObj.gameName = ["All Blackjack"];
						} else {
							targetObj.gameName.push(newGameName);
						}
					} else {
						acc.push({
							tpGameType,
							tpGameTypeName,
							gameName: [newGameName]
						});
					}
					return acc;
				},
				[]
			);
			setRebateExcludeList(formatRebateExcludeList);
		};
		getExcludeList();
	}, []);
	return (
		<div className="exclude__container">
			<div className="exclude__title">{t("lbl_RebateExclude_title")}</div>
			<div className="exclude__table">
				<div className="exclude__table__item">
					<div>{t("lbl_RebateExclude_Product")}</div>
					<div>
						<span>{t("lbl_RebateExclude_GameName")}</span>
					</div>
				</div>
				{rebateExcludeList.map(({ tpGameTypeName, gameName }) => (
					<div className="exclude__table__item">
						<div>{tpGameTypeName}</div>
						<div>
							{gameName.map(value => (
								<span>{value}</span>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RebateExclude;
