import React, { useContext } from "react";
import { Trans } from "react-i18next";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { CurrenciesEnum } from "@ailab-desktop/common";
import { userInfoContext } from "../common/context";
import path from "../../router";

const DepositInfoMoule = ({
	t,
	langId,
	depositOptions,
	depositType,
	setDepositType,
	checked,
	onSubmit,
	children,
	canSubmit,
	submitHandle
}) => {
	const judgeBtnStatus = async () => {
		if (checked && canSubmit) {
			await onSubmit();
			submitHandle();
		}
	};
	const classStyle = () => {
		let result = "";
		if (canSubmit && checked) {
			result = "btn-check";
		} else {
			result = canSubmit ? "darkGray" : "orange";
		}
		return result;
	};

	const {
		userInfo: { currencyId }
	} = useContext(userInfoContext);

	return (
		<div className="infoModule">
			<div className="inside-title icon">
				<span>{t("lbl_Deposit")}</span>
				<Link
					className="icon icon-friend"
					to={`/${langId}/${path.referral.root}`}
				>
					<span>{t("lbl_Refer_friends_rewards")}</span>
				</Link>
			</div>

			<div className="subModuleListColumn">
				<p className="txt-white">{t("lbl_DepositOptionHint")}</p>

				<div className="subModuleTitle">
					<span>
						<i className="txt-blue">*</i>
						{t("lbl_DepositOptions")}
					</span>{" "}
				</div>
				<div className="subModule">
					<div>
						{depositOptions.map(item => {
							const finalDisplayLabelKey =
								currencyId === CurrenciesEnum.VN &&
								item.depositDisplaykey === "lbl_DepositType9"
									? "lbl_DepositType3"
									: item.depositDisplaykey;

							return (
								<button
									onClick={() => setDepositType(item.type)}
									className={
										item.type === depositType
											? "active"
											: ""
									}
									key={`${item.type}-key`}
								>
									<div className={item.iconClass}>
										<i className="icon icon-checkmark" />
									</div>
									<div className="bank">
										<div>{t(finalDisplayLabelKey)}</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>

				{children}

				<div className="btnGroup">
					<button onClick={judgeBtnStatus} className={classStyle()}>
						{canSubmit ? t("lbl_Submit") : t("lbl_DepositStatus1")}
					</button>
				</div>
			</div>
			<div className="important">
				<div className="title">
					<span className="icon icon-warning" />{" "}
					{t("lbl_ImportantNotice")}
				</div>
				<ol>
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
				</ol>
			</div>
		</div>
	);
};

DepositInfoMoule.defaultProps = {
	checked: true,
	canSubmit: true
};

DepositInfoMoule.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	depositOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
	depositType: PropTypes.string.isRequired,
	setDepositType: PropTypes.func.isRequired,
	checked: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	canSubmit: PropTypes.bool,
	submitHandle: PropTypes.func.isRequired
};

export default DepositInfoMoule;
