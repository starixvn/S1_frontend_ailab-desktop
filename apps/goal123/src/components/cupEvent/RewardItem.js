import React from "react";
import { useTranslation } from "react-i18next";
import { REWARD_ITEMS } from "./def";
import { bannerImgUrl } from "../../config";

const RewardItem = () => {
	const { t } = useTranslation();
	return (
		<>
			<div className="bottom-title">
				<img
					src={`${bannerImgUrl}/desktop/img/event/eurocup/title-item.png`}
					alt=""
				/>
				<span>{t("lbl_CupEvent_RewardItem")}</span>
			</div>
			<div className="reward">
				{REWARD_ITEMS.map(({ key, displayKey, img, amount, count }) => (
					<div className="reward-item" key={key}>
						<div className="title">
							{t(displayKey)}
							{/* 冠軍樣式 */}
							{key === 1 && (
								<img
									src={`${bannerImgUrl}/desktop/img/event/eurocup/crown.png`}
									alt=""
								/>
							)}
						</div>
						<div>
							<div className="reward-item-text">
								<span>{t("lbl_CupEvent_CashPrize")}</span>
								<div>{amount} VND</div>
							</div>
							<div className="reward-item-text">
								<span>{t("lbl_CupEvent_PrizeCount")}</span>
								<div>{count}</div>
							</div>
						</div>
						<div>
							<span>{t("lbl_CupEvent_Winners")}</span>
							<span>{t("lbl_CupEvent_DrawnOutOn")} 07/15</span>
						</div>
					</div>
				))}
			</div>
			{/* 得獎者公布後的樣式 */}
			{/*
				<div class="reward-winner">
                    <div>
                        <div class="reward-item">
                            <div class="title">Champions
                                <img src="img/event/eurocup/crown.png" alt="">
                            </div>
                            <div>
                                <div class="reward-item-text">
                                    <span>Cash Prize</span>
                                    <div>80,000,000 VND</div>
                                </div>
                                <div class="reward-item-text">
                                    <span>Prize Count</span>
                                    <div>2</div>
                                </div>
                            </div>
                            <div>
                                <span>Winners</span>
                                <span>Drawn out on 07/15</span>
                            </div>
                        </div>
                        <div class="reward-item">
                            <div class="title">2nd Place</div>
                            <div>
                                <div class="reward-item-text">
                                    <span>Cash Prize</span>
                                    <div>50,000,000 VND</div>
                                </div>
                                <div class="reward-item-text">
                                    <span>Prize Count</span>
                                    <div>2</div>
                                </div>
                            </div>
                            <div>
                                <span>Winners</span>
                                <span>Drawn out on 07/15</span>
                            </div>
                        </div>
                    </div>
                    <div class="reward-item semi">
                        <div class="title">Semi Finals</div>
                        <div>
                            <div class="reward-item-text">
                                <span>Cash Prize</span>
                                <div>30,000,000 VND</div>
                            </div>
                            <div class="reward-item-text">
                                <span>Prize Count</span>
                                <div>2</div>
                            </div>
                        </div>
                        <div>
                            <span>Winners</span>
                            <span>doreis123、irew3234、vanserewe3、iglskoer123、opjweikrkt、ikwerkg9999、wjfwiejiwer000、wqwewqerwer11、wjfwiejiwer000、
                                wqwewqerwer11、vanserewe3、iglskoer123、vanserewe3</span>
                        </div>
                    </div>
                </div>
				*/}
		</>
	);
};

export default RewardItem;
