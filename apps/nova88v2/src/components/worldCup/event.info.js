import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";
import { GetCurrencyName, number_format } from "../common/common";

const Info = ({
	depositAmount,
	availableTickets,
	usedTickets,
	ticketLimit,
	userName,
	currencyId,
	langId
}) => {
	const { t } = useTranslation();

	const limitArr = ticketLimit?.map(el => {
		const active = depositAmount >= el;
		return (
			<div
				className={`progressItem${active ? " active" : ""}`}
				key={`amount-${el}`}
			>
				<div className="value">{number_format(el, false, 0)}</div>
			</div>
		);
	});

	const percentage = (depositAmount / ticketLimit?.[2]) * 100;

	return (
		<div className="event-content">
			<div className="title">{t("worldCup.info")}</div>
			<div className="info">
				<div className="userInfo">
					<img
						src={`${bannerImgUrl}/img/worldcup/user.svg`}
						alt="user name"
					/>
					{userName}
				</div>
				<div className="ticketInfo">
					<div className="progressBar">
						<div
							className="progressValue"
							style={{
								width: `${percentage > 100 ? 100 : percentage}%`
							}}
						/>
						{limitArr}
					</div>
					<div className="status">
						<div>
							<div>{t("lbl_DepositAmount")}</div>
							<div>
								<span>
									{GetCurrencyName({ langId, currencyId, t })}{" "}
									{number_format(depositAmount, false, 0)}
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
		</div>
	);
};

Info.defaultProps = {
	depositAmount: 0,
	availableTickets: 0,
	usedTickets: 0,
	ticketLimit: null,
	userName: null,
	currencyId: null,
	langId: null
};

Info.propTypes = {
	depositAmount: PropTypes.number,
	availableTickets: PropTypes.number,
	usedTickets: PropTypes.number,
	ticketLimit: PropTypes.arrayOf(PropTypes.number),
	userName: PropTypes.string,
	currencyId: PropTypes.number,
	langId: PropTypes.string
};

export default Info;
