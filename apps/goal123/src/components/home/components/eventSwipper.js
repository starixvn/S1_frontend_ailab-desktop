import React, { memo } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import CustomSwipper, {
	useGetBanner,
	SetPathParameter
} from "../../common/customSwipper";
import { defBannerType } from "../../../service/api/site";
import path from "../../../router";

import olympicsLogo from "../../../styles/img/oly_logo.png";

const LEAGUESID_LIST = {
	Olympic: 8
};

const EventSwipper = memo(({ langId }) => {
	const { banner } = useGetBanner({
		langId,
		ImgFolder: [defBannerType.HotEvent]
	});

	const OnClickEvent = ({ tpId, gameId, matchId }) => {
		const parameters = SetPathParameter({
			urlRouter: path.sports.root,
			tpId,
			gameId,
			matchId
		});

		navigate(`/${langId}/${path.sports.root}${parameters}`);
	};

	const rows = banner?.map((b, bIdx) => {
		const {
			sportBattleDateTime,
			sportTeamsHomePic,
			sportTeamsAwayPic,
			sportLeaguesId,
			sportTeamsHome,
			sportTeamsAway,
			homeOdds,
			awayOdds,
			handicap,
			leaguesId
		} = b;

		return (
			<HotEventContent
				// eslint-disable-next-line react/no-array-index-key
				key={`HotEvent-${b.sportLeaguesId}-${bIdx}`}
				sportBattleDateTime={sportBattleDateTime}
				sportTeamsHomePic={sportTeamsHomePic}
				sportTeamsAwayPic={sportTeamsAwayPic}
				sportLeaguesId={sportLeaguesId}
				sportTeamsHome={sportTeamsHome}
				sportTeamsAway={sportTeamsAway}
				homeOdds={homeOdds}
				awayOdds={awayOdds}
				handicap={handicap}
				leaguesId={leaguesId}
				OnClickEvent={OnClickEvent.bind(this, { ...b })}
			/>
		);
	});

	return (
		<div className="offers oddsHotEvent">
			<CustomSwipper
				withBtn={true}
				withPagination={false}
				config={{
					autoplay: false
				}}>
				{rows}
			</CustomSwipper>
		</div>
	);
});

EventSwipper.propTypes = {
	langId: PropTypes.string.isRequired
};

const HotEventContent = ({
	sportBattleDateTime,
	sportTeamsHomePic,
	sportTeamsAwayPic,
	sportLeaguesId,
	sportTeamsHome,
	sportTeamsAway,
	homeOdds,
	awayOdds,
	handicap,
	leaguesId,
	OnClickEvent
}) => {
	const { t } = useTranslation();
	const date = moment(sportBattleDateTime).format("DD/MM");
	const time = moment(sportBattleDateTime).format("HH:mm");

	const formatHdp = hdp => {
		if (hdp === 0) return hdp;

		return `${hdp > 0 ? "+" : ""}${hdp}`;
	};

	const homeTeamHandicap = formatHdp(handicap);
	const awayTeamHandicap = formatHdp(handicap * -1);

	return (
		<div className="swiper-slide">
			<div className="gameName" onClick={OnClickEvent}>
				{sportLeaguesId}
			</div>

			<div className="team" onClick={OnClickEvent}>
				<div className="teamL">
					<p>{sportTeamsHome}</p>
					<img src={sportTeamsHomePic} alt={sportTeamsHome} />
				</div>
				<div className="schedule">
					{`${date} `}
					<span>{time}</span>
				</div>

				{/* {leaguesId === LEAGUESID_LIST.Olympic && (
					<img
						className="olympic"
						src={olympicsLogo}
						alt="olympicsLogo"
					/>
				)} */}

				<div className="teamR">
					<p>{sportTeamsAway}</p>
					<img src={sportTeamsAwayPic} alt={sportTeamsAway} />
				</div>
			</div>
			<div className="odds">
				<div className="oddL">
					<span>{homeTeamHandicap}</span>
					<span>{homeOdds}</span>
				</div>
				<div className="oddR">
					<span>{awayTeamHandicap}</span>
					<span>{awayOdds}</span>
				</div>
			</div>
			<div className="btn">
				<button onClick={OnClickEvent}>{t("lbl_BetNow")}</button>
			</div>
		</div>
	);
};

HotEventContent.propTypes = {
	sportBattleDateTime: PropTypes.string.isRequired,
	sportTeamsHomePic: PropTypes.string.isRequired,
	sportTeamsAwayPic: PropTypes.string.isRequired,
	sportLeaguesId: PropTypes.string.isRequired,
	sportTeamsHome: PropTypes.string.isRequired,
	sportTeamsAway: PropTypes.string.isRequired,
	homeOdds: PropTypes.number.isRequired,
	awayOdds: PropTypes.number.isRequired,
	handicap: PropTypes.number.isRequired,
	leaguesId: PropTypes.number.isRequired,
	OnClickEvent: PropTypes.func.isRequired
};

export default EventSwipper;
