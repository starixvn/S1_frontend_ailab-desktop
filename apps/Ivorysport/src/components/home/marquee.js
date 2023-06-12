import React, { Component, useContext, createRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { api_message_GetAnnouncement } from "../../service/api/message";
import { userInfoContext } from "../common/context";
import { GET_LANG_ID } from "../../service/language";
import path from "../../router";
import useHandleLogin from "../hook/useHandleLogin";
import usePopBox from "../hook/usePopBox";
import { getCurrencyCode } from "../common/common";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { handleLogin } = useHandleLogin();
	const { errorPopBox } = usePopBox();
	const langId = GET_LANG_ID(userInfo.langId);
	const currencyId = userInfo.currencyId
		? userInfo.currencyId
		: getCurrencyCode(userInfo.langId);

	return (
		<Marquee
			langId={langId}
			i18n={t}
			isLogin={userInfo.isLogin}
			handleLogin={handleLogin}
			navigate={navigate}
			errorPopBox={errorPopBox}
			currencyId={currencyId}
		/>
	);
};

class Marquee extends Component {
	SetPos = () => {
		if (this.isMountedRef && this.state.prev !== null) {
			const _style = window.getComputedStyle(this.content.current, null);
			const contentBox = parseFloat(_style.width);

			this.setState(prev => {
				if (prev.pos <= -contentBox) {
					const style = window.getComputedStyle(
						this.marquee.current,
						null
					);
					const outerBox = parseFloat(style.width);

					return { pos: outerBox };
				}
				return { pos: prev.pos - 2.0 };
			});
		}
	};

	GetAnnouncement = (langId, currencyId) => {
		api_message_GetAnnouncement({ langId, currencyId }).then(
			res => {
				if (this.isMountedRef) {
					if (res.data.errorCode === 0) {
						const resData = res.data.data;
						const stateData = this.state.datas;
						let update = false;

						if (resData.length !== 0 && stateData.length !== 0) {
							for (const d in resData) {
								if (
									stateData.find(
										x =>
											x.id === resData[d].id &&
											x.subject === resData[d].subject &&
											x.content === resData[d].content
									)
								) {
									update = true;
									break;
								}
							}
						} else {
							update = true;
						}

						if (update) {
							if (this.intervalId_Pos === undefined) {
								this.intervalId_Pos = setInterval(
									this.SetPos,
									20
								);
							}
						}

						this.setState({
							datas: res.data.data
						});
					} else {
						// 首頁一直出現未如預期的錯誤錯誤，故先隱藏此錯誤處理再看是否還會發生相同情況
						// this.props.errorPopBox(
						// 	res.data.message || "error",
						// 	res.data.errorCode
						// );
					}
				}
			},
			() => {
				if (this.isMountedRef) {
					// 首頁一直出現未如預期的錯誤錯誤，故先隱藏此錯誤處理再看是否還會發生相同情況
					// this.props.errorPopBox();
				}
			}
		);
	};

	MarqueeOnMouseOver = () => {
		clearInterval(this.intervalId_Pos);
	};

	MarqueeOnMouseOut = () => {
		clearInterval(this.intervalId_Pos);
		this.intervalId_Pos = setInterval(this.SetPos, 25);
	};

	ClickMarquee = () => {
		if (this.props.isLogin) {
			this.props.navigate(
				`/${this.props.langId}/${path.announcement.root}`
			);
		} else {
			this.props.handleLogin();
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			datas: [],
			pos: null
		};

		this.isMountedRef = false;
		this.marquee = createRef();
		this.content = createRef();
	}

	componentDidMount = () => {
		this.isMountedRef = true;
		this.GetAnnouncement(this.props.langId, this.props.currencyId);
		this.intervalId = setInterval(
			this.GetAnnouncement.bind(this, this.props.langId),
			60000
		);
	};

	componentDidUpdate = () => {
		if (this.state.pos === null && this.isMountedRef) {
			const style = window.getComputedStyle(this.marquee.current, null);
			const pos = parseFloat(style.width);

			// eslint-disable-next-line
			this.setState({ pos });
		}
	};

	componentWillUnmount = () => {
		this.isMountedRef = false;
		clearInterval(this.intervalId);
		clearInterval(this.intervalId_Pos);
	};

	render() {
		const arr = this.state.datas.map(item => (
			<button
				className="white"
				key={`announcement-${item.id}`}
				style={{ paddingLeft: "2rem" }}
				onClick={this.ClickMarquee}
				onMouseOver={this.MarqueeOnMouseOver}
				onMouseOut={this.MarqueeOnMouseOut}
				onFocus={() => 0}
				onBlur={() => 0}
			>
				{item.subject}
			</button>
		));

		const style = this.state.pos === null ? {} : { left: this.state.pos };
		return (
			<div id="Marquee">
				<div
					className="marquee-box icon icon-marquee"
					ref={this.marquee}
				>
					<div
						className="marquee-run"
						ref={this.content}
						style={style}
					>
						{arr}
					</div>
					<div className="mq-btn">
						<button className="active" />
						<button />
						<button />
					</div>
				</div>
			</div>
		);
	}
}

Marquee.defaultProps = {
	langId: null,
	// errorPopBox: () => null,
	isLogin: null,
	navigate: () => null,
	handleLogin: () => null,
	currencyId: null
};

Marquee.propTypes = {
	langId: PropTypes.string,
	// errorPopBox: PropTypes.func,
	isLogin: PropTypes.bool,
	navigate: PropTypes.func,
	handleLogin: PropTypes.func,
	currencyId: PropTypes.number
};
