import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

const Intro = ({ scrollToEvent }) => {
	const { t } = useTranslation();

	return (
		<>
			<div className="eventPage top">
				<div className="awards">
					<div>{t("worldCup.totalPrizePool")}</div>
				</div>
				<div className="visual">
					<img
						className="ball"
						src={`${bannerImgUrl}/desktop/img/event/worldcup/ball.png`}
						alt=""
					/>
					<img
						className="a-left"
						src={`${bannerImgUrl}/desktop/img/event/worldcup/athlete-l.png`}
						alt=""
					/>
					<img
						className="a-right"
						src={`${bannerImgUrl}/desktop/img/event/worldcup/athlete-r.png`}
						alt=""
					/>
					<img
						className="logo"
						src={`${bannerImgUrl}/img/worldcup/logo.png`}
						alt=""
					/>
					<div className="deco">
						<div className="item" />
						<div className="item" />
						<div className="item" />
					</div>
					<img
						className="deco-line"
						src={`${bannerImgUrl}/desktop/img/event/worldcup/deco-line.svg`}
						alt=""
					/>
				</div>
			</div>
			<div className="eventPage middle">
				<img
					className="deco-line"
					src={`${bannerImgUrl}/desktop/img/event/worldcup/deco-line.svg`}
					alt=""
				/>
				<div className="item-wrapper">
					<div className="item-row">
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/cube01.png`}
								alt=""
							/>
							<div className="info">
								<span>Lionel Messi - Argentina</span>
								Age 35 / Score 81 Goals
							</div>
						</div>
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/cube02.jpg`}
								alt=""
							/>
							<div className="info">
								<span>Al Bayt Stadium</span>
								Opening Match Venue
							</div>
						</div>
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/cube03.png`}
								alt=""
							/>
							<div className="info">
								<span>C.Ronaldo - Portugal</span>
								Age 37 / Score 115 Goals
							</div>
						</div>
					</div>
					<div className="item-row">
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/cube04.jpg`}
								alt=""
							/>
							<div className="info">
								<span>Al Janoub Stadium</span>
								City of Al Wakrah
							</div>
						</div>
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/cube05.jpg`}
								alt=""
							/>
							<div className="info">
								<span>Lusail Stadium</span>
								FIFA World Cup Final Qatar 2022
							</div>
						</div>
					</div>
					<div className="item-row">
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/cube06.png`}
								alt=""
							/>
							<div className="info">
								<span>Karim Benzema - France</span>
								Age 35 / Score 36 Goals
							</div>
						</div>
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/cube07.jpg`}
								alt=""
							/>
							<div className="info">
								<span>Khalifa International Stadium</span>
								Built in 1976
							</div>
						</div>
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/cube08.png`}
								alt=""
							/>
							<div className="info">
								<span>Neymar - Brazil</span>
								Age 30 / Score 71 Goals
							</div>
						</div>
					</div>
				</div>
				<button className="btn-event" onClick={scrollToEvent}>
					{t("worldCup.getStarted")}
				</button>
			</div>
		</>
	);
};

Intro.propTypes = {
	scrollToEvent: PropTypes.func.isRequired
};

export default Intro;
