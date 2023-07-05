import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import path from "../../router";

const VipBottom = ({ langId, isLogin }) => {
	const { t } = useTranslation();
	return langId ? (
		<div className="vip-bottom">
			<div className="vip-bottom-item">
				{/* Link 包在最外層會覆蓋到 css 故分別包在裡面 */}
				<Link
					to={`/${langId}/${path.join.root}`}
					style={isLogin ? { pointerEvents: "none" } : {}}
				>
					<img
						src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/benefit-1.png`}
						alt=""
					/>
				</Link>
				<span>{t("lbl_Vip_TopPriorityServices")}</span>
			</div>
			<div className="vip-bottom-item">
				<Link
					to={`/${langId}/${path.join.root}`}
					style={isLogin ? { pointerEvents: "none" } : {}}
				>
					<img
						src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/benefit-2.png`}
						alt=""
					/>
				</Link>
				<span>{t("lbl_Vip_ExclusivePromo")}</span>
			</div>
			<div className="vip-bottom-item">
				<Link
					to={`/${langId}/${path.join.root}`}
					style={isLogin ? { pointerEvents: "none" } : {}}
				>
					<img
						src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/benefit-3.png`}
						alt=""
					/>
				</Link>
				<span>{t("lbl_Vip_BirthdaySpecialGifts")}</span>
			</div>
			<div className="vip-bottom-item">
				<Link
					to={`/${langId}/${path.join.root}`}
					style={isLogin ? { pointerEvents: "none" } : {}}
				>
					<img
						src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/benefit-4.png`}
						alt=""
					/>
				</Link>
				<span>{t("lbl_Vip_LifetimeMembership")}</span>
			</div>
		</div>
	) : null;
};

VipBottom.defaultProps = {
	isLogin: null
};

VipBottom.propTypes = {
	langId: PropTypes.string.isRequired,
	isLogin: PropTypes.bool
};

export default VipBottom;
