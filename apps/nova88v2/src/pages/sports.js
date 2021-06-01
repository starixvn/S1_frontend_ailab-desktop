import React, { useContext, useEffect, createRef, useState } from "react";
import { userInfoContext } from "../components/common/context";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import { getUrlParameter } from "../components/common/common";
import { GET_ENTER_PAGE_URL } from "../service/enterPage";
import { useGotoGame, defSpecialSetting } from "../components/hook/useGotoGame";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<Content />
			</Layout>
		</Wrapper>
	);
};

const Content = () => {
	const iframeRef = createRef();
	const { userInfo } = useContext(userInfoContext);
	const [content, setContent] = useState("");
	const tpId = getUrlParameter("tpId");
	const gameId = getUrlParameter("gameId");
	const matchid = getUrlParameter("matchid");
	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});
	const _tpId = isNaN(tpId) ? tpId : Number(tpId);
	const iframeUrl =
		_tpId === defSpecialSetting.sports_9w
			? ""
			: GET_ENTER_PAGE_URL(userInfo.langId, tpId, gameId, matchid);

	// useEffect(() => {
	// 	if (_tpId === defSpecialSetting.sports_9w) {
	// 		const fetchData = async () => {
	// 			const result = await handleGoToGame({
	// 				isLogin: userInfo.isLogin,
	// 				langId: userInfo.langId,
	// 				tpId: _tpId,
	// 				gameId
	// 			});

	// 			const text = await result.text();
	// 			setContent(text);
	// 		};

	// 		fetchData();
	// 	}
	// }, [userInfo.langId, userInfo.isLogin, tpId]);

	return (
		<main>
			<section className="inside">
				<iframe
					ref={iframeRef.current}
					title="sport"
					target="sport_iframe"
					src={iframeUrl}
				/>
			</section>
		</main>
	);
};
