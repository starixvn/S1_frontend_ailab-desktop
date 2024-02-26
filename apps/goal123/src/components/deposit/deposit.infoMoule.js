import React from "react";
import { Trans } from "react-i18next";
import PropTypes from "prop-types";
import { Link } from "gatsby";
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
		}
	};
	const classStyle = () => {
		let result = "";
		if (canSubmit && checked) {
			result = "btn-check";
		} else {
			result = canSubmit ? "darkGray" : "yellow";
		}
		return result;
	};
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
					<span>
						<i className="txt-blue">*</i>
					</span>
					{t("lbl_DepositOptions")}
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
									<i className="icon icon-checkmark" />
								</div>
								<div className="bank">
									<div>{t(item.depositDisplaykey)}</div>
								</div>
							</button>
						))}
					</div>
				</div>

				{children}

				<div className="btnGroup">
					<button
						onClick={async () => {
							await judgeBtnStatus();
							submitHandle();
						}}
						className={classStyle()}>
						{canSubmit ? t("lbl_Submit") : t("lbl_DepositStatus1")}
					</button>
				</div>
			</div>

			<div className="importantNo">
				<div className="title">
					<span className="icon icon-warning" />{" "}
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
				</ul>
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
