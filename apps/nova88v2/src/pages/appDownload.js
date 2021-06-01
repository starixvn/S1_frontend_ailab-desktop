import React from "react";
import { useTranslation } from "react-i18next";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";

import img_applogo from "../styles/img/app/applogo.png";
import img_appbanner from "../styles/img/app/appbanner.png";
import img_iosEn from "../styles/img/app/ios_en.png";
import img_ios from "../styles/img/app/ios.png";
import img_android_en from "../styles/img/app/android_en.png";
import img_and from "../styles/img/app/and.png";
import img_iosicon from "../styles/img/app/iosicon.png";
import img_in01 from "../styles/img/app/in01.png";
import img_in02 from "../styles/img/app/in02.png";
import img_in03 from "../styles/img/app/in03.png";
import img_in04 from "../styles/img/app/in04.png";

export default () => {
	const { t } = useTranslation();
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main>
					<div className="appHeader">
						<a href="">
							<img src={img_applogo} alt="img_applogo" />
						</a>
					</div>
					<div className="appPage">
						<div className="appTitle">APP DOWNLOAD</div>
						<img src={img_appbanner} alt="img_appbanner" />
						<div className="scan">
							<div>
								<div>SCAN TO</div>
								<div>DOWNLOAD</div>
							</div>
							<div>
								<div>
									<img src={img_iosEn} alt="img_iosEn" />
									<div>
										<div>
											<img src={img_ios} alt="img_ios" />
											Apple iOS
										</div>
										<button>DOWNLOAD</button>
									</div>
								</div>
								<div>
									<img
										src={img_android_en}
										alt="img_android_en"
									/>
									<div>
										<div>
											<img src={img_and} alt="img_and" />
											Android
										</div>
										<button>DOWNLOAD</button>
									</div>
								</div>
							</div>
						</div>
						<div className="install">
							<div>INSTALLATION TUTORIAL</div>
							<div>
								<img src={img_iosicon} alt="img_iosicon" />
								iOS App Trust Authentication
							</div>
							<div>
								iOnce Nova88 App is installed, tap Trust or
								complete the setting as below.
							</div>
							<div>
								<img src={img_in01} alt="img_in01" />
								<img src={img_in02} alt="img_in02" />
								<img src={img_in03} alt="img_in03" />
								<img src={img_in04} alt="img_in04" />
							</div>
						</div>
					</div>
				</main>
			</Layout>
		</Wrapper>
	);
};
