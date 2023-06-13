import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import defPopBoxType from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";
import { bannerImgUrl } from "../../config";

const defTag = {
	sponsorShip: "sponsorShip",
	video: "video"
};

const Sponsor = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [activeTag, setActiveTag] = useState(defTag.sponsorShip);

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const showPopBox = ({ photo }) => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Photo,
			photo,
			clickClose
		});
	};

	return (
		<main className="sponsor">
			<section className="inside">
				<div className="typeTag">
					<button
						className={
							activeTag === defTag.sponsorShip ? "active" : ""
						}
						onClick={() => setActiveTag(defTag.sponsorShip)}>
						{t("lbl_Sponsorship")}
					</button>
					<button
						className={activeTag === defTag.video ? "active" : ""}
						onClick={() => setActiveTag(defTag.video)}>
						{t("lbl_Videos")}
					</button>
				</div>
				<div className="sponsorModule">
					<div
						className={`sponsorPage${
							activeTag === defTag.sponsorShip ? " active" : ""
						}`}>
						<div className="sponsorInfo">
							<img
								src={`${bannerImgUrl}/desktop/img/sponsor/joe/joe.jpg`}
								alt="Joe Cole"
							/>
							<div>
								<div>
									<h1>Joe Cole</h1>
									<h2>
										{t("lbl_Nova88")} {t("lbl_Ambassador")}
									</h2>
									<h3>2021-2022</h3>
								</div>
								<div className="photoList">
									<button
										onClick={() =>
											showPopBox({
												photo: (
													<img
														src={`${bannerImgUrl}/desktop/img/sponsor/joe/01a.jpg`}
														alt="Joe Cole"
													/>
												)
											})
										}>
										<img
											src={`${bannerImgUrl}/desktop/img/sponsor/joe/01.jpg`}
											alt="Joe Cole"
										/>
									</button>

									<button
										onClick={() =>
											showPopBox({
												photo: (
													<img
														src={`${bannerImgUrl}/desktop/img/sponsor/joe/02a.jpg`}
														alt="Joe Cole"
													/>
												)
											})
										}>
										<img
											src={`${bannerImgUrl}/desktop/img/sponsor/joe/02.jpg`}
											alt="Joe Cole"
										/>
									</button>

									<button
										onClick={() =>
											showPopBox({
												photo: (
													<img
														src={`${bannerImgUrl}/desktop/img/sponsor/joe/03a.jpg`}
														alt="Joe Cole"
													/>
												)
											})
										}>
										<img
											src={`${bannerImgUrl}/desktop/img/sponsor/joe/03.jpg`}
											alt="Joe Cole"
										/>
									</button>
								</div>
							</div>
						</div>
						<div className="sponsorInfo">
							<img
								src={`${bannerImgUrl}/desktop/img/sponsor/amber/amber.jpg`}
								alt="amber"
							/>
							<div>
								<div>
									<h1>Amber Na</h1>
									<h2>
										{t("lbl_Nova88")} {t("lbl_Ambassador")}
									</h2>
									<h3>2021-2022</h3>
								</div>
								<div className="photoList">
									<button
										onClick={() =>
											showPopBox({
												photo: (
													<img
														src={`${bannerImgUrl}/desktop/img/sponsor/amber/01a.jpg`}
														alt="amber"
													/>
												)
											})
										}>
										<img
											src={`${bannerImgUrl}/desktop/img/sponsor/amber/01.jpg`}
											alt="amber"
										/>
									</button>

									<button
										onClick={() =>
											showPopBox({
												photo: (
													<img
														src={`${bannerImgUrl}/desktop/img/sponsor/amber/02a.jpg`}
														alt="amber"
													/>
												)
											})
										}>
										<img
											src={`${bannerImgUrl}/desktop/img/sponsor/amber/02.jpg`}
											alt="amber"
										/>
									</button>

									<button
										onClick={() =>
											showPopBox({
												photo: (
													<img
														src={`${bannerImgUrl}/desktop/img/sponsor/amber/03a.jpg`}
														alt="amber"
													/>
												)
											})
										}>
										<img
											src={`${bannerImgUrl}/desktop/img/sponsor/amber/03.jpg`}
											alt="amber"
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						className={`sponsorPage${
							activeTag === defTag.video ? " active" : ""
						}`}>
						<div className="sponsorVideo">
							<iframe
								width="450"
								height="260"
								src="https://www.youtube.com/embed/Cn74XFuYAcE"
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							/>
							<iframe
								width="450"
								height="260"
								src="https://www.youtube.com/embed/3P_C3rE_u_I"
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};
export default Sponsor;
