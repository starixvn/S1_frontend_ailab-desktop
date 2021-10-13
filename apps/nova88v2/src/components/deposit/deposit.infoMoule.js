import React, { useState } from "react";
import { Trans } from "react-i18next";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import path from "../../router";
import { setLocalStorage } from "../common/common";
import useClickOutside from "../hook/useClickOutSide";

const DepositInfoMoule = ({
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
	onReset,
	children
}) => {
	const [rememberInfoActive, setRememberInfoActive] = useState(false);

	const questionIconRef = useClickOutside(() => setRememberInfoActive(false));

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
						<div className="swithModule">
							<button
								className={`switchBtn ${
									saveInfoChecked ? " active" : ""
								}`}
								onClick={() => {
									setSaveInfoChecked(!saveInfoChecked);
									setLocalStorage(
										"nova88depositquerySavedChecked",
										!saveInfoChecked
									);
								}}>
								<span>ON</span>
								<span>OFF</span>
								<div
									className={saveInfoChecked ? "active" : ""}
								/>
							</button>
						</div>
						{t("lbl_DepositLocalbankButton")}
						<button
							ref={questionIconRef}
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
								onClick={() => {
									setDepositType(item.type);
									onReset();
								}}
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
					<span className="icon icon-warning" />
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

DepositInfoMoule.defaultProps = {
	checked: true
};

DepositInfoMoule.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	depositOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
	depositType: PropTypes.string.isRequired,
	setDepositType: PropTypes.func.isRequired,
	checked: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
	onReset: PropTypes.func.isRequired,
	saveInfoChecked: PropTypes.bool.isRequired,
	setSaveInfoChecked: PropTypes.func.isRequired,
	processingDescriptionActive: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired
};

export default DepositInfoMoule;
