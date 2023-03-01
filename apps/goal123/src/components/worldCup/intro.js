import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

const Intro = ({ scrollToEvent }) => {
	const { t } = useTranslation();

	return (
		<>
			<div className="eventPage__top">
				<div className="awards">
					<div>{t("worldCup.totalPrizePool")}</div>
				</div>
				<div className="visual">
					<img
						className="a-top"
						src={`${bannerImgUrl}/desktop/img/event/worldcup/trophy.png`}
						alt=""
					/>
					<img
						className="a-bottom"
						src={`${bannerImgUrl}/desktop/img/event/worldcup/athlete.png`}
						alt=""
					/>
					<img
						className="logo"
						src={`${bannerImgUrl}/desktop/img/event/worldcup/logo.png`}
						alt=""
					/>
				</div>
			</div>
			<div className="eventPage__middle">
				<div className="intro-visual__body">
					<div className="intro-visual__item">
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/ronaldo.jpg`}
								alt=""
							/>
						</div>
						<div className="info">
							<span>C.Ronaldo</span>
							Age: 37 / 115 Goals
						</div>
					</div>
					<div className="intro-visual__item">
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/edu-stadium.jpg`}
								alt=""
							/>
						</div>
						<div className="info">
							<span>
								Education City
								<br />
								Stadium
							</span>
							FIFA World Cup Quater Finals
						</div>
					</div>
					<div className="intro-visual__item">
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/neymar.jpg`}
								alt=""
							/>
						</div>
						<div className="info">
							<span>Neymar</span>
							Age: 30 / 71 Goals
						</div>
					</div>
					<div className="intro-visual__item">
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/ai-stadium.jpg`}
								alt=""
							/>
						</div>
						<div className="info">
							<span>
								Al Thumama
								<br />
								Stadium
							</span>
							FIFA World Cup Quater Finals
						</div>
					</div>
					<div className="intro-visual__item">
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/event/worldcup/messi.jpg`}
								alt=""
							/>
						</div>
						<div className="info">
							<span>Messi</span>
							Age: 35 / 81 Goals
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
