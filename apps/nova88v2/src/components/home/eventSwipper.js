import React, { memo, useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import Swiper from "react-id-swiper";
import { SetPathParameter } from "../common/swipperBanner";
import path from "../../router";
import { api_hotEvent_GetDataList } from "../../service/api/hotevent";
import usePopBox from "../hook/usePopBox";

const EventSwipper = memo(({ langId }) => {
	const { errorPopBox } = usePopBox();
	const [banner, setBanner] = useState([]);

	useEffect(() => {
		api_hotEvent_GetDataList({ langId }).then(
			res => {
				const { errorCode, message, data } = res.data;
				if (errorCode === 0) {
					setBanner(data);
				} else {
					errorPopBox(message || "error", errorCode);
				}
			},
			() => {
				errorPopBox();
			}
		);
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
		slidesPerView: 2,
		spaceBetween: 5,
		// centeredSlides: true,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		},
		// autoplay: false,
		// pagination: {
		// 	el: ".swiper-pagination",
		// 	clickable: true
		// },
		rebuildOnUpdate: true,
		containerClass: "swiper-container matchesSwiper"
	};

	const params = {
		...defSwipperConfig
	};

	return rows && rows.length > 0 ? <Swiper {...params}>{rows}</Swiper> : null;
});

EventSwipper.defaultProps = {
	currencyId: null
};

EventSwipper.propTypes = {
	langId: PropTypes.string.isRequired,
	currencyId: PropTypes.number
};

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
			<div className="hotevent">
				<img src={backgroundPic} alt="hotevent-bg-img" />

				<div className="team" onClick={OnClickEvent}>
					<div className="gamename">{sportLeaguesTitle}</div>
					<div>
						<div className="teamL">
							<div>
								<img src={homeTeamPic} alt={homeTeamName} />
							</div>
							<div>{homeTeamName}</div>

							<div>{homeTeamHandicap}</div>
						</div>
						<div className="btnGroup">
							<button className="orange">
								{t("lbl_BetNow")}
							</button>
						</div>
						<div className="teamR">
							<div>
								<img src={awayTeamPic} alt={awayTeamName} />
							</div>
							<div> {awayTeamName}</div>
							<div>{awayTeamHandicap}</div>
						</div>
					</div>
					<div className="odds">
						<div>
							<div>{homeOdds}</div>
							<div>{t("lbl_Home_HomeTeam")}</div>
						</div>
						<div>
							<div>{date}</div>
							<div>{time}</div>
						</div>
						<div>
							<div>{awayOdds}</div>
							<div>{t("lbl_Home_AwayTeam")}</div>
						</div>
					</div>
				</div>
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
