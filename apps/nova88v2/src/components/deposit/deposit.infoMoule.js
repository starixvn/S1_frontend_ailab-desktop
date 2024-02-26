import React, { useState } from "react";
import { Trans } from "react-i18next";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import path from "../../router";
import { setLocalStorage } from "../common/common";
import defPopBoxType from "../common/defPopBoxType";
import useClickOutside from "../hook/useClickOutSide";
import { defDepositType } from "./deposit.def";
import { currencyCode } from "../../datas/countryCode";

const DepositInfoMoule = ({
	t,
	langId,
	currencyId,
	depositOptions,
	depositType,
	setDepositType,
	checked,
	onSubmit,
	saveInfoChecked,
	setSaveInfoChecked,
	processingDescriptionActive,
	onReset,
	children,
	userName,
	setPopBox,
	canSubmit,
	submitHandle
}) => {
	const [rememberInfoActive, setRememberInfoActive] = useState(false);
	const questionIconRef = useClickOutside(() => setRememberInfoActive(false));
	const judgeBtnStatus = async () => {
		if (checked && canSubmit) {
			await onSubmit();
		}
	};
	const classStyle = () => {
		let result = "";
		if (canSubmit && checked) {
			result = "btn-check";
		} else {
			result = canSubmit ? "darkGray" : "btn-org";
		}
		return result;
	};

	// * 幣別 idr 才顯示說明7
	const isIDR = currencyId === currencyCode.ID;

	return (
		<div className="infoModule">
			<div className="inside-title">
				<span className="icon icon-icon32px_deposit">
					{t("lbl_Deposit")}
				</span>
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
										`${userName}-nova88depositquerySavedChecked`,
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
						{depositOptions?.map(item => (
							<button
								onClick={() => {
									if (item.linePayLink) {
										setPopBox({
											isOpen: true,
											popBoxType: defPopBoxType.LinePay,
											clickClose: () =>
												setPopBox({ isOpen: false }),
											langId,
											linePayLink: item.linePayLink
										});
									} else {
										setDepositType(item.type);
										onReset();
									}
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
								</div>
							</button>
						))}
					</div>
				</div>

				{children}

				{/* TODO: 可以慢慢將邏輯拆分到各個Form表單頁面 */}
				{/* NOTE: 將 cryptoPay 移動到 cryptoPayForm 裏，因此不渲染 */}
				{depositType !== defDepositType.cryptoPay && (
					<div className="btnGroup">
						<button
							onClick={async () => {
								await judgeBtnStatus();
								submitHandle();
							}}
							className={classStyle()}>
							{canSubmit
								? t("lbl_Submit")
								: t("lbl_DepositStatus1")}
						</button>
					</div>
				)}

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
									<button
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
					{isIDR && (
						<li>
							<Trans
								i18nKey="lbl_DepositImportantNoticeContent7"
								components={{
									Link: (
										<button
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
					)}
				</ul>
			</div>
		</div>
	);
};

DepositInfoMoule.defaultProps = {
	checked: true,
	userName: null,
	depositType: null,
	canSubmit: true
};

DepositInfoMoule.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	currencyId: PropTypes.number.isRequired,
	depositOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
	depositType: PropTypes.string,
	setDepositType: PropTypes.func.isRequired,
	checked: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
	onReset: PropTypes.func.isRequired,
	saveInfoChecked: PropTypes.bool.isRequired,
	setSaveInfoChecked: PropTypes.func.isRequired,
	processingDescriptionActive: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
	userName: PropTypes.string,
	canSubmit: PropTypes.bool,
	setPopBox: PropTypes.func.isRequired,
	submitHandle: PropTypes.func.isRequired
};

export default DepositInfoMoule;
