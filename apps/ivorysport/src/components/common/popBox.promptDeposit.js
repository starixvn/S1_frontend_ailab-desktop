import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { userInfoContext } from "./context";
import { setCookie, deleteCookie } from "./common";

export const PromptDeposit = ({ onClickClose }) => {
	const isMountedRef = useRef(null);
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [selectDontShow, setSelectDontShow] = useState(false);
	const settingCookie = `promptDeposit${userInfo.userName}`;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const onChangeDontShow = () => {
		setSelectDontShow(prev => {
			const check = !prev;
			if (check) {
				setCookie(settingCookie, "1", 1);
			} else {
				deleteCookie(settingCookie);
			}
			return check;
		});
	};

	return (
		<div className="noticepop active">
			<div className="icon icon-icon32px_Profile" />
			<div className="title">{t("lbl_ImportantNote")}</div>
			<div>{t("lbl_Popbox_promptDeposit")}</div>
			<div className="btnGroup">
				<button
					className="btn-check"
					onClick={() => {
						onClickClose();
					}}
				>
					{t("lbl_OK")}
				</button>
			</div>
			<div className="checkbox">
				<input
					type="checkbox"
					id="home-popbox-promptDeposit"
					onChange={onChangeDontShow}
					checked={selectDontShow}
				/>
				<label
					htmlFor="home-popbox-promptDeposit"
					className="icon icon-checkbox-checked"
				/>
				{t("lbl_Dont_show_me_again")}
			</div>
		</div>
	);
};

PromptDeposit.defaultProps = {
	onClickClose: () => null
};

PromptDeposit.propTypes = {
	onClickClose: PropTypes.func
};
