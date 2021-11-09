import React, { useContext, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";

import useGetVideo from "./hook";

import Filter from "./streaming.filter";
import { StreamingModule } from "./streaming.row";
import StreamingNodata from "./streaming.nodata";

const Streaming = () => {
	const isMountedRef = useRef(null);
	const { t } = useTranslation();

	const { userInfo } = useContext(userInfoContext);

	const { selCategory, handleSelectCategory } = useGetVideo({
		langId: userInfo.langId,
		isMounted: isMountedRef.current
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const active = selCategory.datas?.length > 0;

	return (
		<main>
			<section className="inside">
				<div className="liveleftMenu">
					<Filter
						handleSelect={handleSelectCategory}
						selected={selCategory.type}
					/>
				</div>

				<div className="liverightModule">
					<div className="liveArea">
						<div className="topImg" />
						<div className="title">
							{String(t("lbl_Live_Sports")).toUpperCase()}
						</div>
						<div className="livelist">
							<StreamingNodata
								t={t}
								className={`notv ${active ? "" : "active"}`}
							/>

							<div className={`opentv ${active ? "active" : ""}`}>
								{selCategory.datas?.map((v, vidx) => (
									<StreamingModule
										key={`home-streaming-${v.type}-${vidx}`}
										t={t}
										langId={userInfo.langId}
										isStreamingPage={true}
										tpId={selCategory.tpId}
										gameId={selCategory.gameId}
										isLogin={userInfo.isLogin}
										actStatus={userInfo.actStatus}
										{...v}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="liveImg">
					<img src="../../styles/img/liveimg.png" alt="" />
				</div>
			</section>
		</main>
	);
};

export default Streaming;
