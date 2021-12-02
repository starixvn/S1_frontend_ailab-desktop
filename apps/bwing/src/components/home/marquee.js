import React, { Component, useContext, createRef } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "@reach/router";
import { api_message_GetAnnouncement } from "../../service/api/message";
import { userInfoContext, popBoxContext } from "../common/context";
import { GET_LANG_ID } from "../../service/language";
import { defPopBoxType } from "../common/defPopBoxType";
import path from "../../router";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const langId = GET_LANG_ID(userInfo.langId);

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	return (
		<Marquee
			langId={langId}
			i18n={t}
			isLogin={userInfo.isLogin}
			setPopBox={setPopBox}
			ClickClose={ClickClose}
		/>
	);
};

class Marquee extends Component {
	constructor(props) {
		super(props);

		this.state = {
			datas: [],
			pos: null,
			redirectPath: null
		};

		this.isMountedRef = false;
		this.marquee = createRef();
		this.content = createRef();
	}

	componentDidMount = () => {
		this.isMountedRef = true;
		this.GetAnnouncement(this.props.langId);
		this.intervalId = setInterval(
			this.GetAnnouncement.bind(this, this.props.langId),
			60000
		);
	};

	componentWillUnmount = () => {
		this.isMountedRef = false;
		clearInterval(this.intervalId);
		clearInterval(this.intervalId_Pos);
	};

	componentDidUpdate = () => {
		if (this.state.pos === null && this.isMountedRef) {
			const style = window.getComputedStyle(this.marquee.current, null);
			const pos = parseFloat(style.width);

			this.setState({ pos });
		}
	};

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
				return { pos: prev.pos - 1.5 };
			});
		}
	};

	GetAnnouncement = langId => {
		api_message_GetAnnouncement(langId).then(
			res => {
				if (this.isMountedRef) {
					if (res.data.errorCode === 0) {
						const resData = res.data.data;
						const stateData = this.state.datas;
						let update = false;

						if (resData.length !== 0 && stateData.length !== 0) {
							for (const d in resData) {
								if (
									!stateData.find(
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
									25
								);
							}
						}

						this.setState({
							datas: res.data.data
						});
					} else {
						this.props.setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={this.props.ClickClose}>
										{this.props.i18n("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			},
			() => {
				this.props.setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.ErrorMsg,
					message: this.props.i18n("msg_ApiServerError"),
					btnBar: (
						<div className="btnGroup">
							<button
								className="btn-cancel"
								onClick={this.props.ClickClose}>
								{this.props.i18n("lbl_Close")}
							</button>
						</div>
					)
				});
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
			this.setState({
				redirectPath: `/${this.props.langId}/${path.announcement.root}`
			});
		} else {
			this.props.setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		}
	};

	render() {
		const arr = this.state.datas.map(item => {
			return (
				<button
					key={`announcement-${item.id}`}
					style={{ paddingLeft: "2rem" }}
					onClick={this.ClickMarquee}
					onMouseOver={this.MarqueeOnMouseOver}
					onMouseOut={this.MarqueeOnMouseOut}
					onFocus={() => 0}
					onBlur={() => 0}>
					{item.subject}
				</button>
			);
		});

		const style = this.state.pos === null ? {} : { left: this.state.pos };
		return this.state.redirectPath === null ? (
			<div id="Marquee">
				<div
					className="marquee-box icon icon-marquee"
					ref={this.marquee}>
					<div
						className="marquee-run"
						ref={this.content}
						style={style}>
						{arr}
					</div>
				</div>
			</div>
		) : (
			<Redirect to={this.state.redirectPath} noThrow />
		);
	}
}
