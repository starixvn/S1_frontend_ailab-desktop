import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeMatch from "../components/home/homeMatch";
import HotPromotion from "../components/home/hotPromotion";
import { isExpiry } from "../components/promotion/promotion.common";
import {
	maintainListContext,
	userInfoContext
} from "../components/common/context";
import { api_hotEvent_GetDataList } from "../service/api/hotEvent";
import { api_promotion_GetPromotionListV2 } from "../service/api/promotion";
import usePopBox from "../components/hook/usePopBox";
import PromotionWrapper from "../components/promotion/promotion.wrapper";
import { defCategoryId } from "../components/promotion/promotion.def";

export default () => (
	<Wrapper>
		<PromotionWrapper>
			<Layout>
				<Content />
			</Layout>
		</PromotionWrapper>
	</Wrapper>
);

const Content = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { allMaintainList } = useContext(maintainListContext);
	const { setPopBox } = usePopBox();
	const timeRef = useRef(null);
	const [hotEventList, setHotEventList] = useState([]);
	const [promotionList, setPromotionList] = useState([]);
	const filterPromotionList = promotionList.filter(
		item =>
			(item.categoryId === defCategoryId.SabaSports ||
				item.categoryId === defCategoryId.SBSW) &&
			!isExpiry({
				...item,
				isLogin: userInfo.isLogin
			})
	);

	const getHotEventList = async () => {
		try {
			const {
				data: { data }
			} = await api_hotEvent_GetDataList({
				langId: userInfo.langId
			});
			setHotEventList(data);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

	const getPromotionList = async () => {
		try {
			const {
				data: { data }
			} = await api_promotion_GetPromotionListV2({
				langId: userInfo.langId
			});
			setPromotionList(data);
		} catch (error) {
			setPopBox({
				isOpen: true,
				content: t("msg_ApiServerError")
			});
		}
	};

	useEffect(() => {
		getHotEventList();
		getPromotionList();

		timeRef.current = setInterval(() => {
			getHotEventList();
		}, 60000);

		return () => {
			clearInterval(timeRef.current);
		};
	}, []);

	return (
		<main className="lobby sports">
			<div className="wrapper">
				<HomeMatch
					hotEventList={hotEventList}
					maintainList={allMaintainList}
				/>
				<HotPromotion promotionList={filterPromotionList} />
			</div>
		</main>
	);
};
