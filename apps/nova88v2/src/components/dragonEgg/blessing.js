import classNames from "classnames";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect, useState } from "react";
import { useGragonEgg } from "@ailab-desktop/hooks";
import { popBoxContext, userInfoContext } from "../common/context";
import { currencyIdToCurrency } from "../common/common";
import usePopBox from "../hook/usePopBox";
import eventId from "../../datas/eventId";
import { bannerImgUrl } from "../../config";
import defPopBoxType from "../common/defPopBoxType";
import { prizeAmout } from "./info";

const Collection = () => {
	const { t } = useTranslation();

	const [stickerResult, setStickerResult] = useState({
		stickers: 0,
		isClaimedBigPrize: false
	});

	const {
		userInfo: { currencyId }
	} = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const { errorPopBox } = usePopBox();

	const { getBlessingSticker, claimBlessingPrize } = useGragonEgg();

	const claimPrize = async () => {
		const { errorCode, message } = await claimBlessingPrize({
			eventId: eventId.dragonEgg
		});

		if (errorCode === 0) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Success,
				icon: "icon icon-bell",
				description: <div>{t("lbl_JoinSuccessDescription1")}</div>,
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-check"
							onClick={() => {
								getStickers();
								setPopBox({ isOpen: false });
							}}
						>
							OK
						</button>
					</div>
				)
			});
		} else {
			errorPopBox(message || `[${errorCode}] error`, errorCode);
		}
	};

	const getStickers = async () => {
		const { data } = await getBlessingSticker({
			eventId: eventId.dragonEgg
		});

		setStickerResult(data);
	};

	const blessingStickers = Array.from(
		{ length: stickerResult.stickers },
		(_, i) => i + 1
	).map(i => (
		<div className="event-fu-item">
			<div className="event-collection-get">
				<img
					src={`${bannerImgUrl}/desktop/img/event/dragonegg/bless-egg.png`}
					alt={`5fu_fu_on-${i}`}
				/>
			</div>
		</div>
	));

	const emptyStickers = Array.from(
		{ length: 5 - stickerResult.stickers },
		(_, i) => i + 1
	).map(i => (
		<div className="event-fu-item">
			<div className="event-collection-noget">
				<img
					src={`${bannerImgUrl}/desktop/img/event/dragonegg/bless-word.png`}
					alt={`5fu_fu_off-${stickerResult.stickers + i}`}
				/>
			</div>
		</div>
	));

	useEffect(() => {
		getStickers();
	}, []);

	return (
		<div className="event-collection">
			<div className="event-main-title">
				{t("lbl_DragonEgg_FiveFortunes")}
			</div>{" "}
			<div className="event-collection-text">
				{t("lbl_DragonEgg_BlessingHints", {
					amount: prizeAmout[currencyId].blessing,
					currencyName: currencyIdToCurrency[currencyId]
				})}
			</div>
			<div
				className={classNames("event-fu-inner", {
					active: stickerResult.isClaimedBigPrize
				})}
			>
				{blessingStickers}
				{emptyStickers}
			</div>
			<button
				className={classNames("event-collection-btn", {
					active:
						stickerResult.stickers >= 5 &&
						!stickerResult.isClaimedBigPrize
				})}
				onClick={() => {
					if (
						stickerResult.stickers >= 5 &&
						!stickerResult.isClaimedBigPrize
					) {
						claimPrize();
					}
				}}
			>
				{stickerResult.isClaimedBigPrize
					? t("lbl_DragonEgg_Received")
					: `${currencyIdToCurrency[currencyId]} ${prizeAmout[currencyId].blessing}`}
			</button>
		</div>
	);
};

export default Collection;
