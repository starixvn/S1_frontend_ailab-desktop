import React, {
	Component,
	createRef,
	useContext,
	useEffect,
	useRef
} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import moment from "moment";
import path from "../../router";
import { walletInfoContext, userInfoContext } from "../common/context";
import { isConvert, number_format } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import HeaderProcessBar from "./header.processBar";
import {
	GetAllWallets,
	handleIsHideBalance
} from "../common/wrapper.walletInfo";
import usePopBox from "../hook/usePopBox";
import allowedCurrencyList from "../../datas/allowedCurrencyList";

export default ({ i18n }) => {
	const { isHideBalance, mainWallet, tpWallets, bonusWallets, dispatch } =
		useContext(walletInfoContext);
	const { userInfo } = useContext(userInfoContext);
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
			langId: userInfo.langId,
			isLogin: userInfo.isLogin,
			dispatch,
			errorPopBox
		});
	};

	return userInfo.isLogin && userInfo.currencyId !== undefined ? (
		<Dropdown
			i18n={i18n}
			langId={userInfo.langId}
			currencyId={userInfo.currencyId}
			mainWallet={mainWallet}
			tpWallets={tpWallets}
			isHideBalance={isHideBalance}
			bonusWallets={bonusWallets}
			_isConvert={isConvert(userInfo.currencyId)}
			handleIsHideBalance={HandleIsHideBalance}
			RefreshAllWallets={RefreshAllWallets}
			lastLogin={userInfo.lastLogin}
		/>
	) : null;
};

class Dropdown extends Component {
	constructor(props) {
		super(props);
		if (typeof document !== `undefined`) {
			document.addEventListener("mousedown", this.handleClickOutside);
		}
		this.state = { isOpen: false };
		this.wrapper = createRef(null);
		this.intervalId = createRef(null);
	}

	handleClickOutside = e => {
		if (this.wrapper.current && !this.wrapper.current.contains(e.target)) {
			this.setState({ isOpen: false });
		}
	};

	clickDropdown = e => {
		e.preventDefault();
		this.setState(prev => ({ isOpen: !prev.isOpen }));
	};

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
			? number_format(
					mainWallet.balance + tpWalletsBonusSum + bonusWalletsSum,
					this.props._isConvert
			  )
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
							<span>
								{number_format(
									t.balance,
									this.props._isConvert
								)}
							</span>
						</div>
					</div>
				);
			});

		return (
			<div
				className={classNames("home-balance", {
					active: this.state.isOpen
				})}
				ref={this.wrapper}
				onClick={this.clickDropdown}>
				<a className="wallet"> {this.props.i18n("lbl_Balance")} </a>

				<div className="balance-money">
					<ReloadSpin
						className="icon-spinner"
						btnActive={false}
						func={this.props.RefreshAllWallets}
					/>

					{`${
						this.props.currencyId === 51
							? "VNĐ"
							: this.props.i18n(
									`Currency_${this.props.currencyId}`
							  )
					} ${isHideBalance ? "" : balance}`}

					<button
						aria-label="HandleDisplayBalance"
						value={!isHideBalance}
						onClick={_handleIsHideBalance}
						className={classNames({
							"icon-plus": isHideBalance,
							"icon-minus": !isHideBalance
						})}
					/>
				</div>

				<div className="balance-submenu">
					<div className="balance">
						<span>
							{`${this.props.i18n(
								`Currency_${this.props.currencyId}`
							)}`}
						</span>
						<span>
							{balance}
							<ReloadSpin
								btnActive={false}
								func={this.props.RefreshAllWallets}
							/>
						</span>
					</div>

					<BonusWalletRows
						bonusWallets={bonusWallets}
						i18n={this.props.i18n}
						mainWallet={mainWallet}
						_isConvert={this.props._isConvert}
					/>

					{tpWalletRows}

					<div className="btnGroup">
						<Link
							to={`/${this.props.langId}/${path.withdrawal.root}`}
							className="orange">
							{this.props.i18n("lbl_Withdrawal")}
						</Link>
						{allowedCurrencyList.transferFunds.includes(
							this.props.currencyId
						) && (
							<Link
								to={`/${this.props.langId}/${path.transferFunds.root}`}
								className="orange">
								{this.props.i18n("lbl_TransferFunds")}
							</Link>
						)}
					</div>
					<div className="loginLog">
						<span>{this.props.i18n("lbl_LastLogin")}</span>
						<span>
							{this.props.lastLogin
								? moment(this.props.lastLogin).format("l LTS")
								: null}
						</span>
					</div>
					<div className="transactionLog">
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

const BonusWalletRows = ({ bonusWallets, i18n, mainWallet, _isConvert }) => {
	return (
		<div className="walletBalance">
			<div className="walletName">
				<span>{i18n("lbl_MainWallet")}</span>
				<span>{number_format(mainWallet.balance, _isConvert)}</span>
			</div>
			{bonusWallets.map(item => {
				return (
					<React.Fragment key={`header-bonuswallet-${item.tpId}`}>
						<div className="bouns">
							<span>
								{i18n(
									`lbl_BonusWallet_${item.promoCategoryId}`
								)}
							</span>
							<span>{number_format(item.bonus)}</span>
						</div>
						<HeaderProcessBar
							turnover={item.turnover}
							rollover={item.rollover}
						/>
						walletBalance
					</React.Fragment>
				);
			})}
		</div>
	);
};

Dropdown.propTypes = {
	i18n: PropTypes.func.isRequired
};
