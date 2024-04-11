import React, { useContext } from "react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";
import paths from "../../router";
import { popBoxContext, userInfoContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";

const TicketOverview = ({ tickets, onOpen }) => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { t } = useTranslation();
	return (
		<div className="ticket-content">
			<img
				className="ticket-img"
				src={`${bannerImgUrl}/desktop/img/event/eurocup/ticket.png`}
				alt="ticket"
			/>
			<div className="ticket-number">
				<div>
					<span>{t("lbl_CupEvent_TicketTotal")}</span>
					<span>{tickets.availableTickets ?? 0}</span>
				</div>
				<div>
					<span>{t("lbl_CupEvent_Used")}</span>
					<span>{tickets.usedTickets ?? 0}</span>
				</div>
				<div>
					<span>{t("lbl_CupEvent_Unused ")}</span>
					<span>{tickets.unUsedTickets ?? 0}</span>
				</div>
			</div>
			<div className="ticket-btn">
				<button onClick={onOpen}>
					{t("lbl_CupEvent_DepositList")}
				</button>
				<a
					onClick={() => {
						userInfo.isLogin
							? navigate(
									`/${userInfo.langId}/${paths.deposit.root}`
							  )
							: setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.Login
							  });
					}}>
					{t("lbl_DepositNow")}
				</a>
			</div>
		</div>
	);
};

TicketOverview.propTypes = {
	tickets: PropTypes.objectOf(PropTypes.any).isRequired,
	onOpen: PropTypes.func.isRequired
};

export default TicketOverview;
