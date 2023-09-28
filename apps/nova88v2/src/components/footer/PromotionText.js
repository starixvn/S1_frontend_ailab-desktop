import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { promotionTextList } from "./def";
import { userInfoContext } from "../common/context";
import { currencyIdToCurrency } from "../common/common";

const PromotionText = () => {
	const { t } = useTranslation();
	const {
		userInfo: { currencyId }
	} = useContext(userInfoContext);
	const [isShow, setIsShow] = useState(false);

	return (
		<div className="footer-bottom">
			{isShow ? (
				<div className="footer-hideinfo">
					<button
						className="footer-btn"
						onClick={() => setIsShow(false)}>
						{t("lbl_HideInfo")}
					</button>
					{promotionTextList.map(({ title, content }) => (
						<>
							<h1>{t(title)}</h1>
							<p>{t(content)}</p>
							<br />
						</>
					))}
				</div>
			) : (
				<div className="footer-readmore">
					<h1>
						{t(
							`lbl_Sports_Betting_Online_${currencyIdToCurrency[currencyId]}`
						)}
					</h1>
					<p>
						{t("lbl_Sports_Betting_Online_Malaysia_desc")}
						<button
							className="footer-btn"
							onClick={() => setIsShow(true)}>
							{isShow ? null : `${t("lbl_Read_more")} >`}
						</button>
					</p>
				</div>
			)}
		</div>
	);
};

export default PromotionText;
