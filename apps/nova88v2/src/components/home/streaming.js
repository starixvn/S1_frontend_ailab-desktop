import React, { useEffect, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { defStreamingCategory } from "../streaming/defStreaming";
import { useGetVideo } from "../streaming/hook";
import { StreamingModule } from "../streaming/streaming.row";
import { StreamingNoData } from "../streaming/streaming.noData";

const Content = () => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

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

	const btns = Object.values(defStreamingCategory).map(category => (
		<button
			key={`home-streaming-${category.type}`}
			className={`${category.icon}${
				category.type === selCategory.type ? " active" : ""
			}`}
			onClick={handleSelectCategory.bind(this, category.type)}>
			{t(category.displayKey)}
		</button>
	));

	const rows = selCategory.datas?.map(v => {
		return (
			<StreamingModule
				key={`home-streaming-${v.type}-${v.matchID}`}
				t={t}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				{...v}
			/>
		);
	});

	return (
		<div className="liveTv">
			<div className="moduleTitle icon icon-film">
				{t("lbl_LiveStreaming")}
			</div>
			<div className="liveTvBox">
				<div className="liveTvTag">{btns}</div>
				<div className="liveTv active">
					<div>
						{rows.length <= 0 ? <StreamingNoData t={t} /> : rows}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Content;
