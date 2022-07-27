import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { worldCupPopBox } from "../common/context";
import { PromoPopBox } from "./promoPopbox";
import usePopBox from "../hook/usePopBox";
import { api_promotion_GetPromotionDetail } from "../../service/api/promotion";

const BonusCode = "BwingFIFAWC2022";

const Terms = ({ langId }) => {
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();
	const { setWorldCupBox } = useContext(worldCupPopBox);

	const terms = {
		en: <TermsEN />,
		vn: <TermsVN />
	}[langId];

	const getPromoDetail = async () => {
		const res = await api_promotion_GetPromotionDetail({
			langId,
			BonusCode
		});
		const { errorCode, data, message } = res.data;

		const closePopBox = () => {
			setWorldCupBox({ isOpen: false });
		};

		if (errorCode === 0) {
			setWorldCupBox({
				isOpen: true,
				content: (
					<PromoPopBox data={data} closePopBox={closePopBox} t={t} />
				)
			});
		} else {
			errorPopBox(message || `error`, errorCode);
		}
	};

	return (
		<div className="infoTxt">
			<div className="title">{t("worldCup.date")}</div>
			<div className="time">
				<span>{t("worldCup.eventTitle")}</span> <br />
				{t("worldCup.startsFrom")}{" "}
				<span>{t("worldCup.startsTime")}</span> {t("worldCup.to")}{" "}
				<span>{t("worldCup.endTime")}</span>
			</div>
			<div className="title">{t("worldCup.significantConditions")}</div>
			{terms}
			<button onClick={getPromoDetail}>{t("lbl_MoreDetails")}</button>
		</div>
	);
};

Terms.defaultProps = {
	langId: null
};

Terms.propTypes = {
	langId: PropTypes.string
};

export default Terms;

const TermsEN = () => (
	<>
		<div>
			1. This <span>World Cup Prediction Campaign</span> will accumulate
			member&apos;s deposit to redeem up to max three (<span>3</span>)
			prediction tickets for <span>FIFA WORLD CUP Qatar 2022</span>{" "}
			automatically given by Bwing.
		</div>
		<div>
			2. Event will start by the flowing date above according to
			<span> Vietnam </span> Local Time.
		</div>
		<div>
			3. Deposit accumulate will be calculate from <span>01 August</span>{" "}
			to <span>31 October 2022</span> only. Please use the availability
			tickets to <span>Predict Your Favorite Country Football Team</span>{" "}
			by <span>01 November</span> until <span>20 November 2022</span>.
			(All availability tickets will be revoked by{" "}
			<span>21 November 2022</span> Local Time <span>00:00:00</span> )
		</div>
		<div>
			4. Bwing reserves the right to amend or withdraw the Promotion at
			any time.
		</div>
		<div>
			5. Bwing is the sole arbiter of the Promotion and its decision is
			final.
		</div>
		<div>6. Bwing Standard Terms &amp; Conditions apply.</div>
	</>
);

const TermsVN = () => (
	<>
		<div>
			1. Trong thời gian diễn ra{" "}
			<span>Chương trình Dự đoán World Cup</span>, người chơi sẽ được tính
			tích lũy số tiền nạp để đổi tối đa ba (<span>3</span>) vé dự đoán{" "}
			<span>FIFA WORLD CUP Qatar 2022</span>
		</div>
		<div>
			2. Sự kiện diễn ra trong thời gian quy định bên trên theo giờ
			<span> Việt Nam</span>.
		</div>
		<div>
			3. Tiền nạp tích lũy chỉ được tính từ ngày <span>01 tháng 8 </span>{" "}
			đến <span>31 tháng 10 2022</span> . Vui lòng dùng vé để
			<span> Dự đoán Đội bóng Yêu thích</span> của bạn trước ngày{" "}
			<span>01 tháng 11</span> đến <span>220 tháng 11 2022</span>. (Tất cả
			vé dự đoán sẽ bị hủy vào ngày <span>21 tháng 11 2022</span>,
			00:00:00 giờ Việt Nam)
		</div>
		<div>4. Bwing có quyền hoãn và hủy Khuyến Mãi bất cứ lúc nào.</div>
		<div>
			5. Bwing có quyền đưa ra quyết định duy nhất và quyết định của Bwing
			là quyết định cuối cùng.
		</div>
		<div>6. Điều Khoản & Điều Kiện Chung Bwing áp dụng.</div>
	</>
);
