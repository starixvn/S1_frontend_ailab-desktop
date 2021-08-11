import React, { useContext, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Filter from "../components/streaming/filter";
import Wrapper from "../components/common/wrapper";
import { userInfoContext } from "../components/common/context";
import { useGetVideo } from "../components/streaming/hook";
import { StreamingNoData } from "../components/streaming/streaming.noData";
import { StreamingModule } from "../components/streaming/streaming.row";
import joeColeImg from "../styles/img/b_joe.jpg";

const IndexPage = () => {
	return (
		<Wrapper>
			<Layout>
				<main>
					<section className="inside streaming">
						<Content />
					</section>
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};

const Content = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const { handleSelectCategory, selCategory } = useGetVideo({
		langId: userInfo.langId,
		isMounted: isMountedRef.current
	});

	const rows = selCategory.datas?.map((v, vidx) => {
		return (
			<StreamingModule
				key={`home-streaming-${v.type}-${vidx}`}
				t={t}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				isStreamingPage={true}
				tpId={selCategory.tpId}
				gameId={selCategory.gameId}
				{...v}
			/>
		);
	});

	return (
		<>
			<div className="inside-title icon icon-live_tv">
				<span>{t("lbl_Live_Sports")}</span>
			</div>
			<div id="streamingMenu">
				<Filter
					handleSelect={handleSelectCategory}
					selected={selCategory.type}
				/>
			</div>

			<div className="rightModule">
				<div className="infoModule">
					<div className="subModuleListColumn">
						<div className="liveTv active">
							{rows.length <= 0 ? (
								<StreamingNoData t={t} />
							) : (
								rows
							)}
						</div>
					</div>
				</div>
				<div className="streamingAD">
					<img src={joeColeImg} alt="joeColeImg" />
					<iframe
						width="360"
						height="200"
						src="https://www.youtube.com/embed/Cn74XFuYAcE"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					/>
				</div>
			</div>
		</>
	);
};

export default IndexPage;
