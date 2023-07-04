import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import { isDateRange } from "@ailab-desktop/common";
import { AngpaoWrapper, DrawPrizeEventIdEnum } from "@ailab-desktop/wrapper";
import { Angpao } from "@ailab-desktop/components";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import { popBoxContext, userInfoContext } from "../components/common/context";
import defPopBoxType from "../components/common/defPopBoxType";
import { defCurrencyList } from "../components/common/common";

// * 支援幣別
export const angpaoAllowedCurrencies = [
	defCurrencyList.MYR,
	defCurrencyList.THB
];

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

	// * 活動尚未開始導轉回首頁 或 不支援該幣別 導轉回首頁
	if (
		!isDateRange(angPaoEventPeriod) ||
		!angpaoAllowedCurrencies.includes(userInfo?.currencyId)
	) {
		<Redirect to="/" noThrow />;
	}

	return (
		<AngpaoWrapper
			isLogin={userInfo?.isLogin}
			eventId={DrawPrizeEventIdEnum.AngpaoNova88}
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
			}) => {
				return (
					<Angpao
						isLogin={userInfo?.isLogin}
						currencyId={userInfo?.currencyId}
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
				);
			}}
		</AngpaoWrapper>
	);
};
