import classNames from "classnames";
import { useTranslation } from "react-i18next";
import React, { useContext, useEffect, useState } from "react";
import { useGragonEgg } from "@ailab-desktop/hooks";
import { popBoxContext, userInfoContext } from "../common/context";
import usePopBox from "../hook/usePopBox";
import eventId from "../../datas/eventId";
import { defPopBoxType } from "../common/defPopBoxType";
import { bannerImgUrl } from "../../config";

const Collection = () => {
	const { t } = useTranslation();

	const [stickerResult, setStickerResult] = useState({
		stickers: 0,
		isClaimedBigPrize: false
	});

	const {
		userInfo: { langId }
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
				titleText: "lbl_Congratulations",
				titleIcon: "icon-bell",
				message1: "lbl_JoinSuccessDescription1",
				onClickClose: () => {
					getStickers();
					setPopBox({ isOpen: false });
				},
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
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
			<img
				src={`${bannerImgUrl}/desktop/img/event/dragonegg/5fu_fu_on.png`}
				alt={`5fu_fu_on-${i}`}
			/>
		</div>
	));

	const emptyStickers = Array.from(
		{ length: 5 - stickerResult.stickers },
		(_, i) => i + 1
	).map(i => (
		<div className="event-fu-item">
			<img
				src={`${bannerImgUrl}/desktop/img/event/dragonegg/5fu_fu_off.png`}
				alt={`5fu_fu_off-${stickerResult.stickers + i}`}
			/>
		</div>
	));

	useEffect(() => {
		getStickers();
	}, []);

	return (
		<div
			className={classNames("event-collection", { vn: langId === "vn" })}
		>
			<img
				src={`${bannerImgUrl}/desktop/img/event/dragonegg/5fu_bg_${langId}.png`}
				alt="5fu_bg_en"
				className="event-fu-bg"
			/>
			<div className="event-collection-wrapper">
				<div
					className={classNames("event-fu", {
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
					<img
						src={`${bannerImgUrl}/desktop/img/event/dragonegg/5fu_coin.png`}
						alt="5fu_coin"
					/>
					{stickerResult.isClaimedBigPrize
						? t("lbl_DragonEgg_Received")
						: "VND 4,588,000"}
				</button>
				<div className="event-collection-text">
					{t("lbl_DragonEgg_BlessingHints")}
				</div>
			</div>
		</div>
	);
};

export default Collection;
