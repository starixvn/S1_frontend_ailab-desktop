import React, { memo, useState, useEffect, useRef } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { AutoPlayWithBtn, SetPathParameter } from "../common/swipperBanner";
import path from "../../router";
import { api_hotEvent_GetDataList } from "../../service/api/hotEvent";

const swiperConfig = {
	pagination: false
};

const EventSwipper = memo(({ langId }) => {
	const [banner, setBanner] = useState([]);
	const timeRef = useRef(null);
	const getHotEventDataList = () => {
		api_hotEvent_GetDataList({ langId }).then(
			res => {
				const { errorCode, data } = res.data;
				if (errorCode === 0) {
					setBanner(data);
				}
			},
			() => {
				// errorPopBox();
			}
		);
	};

	useEffect(() => {
		getHotEventDataList();
		const interval = setInterval(() => {
			getHotEventDataList();
		}, 60000);
		timeRef.current = interval;

		return () => {
			clearInterval(timeRef.current);
		};
	}, []);

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
			battleTime,
			homeTeamPic,
			awayTeamPic,
			sportLeaguesTitle,
			homeTeamName,
			awayTeamName,
			homeOdds,
			awayOdds,
			handicap
		} = b;

		return (
			<HotEventContent
				// eslint-disable-next-line react/no-array-index-key
				key={`HotEvent-${b.sportLeaguesTitle}-${bIdx}`}
				battleTime={battleTime}
				homeTeamPic={homeTeamPic}
				awayTeamPic={awayTeamPic}
				sportLeaguesTitle={sportLeaguesTitle}
				homeTeamName={homeTeamName}
				awayTeamName={awayTeamName}
				homeOdds={homeOdds}
				awayOdds={awayOdds}
				handicap={handicap}
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
	battleTime,
	homeTeamPic,
	awayTeamPic,
	sportLeaguesTitle,
	homeTeamName,
	awayTeamName,
	homeOdds,
	awayOdds,
	handicap,
	OnClickEvent
}) => {
	const datetime = moment(battleTime).format("DD/MM HH:mm");

	const formatHdp = hdp => {
		if (hdp === 0) return hdp;

		return ` ${hdp > 0 ? "+" : ""} ${hdp}`;
	};

	const homeTeamHandicap = formatHdp(handicap);
	const awayTeamHandicap = formatHdp(handicap * -1);

	return (
		<div className="swiper-slide eventImg" onClick={OnClickEvent}>
			<div className="team">
				<img className="teamL" src={homeTeamPic} alt={homeTeamName} />

				<img
					className="teamL teamR"
					src={awayTeamPic}
					alt={awayTeamName}
				/>
			</div>

			<p className="gameName">{sportLeaguesTitle}</p>

			<div className="teamName">
				<p>{homeTeamName}</p>
				<p>{awayTeamName}</p>
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

HotEventContent.defaultProps = {
	battleTime: null
};

HotEventContent.propTypes = {
	battleTime: PropTypes.string,
	homeTeamPic: PropTypes.string.isRequired,
	awayTeamPic: PropTypes.string.isRequired,
	sportLeaguesTitle: PropTypes.string.isRequired,
	homeTeamName: PropTypes.string.isRequired,
	awayTeamName: PropTypes.string.isRequired,
	homeOdds: PropTypes.number.isRequired,
	awayOdds: PropTypes.number.isRequired,
	handicap: PropTypes.number.isRequired,
	OnClickEvent: PropTypes.func.isRequired
};

export default EventSwipper;
