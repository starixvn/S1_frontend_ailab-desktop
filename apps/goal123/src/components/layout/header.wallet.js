import React, {
	Component,
	createRef,
	useContext,
	useEffect,
	useRef
} from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import classNames from "classnames";
import path from "../../router";
import { walletInfoContext, userInfoContext } from "../common/context";
import ReloadSpin from "../common/reloadSpin";
import HeaderProcessBar from "./header.processBar";
import { isConvert, number_format } from "../common/common";
import {
	GetAllWallets,
	handleIsHideBalance
} from "../common/wrapper.walletInfo";
import usePopBox from "../hook/usePopBox";

export default props => {
	const { isHideBalance, mainWallet, tpWallets, bonusWallets, dispatch } =
		useContext(walletInfoContext);
	const {
		userInfo: { langId, isLogin, currencyId, lastLogin }
	} = useContext(userInfoContext);
	const { errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const HandleIsHideBalance = e => {
		e.stopPropagation();
		const value = e.target.value === "true";
		handleIsHideBalance({ dispatch, value, errorPopBox });
	};

	const RefreshAllWallets = () => {
		GetAllWallets({
			langId,
			isLogin,
			dispatch,
			errorPopBox
		});
	};

	return isLogin && currencyId !== undefined ? (
		<Dropdown
			{...props}
			lastLogin={lastLogin}
			currencyId={currencyId}
			bonusWallets={bonusWallets}
			_isConvert={isConvert(currencyId)}
			handleIsHideBalance={HandleIsHideBalance}
			RefreshAllWallets={RefreshAllWallets}
			mainWallet={mainWallet}
			tpWallets={tpWallets}
			isHideBalance={isHideBalance}
		/>
	) : null;
};

class Dropdown extends Component {
	handleClickOutside = e => {
		if (this.wrapper.current && !this.wrapper.current.contains(e.target)) {
			this.setState({ isOpen: false });
		}
	};

	clickDropdown = e => {
		e.preventDefault();
		this.setState(prev => ({ isOpen: !prev.isOpen }));
	};

	constructor(props) {
		super(props);
		if (typeof document !== `undefined`) {
			document.addEventListener("mousedown", this.handleClickOutside);
		}
		this.state = { isOpen: false };
		this.wrapper = createRef(null);
		this.intervalId = createRef(null);
	}

	// * 定時更新錢包資訊
	componentDidMount() {
		const newIntervalId = setInterval(() => {
			this.props.RefreshAllWallets();
		}, 30000);

		this.intervalId.current = newIntervalId;
	}

	componentWillUnmount() {
		clearInterval(this.intervalId.current);
	}

	render() {
		const {
			isHideBalance,
			tpWallets,
			mainWallet,
			bonusWallets,
			handleIsHideBalance: _handleIsHideBalance
		} = this.props;

		const tpWalletsBonusSum = tpWallets.reduce((prev, curr) => {
			return prev + curr.balance;
		}, 0);

		const bonusWalletsSum = bonusWallets.reduce((prev, curr) => {
			return prev + curr.bonus;
		}, 0);

		const balance = !isNaN(mainWallet.balance)
			? number_format({
					number:
						mainWallet.balance + tpWalletsBonusSum + bonusWalletsSum
			  })
			: 0;

		const tpWalletRows = tpWallets
			.sort((a, b) => (a.tpId > b.tpId ? 1 : -1))
			.map(t => {
				return (
					<div
						className="walletBalance"
						key={`header-tpwallet-${t.tpId}`}>
						<div className="walletName">
							<span>{t.displayText}</span>
							<span>{number_format({ number: t.balance })}</span>
						</div>
					</div>
				);
			});

		return (
			<div
				className={`wallet${this.state.isOpen ? " active" : ""}`}
				ref={this.wrapper}
				onClick={this.clickDropdown}>
				<ReloadSpin func={this.props.RefreshAllWallets} />

				<button className="wallet-balance">
					{this.props.currencyId === 51 ? "VNĐ" : "$"} &nbsp;
					<span>{isHideBalance ? "*****" : balance}</span>
				</button>

				<button
					aria-label="HandleDisplayBalance"
					value={!isHideBalance}
					onClick={_handleIsHideBalance}
					className={`icon icon-eye${
						isHideBalance ? "-blocked" : ""
					}`}
				/>

				<div
					className={`home-wallet ${
						this.state.isOpen ? " active" : ""
					}`}>
					<div className="balance">
						<span>
							{this.props.currencyId === 51 ? "VNĐ" : "$"}
						</span>
						<span>
							{balance}
							<ReloadSpin func={this.props.RefreshAllWallets} />
						</span>
					</div>

					<BonusWalletRows
						bonusWallets={bonusWallets}
						i18n={this.props.i18n}
						mainWallet={mainWallet}
					/>
					{tpWalletRows}
					<Link to={`/${this.props.langId}/${path.withdrawal.root}`}>
						<i className="icon-header-withdraw" />
						{this.props.i18n("lbl_Withdrawal")}
					</Link>
					<Link to={`/${this.props.langId}/${path.financial.root}`}>
						<i className="icon-header-financial" />
						{this.props.i18n("lbl_FinancialLog")}
					</Link>
					<div className="log-login">
						<span>{this.props.i18n("lbl_LastLogin")}</span>
						<span>
							{this.props.lastLogin
								? moment(this.props.lastLogin).format("l LTS")
								: null}
						</span>
					</div>
					<div className="log-transaction">
						<span>{this.props.i18n("lbl_LastTransaction")}</span>
						<span>
							{mainWallet.lastTransaction
								? moment(mainWallet.lastTransaction).format(
										"l LTS"
								  )
								: null}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

const BonusWalletRows = ({ bonusWallets, i18n, mainWallet }) => {
	return (
		<>
			{bonusWallets.map(item => {
				return (
					<div
						key={`header-bonuswallet-${item.tpId}`}
						className="balance-bouns">
						<div className="bouns-data">
							<span className="title">
								{i18n(
									`lbl_BonusWallet_${item.promoCategoryId}`
								)}
							</span>
							<span className="bounscash">
								{number_format({ number: item.bonus })}
							</span>
						</div>
						<HeaderProcessBar
							turnover={item.turnover}
							rollover={item.rollover}
						/>
					</div>
				);
			})}
		</>
	);
};

Dropdown.propTypes = {
	i18n: PropTypes.func.isRequired
};
