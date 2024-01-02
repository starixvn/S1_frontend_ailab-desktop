import classNames from "classnames";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import { defCurrencyList, currencyIdToCurrency } from "../common/common";

export const prizeAmout = {
	[defCurrencyList.MYR]: {
		min: "18",
		max: "68",
		blessing: "888",
		APPrize: "28"
	},
	[defCurrencyList.THB]: {
		min: "130",
		max: "530",
		blessing: "5,888",
		APPrize: "200"
	},
	[defCurrencyList.IDR]: {
		min: "58K",
		max: "200K",
		blessing: "2,888,000",
		APPrize: "100K"
	},
	[defCurrencyList.VND]: {
		min: "88K",
		max: "338K",
		blessing: "4,588,000",
		APPrize: "150K"
	}
};

const Info = () => {
	const { t } = useTranslation();

	const {
		userInfo: { isLogin, currencyId }
	} = useContext(userInfoContext);

	if (!currencyId || !Object.keys(prizeAmout).includes(String(currencyId)))
		return null;

	return (
		<div className={classNames("event-info", { logbefore: !isLogin })}>
			<div className="event-info-tc">
				<div className="event-title">
					{t("lbl_DragonEgg_Terms&Conditions")}
				</div>
				<div className="text">- {t("lbl_DragonEgg_Terms1")}</div>
				<div className="text">- {t("lbl_DragonEgg_Terms2")}</div>
				<div className="text">- {t("lbl_DragonEgg_Terms3")}</div>
				<div className="text">- {t("lbl_DragonEgg_Terms4")}</div>
				<div className="text">- {t("lbl_DragonEgg_Terms5")}</div>
				<div className="text">
					-
					{t("lbl_DragonEgg_Terms6", {
						currencyName: currencyIdToCurrency[currencyId],
						min: prizeAmout[currencyId].min,
						max: prizeAmout[currencyId].max,
						APPrize: prizeAmout[currencyId].APPrize
					})}
				</div>
				<div className="text">
					-{" "}
					{t("lbl_DragonEgg_Terms7", {
						currencyName: currencyIdToCurrency[currencyId],
						amount: prizeAmout[currencyId].blessing
					})}
				</div>
				<div className="text">- {t("lbl_DragonEgg_Terms8")}</div>
				<div className="text">- {t("lbl_DragonEgg_Terms9")}</div>
				<div className="text">- {t("lbl_DragonEgg_Terms10")}</div>
				<div className="text">- {t("lbl_DragonEgg_Terms11")}</div>
				<div className="text">- {t("lbl_DragonEgg_Terms12")}</div>
				<div className="text">- {t("lbl_DragonEgg_Terms13")}</div>
				<div className="text">- {t("lbl_DragonEgg_Terms14")}</div>
				<div className="text">- {t("lbl_DragonEgg_Terms15")}</div>
				<div className="text">- {t("lbl_DragonEgg_Terms16")}</div>
			</div>

			<div className="event-info-sponsor">
				<div className="event-title">{t("lbl_DragonEgg_Sponsor")}</div>
				<div className="sponsor">
					<div>
						<img
							src={`${bannerImgUrl}/desktop/img/event/dragonegg/sponsors_ap_logo.png`}
							alt="sponsors_ap_logo"
						/>
					</div>
					<div>
						<img
							src={`${bannerImgUrl}/desktop/img/event/dragonegg/sponsors_pp_logo.png`}
							alt="sponsors_pp_logo"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Info;
