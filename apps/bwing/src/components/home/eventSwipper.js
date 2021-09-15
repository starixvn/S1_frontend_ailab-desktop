import React, { memo } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import {
	useGetBanner,
	AutoPlayWithBtn,
	SetPathParameter
} from "../common/swipperBanner";
import { defBannerType } from "../../service/api/site";
import path from "../../router";

import olympicsLogo from "../../styles/img/olympics/logo2.png";

const LEAGUESID_LIST = {
	Olympic: 8
};

const swiperConfig = {
	pagination: false
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
		<div>
			<AutoPlayWithBtn Rows={rows} config={swiperConfig} />
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
	const datetime = moment(sportBattleDateTime).format("DD/MM HH:mm");

	const formatHdp = hdp => {
		if (hdp === 0) return hdp;

		return ` ${hdp > 0 ? "+" : ""} ${hdp}`;
	};

	const homeTeamHandicap = formatHdp(handicap);
	const awayTeamHandicap = formatHdp(handicap * -1);

	return (
		<div className="swiper-slide eventImg" onClick={OnClickEvent}>
			<div className="team">
				<img
					className="teamL"
					src={sportTeamsHomePic}
					alt={sportTeamsHome}
				/>

				<img
					className="teamL teamR"
					src={sportTeamsAwayPic}
					alt={sportTeamsAway}
				/>
			</div>

			<p className="gameName">
				{leaguesId === LEAGUESID_LIST.Olympic && (
					<img
						className="olympicsLogo"
						src={olympicsLogo}
						alt="olympicsLogo"
					/>
				)}

				{sportLeaguesId}
			</p>

			<div className="teamName">
				<p>{sportTeamsHome}</p>
				<p>{sportTeamsAway}</p>
			</div>
			<div className="time">{datetime}</div>

			<div className="odds">
				<div>
					<p>{homeTeamHandicap}</p>
					<p>{homeOdds}</p>
				</div>
				<div>
					<p>{awayTeamHandicap}</p>
					<p>{awayOdds}</p>
				</div>
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
