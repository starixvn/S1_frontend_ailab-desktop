import React, { useContext, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "../components/common/layout";
import Filter from "../components/streaming/filter";
import Wrapper from "../components/common/wrapper";
import { userInfoContext } from "../components/common/context";
import { useGetVideo } from "../components/streaming/hook";
import { StreamingNoData } from "../components/streaming/streaming.noData";
import { StreamingModule } from "../components/streaming/streaming.row";

const IndexPage = () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<main>
					<section className="inside streaming">
						<Content />
					</section>
				</main>
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

	const rows = selCategory.datas?.map(v => {
		return (
			<StreamingModule
				key={`home-streaming-${v.type}-${v.matchID}`}
				t={t}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				isStreamingPage={true}
				{...v}
			/>
		);
	});

	return (
		<div className="infoModule">
			<div className="inside-title icon icon-live_tv">
				<span>{t("lbl_Live_Sport")}</span>
			</div>
			<div className="subModuleListColumn">
				<Filter
					handleSelect={handleSelectCategory}
					selected={selCategory.type}
				/>
				<div className="liveTv active">
					{rows.length <= 0 ? <StreamingNoData t={t} /> : rows}
				</div>
			</div>
		</div>
	);
};

export default IndexPage;
