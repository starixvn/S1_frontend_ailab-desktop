import React from "react";
import { Link } from "@reach/router";
import path from "../../router";

import { StreamingModule } from "../streaming/streaming.row";

const Streaming = ({ t, videoList, langId }) => {
	return (
		<div>
			<div className="top10Aear">
				<div className="topImg"> </div>
				<div className="title">
					{String(t("lbl_Live_Sports")).toUpperCase()}
					<Link to={path.streaming.root}>{t("lbl_More")}...</Link>
				</div>
				<div className="top10Box">
					<div>
						{videoList.map((item, vidx) => (
							<StreamingModule
								key={`${item.league}-${item.channel}-${vidx}`}
								t={t}
								langId={langId}
								{...item}
								isStreamingPage={false}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Streaming;
