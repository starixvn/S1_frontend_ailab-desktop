import React, { memo, useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import Swiper from "react-id-swiper";
import { userInfoContext } from "../common/context";
import { SetPathParameter } from "../common/swipperBanner";
import path from "../../router";
import { api_hotEvent_GetDataList } from "../../service/api/hotevent";

const EventSwipper = memo(() => {
	const { userInfo } = useContext(userInfoContext);
	const { langId } = userInfo ?? {};
	const [showNavigation, setShowNavigation] = useState(false);
	const [rebuildOnUpdate, setRebuildOnUpdate] = useState(false);
	const [banner, setBanner] = useState([]);
	const timeRef = useRef(null);
	const getHotEventDataList = () => {
		setRebuildOnUpdate(true);
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
		setTimeout(() => setRebuildOnUpdate(false), 3000);
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
			handicap,
			backgroundPic
		} = b;

		return (
			<HotEventContent
				// eslint-disable-next-line react/no-array-index-key
				key={`Upcoming-Matches-${b.sportLeaguesTitle}-${bIdx}`}
				battleTime={battleTime}
				homeTeamPic={homeTeamPic}
				awayTeamPic={awayTeamPic}
				sportLeaguesTitle={sportLeaguesTitle}
				homeTeamName={homeTeamName}
				awayTeamName={awayTeamName}
				homeOdds={homeOdds}
				awayOdds={awayOdds}
				handicap={handicap}
				backgroundPic={backgroundPic}
				OnClickEvent={OnClickEvent.bind(this, { ...b })}
			/>
		);
	});

	const defSwipperConfig = {
		slidesPerView: 4.1,
		spaceBetween: 10,
		rebuildOnUpdate,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		renderPrevButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.2 }}
				className="swiper-button-prev"
			/>
		),
		renderNextButton: () => (
			<div
				style={{ opacity: showNavigation ? 1 : 0.2 }}
				className="swiper-button-next"
			/>
		)
	};

	return rows && rows.length > 0 ? (
		<div
			className="hotmatchswiper"
			onMouseOver={() => setShowNavigation(true)}
			onMouseOut={() => setShowNavigation(false)}
			onFocus={() => 0}
			onBlur={() => 0}
		>
			<Swiper {...defSwipperConfig}>{rows}</Swiper>
		</div>
	) : null;
});

const HotEventContent = ({
	battleTime,
	homeTeamPic,
	awayTeamPic,
	sportLeaguesTitle,
	homeTeamName,
	awayTeamName,
	OnClickEvent,
	homeOdds,
	awayOdds,
	backgroundPic,
	handicap
}) => {
	const { t } = useTranslation();
	const date = moment(battleTime).format("DD/MM/YYYY");
	const time = moment(battleTime).format("HH:mm");

	const formatHdp = hdp => {
		if (hdp === 0) return hdp;

		return `${hdp > 0 ? "+" : ""}${hdp}`;
	};

	const homeTeamHandicap = formatHdp(handicap);
	const awayTeamHandicap = formatHdp(handicap * -1);

	return (
		<div className="swiper-slide">
			<div className="hotmatch-item">
				<div className="hotmatch-item-title">
					<p>{sportLeaguesTitle}</p>
					<div>
						{date}
						<div>{time}</div>
					</div>
				</div>
				<div className="hotmatch-item-center">
					<div className="team-content">
						<div className="team-item">
							<img src={homeTeamPic} alt="" />
							<div>{homeTeamName}</div>
						</div>
						<div className="odds">
							<span>{homeTeamHandicap}</span>
							<span>{homeOdds}</span>
						</div>
					</div>
					<div className="team-content">
						<div className="team-item">
							<img src={awayTeamPic} alt="" />
							<div>{awayTeamName}</div>
						</div>
						<div className="odds">
							<span>{awayTeamHandicap}</span>
							<span>{awayOdds}</span>
						</div>
					</div>
				</div>
				<button className="bet-btn" onClick={OnClickEvent}>
					{t("lbl_BetNow")}{" "}
				</button>
			</div>
		</div>
	);
};

HotEventContent.defaultProps = {
	homeOdds: 0,
	awayOdds: 0,
	handicap: 0
};

HotEventContent.propTypes = {
	battleTime: PropTypes.string.isRequired,
	homeTeamPic: PropTypes.string.isRequired,
	awayTeamPic: PropTypes.string.isRequired,
	sportLeaguesTitle: PropTypes.string.isRequired,
	homeTeamName: PropTypes.string.isRequired,
	awayTeamName: PropTypes.string.isRequired,
	homeOdds: PropTypes.number,
	awayOdds: PropTypes.number,
	handicap: PropTypes.number,
	backgroundPic: PropTypes.string.isRequired,
	OnClickEvent: PropTypes.func.isRequired
};

export default EventSwipper;
