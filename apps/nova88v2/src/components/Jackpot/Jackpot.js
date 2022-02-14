import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { takeJackItemList, isNumber } from "./jackpot.common";
import JaclpotList from "./jaclpot.list";

const TEXT_TOP = 30;

export default function Jackpot({
	label,
	value,
	animationLoopMillisecond,
	onClick
}) {
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

		nodeList[0].forEach(node => {
			const itemNodeCount = node.querySelectorAll("div").length;

			const top = TEXT_TOP * Number(itemNodeCount) - TEXT_TOP;

			if (node.animate) {
				node.animate(
					{ top: `-${top}px`, easing: "ease" },
					animationLoopMillisecond
				);
			}

			Promise.all(
				node.getAnimations().map(animation => animation.finished)
			).then(() => {
				node.style.top = `-${top}px`;
			});
		});
	}, [animationLoopMillisecond, jackpotItemList]);

	if (jackpotItemList?.length <= 0) return null;

	return (
		<div className="jpot" onClick={onClick}>
			<div className="number">
				<div>{label}</div>

				<JaclpotList jackpotItemList={jackpotItemList} />
			</div>
		</div>
	);
}

Jackpot.defaultProps = {
	onClick: null
};

Jackpot.propTypes = {
	onClick: PropTypes.func,
	animationLoopMillisecond: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired
};
