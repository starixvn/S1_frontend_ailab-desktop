import React from "react";

const HomeFooter = () => {
	return (
		<footer id="footer">
			<div className="footer-content">
				<div className="footer-top">
					{/* 需連到相對應名稱的頁面 */}
					<div className="info">
						<a href="">about Us</a>
						<a href="">Term&Conditions</a>
						<a href="">responsible Gaming</a>
						<a href="">Affiliate Program</a>
					</div>
					{/* 需可觸發相對應的socialmedia */}
					<div className="social-media">
						<div className="social-media-item">
							<div className="title">Follow us</div>
							<div className="media">
								{/* facebook */}
								<a href="">
									<img
										src="https://banner.goal123.org/desktop/img/home-page/icon/icon-facebook.svg"
										alt=""
									/>
								</a>
								{/* youtube */}
								<a href="">
									<img
										src="https://banner.goal123.org/desktop/img/home-page/icon/icon-youtube.svg"
										alt=""
									/>
								</a>
							</div>
						</div>
						<div className="social-media-item">
							<div className="title">Contact us</div>
							<div className="media">
								{/* zalo */}
								<a href="">
									<img
										src="https://banner.goal123.org/desktop/img/home-page/icon/icon-zalo.svg"
										alt=""
									/>
								</a>
								{/* live chat */}
								<a href="">
									<img
										src="https://banner.goal123.org/desktop/img/home-page/icon/icon-livechat.svg"
										alt=""
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
				{/* 需連到相對應的Lobby頁, sports應連到saba-sports */}
				<div className="footer-bottom">
					<div className="game-collection">
						<div className="title">Games Collection</div>
						<a href="">Sports</a>
						<a href="">Games</a>
						<a href="">Fishing</a>
						<a href="">Lottery</a>
						<a href="">Slots</a>
						<a href="">Casino</a>
						<a href="">Cockfighting</a>
					</div>
					{/* 平台擁有的Payment */}
					<div className="payment-content">
						<div className="title">transaction payment</div>
						<div>
							{/* acb */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/acb.jpg"
									alt=""
								/>
							</a>
							{/* BIDV */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/bidv.jpg"
									alt=""
								/>
							</a>
							{/* DAB */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/dab.jpg"
									alt=""
								/>
							</a>
							{/* EXIM */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/exim.jpg"
									alt=""
								/>
							</a>
							{/* HDB */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/hdb.jpg"
									alt=""
								/>
							</a>
							{/* MB */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/mb.jpg"
									alt=""
								/>
							</a>
							{/* MOMO */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/momo.jpg"
									alt=""
								/>
							</a>
							{/* MSB */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/msb.jpg"
									alt=""
								/>
							</a>
							{/* SACOM */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/sacom.jpg"
									alt=""
								/>
							</a>
							{/* TCB */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/tcb.jpg"
									alt=""
								/>
							</a>
							{/* VCB */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/vcb.jpg"
									alt=""
								/>
							</a>
							{/* VIB */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/vib.jpg"
									alt=""
								/>
							</a>
							{/* VTB */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/vtb.jpg"
									alt=""
								/>
							</a>
							{/* ZALO PAY */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/payment/zalo.jpg"
									alt=""
								/>
							</a>
						</div>
					</div>
					{/* 市場說footer-provider這邊會固定這些品牌, 順序先暫訂這樣 */}
					<div className="provider">
						<div className="title">Collaboration Provider</div>
						<div>
							{/* saba */}
							<a href="">
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/saba.png" alt=""> */}
								{/* hover後為彩色版, 檔案名稱後面都再加上"-a", 以下以此類推 */}
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/saba-a.png"
									alt=""
								/>
							</a>
							{/* 雷火tfg */}
							<a href="">
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/tfg.png" alt=""> */}
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/tfg-a.png"
									alt=""
								/>
							</a>
							{/* sbobet */}
							<a href="">
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/sbo.png" alt=""> */}
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/sbo-a.png"
									alt=""
								/>
							</a>
							{/* BTi */}
							<a href="">
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/bti.png" alt=""> */}
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/bti-a.png"
									alt=""
								/>
							</a>
							{/* AG */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/ag.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/ag-a.png" alt=""> */}
							</a>
							{/* AE */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/ae.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/ae-a.png" alt=""> */}
							</a>
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/n2live.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/n2live-a.png" alt=""> */}
							</a>
							{/* ygg */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/ygg.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/ygg-a.png" alt=""> */}
							</a>
							{/* cq9 */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/cq9.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/cq9-a.png" alt=""> */}
							</a>
							{/* png */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/png.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/png-a.png" alt=""> */}
							</a>
							{/* jili */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/jili.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/jili-a.png" alt=""> */}
							</a>
							{/* v8power */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/v8power.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/v8power-a.png" alt=""> */}
							</a>
							{/* king maker */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/km.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/km-a.png" alt=""> */}
							</a>
							{/* tc gaming */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/tc.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/tc-a.png" alt=""> */}
							</a>
							{/* nextspin */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/next.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/next-a.png" alt=""> */}
							</a>
							{/* im sports */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/im.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/im-a.png" alt=""> */}
							</a>
							{/* im esports */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/im-esports.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/im-esports-a.png" alt=""> */}
							</a>
							{/* spribe */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/spribe.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/spribe-a.png" alt=""> */}
							</a>
							{/* es */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/es.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/es-a.png" alt=""> */}
							</a>
							{/* world */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/world.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/world-a.png" alt=""> */}
							</a>
							{/* fa chai */}
							<a href="">
								<img
									src="https://banner.goal123.org/desktop/img/home-page/provider/fachai.png"
									alt=""
								/>
								{/* <img src="https://banner.goal123.org/desktop/img/home-page/provider/fachai-a.png" alt=""> */}
							</a>
						</div>
					</div>
				</div>
				<div className="powered">
					<div className="brand-item">
						<span>powered by</span>
						<img
							src="https://banner.goal123.org/desktop/img/bong88.png"
							alt=""
						/>
					</div>
				</div>
				<div className="copyright">
					© Copyright 2024. Goal123. All Rights Reserved.{" "}
					<span>18+</span>
				</div>
			</div>
		</footer>
	);
};

export default HomeFooter;
