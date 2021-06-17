import React from "react";
import { Trans } from "react-i18next";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import path from "../../router";

const DepositnewInfoMoule = ({
	t,
	langId,
	depositOptions,
	depositType,
	setDepositType,
	checked,
	onSubmit,
	children
}) => {
	return (
		<div className="infoModule">
			<div className="inside-title icon">
				<span>{t("lbl_Deposit")}</span>
				<Link
					className="icon icon-friend"
					to={`/${langId}/${path.referral.root}`}>
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
				</ol>
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
	children: PropTypes.node.isRequired
};

export default DepositnewInfoMoule;
