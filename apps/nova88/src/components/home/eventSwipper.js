import React, { memo } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import {
	useGetBanner,
	Autoplay,
	SetPathParameter
} from "../common/swipperBanner";
import { defBannerType } from "../../service/api/site";
import path from "../../router";

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

	const rows = banner?.map(b => {
		const {
			sportBattleDateTime,
			sportTeamsHomePic,
			sportTeamsAwayPic,
			sportLeaguesId,
			sportTeamsHome,
			sportTeamsAway
		} = b;
		return (
			<HotEventContent
				key={b.sportLeaguesId}
				sportBattleDateTime={sportBattleDateTime}
				sportTeamsHomePic={sportTeamsHomePic}
				sportTeamsAwayPic={sportTeamsAwayPic}
				sportLeaguesId={sportLeaguesId}
				sportTeamsHome={sportTeamsHome}
				sportTeamsAway={sportTeamsAway}
				OnClickEvent={OnClickEvent.bind(this, { ...b })}
			/>
		);
	});

	return (
		<div className="offers">
			{" "}
			<Autoplay Rows={rows} />
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
	OnClickEvent
}) => {
	const date = moment(sportBattleDateTime).format("DD/MM/YYYY");
	const time = moment(sportBattleDateTime).format("HH:mm");
	return (
		<div className="swiper-slide">
			<div className="team" onClick={OnClickEvent}>
				<div className="gameName">
					<span>{sportLeaguesId}</span>
				</div>
				<div className="teamL">
					<img src={sportTeamsHomePic} alt={sportTeamsHome} />
					{sportTeamsHome}
				</div>
				<div className="schedule">
					{`${date} `}
					<span>{time}</span>
				</div>
				<div className="teamR">
					<img src={sportTeamsAwayPic} alt={sportTeamsAway} />
					{sportTeamsAway}
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
	OnClickEvent: PropTypes.func.isRequired
};

export default EventSwipper;
