import React, { useMemo } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl, sportsImgUrl } from "../../../config";
import {
	defFinal,
	defQuarterFinals,
	defRoundOf16,
	defSemiFinals,
	groupTeamName,
	predictTabs
} from "../def";
import GroupRow from "./groupRow";

const mergeTeamsWithDefaults = (customTeams, defaultTeams) => {
	const teamMap = new Map(defaultTeams.map(team => [team.sort, team]));
	customTeams.forEach(team => teamMap.set(team.sort, team));
	return Array.from(teamMap.values());
};

const groupItems = (items, itemsPerGroup) => {
	const group = [];
	for (let i = 0; i < items.length; i += itemsPerGroup) {
		group.push(items.slice(i, i + itemsPerGroup));
	}
	return group;
};

const renderGroups = (groups, side) => {
	return groups.map((group, index) => {
		return (
			<div className="group-match" key={index}>
				<div className="title">
					{`Group ${
						groupTeamName[index + (side === "right" ? 4 : 1)]
					}`}
				</div>
				{group.map(({ countryName, imageName, sort }) => (
					<div className="group-item" key={sort}>
						<img
							src={
								imageName
									? `${sportsImgUrl}/Country%20Team/${imageName}`
									: `${bannerImgUrl}/desktop/img/event/eurocup/empty.svg`
							}
							alt={imageName || "empty"}
						/>
						<div>{countryName}</div>
					</div>
				))}
			</div>
		);
	});
};

const Schedule = ({
	activeTab,
	top24Team,
	roundOf16,
	quarterFinals,
	semiFinals,
	final
}) => {
	const { t } = useTranslation();

	const {
		mergedRoundOf16,
		mergedQuarterFinals,
		mergedSemiFinals,
		mergedFinals
	} = useMemo(
		() => ({
			mergedRoundOf16: mergeTeamsWithDefaults(roundOf16, defRoundOf16),
			mergedQuarterFinals: mergeTeamsWithDefaults(
				quarterFinals,
				defQuarterFinals
			),
			mergedSemiFinals: mergeTeamsWithDefaults(semiFinals, defSemiFinals),
			mergedFinals: mergeTeamsWithDefaults(final, defFinal)
		}),
		[roundOf16, quarterFinals, semiFinals, final]
	);

	const {
		top24GroupItems,
		roundOf16GroupItems,
		quarterFinalsGroupItems,
		semiFinalsGroupItems
	} = useMemo(
		() => ({
			top24GroupItems: groupItems(top24Team, 4),
			roundOf16GroupItems: groupItems(mergedRoundOf16, 2),
			quarterFinalsGroupItems: groupItems(mergedQuarterFinals, 2),
			semiFinalsGroupItems: groupItems(mergedSemiFinals, 1)
		}),
		[top24Team, mergedRoundOf16, mergedQuarterFinals, mergedSemiFinals]
	);

	return (
		<div
			className={classNames("euro-fixture", {
				active: activeTab === predictTabs.schedule
			})}>
			<div className="group-left">
				<div className="group-col">
					{renderGroups(
						top24GroupItems.slice(0, top24GroupItems.length / 2),
						"left"
					)}
				</div>

				<div className="group-col-match">
					<GroupRow
						roundOf16Groups={roundOf16GroupItems.slice(0, 2)}
						quarterFinalsGroups={quarterFinalsGroupItems.slice(
							0,
							1
						)}
						semiFinalsGroups={semiFinalsGroupItems[0]}
					/>
					<GroupRow
						roundOf16Groups={roundOf16GroupItems.slice(2, 4)}
						quarterFinalsGroups={quarterFinalsGroupItems.slice(
							1,
							2
						)}
						semiFinalsGroups={semiFinalsGroupItems[1]}
					/>
				</div>
			</div>
			<div className="group-middle">
				<img
					className="logo"
					src={`${bannerImgUrl}/desktop/img/event/eurocup/fixture-logo.png`}
					alt="fixture-logo"
				/>
				<div className="group-final">
					<div className="title">{t("lbl_final")}</div>
					<div className="group-item">
						<div className="group-item-left">
							<img
								src={
									mergedFinals[0]?.imageName
										? `${sportsImgUrl}/Country%20Team/${mergedFinals[0]?.imageName}`
										: `${bannerImgUrl}/desktop/img/event/eurocup/empty.svg`
								}
								alt={mergedFinals[0]?.imageName || "empty"}
							/>
							<div>{mergedFinals[0]?.countryName}</div>
						</div>
						<div className="vs">VS</div>
						<div className="group-item-right">
							<img
								src={
									mergedFinals[1]?.imageName
										? `${sportsImgUrl}/Country%20Team/${mergedFinals[1]?.imageName}`
										: `${bannerImgUrl}/desktop/img/event/eurocup/empty.svg`
								}
								alt={mergedFinals[1]?.imageName || "empty"}
							/>
							<div>{mergedFinals[1]?.countryName}</div>
						</div>
					</div>
				</div>
			</div>
			<div className="group-right">
				<div className="group-col">
					{renderGroups(
						top24GroupItems.slice(top24GroupItems.length / 2),
						"right"
					)}
				</div>

				<div className="group-col-match">
					<GroupRow
						roundOf16Groups={roundOf16GroupItems.slice(4, 6)}
						quarterFinalsGroups={quarterFinalsGroupItems.slice(
							2,
							3
						)}
						semiFinalsGroups={semiFinalsGroupItems[3]}
					/>
					<GroupRow
						roundOf16Groups={roundOf16GroupItems.slice(6, 8)}
						quarterFinalsGroups={quarterFinalsGroupItems.slice(
							3,
							4
						)}
						semiFinalsGroups={semiFinalsGroupItems[2]}
					/>
				</div>
			</div>
		</div>
	);
};
Schedule.propTypes = {
	activeTab: PropTypes.number.isRequired,
	top24Team: PropTypes.arrayOf(PropTypes.any).isRequired,
	roundOf16: PropTypes.arrayOf(PropTypes.any).isRequired,
	quarterFinals: PropTypes.arrayOf(PropTypes.any).isRequired,
	semiFinals: PropTypes.arrayOf(PropTypes.any).isRequired,
	final: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Schedule;
