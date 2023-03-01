import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";
import { number_format } from "../common/common";

const Info = ({
	depositAmount,
	availableTickets,
	usedTickets,
	ticketLimit,
	userName
}) => {
	const { t } = useTranslation();

	const limitArr = ticketLimit?.map(el => {
		const active = depositAmount >= el;
		return (
			<div
				className={`progress-bar__item${active ? " active" : ""}`}
				key={`amount-${el}`}>
				<div className="progress-bar__number">
					{number_format({
						number: el,
						digits: 0,
						formatRequired: true
					})}
				</div>
			</div>
		);
	});

	const percentage = (depositAmount / ticketLimit?.[2]) * 100;

	return (
		<div className="ticket__container">
			<div className="title">{t("worldCup.info")}</div>
			<div className="ticket__info">
				<div className="ticket__user">
					<img
						src={`${bannerImgUrl}/desktop/img/event/worldcup/user.svg`}
						alt="user name"
					/>
					{userName}
				</div>
				<div className="progress-bar">
					<div
						className="progress-bar__value"
						style={{ width: `${percentage}%` }}
					/>
					{limitArr}
				</div>
				<div className="status">
					<div>
						<div>{t("lbl_DepositAmount")}</div>
						<div>
							<span>
								VND{" "}
								{number_format({
									number: depositAmount,
									digits: 0,
									formatRequired: true
								})}
							</span>
						</div>
					</div>
					<div>
						<div>{t("worldCup.ticketsAvailable")}</div>
						<div>{availableTickets} / 3</div>
					</div>
					<div>
						<div>{t("worldCup.ticketsUsed")}</div>
						<div>
							{usedTickets} / {availableTickets}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

Info.defaultProps = {
	depositAmount: 0,
	availableTickets: 0,
	usedTickets: 0,
	ticketLimit: null,
	userName: null
};

Info.propTypes = {
	depositAmount: PropTypes.number,
	availableTickets: PropTypes.number,
	usedTickets: PropTypes.number,
	ticketLimit: PropTypes.arrayOf(PropTypes.number),
	userName: PropTypes.string
};

export default Info;
