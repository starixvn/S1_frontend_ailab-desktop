import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useInterval from "../hook/useInterval";

const settings = {
	snowImage: [
		"https://banner.ivorysport.com/desktop/img/fishing/bon/bg_light0.png",
		"https://banner.ivorysport.com/desktop/img/fishing/bon/bg_light1.png",
		"https://banner.ivorysport.com/desktop/img/fishing/bon/bg_light2.png",
		"https://banner.ivorysport.com/desktop/img/fishing/bon/bg_light3.png"
	],
	stage: "elin"
};

const SnowAnimation = ({ quantity }) => {
	const { snowImage, stage } = settings;

	const [stageHeight, setStageHeight] = useState(null);
	const [stageWidth, setStageWidth] = useState(null);

	const [snowList, setSnowList] = useState([]);

	useInterval(() => {
		const updateSnowAnimation = () => {
			let newSnowList = [];

			newSnowList = snowList.reduce((acc, cur) => {
				const { am, image } = cur;
				let { dx, xp, yp, stx, sty } = cur;

				yp += sty;

				if (yp > stageHeight - 50) {
					xp = Math.random() * (stageWidth - am - 30);
					yp = 0;
					stx = 0.02 + Math.random() / 10;
					sty = 0.05 + Math.random();
				}

				dx += stx;

				return [...acc, { am, dx, xp, yp, stx, sty, image }];
			}, []);

			setSnowList(newSnowList);
		};

		updateSnowAnimation();
	}, 30);

	useEffect(() => {
		const initData = () => {
			const initStageWidth =
				document.querySelector(`.${stage}`)?.clientWidth - 10;

			const initStageHeight =
				document.querySelector(`.${stage}`)?.clientHeight + 800;

			const initArr = [...Array(quantity)].map(() => {
				const dx = 0;
				const xp = Math.random() * (initStageWidth - 50);
				const yp = Math.random() * initStageHeight;
				const am = Math.random() * 20;
				const stx = 0.02 + Math.random() / 1000;
				const sty = 0.05 + Math.random();
				const imgIdx = Math.floor(Math.random() * snowImage.length);
				const image = snowImage[imgIdx];

				return { dx, xp, yp, am, stx, sty, image };
			});

			setStageWidth(initStageWidth);
			setStageHeight(initStageHeight);
			setSnowList(initArr);
		};

		initData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quantity]);

	return (
		<div id="article">
			<div className="elin">
				{snowList.map((item, index) => {
					const { yp, xp, am, dx } = item;
					const _class = `dot${index}`;

					const bottom = `${yp}px`;
					const left = `${xp + am * Math.sin(dx)}px`;

					const _style = {
						position: "absolute",
						zIndex: index,
						bottom,
						left
					};

					return (
						<div key={item.yp} className={_class} style={_style}>
							<img src={item.image} alt="snowimage" />
						</div>
					);
				})}
			</div>
		</div>
	);
};

SnowAnimation.defaultProps = {
	quantity: 20
};

SnowAnimation.propTypes = {
	quantity: PropTypes.number
};
export default SnowAnimation;
