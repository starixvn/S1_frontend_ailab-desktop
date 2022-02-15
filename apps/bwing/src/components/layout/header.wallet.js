import React, {
	Component,
	createRef,
	useContext,
	useEffect,
	useRef
} from "react";
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

export default props => {
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
			{...props}
			lastLogin={userInfo.lastLogin}
			currencyId={userInfo.currencyId}
			bonusWallets={bonusWallets}
			_isConvert={isConvert(userInfo.currencyId)}
			handleIsHideBalance={HandleIsHideBalance}
			RefreshAllWallets={RefreshAllWallets}
			mainWallet={mainWallet}
			tpWallets={tpWallets}
			isHideBalance={isHideBalance}
			lastLogin={userInfo.lastLogin}
		/>
	) : (
		<></>
	);
};

class Dropdown extends Component {
	constructor(props) {
		super(props);
		if (typeof document !== `undefined`) {
			document.addEventListener("mousedown", this.handleClickOutside);
		}
		this.state = { isOpen: false };
		this.wrapper = createRef(null);
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

		const balance = !isNaN(mainWallet.balance)
			? number_format({ number: mainWallet.balance + tpWalletsBonusSum })
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
				className={`wallet icon icon-balance${
					this.state.isOpen ? " active" : ""
				}`}
				ref={this.wrapper}
				onClick={this.clickDropdown}>
				<button>
					{this.props.currencyId === 51 ? "VNĐ" : "$"}&nbsp;
					{isHideBalance ? "*****" : balance}
				</button>
				<button
					aria-label="HandleDisplayBalance"
					value={!isHideBalance}
					onClick={_handleIsHideBalance}
					className={`icon icon-eye${
						isHideBalance ? "-blocked" : ""
					}`}
				/>
				<i className="icon icon-arrow_drop_down" />
				<div className="submenu">
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
						_isConvert={this.props._isConvert}
					/>

					{tpWalletRows}

					<div className="btnGroup">
						<Link
							to={`${this.props.langId}/${path.deposit.root}`}
							className="blue">
							{this.props.i18n("lbl_Deposit").toUpperCase()}
						</Link>
						<Link
							to={`${this.props.langId}/${path.transferFunds.root}`}
							className="blue">
							{this.props.i18n("lbl_TransferFunds").toUpperCase()}
						</Link>
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

const BonusWalletRows = ({ bonusWallets, i18n, mainWallet }) => {
	return (
		<div className="walletBalance">
			<div className="walletName">
				<span>{i18n("lbl_MainWallet")}</span>
				<span>{number_format({ number: mainWallet.balance })}</span>
			</div>
			{bonusWallets.map(item => {
				return (
					<div
						className="walletProgerss"
						key={`header-bonuswallet-${item.tpId}`}>
						<div>
							<span>
								{i18n(
									`lbl_BonusWallet_${item.promoCategoryId}`
								)}
							</span>
							<span>{number_format({ number: item.bonus })}</span>
						</div>
						<HeaderProcessBar
							turnover={item.turnover}
							rollover={item.rollover}
						/>
					</div>
				);
			})}
		</div>
	);
};

Dropdown.propTypes = {
	i18n: PropTypes.func.isRequired
};
