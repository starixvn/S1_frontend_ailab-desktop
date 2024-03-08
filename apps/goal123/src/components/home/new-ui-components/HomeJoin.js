import React, { useContext } from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../../config";
import { userInfoContext } from "../../common/context";
import path from "../../../router";

const HomeJoin = () => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();
	const JoinListItems = [
		{
			title: "professional image",
			text: "High trust with Michael Ballack as brand ambassador.",
			img: "professional.png",
			link: ""
		},
		{
			title: "exclusives VIP",
			text: "VIP Lounge with exclusives",
			img: "exclusives-vip.png",
			link: `/${userInfo.langId}/${path.vip.root}`
		},
		{
			title: "Attractive bonus",
			text: "welcome bonus, daily reload, unlimited rebate",
			img: "bouns.png",
			link: `/${userInfo.langId}/${path.promotion.root}`
		},
		{
			title: "Speedy transactions",
			text: "Enjoy faster and more convenient transaction payments",
			img: "speedy.png",
			link: `/${userInfo.langId}/${path.deposit.root}`
		}
	];

	const getImageUrl = imageName =>
		`${bannerImgUrl}/desktop/img/home-page/${imageName}`;

	return (
		<>
			<div className="home-title">JOIN GOAL123</div>
			<div className="home-join">
				{JoinListItems.map((item, index) => (
					<div className="item" key={index.title}>
						<div className="title">{item.title}</div>
						<div className="text">{item.text}</div>
						<img src={getImageUrl(item.img)} alt="" />
						<div className="bottom">
							<Link to={item.link} className="btn-more">
								{t("lbl_Promotion_MoreInfo")}
							</Link>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default HomeJoin;
