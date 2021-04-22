import React, { useState, useEffect } from "react";
import { Trans } from "react-i18next";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import path from "../../router";
import { setLocalStorage, getLocalStorage } from "../common/common";

const DepositnewInfoMoule = ({
	t,
	langId,
	depositOptions,
	depositType,
	setDepositType,
	checked,
	onSubmit,
	saveInfoChecked,
	setSaveInfoChecked,
	processingDescriptionActive,
	children
}) => {
	const [rememberInfoActive, setRememberInfoActive] = useState(false);

	return (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_deposit">
				<span>{t("lbl_Deposit")}</span>
				<div>{t("lbl_DepositOptionHint")}</div>

				<Link
					className="icon icon-friend"
					to={`/${langId}/${path.referral.root}`}>
					<span>{t("lbl_Refer_friends_rewards")}</span>
				</Link>
			</div>
			<div className="subModuleListColumn">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_DepositOptions")}
					<div className="checkbox autotransfer">
						<input
							checked={saveInfoChecked}
							type="checkbox"
							id="c1"
							onChange={() => {
								setSaveInfoChecked(!saveInfoChecked);
								setLocalStorage(
									"nova88depositquerySavedChecked",
									!saveInfoChecked
								);
							}}
						/>
						<label
							htmlFor="c1"
							className="icon icon-checkbox-checked"
						/>
						{t("lbl_DepositLocalbankButton")}
						<button
							className="icon icon-question"
							onClick={() =>
								setRememberInfoActive(!rememberInfoActive)
							}
						/>
						<div
							className={`inputInfo${
								rememberInfoActive ? " active" : ""
							}`}>
							{t("lbl_DepositLocalbankButtonInfo")}
						</div>
					</div>
				</div>

				<div className="subModule">
					<div>
						{depositOptions.map(item => (
							<button
								onClick={() => setDepositType(item.type)}
								className={
									item.type === depositType ? "active" : ""
								}
								key={`${item.type}-key`}>
								<div className={item.iconClass}>
									<i className="icon icon-icon32px_check" />
								</div>

								<div className="bank">
									<div>{t(item.depositDisplaykey)}</div>
									<div>
										{t("lbl_CreditTime")} ：
										{t(item.creditTime)}
									</div>
								</div>
							</button>
						))}
					</div>
				</div>

				{children}

				<div className="btnGroup">
					<button
						onClick={onSubmit}
						className={checked ? "btn-check" : "darkGray"}>
						{t("lbl_Submit")}
					</button>
				</div>

				{processingDescriptionActive ? (
					<div className="text-center">
						{t("lbl_DepositProcessingDescription")}
					</div>
				) : null}
			</div>

			<div className="important">
				<div className="title">
					<span className="icon icon-information" />
					{t("lbl_ImportantNotice")}
				</div>
				<ul>
					<li>{t("lbl_DepositImportantNoticeContent1")}</li>
					<li>
						<Trans
							i18nKey="lbl_DepositImportantNoticeContent2"
							components={{
								span: <span />
							}}
						/>
					</li>
					<li>
						<Trans
							i18nKey="lbl_DepositImportantNoticeContent3"
							components={{
								span: <span />
							}}
						/>
					</li>
					<li>
						<Trans
							i18nKey="lbl_DepositImportantNoticeContent4"
							components={{
								span: <span />
							}}
						/>
					</li>
					<li>{t("lbl_DepositImportantNoticeContent5")}</li>
					<li>
						<Trans
							i18nKey="lbl_DepositImportantNoticeContent6"
							components={{
								Link: (
									<a
										onClick={() =>
											window.LiveChatWidget.call(
												"maximize"
											)
										}
									/>
								)
							}}
						/>
					</li>
				</ul>
			</div>
		</div>
	);
};

DepositnewInfoMoule.defaultProps = {
	checked: true
};

DepositnewInfoMoule.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	depositOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
	depositType: PropTypes.string.isRequired,
	setDepositType: PropTypes.func.isRequired,
	checked: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
	saveInfoChecked: PropTypes.bool.isRequired,
	setSaveInfoChecked: PropTypes.func.isRequired,
	processingDescriptionActive: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired
};

export default DepositnewInfoMoule;
