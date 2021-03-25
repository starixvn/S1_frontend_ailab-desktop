import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useNavigate, Link } from "@reach/router";
import config from "../../config";
import path from "../../router";

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
	channel
}) => {
	const navigate = useNavigate();

	const ClickLiveTv = () => {
		if (isStreamingPage) {
			window.open(
				`${config.openURL}/${langId}/liveStreamingEntPage?ch=${channel}`,
				`streaming-${channel}`,
				"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no,top=0,left=0,width=640,height=640"
			);
		} else {
			navigate(`/${langId}/${path.streaming.root}`);
		}
	};

	return (
		<div
			className={`liveTvModule${nowPlaying ? " active" : ""}`}
			onClick={ClickLiveTv}>
			<div className="title icon icon-youtube">{league}</div>
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
					{isStreamingPage ? (
						<div className="btnGroup">
							<Link
								className="lightblue"
								to={`/${langId}/${path.sports.root}?tpId=1&gameId=1&matchId=${matchID}`}>
								{t("lbl_BetNow")?.toUpperCase()}
							</Link>
						</div>
					) : null}
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
	awayScore: null
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
	matchID: PropTypes.number.isRequired,
	channel: PropTypes.number.isRequired
};
