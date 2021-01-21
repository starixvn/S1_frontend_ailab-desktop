import React, { useContext, createRef } from "react";
import { useTranslation } from "react-i18next";
import imgOneGameLogo from "../../styles/img/onegame/logo.png";
import imgOneGameQr from "../../styles/img/onegame/qr.png";
import { useGotoGame } from "../hook/useGotoGame";
import { userInfoContext } from "../common/context";
import productList from "../../datas/productList";

const OneGame = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { data } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		tpId: productList.poker.tpId
	});

	const OnClick = e => {
		return typeof window !== undefined ? window.open(e.target.value) : null;
	};

	const APPDownloadLink = {
		Android: "https://aka-dd-mega-appsetup.siderby.com/apk/Mega888_V1.2.apk"
		// IOS: "https://link.dm-918kiss.com/mega888/",
		// IOS32: "itms-services://?action=download-manifest&url=https://aka-dd-mega-appsetup.siderby.com/ios32/Mega888.plist"
	};

	return (
		<section className="inside">
			<div className="rightModule">
				<div className="infoModule onegameModule">
					<div className="promotionsInfo">
						<div className="onegame">
							<div className="left">
								<div className="downloadItem">
									<div className="title">
										{t("lbl_Username")}
									</div>
									<ButtonWithCopyBtn value={data?.account} />
									<div className="title">
										{t("lbl_Password")}
									</div>
									<ButtonWithCopyBtn value={data?.password} />
								</div>
							</div>
							<button>
								<img src={imgOneGameLogo} alt="img_go" />
							</button>
							<div className="left right">
								<div className="downloadItem">
									<div className="title icon icon-android">
										Download App
									</div>
									<button
										onClick={OnClick}
										value={APPDownloadLink.android}>
										Android
									</button>
								</div>
								<img src={imgOneGameQr} alt="img_go" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const ButtonWithCopyBtn = ({ value }) => {
	const ipt = createRef();
	const OnCopy = () => {
		ipt.current.select();
		document.execCommand("copy");
	};
	return (
		<div className="readonly">
			<input readOnly defaultValue={value} ref={ipt} />
			<button
				className="icon icon-files-empty"
				value={value}
				onClick={OnCopy}
			/>
		</div>
	);
};

export default OneGame;
