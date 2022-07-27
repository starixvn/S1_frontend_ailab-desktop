import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";
import { api_worldCupPrediction_UserPollTickets } from "../../service/api/worldCupPrediction";

const ticketStatus = {
	active: 1,
	finished: 2,
	unstarted: 3
};

const Pridictions = ({ userTicketResult, ticketOptions, GetTicketInfo }) => {
	const { t } = useTranslation();
	let tickets = [];

	if (userTicketResult) {
		tickets = Object.values(userTicketResult)?.map((el, i) => {
			const serial = Object.keys(userTicketResult)[i].replace(
				"ticket",
				""
			);
			return el ? (
				<Ticket
					key={`ticket-${serial}`}
					status={el.ticketStatus}
					options={ticketOptions}
					serial={serial}
					countryId={el?.countryId}
					GetTicketInfo={GetTicketInfo}
					t={t}
				/>
			) : (
				<Ticket
					key={`ticket-${serial}`}
					status={ticketStatus.unstarted}
					options={ticketOptions}
					serial={serial}
					t={t}
				/>
			);
		});
	}

	return (
		<div className="event-content">
			<div className="title">{t("worldCup.yourPredictions")}</div>
			<div className="ticket-wrapper">{tickets}</div>
		</div>
	);
};

Pridictions.defaultProps = {
	userTicketResult: null,
	ticketOptions: null,
	GetTicketInfo: () => null
};

Pridictions.propTypes = {
	userTicketResult: PropTypes.objectOf(PropTypes.object),
	ticketOptions: PropTypes.objectOf(PropTypes.array),
	GetTicketInfo: PropTypes.func
};

const Ticket = ({ status, options, serial, countryId, GetTicketInfo, t }) => {
	const [selectedIdx, setSelectedIdx] = useState({ groupIdx: 0, teamIdx: 0 });

	let className = "";
	if (status === ticketStatus.finished) {
		className = " finished";
	} else if (status === ticketStatus.unstarted) {
		className = " disabled";
	}

	const groupOptions = Object.keys(options).map((el, i) => ({
		id: i,
		displayText: `${t("worldCup.group")} ${el.replace("group", "")}`,
		value: el
	}));

	const groupKey = groupOptions[selectedIdx.groupIdx]?.value;
	const teamOptions = options[groupKey]?.map((el, i) => ({
		id: i,
		displayText: el.countryName,
		value: el.countryId
	}));

	useEffect(() => {
		if (countryId) {
			const groupIdx = Object.values(options).findIndex(el =>
				el.find(obj => obj.countryId === countryId)
			);
			const teamIdx = Object.values(options)[groupIdx].findIndex(
				el => el.countryId === countryId
			);
			setSelectedIdx({ groupIdx, teamIdx });
		}
	}, []);

	const onSelectItem = ({ idx, col }) => {
		if (col === "groupIdx") {
			setSelectedIdx({ groupIdx: idx, teamIdx: 0 });
		} else {
			setSelectedIdx(prev => ({ ...prev, [col]: idx }));
		}
	};

	const submitTicket = () => {
		const selCountryId = teamOptions[selectedIdx.teamIdx].value;
		api_worldCupPrediction_UserPollTickets({
			ticketType: serial,
			countryId: selCountryId
		}).then(res => {
			const { errorCode, message } = res.data;
			if (errorCode === 0) {
				GetTicketInfo();
			} else {
				errorPopBox(message || "error", errorCode);
			}
		});
	};

	return (
		<div className={`ticket-item${className}`}>
			<div className="ticket-title">
				{t("worldCup.ticket")} {serial}
				<img src={`${bannerImgUrl}/img/worldcup/ticket.png`} alt="" />
			</div>
			<Dropdown
				options={groupOptions}
				selectedIdx={selectedIdx.groupIdx}
				onSelectItem={i =>
					onSelectItem({
						idx: i,
						col: "groupIdx"
					})
				}
			/>
			<Dropdown
				options={teamOptions}
				selectedIdx={selectedIdx.teamIdx}
				onSelectItem={i =>
					onSelectItem({
						idx: i,
						col: "teamIdx"
					})
				}
			/>
			{status === ticketStatus.active && (
				<div className="btnGroup">
					<button className="btn-green" onClick={submitTicket}>
						{t("lbl_Submit")}
					</button>
				</div>
			)}
			{status === ticketStatus.finished && (
				<div className="message">
					<i className="icon icon-icon32px_check" />
					{t("worldCup.ticketBeenUsed")}
				</div>
			)}
			{status === ticketStatus.unstarted && (
				<div className="message">
					<i className="icon icon-error" />
					{t("worldCup.ticketNotBeenActivated")}
				</div>
			)}
		</div>
	);
};

Ticket.defaultProps = {
	options: null,
	serial: null,
	countryId: null,
	GetTicketInfo: () => null
};

Ticket.propTypes = {
	status: PropTypes.number.isRequired,
	options: PropTypes.objectOf(PropTypes.array),
	serial: PropTypes.string,
	countryId: PropTypes.number,
	GetTicketInfo: PropTypes.func,
	t: PropTypes.func.isRequired
};

const Dropdown = ({ options, selectedIdx, onSelectItem }) => {
	const [isOpen, setOpen] = useState(false);
	const wrapper = useRef(null);

	const useClickOutside = ref => {
		useEffect(() => {
			const handleClickOutside = e => {
				if (ref.current && !ref.current.contains(e.target)) {
					setOpen(false);
				}
			};
			document.addEventListener("mousedown", handleClickOutside);

			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	};

	const clickDropdown = e => {
		e.preventDefault();
		setOpen(prev => !prev);
	};

	useClickOutside(wrapper);

	const selectItem = (e, { idx, item }) => {
		e.stopPropagation();
		setOpen(false);
		onSelectItem(idx, item);
	};

	const arr = options?.map((item, i) => (
		<div
			key={`item-${item.displayText}`}
			className="dropdown-item"
			onClick={e => selectItem(e, { idx: i })}
		>
			{item.displayText}
		</div>
	));

	const selected = options?.[selectedIdx]?.displayText;

	return (
		<div className="inputBox-event" ref={wrapper} onClick={clickDropdown}>
			<div className="dropdown">
				<button className="btn">{selected}</button>
				<div className={`dropdown-container${isOpen ? " active" : ""}`}>
					{arr}
				</div>
			</div>
		</div>
	);
};

Dropdown.defaultProps = {
	options: null,
	selectedIdx: null,
	onSelectItem: () => null
};

Dropdown.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object),
	selectedIdx: PropTypes.number,
	onSelectItem: PropTypes.func
};

export default Pridictions;
