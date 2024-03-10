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
			title: "lbl_Home_Professional_Image_Title",
			text: "lbl_Home_Professional_Image_Text",
			img: "professional.png",
			// pm還沒給
			link: ""
		},
		{
			title: "lbl_Home_Exclusives_VIP_Title",
			text: "lbl_Home_Exclusives_VIP_Text",
			img: "exclusives-vip.png",
			link: `/${userInfo.langId}/${path.vip.root}`
		},
		{
			title: "lbl_Home_Attractive_Bonus_Title",
			text: "lbl_Home_Attractive_Bonus_Text",
			img: "bouns.png",
			link: `/${userInfo.langId}/${path.promotion.root}`
		},
		{
			title: "lbl_Home_Speedy_Transactions_Title",
			text: "lbl_Home_Speedy_Transactions_Text",
			img: "speedy.png",
			link: `/${userInfo.langId}/${path.deposit.root}`
		}
	];

	const getImageUrl = imageName =>
		`${bannerImgUrl}/desktop/img/home-page/${imageName}`;

	return (
		<>
			<div className="home-title">{t("lbl_Home_Join")} GOAL123</div>
			<div className="home-join">
				{JoinListItems.map((item, index) => (
					<div className="item" key={index.title}>
						<div className="title">{t(item.title)}</div>
						<div className="text">{t(item.text)}</div>
						<img src={getImageUrl(item.img)} alt={t(item.title)} />
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
