import React, { useContext } from "react";
import { Link, navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../../config";
import { userInfoContext, popBoxContext } from "../../common/context";
import path from "../../../router";

const HomeJoin = () => {
	// 導向deposit 頁面要判斷是否登入
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { t } = useTranslation();

	const JoinListItems = [
		{
			title: "lbl_trusthworthy",
			text: "lbl_Home_Professional_Image_Text",
			img: "trusthworthy.png",
			link: `/${userInfo.langId}/${path.ambassador.root}`
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
			link: `/${userInfo.langId}/${path.deposit.root}`,
			isDeposit: true
		}
	];

	const getImageUrl = imageName =>
		`${bannerImgUrl}/desktop/img/home-page/${imageName}`;

	const handleDepositClick = () => {
		if (userInfo.isLogin) {
			navigate(`/${userInfo.langId}/${path.deposit.root}`);
		} else {
			setPopBox({
				isOpen: true,
				popBoxType: "Login"
			});
		}
	};

	return (
		<>
			<div className="home-title">{t("lbl_Home_Join")} GOAL123</div>
			<div className="home-join">
				{JoinListItems.map(item => (
					<div className="item" key={`${item.img}-${item.title}`}>
						<div className="title">{t(item.title)}</div>
						<div className="text">{t(item.text)}</div>
						<img src={getImageUrl(item.img)} alt={t(item.title)} />
						<div className="bottom">
							{item.isDeposit ? (
								<button
									onClick={handleDepositClick}
									className="btn-more">
									{t("lbl_Promotion_MoreInfo")}
								</button>
							) : (
								<Link to={item.link} className="btn-more">
									{t("lbl_Promotion_MoreInfo")}
								</Link>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default HomeJoin;
