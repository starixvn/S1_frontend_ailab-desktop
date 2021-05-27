import React, { memo } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import Swiper from "react-id-swiper";
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
				key={`Upcoming-Matches-${b.sportLeaguesId}-${bIdx}`}
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
	["EURO2020", "欧冠2020", "2020", "Châu Âu 2020"].some(
		item => item === sportLeaguesId
	);

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

	const _isEuro = isEuro(sportLeaguesId);

	return (
		<div className="swiper-slide">
			<div className="upcomingmatches">
				<div
					className={`team${_isEuro ? " euro" : ""}`}
					onClick={OnClickEvent}>
					<div>{sportLeaguesId}</div>
					<div>
						<div className="teamL">
							<img src={sportTeamsHomePic} alt={sportTeamsHome} />
							{sportTeamsHome}
						</div>
						<div className="btnGroup">
							<button className="orange">BET NOW</button>
						</div>
						<div className="teamR">
							<img src={sportTeamsAwayPic} alt={sportTeamsAway} />
							{sportTeamsAway}
						</div>
					</div>
					<div>
						{date} {time}
					</div>
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
