import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import path from "../../router";
import { defNav } from "../casino/casino.def";
import useInterval from "../hook/useInterval";
import { getCurrencyCode, uuidv4 } from "../common/common";

const ANIMATION_LOOP_MILLISECOND = 2000;

const DELAY_MILLISECOND = 800;

const TEXT_TOP = 30;

export default function HomeJackpot({ t, userInfo }) {
	const ref = useRef();

	const [currentText, setCurrentText] = useState("");

	let currencyId = null;

	if (userInfo.isLogin) {
		currencyId = userInfo.currencyId;
	} else if (userInfo.isLogin === false) {
		currencyId = getCurrencyCode(userInfo.langId);
	}

	useEffect(() => {
		if (currencyId) {
			const jackpotCurrency =
				currencyId === 13 ? "cny" : t(`Currency_${currencyId}`);

			try {
				const ticker = new Ticker({
					info: 2,
					casino: "hotspin88am",
					currency: jackpotCurrency
				});

				ticker.attachToTextBox("jpot-id");
				ticker.tick();
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currencyId]);

	useInterval(() => {
		const [_currentText] = String(ref.current.innerText).split(" ");

		setCurrentText(_currentText);
	}, ANIMATION_LOOP_MILLISECOND + DELAY_MILLISECOND);

	return (
		<div>
			<div className="moduleTitle icon icon-ow-casino">
				{t("lbl_homeJackpotTitle")}
			</div>

			<span style={{ display: "none" }} id="jpot-id" ref={ref} />

			<Jackpot
				value={currentText}
				label={t(`Currency_${currencyId}`)}
				langId={userInfo.langId}
			/>
		</div>
	);
}

HomeJackpot.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

const takeJackItemList = ({ startPoint = 0, endPoint }) => {
	const NUMBER_LIST = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const MAX_NUMBER = NUMBER_LIST.length;

	const _start = Number(startPoint);
	const _end = Number(endPoint);

	if (_start < _end) return NUMBER_LIST.slice(_start, _end + 1);

	if (_start > _end)
		return [
			...NUMBER_LIST.slice(_start, MAX_NUMBER),
			...NUMBER_LIST.slice(0, _end + 1)
		];

	if (_start === _end) return [_end];

	return [];
};

const isNumber = val => {
	const rex = /[0-9]/;
	return rex.test(val);
};

export const Jackpot = ({ label, value, langId }) => {
	const [list, setList] = useState([]);

	const [jackpotItemList, setJackpotItemList] = useState([]);

	const formatTextList = String(value).split("");

	useEffect(() => {
		const startList = [...list].reverse();
		const endList = [...formatTextList].reverse();

		const _jackpotList = endList.map((endPoint, index) => {
			if (endPoint === "," || endPoint === ".") return endPoint;

			if (isNumber(endPoint)) {
				const startPoint = startList[index];

				return takeJackItemList({ startPoint, endPoint });
			}

			return null;
		});

		setJackpotItemList(_jackpotList.reverse());
		setList(formatTextList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	useEffect(() => {
		const nodeList = [
			...document.querySelectorAll(
				".jpot .number .numberRow > div.active"
			)
		];

		nodeList.forEach(node => {
			const itemNodeCount = node.querySelectorAll("div").length;

			const top = TEXT_TOP * Number(itemNodeCount) - TEXT_TOP;

			if (node.animate) {
				node.animate(
					{ top: `-${top}px`, easing: "ease" },
					ANIMATION_LOOP_MILLISECOND
				);
			}

			Promise.all(
				node.getAnimations().map(animation => animation.finished)
			).then(() => {
				node.style.top = `-${top}px`;
			});
		});
	}, [jackpotItemList]);

	if (jackpotItemList?.length <= 0) return null;

	return (
		<div
			className="jpot"
			onClick={() =>
				navigate(
					`/${langId}/${path.casino.root}?tab=${defNav.PROMO.key}`
				)
			}>
			<div className="number">
				<div>{label}</div>

				{jackpotItemList.map((item, idx) => (
					<JackpotItem
						// eslint-disable-next-line react/no-array-index-key
						key={`pt-jackpot-${value}-${idx}`}
						item={item}
					/>
				))}
			</div>
		</div>
	);
};

Jackpot.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	langId: PropTypes.string.isRequired
};

const JackpotItem = ({ item }) => {
	const key = `jackpot-text-item-${uuidv4()}`;

	if (item === "," || item === ".")
		return (
			<div key={key}>
				<div>{item}</div>
			</div>
		);

	if (isNumber(item))
		return (
			<div className="numberRow" key={key}>
				<div className="active">
					{item.map((num, idx) => (
						// eslint-disable-next-line react/no-array-index-key
						<div key={`${key}-${idx}`}>{num}</div>
					))}
				</div>
			</div>
		);

	return "";
};

JackpotItem.defaultProps = {
	item: null
};

JackpotItem.propTypes = {
	item: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.number)
	])
};
