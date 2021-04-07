import React, { useContext } from "react";
import { userInfoContext } from "../common/context";
import { defBannerType } from "../../service/api/site";

import SwipperBanner from "../common/swipperBanner";
import EventSwipper from "./eventSwipper";
import Marquee from "./marquee";
import LiveCasinoSwipper from "./liveCasinoSwipper";

const HomeNew = ({ productTpIds }) => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<main>
			<SwipperBanner ImgFolder={[defBannerType.Promotions]} />

			<EventSwipper langId={userInfo.langId} />

			<Marquee />

			<section>
				<LiveCasinoSwipper
					langId={userInfo.langId}
					productTpIds={productTpIds}
				/>

				<div className="indexGameList">
					<div>
						<div className="title">
							<i className="icon icon-hotgame" />
							Hot games
						</div>
						<div className="indexGamelist-wrapper">
							<div className="leftGame">
								<a href="#">
									<img
										className="show"
										src="../../styles/img/hotgames/sportsblue.png"
										alt=""
									/>
									<img
										src="../../styles/img/hotgames/sports.png"
										alt=""
									/>
									<button className="title" />
								</a>
							</div>
							<div className="rightGame">
								<a>
									<div className="game-item">
										<img src="../../styles/img/hotgames/sabasoccer.png" />
										<img
											className="gameImg"
											src="../../styles/img/hotgames/sabasoccer-item.png"
										/>
										<div className="title">Saba Soccer</div>
									</div>
								</a>
								<a>
									<div className="game-item">
										<img src="../../styles/img/hotgames/slots.png" />
										<img
											className="gameImg"
											src="../../styles/img/hotgames/slots-item.png"
										/>
										<div className="title">Slots</div>
									</div>
								</a>
								<a>
									<div className="game-item">
										<img src="../../styles/img/hotgames/sabaclub.png" />
										<img
											className="gameImg"
											src="../../styles/img/hotgames/sabaclub-item.png"
										/>
										<div className="title">Saba Club</div>
									</div>
								</a>
								<a>
									<div className="game-item">
										<img src="../../styles/img/hotgames/fishing.png" />
										<img
											className="gameImg"
											src="../../styles/img/hotgames/fishing-item.png"
										/>
										<div className="title">Fishing</div>
									</div>
								</a>
								<a>
									<div className="game-item">
										<img src="../../styles/img/hotgames/virtualsports.png" />
										<img
											className="gameImg"
											src="../../styles/img/hotgames/virtualsports-item.png"
										/>
										<div className="title">Saba Club</div>
									</div>
								</a>
								<a>
									<div className="game-item">
										<img src="../../styles/img/hotgames/keno.png" />
										<img
											className="gameImg"
											src="../../styles/img/hotgames/keno-item.png"
										/>
										<div className="title">Keno</div>
									</div>
								</a>
								<a>
									<div className="game-item">
										<img src="../../styles/img/hotgames/v8poker.png" />
										<img
											className="gameImg"
											src="../../styles/img/hotgames/v8poker-item.png"
										/>
										<div className="title">V8 Poker</div>
									</div>
								</a>
								<a>
									<div className="game-item">
										<img src="../../styles/img/hotgames/esports.png" />
										<img
											className="gameImg"
											src="../../styles/img/hotgames/esports-item.png"
										/>
										<div className="title">E-Sports</div>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="indexInfo">
					<div className="infoCenter">
						<div>
							<div className="title">
								<i className="icon icon-infocenter" />
								Info Center
							</div>
							<div className="infoGroup">
								<a href="">
									<i className="icon icon-deposit2" />
									HOW TO DEPOSIT
								</a>
								<a href="">
									<i className="icon icon-withdrawal2" />
									HOW TO WITHDRAW
								</a>
								<a href="">
									<i className="icon icon-support" />
									FAQs
								</a>
							</div>
						</div>
					</div>
					<div className="news">
						<div>
							<div className="title">
								<i className="icon icon-newspaper" />
								Goal123 NEWS
							</div>
						</div>
						<div className="articleModule">
							<a href="">
								<img src="../../styles/img/NEWS1.jpg" />
								<div className="title">
									<p>bóng đá trận Juveải Hạng 2 Italia</p>
								</div>
							</a>
							<a href="">
								<img src="../../styles/img/NEWS2.jpg" />
								<div className="title">
									<p>
										bóng đá trận Juve Stabia vs Cremonese
										28/07/2020 – Giải Hạng 2 Italia
									</p>
								</div>
							</a>
							<a href="">
								<img src="../../styles/img/NEWS3.jpg" />
								<div className="title">
									<p>
										bóng đá trận Juve Stabia vs Cremonese
										28/07/2020 – Giải Hạng 2 ItaliaGiải Hạng
										2 Italia
									</p>
								</div>
							</a>
						</div>
						<div className="btnall">
							<a href="">view all</a>
						</div>
					</div>
				</div>
				<div className="special">
					<div>
						<img src="../../styles/img/slots777.png" />
						<ul>
							<li className="title">Reputable Brand</li>
							<li>Official Partners of Spurs and NUFC</li>
						</ul>
					</div>
					<div>
						<img src="../../styles/img/service.png" />
						<ul>
							<li className="title">More game type</li>
							<li>Official Partners of Spurs and NUFC</li>
						</ul>
					</div>
					<div>
						<img src="../../styles/img/bank.png" />
						<ul>
							<li className="title">Payment Method</li>
							<li>Official Partners of Spurs and NUFC</li>
						</ul>
					</div>
					<div>
						<img src="../../styles/img/speed.png" />
						<ul>
							<li className="title">Transaction Speed</li>
							<li>Official Partners of Spurs and NUFC</li>
						</ul>
					</div>
				</div>
				<div className="platform">
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/saba.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/ab.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/yl.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/ag.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/jk.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/gp.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/dg.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/sa.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/yg.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/pp.png /" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/sg.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/pg.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/ae.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/eb.png" />
					</a>
					<a href="">
						<img src="https://image.n88media.com/SiteSkin/img/logo/wm.png" />
					</a>
					<a href="">
						<img src="../../styles/img/s123.png" />
					</a>
					<a href="">
						<img src="../../styles/img/cq9.png" />
					</a>
					<a href="">
						<img src="../../styles/img/icg.png" />
					</a>
					<a href="">
						<img src="/common/images/logo/v8.png" alt="" />
					</a>
					<a href="">
						<img src="/common/images/logo/n2live.png" alt="" />
					</a>
				</div>
				<div className="powered">
					<div>Powered by</div>
					{/* <!-- Một sản phẩm của --> */}
					<img src="img/bong88.png" />
				</div>
			</section>
		</main>
	);
};

export default HomeNew;
