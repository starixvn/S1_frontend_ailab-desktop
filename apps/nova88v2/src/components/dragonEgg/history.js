import moment from "moment";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useGragonEgg } from "@ailab-desktop/hooks";
import eventId from "../../datas/eventId";

const History = () => {
	const { t } = useTranslation();

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
		history?.length > 0 && (
			<div className="event-history">
				<div className="event-title">
					{t("lbl_DragonEgg_RewardHistory")}
				</div>
				<div className="event-history-table">
					<div className="top-title">
						<div>{t("lbl_Date")}</div>
						<div>
							{t("lbl_DragonEgg_EventRewards").toUpperCase()}
						</div>
					</div>
					<div className="content">
						{history?.map(({ drawTime, prizeName }, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<div key={`${i}-${drawTime}-${prizeName}`}>
								<div>
									{moment(drawTime).format("MM/DD HH:mm:ss")}
								</div>
								<div>{prizeName}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	);
};

export default History;
