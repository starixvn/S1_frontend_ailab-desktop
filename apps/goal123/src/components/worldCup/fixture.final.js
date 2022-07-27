import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

const Final = ({ final, thirdPlace }) => {
	const { t } = useTranslation();

	const getTeamList = ({ event }) => {
		const data = event === "final" ? final : thirdPlace;
		let sortedTeams = data?.sort((a, b) => a.sort - b.sort);

		let teams = [];
		const arrLength = 2;

		if (sortedTeams?.length >= arrLength) {
			if (sortedTeams?.length > arrLength) {
				sortedTeams = [sortedTeams[0], sortedTeams[1]];
			}
			teams = sortedTeams?.map(team => (
				<div className="item" key={`${event}-${team.countryName}`}>
					<img
						src={`${bannerImgUrl}/img/flag/${team.imageName}`}
						alt={`${event}-${team.countryName}`}
					/>
					{team.countryName}
				</div>
			));
		} else {
			for (let i = 0; i < arrLength; i++) {
				teams.push(
					<div className="item" key={`${event}-${i}`}>
						<img
							src={`${bannerImgUrl}/img/flag/na.jpg`}
							alt={`${event}-${i}`}
						/>
					</div>
				);
			}
		}

		return <div className="group-final">{teams}</div>;
	};

	return (
		<div className="group-middle">
			<div className="prize">
				<img
					src={`${bannerImgUrl}/desktop/img/event/worldcup/trophy.png`}
					alt="trophy"
				/>
				<div>VND 2,888,000,000</div>
				<div className="subtitle">{t("worldCup.final")}</div>
			</div>
			{getTeamList({ event: "final" })}
			{getTeamList({ event: "thirdPlace" })}
			<div className="prize">
				<div className="subtitle">{t("worldCup.3rdPlace")}</div>
				<div>VND 1,368,000,000</div>
				<img
					src={`${bannerImgUrl}/desktop/img/event/worldcup/fixture-logo.png`}
					alt="fixture-logo"
				/>
			</div>
		</div>
	);
};

Final.defaultProps = {
	final: null,
	thirdPlace: null
};

Final.propTypes = {
	final: PropTypes.arrayOf(PropTypes.object),
	thirdPlace: PropTypes.arrayOf(PropTypes.object)
};

export default Final;
