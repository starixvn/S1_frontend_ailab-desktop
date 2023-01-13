import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import { CurrenciesEnum, isDateRange } from "@ailab-desktop/common";
import { AngpaoWrapper, DrawPrizeEventIdEnum } from "@ailab-desktop/wrapper";
import { Angpao } from "@ailab-desktop/components";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import { popBoxContext, userInfoContext } from "../components/common/context";
import { defPopBoxType } from "../components/common/defPopBoxType";

// * 活動時間
export const angPaoEventPeriod = {
	startDate: "2023-01-21 00:00:00",
	endDate: "2023-02-05 23:59:59"
};

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<AngpaoPage />
			</Layout>
		</Wrapper>
	);
};

const AngpaoPage = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const openLoginPopBox = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	// * 活動時間不然範圍內導轉回首頁
	if (!isDateRange(angPaoEventPeriod)) {
		return <Redirect to="/" noThrow />;
	}

	return (
		<AngpaoWrapper
			isLogin={userInfo?.isLogin}
			eventId={DrawPrizeEventIdEnum.AngpaoBwing}
			eventPeriod={angPaoEventPeriod}
		>
			{({
				angpaoModal,
				message,
				drawPrizeResult,
				drawPrizeStatus,
				isDrawPrizeRecordListFetching,
				drawPrizeRecordList,
				onCheckDrawPrize,
				onPostDrawPrize
			}) => (
				<Angpao
					isLogin={userInfo?.isLogin}
					currencyId={CurrenciesEnum.VN}
					angpaoModal={angpaoModal}
					message={message}
					drawPrizeResult={drawPrizeResult}
					drawPrizeStatus={drawPrizeStatus}
					isDrawPrizeRecordListFetching={
						isDrawPrizeRecordListFetching
					}
					drawPrizeRecordList={drawPrizeRecordList}
					onCheckDrawPrize={onCheckDrawPrize}
					onPostDrawPrize={onPostDrawPrize}
					onOpenLoginPopBox={openLoginPopBox}
				/>
			)}
		</AngpaoWrapper>
	);
};
