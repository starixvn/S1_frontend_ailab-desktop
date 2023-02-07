import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";
import { popBoxContext } from "./context";

const PopBoxDepositMsg = ({ transId, depositMessageDetail }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { t } = useTranslation();
	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};

	return (
		<div className="statuspop">
			<img src={`${bannerImgUrl}/desktop/img/noticea.png`} alt="" />
			<div className="statustitle">
				{transId} {t("lbl_Message")}
			</div>
			<div className="statuscontent">
				{depositMessageDetail
					.sort(
						(
							{ createTime: createTimeA },
							{ createTime: createTimeB }
						) => {
							if (createTimeA < createTimeB) {
								return 1;
							}
							if (createTimeA > createTimeB) {
								return -1;
							}
							return 0;
						}
					)
					.map(({ createTime, errorTypeName, message }) => (
						<div>
							<div className="subtitle">{errorTypeName}</div>
							<div>
								{moment(createTime).format(
									"MM/DD/YYYY  hh:mm:ss A (Z)"
								)}
							</div>
							<div>{message}</div>
						</div>
					))}
			</div>
			<button className="success" onClick={closePopBox}>
				{t("lbl_OK")}
			</button>
		</div>
	);
};

export default PopBoxDepositMsg;

PopBoxDepositMsg.defaultProps = {
	depositMessageDetail: []
};

PopBoxDepositMsg.propTypes = {
	transId: PropTypes.string.isRequired,
	depositMessageDetail: PropTypes.arrayOf(PropTypes.any)
};
