import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext, popBoxContext } from "../common/context";

import Loading from "../common/loading";
import { api_site_GetCountryList } from "../../service/api/site";

import RecentHistory from "./referral.recentHistory";

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	return (
		<>
			<div className="infoModule">
				<div className="inside-title icon icon-friend">
					<span>Referral</span>
					<div>
						Share the Nova88 referral code with your friend.You will
						get exclusive referral bonus when your friend sign up
						using your referral code.
					</div>
				</div>
				<div className="stepBar">
					{/* <div className="stepLine" style="width: 33.3%;"></div> */}
					<div className="active">
						<span>01</span>
						<span>
							Copy your Nova88 referral link and share it with
							your friends
						</span>
					</div>
					<div>
						<span>02</span>
						<span>
							Friends register and make deposits and withdrawals
						</span>
					</div>
					<div>
						<span>OK</span>
						<span>Reward together!</span>
					</div>
				</div>
				<div className="referralModule">
					<div className="refShare">
						<div className="title">
							Share your favorite offers with friend!
						</div>
						<div className="refBox">
							<div>
								<div>
									FREE <span>MYR 88</span>
								</div>
								<div>
									Turn <span>8x</span>
								</div>
								<div>
									Deposit <span>888</span>
								</div>
								<a>More Details</a>
							</div>
							<div>
								<div>
									FREE <span>MYR 88</span>
								</div>
								<div>
									Turn <span>8x</span>
								</div>
								<div>
									Deposit <span>888</span>
								</div>
								<a>More Details</a>
							</div>
							<div>
								<div>
									FREE <span>MYR 88</span>
								</div>
								<div>
									Turn <span>8x</span>
								</div>
								<div>
									Deposit <span>888</span>
								</div>
								<a>More Details</a>
							</div>
						</div>
					</div>
					<div className="refLink">
						<div className="title">Your unique link invite</div>
						<div className="refBox">
							<div>
								Referral Code:{" "}
								<span>xxxReferralCodexxxxxx</span>
								<button class="icon icon-files-empty"></button>
							</div>
							<div>
								Referral Link:{" "}
								<span>https://www.nova88.net/?refid=xxxx</span>
								<button class="icon icon-files-empty"></button>
							</div>
							<div>
								<a className="icon icon-files-empty">
									Copy to Clipboard
								</a>
								<a className="icon icon-download2">Download</a>
								<a className="icon icon-facebook2">Facebook</a>
								<a className="icon icon-telegram">Telegram</a>
								<a className="icon icon-whatsapp">Whatsapp</a>
								<a className="icon icon-skype">Skype</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<RecentHistory
				refreshData={refreshData}
				recentHistory={state.recentHistory ?? []}
				GetWithdrawalInfoRecent={GetWithdrawalInfoRecent}
			/>
		</>
	);
};
