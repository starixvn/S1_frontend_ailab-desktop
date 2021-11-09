import React, { useEffect, useContext, useRef } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { defStreamingCategory } from "../streaming/defStreaming";
import { useGetVideo } from "../streaming/hook";
import { StreamingModule } from "../streaming/streaming.row";
import { StreamingNoData } from "../streaming/streaming.noData";
import path from "../../router";

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

	const btns = Object.values(defStreamingCategory).map((category, cidx) => (
		<button
			// eslint-disable-next-line react/no-array-index-key
			key={`home-streaming-btns-${cidx}`}
			className={`${category.icon}${
				category.type === selCategory.type ? " active" : ""
			}`}
			onClick={handleSelectCategory.bind(this, category.type)}>
			{t(category.displayKey)}
		</button>
	));

	const rows = selCategory.datas?.map((v, vidx) => {
		return (
			<StreamingModule
				// eslint-disable-next-line react/no-array-index-key
				key={`home-streaming-selCategory-${vidx}`}
				t={t}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				actStatus={userInfo.actStatus}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...v}
			/>
		);
	});

	return (
		<div className="liveTv">
			<div className="moduleTitle icon icon-live_tv">
				{t("lbl_Live_Sports").toUpperCase()}
				<Link to={`/${userInfo.langId}/${path.streaming.root}`}>
					{`${t("lbl_More")}...`}
				</Link>
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
