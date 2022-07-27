import React, { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import Info from "./event.info";
import Pridictions from "./event.predictions";
import Terms from "./event.terms";
import { api_worldCupPrediction_GetMemberDepositTicketInfo } from "../../service/api/worldCupPrediction";
import usePopBox from "../hook/usePopBox";

const Event = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { errorPopBox } = usePopBox();
	const [info, setInfo] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			GetMemberDepositTicketInfo();
		}
	}, []);

	const GetMemberDepositTicketInfo = () => {
		api_worldCupPrediction_GetMemberDepositTicketInfo().then(
			res => {
				if (isMountedRef.current) {
					const { data, errorCode, message } = res.data;
					if (errorCode === 0) {
						setInfo(data);
					} else {
						errorPopBox(message || "error", errorCode);
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	};

	return (
		<>
			{userInfo.isLogin && (
				<>
					<div className="title">{t("worldCup.prediction")}</div>
					<div className="predict">
						<Info
							depositAmount={info?.DepositAmount}
							availableTickets={info?.availableTickets}
							ticketLimit={info?.ticketLimit}
							userName={info?.userName}
						/>
						<Pridictions
							userTicketResult={info?.userTicketResult}
							ticketOptions={info?.selectOptions}
							GetTicketInfo={GetMemberDepositTicketInfo}
						/>
					</div>
				</>
			)}
			<Terms langId={userInfo.langId} />
		</>
	);
};

export default Event;
