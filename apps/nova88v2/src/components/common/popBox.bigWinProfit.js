import React, { useContext } from "react";
import { useTranslation, Trans } from "react-i18next";
import PropTypes from "prop-types";
import { popBoxContext, userInfoContext } from "./context";
import { number_format } from "./common";
import { bannerImgUrl } from "../../config";

const BigWinProfit = ({ bigWinData }) => {
	const { t } = useTranslation();
	const {
		userInfo: { currencyId }
	} = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};

	return (
		<div className="bigwin">
			<div className="bigwinpop active en">
				<div className="bigwinpop-item">
					<div className="bigwinpop-img" />
					<div className="bigwinpop-text">
						<div>
							<Trans
								i18nKey="lbl_BigWinProfit_Description1"
								values={{
									userName: bigWinData?.userName ?? "-"
								}}
								components={{
									div: <div className="name" />
								}}
							/>
						</div>
						<div>
							<Trans
								i18nKey="lbl_BigWinProfit_Description2"
								values={{
									venderName: bigWinData?.gameName ?? "-"
								}}
								components={{
									button: <button className="vender" />,
									span: <sapn />
								}}
							/>
						</div>
					</div>
					<div className="bigwinpop-number">
						${t(`Currency_${currencyId}`)}{" "}
						{number_format(bigWinData?.amount ?? 0)}
					</div>
					<img
						className="money"
						src={`${bannerImgUrl}/desktop/img/4.0/money.gif`}
						alt=""
					/>
					<img
						className="money-two"
						src={`${bannerImgUrl}/desktop/img/4.0/money.gif`}
						alt=""
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/promosBackPopup/delet.png`}
						alt=""
						className="closepop"
						onClick={closePopBox}
					/>
				</div>
			</div>
		</div>
	);
};

export default BigWinProfit;

BigWinProfit.defaultProps = {
	bigWinData: {}
};

BigWinProfit.propTypes = {
	bigWinData: PropTypes.objectOf(PropTypes.any)
};
