import React from "react";
import { defTabId, defDayOptions, defGameTypeOptions } from "./leaderBoard.def";
import Dropdown from "../common/dropdown";

const ContentTopNav = ({
	t,
	tab,
	onChangeDays,
	beforeDays,
	onChangePeriod,
	periodId,
	onChangeGameType,
	gameType,
	periodList
}) => {
	const onSelectItem = i => {
		onChangePeriod(periodList[i]);
	};

	const _selectedIdx = periodList.findIndex(_pd => _pd.id === periodId);

	let layout;
	if (tab === defTabId.second)
		layout = (
			<div className="rankTag">
				<div>{t("lbl_Tournament")}</div>
				<div className="btnGroup">
					{defDayOptions.map(item => {
						return (
							<button
								key={`ranking-nav-${item.id}`}
								className={`${
									beforeDays === item.id ? " active" : ""
								}`}
								onClick={onChangeDays.bind(this, item.id, tab)}>
								{t(item.displayKey)}
							</button>
						);
					})}
				</div>
			</div>
		);

	if (tab === defTabId.third) {
		layout = (
			<div className="rankTag">
				<div className="btnGroup">
					{defGameTypeOptions.map(item => {
						return (
							<button
								key={`ranking-nav-${item.id}`}
								className={`${
									gameType === item.id ? " active" : ""
								}`}
								onClick={onChangeGameType.bind(
									this,
									item.id,
									tab
								)}>
								{t(item.displayKey)}
							</button>
						);
					})}
				</div>
			</div>
		);
	}

	if (tab === defTabId.fourth) {
		layout =
			periodList && periodList.length > 0 ? (
				<div className="rankTag">
					<div>{t("lbl_Month")}</div>
					<div className="inputBox-blue">
						<Dropdown
							mainkey="leaderboard-result"
							options={periodList}
							onSelectItem={onSelectItem}
							selectedIdx={_selectedIdx}
							i18n={t}
						/>
					</div>
				</div>
			) : null;
	}
	return layout;
};

export default ContentTopNav;
