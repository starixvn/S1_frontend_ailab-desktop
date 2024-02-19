import React, { memo, useState, useEffect, useRef } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import CustomSwipper, { SetPathParameter } from "../../common/customSwipper";
import path from "../../../router";

import { api_hotEvent_GetDataList } from "../../../service/api/hotEvent";

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
				// errorPopBox();d
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
		<div className="offers oddsHotEvent">
			<CustomSwipper
				withBtn={true}
				withPagination={false}
				config={{
					autoplay: false
				}}
			>
				{rows}
			</CustomSwipper>
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
	const { t } = useTranslation();
	const date = moment(battleTime).format("DD/MM");
	const time = moment(battleTime).format("HH:mm");

	const formatHdp = hdp => {
		if (hdp === 0) return hdp;

		return `${hdp > 0 ? "+" : ""}${hdp}`;
	};

	const homeTeamHandicap = formatHdp(handicap);
	const awayTeamHandicap = formatHdp(handicap * -1);

	return (
		<div className="swiper-slide">
			<div className="gameName" onClick={OnClickEvent}>
				{sportLeaguesTitle}
			</div>

			<div className="team" onClick={OnClickEvent}>
				<div className="teamL">
					<p>{homeTeamName}</p>
					<img src={homeTeamPic} alt={homeTeamName} />
				</div>
				<div className="schedule">
					{`${date} `}
					<span>{time}</span>
				</div>
				<div className="teamR">
					<p>{awayTeamName}</p>
					<img src={awayTeamPic} alt={awayTeamName} />
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
