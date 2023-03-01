import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

const Intro = () => {
	const { t } = useTranslation();

	return (
		<>
			<div className="txtBox">
				<div className="info">
					<div className="bonus">
						6,888,000,000<span>VND</span>
					</div>
					<div className="txt">{t("worldCup.prizeWorth")}</div>
					<img
						src={`${bannerImgUrl}/desktop/img/event/worldcup/logo.png`}
						alt=""
					/>
					<div className="yellow">
						{t("worldCup.iconForWorldCup")}™
					</div>
					<div className="green">{t("worldCup.titleIntro")}</div>
				</div>
			</div>
			<div className="title">
				Discover Qatar
				<p>Stadiums</p>
			</div>
			<div className="discover">
				<div className="list">
					<div className="item">
						<img
							src={`${bannerImgUrl}/desktop/img/worldcup/stadium1.jpg`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								Al Bayt Stadium
								<div className="img" />
								<span>
									60,000-capacity arena Opening Match Venue 21
									November 2022
								</span>
							</div>
						</div>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/img/worldcup/stadium2.jpg`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								Education City Stadium
								<div className="img" />
								<span>
									40,000-capacity arena FIFA World Cup Quarter
									Finals
								</span>
							</div>
						</div>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/img/worldcup/stadium3.jpg`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								Stadium 974
								<div className="img" />
								<span>40,000-capacity arena</span>
							</div>
						</div>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/img/worldcup/stadium4.jpg`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								Khalifa International Stadium
								<div className="img" />
								<span>40,000-capacity arena Built in 1976</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="title">
				Discover Qatar
				<p>Player</p>
			</div>
			<div className="discover1">
				<div className="list">
					<div className="item">
						<img
							src={`${bannerImgUrl}/desktop/img/worldcup/player1.png`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								kylian Mbappe
								<div className="img" />
								<span>Age: 24</span>
								<span>Score: 26 Goals</span>
								<img
									src={`${bannerImgUrl}/desktop/img/worldcup/team1.png`}
									alt=""
								/>
							</div>
						</div>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/img/worldcup/player2.png`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								Messi
								<div className="img" />
								<span>Age: 35</span>
								<span>Score: 81 Goals</span>
								<img
									src={`${bannerImgUrl}/img/worldcup/team2.png`}
									alt=""
								/>
							</div>
						</div>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/img/worldcup/player3.png`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								C.Ronaldo
								<div className="img" />
								<span>Age: 37</span>
								<span>Score: 115 Goals</span>
								<img
									src={`${bannerImgUrl}/img/worldcup/team3.png`}
									alt=""
								/>
							</div>
						</div>
					</div>
					<div className="item">
						<img
							src={`${bannerImgUrl}/img/worldcup/player4.png`}
							alt=""
						/>
						<div className="hoverBox">
							<div>
								Neymar
								<div className="img" />
								<span>Age: 30</span>
								<span>Score: 71 Goals</span>
								<img
									src={`${bannerImgUrl}/img/worldcup/team4.png`}
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Intro;
