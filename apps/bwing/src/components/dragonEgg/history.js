import moment from "moment";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useContext } from "react";
import { useGragonEgg } from "@ailab-desktop/hooks";
import { userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import eventId from "../../datas/eventId";

const History = () => {
	const { t } = useTranslation();

	const {
		userInfo: { isLogin }
	} = useContext(userInfoContext);

	const [history, setHistory] = useState([]);

	const { eggTicket, getDrawPrizeList } = useGragonEgg();

	const getPrizeList = async () => {
		const { data } = await getDrawPrizeList({
			eventId: eventId.dragonEgg
		});

		setHistory(data);
	};

	useEffect(() => {
		getPrizeList();
	}, [eggTicket]);

	return (
		<div className="event-history-wrapper">
			{isLogin && history?.length > 0 && (
				<div className="event-history">
					<div className="event-history-title">
						{t("lbl_DragonEgg_RewardHistory")}
					</div>
					<div className="event-history-table">
						<div className="top-title">
							<div>{t("lbl_Date")}</div>
							<div>{t("lbl_DragonEgg_EventRewards")}</div>
						</div>
						<div className="content">
							{history?.map(({ drawTime, prizeName }, i) => (
								// eslint-disable-next-line react/no-array-index-key
								<div key={`${i}-${drawTime}-${prizeName}`}>
									<div>
										{moment(drawTime).format(
											"MM/DD HH:mm:ss"
										)}
									</div>
									<div>{prizeName}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
			<div className="event-info">
				<div className="title">
					{t("lbl_DragonEgg_Terms&Conditions")}
				</div>
				{Array.from({ length: 16 }, (_, i) => i + 1).map(i => (
					<div className="text">- {t(`lbl_DragonEgg_Terms${i}`)}</div>
				))}

				<div className="title">{t("lbl_DragonEgg_Sponsor")}</div>
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

export default History;
