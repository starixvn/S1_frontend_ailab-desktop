import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import path from "../../router";

const DepositnewInfoMoule = ({
	t,
	langId,
	depositOptions,
	depositType,
	setDepositType,
	checked,
	onSubmit,
	processingDescriptionActive,
	children
}) => {
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
				<div className="subModule">
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_DepositOptions")}
					</div>
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
	processingDescriptionActive: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired
};

export default DepositnewInfoMoule;
