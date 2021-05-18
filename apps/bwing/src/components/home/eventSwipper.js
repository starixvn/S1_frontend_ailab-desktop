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
			sportTeamsAway
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
				OnClickEvent={OnClickEvent.bind(this, { ...b })}
			/>
		);
	});

	return (
		<div>
			<AutoPlayWithBtn Rows={rows} />
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
	const datetime = moment(sportBattleDateTime).format("DD/MM HH:mm:ss");
	return (
		<div className="swiper-slide eventImg">
			<div className="team" onClick={OnClickEvent}>
				<img
					className="teamL"
					src={sportTeamsHomePic}
					alt={sportTeamsHome}
				/>
				<p className="gameName">{sportLeaguesId}</p>
				<img
					className="teamL teamR"
					src={sportTeamsAwayPic}
					alt={sportTeamsAway}
				/>
			</div>
			<div className="teamName" onClick={OnClickEvent}>
				<p>{sportTeamsHome}</p>
				<p>{sportTeamsAway}</p>
			</div>
			<div className="time">{datetime}</div>
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
