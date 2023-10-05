import React, { useContext } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import config from "../../config";
import path from "../../router";
import { GET_ENTER_PAGE_URL } from "../../service/enterPage";
import { popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";

export const StreamingModule = ({
	t,
	langId,
	league,
	nowPlaying,
	home,
	homeScore,
	awayScore,
	timeStart,
	away,
	channel,
	matchID,
	tpId,
	gameId,
	isLogin,
	isStreamingPage,
	actStatus
}) => {
	const { setPopBox } = useContext(popBoxContext);

	const handleLogin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	const clickSportBook = () => {
		if (!isLogin) {
			handleLogin();
		} else {
			GET_ENTER_PAGE_URL({
				langId,
				tpId,
				gameId,
				matchid: matchID,
				isLogin,
				loginCallback: handleLogin
			});
		}
	};

	const ClickLiveTv = (clickBtn, e) => {
		e.stopPropagation();
		if (isStreamingPage) {
			if (clickBtn) {
				navigate(
					`/${langId}/${path.sports.root}?tpId=${tpId || 1}&gameId=${
						gameId || 1
					}&matchId=${matchID}`
				);
			} else if (isLogin) {
				if (actStatus === 1) {
					errorPopBox(t("streaming.lbl_please_make_deposit"));
				} else {
					window.open(
						`${config.openURL}/${langId}/liveStreamingEntPage?ch=${channel}`,
						`streaming`,
						"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no,top=0,left=0,width=640,height=640"
					);
				}
			} else {
				navigate(`/${langId}/${path.join.root}`);
			}
		} else {
			navigate(`/${langId}/${path.streaming.root}`);
		}
	};

	return (
		<div className="lobby-livesports-item">
			<div
				className="lobby-livesports-league"
				onClick={ClickLiveTv.bind(this, false)}
			>
				{isStreamingPage && (
					<div className="info left">
						{nowPlaying ? t("lbl_Started") : t("lbl_Not_Started")}
					</div>
				)}
				<div className="title">{league}</div>
				{isStreamingPage && (
					<div
						className="info right"
						onClick={() => clickSportBook()}
					>
						{t("lbl_Streaming_SPORTSBOOK")}
					</div>
				)}
			</div>

			<button className={`youtube ${nowPlaying ? "" : "close"}`} />

			<div className="lobby-livesports-team">
				<div className="left">
					<div>HOME</div>
					<div className="name">{home}</div>
				</div>
				<div className="center">
					<div>VS</div>
					<div>
						{nowPlaying
							? "LIVE"
							: moment(timeStart).format("MM/DD HH:mm")}
					</div>
				</div>
				<div className="right">
					<div>AWAY</div>
					<div className="name">{away}</div>
				</div>
			</div>
		</div>
	);
};

StreamingModule.defaultProps = {
	isStreamingPage: false,
	homeScore: null,
	awayScore: null,
	matchID: null,
	tpId: null,
	gameId: null,
	isLogin: false,
	actStatus: 1
};

StreamingModule.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	isStreamingPage: PropTypes.bool,
	league: PropTypes.string.isRequired,
	home: PropTypes.string.isRequired,
	away: PropTypes.string.isRequired,
	nowPlaying: PropTypes.bool.isRequired,
	homeScore: PropTypes.number,
	awayScore: PropTypes.number,
	timeStart: PropTypes.string.isRequired,
	matchID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	channel: PropTypes.number.isRequired,
	tpId: PropTypes.number,
	gameId: PropTypes.number,
	isLogin: PropTypes.bool,
	actStatus: PropTypes.number
};
