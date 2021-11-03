import React, { useContext } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useNavigate } from "@reach/router";
import config from "../../config";
import path from "../../router";
import defPopBoxType from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";

export const StreamingModule = ({
	t,
	langId,
	isStreamingPage,
	league,
	home,
	away,
	nowPlaying,
	homeScore,
	awayScore,
	timeStart,
	matchID,
	channel,
	tpId,
	gameId,
	isLogin
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const navigate = useNavigate();

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
				window.open(
					`${config.openURL}/${langId}/liveStreamingEntPage?ch=${channel}`,
					`streaming`,
					"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no,top=0,left=0,width=640,height=640"
				);
			} else {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.Login
				});
			}
		} else {
			navigate(`/${langId}/${path.streaming.root}`);
		}
	};

	return (
		<div
			className={`liveTvModule${nowPlaying ? " active" : ""}`}
			onClick={ClickLiveTv.bind(this, false)}>
			{isStreamingPage ? (
				<div className="title icon icon-youtube">
					<span className="started">
						{nowPlaying ? t("lbl_Started") : t("lbl_Not_Started")}
					</span>
					{league}
					<button
						className="betbtn"
						onClick={ClickLiveTv.bind(this, true)}>
						{t("lbl_Streaming_SPORTSBOOK")?.toUpperCase()}
					</button>
				</div>
			) : (
				<div className="title icon icon-youtube">{league}</div>
			)}
			<div className="liveTvInfo">
				<div>
					<div>HOME</div>
					<div>{home}</div>
				</div>
				<div>
					<div className="time">
						{nowPlaying
							? "LIVE"
							: moment(timeStart).format("MM/DD HH:mm")}
					</div>
					<div className="title">
						{homeScore !== null ? <span>{homeScore}</span> : null}
						VS
						{awayScore !== null ? <span>{awayScore}</span> : null}
					</div>
					{/* {isStreamingPage ? (
						<div className="btnGroup">
							<button
								className="lightblue"
								onClick={ClickLiveTv.bind(this, true)}>
								{t("lbl_BetNow")?.toUpperCase()}
							</button>
						</div>
					) : null} */}
				</div>
				<div>
					<div>AWAY</div>
					<div>{away}</div>
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
	isLogin: null,
	tpId: null,
	gameId: null
};

StreamingModule.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	isLogin: PropTypes.bool,
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
	gameId: PropTypes.number
};
