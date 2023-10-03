import React, { useContext, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import useGetVideo from "./hook";
import Filter from "./streaming.filter";
import { StreamingModule } from "./streaming.row";
import StreamingNodata from "./streaming.nodata";

const Streaming = () => {
	const isMountedRef = useRef(null);
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

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
		<main className="lobby livesports">
			<div className="wrapper ">
				<div className="col-2">
					<Filter
						handleSelect={handleSelectCategory}
						selected={selCategory.type}
					/>
				</div>
				<div className="col-9">
					<div className="lobby-livesports">
						<div className="name txt-left mb-3">
							{String(t("lbl_Live_Sports")).toUpperCase()}
						</div>

						<div className="lobby-livesports-block">
							{selCategory.datas &&
							selCategory.datas.length > 0 ? (
								selCategory.datas.map(v => {
									return (
										<StreamingModule
											key={`home-streaming-${v.id}`}
											t={t}
											langId={userInfo.langId}
											isStreamingPage={true}
											tpId={selCategory.tpId}
											gameId={selCategory.gameId}
											isLogin={userInfo.isLogin}
											actStatus={userInfo.actStatus}
											{...v}
										/>
									);
								})
							) : (
								<StreamingNodata
									t={t}
									className={`notv ${active ? "" : "active"}`}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Streaming;
