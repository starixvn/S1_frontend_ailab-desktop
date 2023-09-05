import React, { Component, useContext } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import ReactMarquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";

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
			datas: []
		};

		this.isMountedRef = false;
	}

	componentDidMount = () => {
		this.isMountedRef = true;
		this.GetAnnouncement(this.props.langId, this.props.currencyId);
	};

	render() {
		const arr = this.state.datas.map(item => (
			<button
				className="white"
				key={`announcement-${item.id}`}
				onClick={this.ClickMarquee}
			>
				{item.subject}
			</button>
		));

		const defaultConfig = {
			direction: "left",
			pauseOnHover: true,
			speed: 50,
			gradient: false
		};

		return (
			<div className="home-marquee">
				<div id="Marquee">
					<div className="marquee-box">
						<div className="marquee-run">
							<ReactMarquee {...defaultConfig}>
								{arr}
							</ReactMarquee>
						</div>
					</div>
				</div>
				<button
					className="livechat-btn"
					onClick={() => window.LiveChatWidget.call("maximize")}
				>
					<img
						src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/livechat.png`}
						alt=""
					/>
					{this.props.i18n("lbl_LiveChat")}
				</button>
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
	currencyId: null,
	i18n: () => null
};

Marquee.propTypes = {
	langId: PropTypes.string,
	// errorPopBox: PropTypes.func,
	isLogin: PropTypes.bool,
	navigate: PropTypes.func,
	handleLogin: PropTypes.func,
	currencyId: PropTypes.number,
	i18n: PropTypes.func
};
