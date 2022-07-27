import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
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
		<div className="ticketModule">
			<div className="titleBox">
				<div>{t("worldCup.yourPredictions")}</div>
			</div>
			<div className="ticketBox">{tickets}</div>
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

	let className = " new";
	if (status === ticketStatus.finished) {
		className = " claimed";
	} else if (status === ticketStatus.unstarted) {
		className = " notActivated";
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
		let groupIdx = 0;
		let teamIdx = 0;

		if (countryId) {
			groupIdx = Object.values(options)?.findIndex(el =>
				el.find(obj => obj.countryId === countryId)
			);
			teamIdx = Object.values(options)[groupIdx]?.findIndex(
				el => el.countryId === countryId
			);
		}
		setSelectedIdx({ groupIdx, teamIdx });
	}, [countryId]);

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
		<div className={`ticket${className}`}>
			<div className="pic" />
			<div className="txt">
				{serial}
				<span>{t("worldCup.yourGroup/Team")}</span>
			</div>

			{status === ticketStatus.active && (
				<>
					<div className="subModule">
						<Dropdown
							options={groupOptions}
							selectedIdx={selectedIdx.groupIdx}
							onSelectItem={i =>
								onSelectItem({
									idx: i,
									col: "groupIdx"
								})
							}
							disabled={status !== ticketStatus.active}
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
							disabled={status !== ticketStatus.active}
						/>
					</div>
					<div className="btnGroup">
						<button onClick={submitTicket}>
							{t("lbl_Submit")}
						</button>
					</div>
				</>
			)}

			{status !== ticketStatus.active && (
				<div className="subModule">
					<div className="grop">
						{groupOptions?.[selectedIdx.groupIdx]?.displayText}
					</div>
					<div className="grop">
						{teamOptions?.[selectedIdx.teamIdx]?.displayText}
					</div>
				</div>
			)}

			{status === ticketStatus.unstarted && (
				<span>{t("worldCup.ticketNotBeenActivated")}</span>
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

const Dropdown = ({ options, selectedIdx, onSelectItem, disabled }) => {
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
		if (disabled) return;
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
			{item?.displayText}
		</div>
	));

	const selected = options?.[selectedIdx]?.displayText;

	return (
		<div className="inputBox" ref={wrapper} onClick={clickDropdown}>
			<div className="dropdown">
				<button className="btn">
					{selected}
					<i className="icon icon-arrow_drop_down" />
				</button>
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
	onSelectItem: () => null,
	disabled: null
};

Dropdown.propTypes = {
	options: PropTypes.arrayOf(PropTypes.object),
	selectedIdx: PropTypes.number,
	onSelectItem: PropTypes.func,
	disabled: PropTypes.bool
};

export default Pridictions;
