import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { number_format } from "../common/common";

const Info = ({ depositAmount, availableTickets, ticketLimit, userName }) => {
	const { t } = useTranslation();

	const limitArr = ticketLimit?.map((el, i) => {
		const active = depositAmount >= el;
		return (
			<div className={`${active ? " active" : ""}`} key={`amount-${el}`}>
				<span>
					{number_format({
						number: el,
						digits: 0,
						formatRequired: true
					})}
				</span>
				<div className="phase">
					{t("worldCup.ticket")} {i + 1}
				</div>
			</div>
		);
	});

	const percentage = (depositAmount / ticketLimit?.[2]) * 100;

	return (
		<div className="ticketModule">
			<div className="titleBox">
				<div>{userName}</div>
			</div>
			<div className="ticketBar">
				<div className="bar">
					<div
						className="value"
						style={{ width: `${percentage}%` }}
					/>
					{limitArr}
				</div>
				<div className="amountBox">
					<div className="deposit">
						{t("lbl_DepositAmount")}
						<div className="amount">
							{`VND ${number_format({
								number: depositAmount,
								digits: 0,
								formatRequired: true
							})} x ${availableTickets}`}
							<span>{t("worldCup.ticket")}</span>
						</div>
					</div>
					<div className="deposit">
						{t("worldCup.ticketsAvailable")}
						<div className="amount">{availableTickets}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Info.defaultProps = {
	depositAmount: 0,
	availableTickets: 0,
	ticketLimit: null,
	userName: null
};

Info.propTypes = {
	depositAmount: PropTypes.number,
	availableTickets: PropTypes.number,
	ticketLimit: PropTypes.arrayOf(PropTypes.number),
	userName: PropTypes.string
};

export default Info;
