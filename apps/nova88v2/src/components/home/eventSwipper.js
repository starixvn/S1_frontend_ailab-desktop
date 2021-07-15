import React, { memo } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import Swiper from "react-id-swiper";
import { useGetBanner, SetPathParameter } from "../common/swipperBanner";
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
			sportTeamsAway,
			homeOdds,
			awayOdds,
			handicap,
			logo,
			backgroundPic
		} = b;

		return (
			<HotEventContent
				// eslint-disable-next-line react/no-array-index-key
				key={`Upcoming-Matches-${b.sportLeaguesId}-${bIdx}`}
				sportBattleDateTime={sportBattleDateTime}
				sportTeamsHomePic={sportTeamsHomePic}
				sportTeamsAwayPic={sportTeamsAwayPic}
				sportLeaguesId={sportLeaguesId}
				sportTeamsHome={sportTeamsHome}
				sportTeamsAway={sportTeamsAway}
				homeOdds={homeOdds}
				awayOdds={awayOdds}
				handicap={handicap}
				logo={logo}
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

EventSwipper.propTypes = {
	langId: PropTypes.string.isRequired
};

const isEuro = sportLeaguesId =>
	["EURO2020", "欧冠2020", "2020", "Châu Âu 2020", "ยูโร 2020"].some(
		item => item === sportLeaguesId
	);

const HotEventContent = ({
	sportBattleDateTime,
	sportTeamsHomePic,
	sportTeamsAwayPic,
	sportLeaguesId,
	sportTeamsHome,
	sportTeamsAway,
	OnClickEvent,
	homeOdds,
	awayOdds,
	logo,
	backgroundPic,
	handicap
}) => {
	const { t } = useTranslation();
	const date = moment(sportBattleDateTime).format("DD/MM/YYYY");
	const time = moment(sportBattleDateTime).format("HH:mm");

	const _isEuro = isEuro(sportLeaguesId);

	const formatHdp = hdp => {
		if (hdp === 0) return hdp;

		return `${hdp > 0 ? "+" : ""}${hdp}`;
	};

	const homeTeamHandicap = formatHdp(handicap);
	const awayTeamHandicap = formatHdp(handicap * -1);

	return (
		<div className="swiper-slide">
			{_isEuro ? (
				<div className="upcomingmatches">
					<img src={backgroundPic} alt="upcomingmatches-bg-img" />

					<div
						className={`team${_isEuro ? " euro" : ""}`}
						onClick={OnClickEvent}>
						<div>{sportLeaguesId}</div>
						<div>
							<div className="teamL">
								<img
									src={sportTeamsHomePic}
									alt="sportTeamsHome-img"
								/>
								{sportTeamsHome}
							</div>
							<div className="btnGroup">
								<button className="orange">
									{t("lbl_BetNow")?.toUpperCase()}
								</button>
							</div>
							<div className="teamR">
								<img
									src={sportTeamsAwayPic}
									alt="sportTeamsAway-img"
								/>
								{sportTeamsAway}
							</div>
						</div>

						<div>
							{date} {time}
						</div>
					</div>
				</div>
			) : (
				<div className="hotevent">
					<img src={backgroundPic} alt="hotevent-bg-img" />

					<div className="team" onClick={OnClickEvent}>
						<img src={logo} alt="hotevent-logo-img" />

						<div>
							<div className="teamL">
								<div>
									<img
										src={sportTeamsHomePic}
										alt="sportTeamsHome-img"
									/>
								</div>
								<div>{sportTeamsHome}</div>

								<div>{homeTeamHandicap}</div>
							</div>
							<div className="btnGroup">
								<button className="orange">
									{t("lbl_BetNow")?.toUpperCase()}
								</button>
							</div>
							<div className="teamR">
								<div>
									<img
										src={sportTeamsAwayPic}
										alt="sportTeamsAway-img"
									/>
								</div>
								<div> {sportTeamsAway}</div>
								<div>{awayTeamHandicap}</div>
							</div>
						</div>

						{homeOdds && awayOdds ? (
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
						) : null}
					</div>
				</div>
			)}
		</div>
	);
};

// const OddsAndHandicap = ({ homeOdds, awayOdds, hdp }) => {
// 	return homeOdds && awayOdds ? (
// 		<div className="odds">
// 			<div id="homeodds">{homeOdds}</div>
// 			<div>{Math.abs(hdp)}</div>
// 			<div>{awayOdds}</div>
// 		</div>
// 	) : null;
// };

HotEventContent.defaultProps = {
	homeOdds: 0,
	awayOdds: 0,
	handicap: 0
};

HotEventContent.propTypes = {
	sportBattleDateTime: PropTypes.string.isRequired,
	sportTeamsHomePic: PropTypes.string.isRequired,
	sportTeamsAwayPic: PropTypes.string.isRequired,
	sportLeaguesId: PropTypes.string.isRequired,
	sportTeamsHome: PropTypes.string.isRequired,
	sportTeamsAway: PropTypes.string.isRequired,
	homeOdds: PropTypes.number,
	awayOdds: PropTypes.number,
	handicap: PropTypes.number,
	logo: PropTypes.string.isRequired,
	backgroundPic: PropTypes.string.isRequired,
	OnClickEvent: PropTypes.func.isRequired
};

export default EventSwipper;
