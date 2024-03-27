import React, { useContext } from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";
import paths from "../../router";
import { userInfoContext } from "../common/context";

const TicketOverview = ({ tickets, onOpen }) => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();
	return (
		<div className="ticket-content">
			<img
				className="ticket-img"
				src={`${bannerImgUrl}/desktop/img/event/eurocup/ticket.png`}
				alt=""
			/>
			<div className="ticket-number">
				<div>
					<span>{t("lbl_CupEvent_TicketTotal")}</span>
					<span>{tickets.availableTickets}</span>
				</div>
				<div>
					<span>{t("lbl_CupEvent_Used")}</span>
					<span>{tickets.usedTickets}</span>
				</div>
				<div>
					<span>{t("lbl_CupEvent_Unused ")}</span>
					<span>{tickets.unUsedTickets}</span>
				</div>
			</div>
			<div className="ticket-btn">
				<button onClick={onOpen}>
					{t("lbl_CupEvent_DepositList")}
				</button>
				<Link to={`/${userInfo.langId}/${paths.deposit.root}`}>
					{t("lbl_DepositNow")}
				</Link>
			</div>
		</div>
	);
};

TicketOverview.propTypes = {
	tickets: PropTypes.objectOf(PropTypes.any).isRequired,
	onOpen: PropTypes.func.isRequired
};

export default TicketOverview;
