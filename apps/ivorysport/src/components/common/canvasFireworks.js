import React, { Component, useContext, createRef } from "react";
import { userInfoContext } from "./context";
import { GET_LANG_ID, isVaildLang } from "../../service/language";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	const langId = GET_LANG_ID(userInfo.langId);
	return <CanvasFireworks langId={langId} />;
};

export class CanvasFireworks extends Component {
	constructor(props) {
		super(props);
		this.isMountedRef = false;
		this.content = createRef();
	}

	UNSAFE_componentWillMount() {
		this.isMountedRef = false;
	}

	componentDidMount() {
		this.isMountedRef = true;
		const _path = window.location.pathname
			.split("/")
			?.filter(x => x !== "");

		const inHomePage =
			_path?.length === 0 ||
			(_path?.length === 1 && isVaildLang(_path[0]));

		if (inHomePage) {
			this.showFireworks();
		}
	}

	showFireworks = () => {
		const canvas = document.getElementById("canvas");
		const ctx = canvas.getContext("2d");
		const cw = window.innerWidth;
		const ch = window.innerHeight;
		const fireworks = [];
		const particles = [];
		let hue = 120;
		const limiterTotal = 5;
		let limiterTick = 0;
		const timerTotal = 50;
		let timerTick = 50;
		const mousedown = false;
		let mx;
		let my;
		canvas.width = cw;
		canvas.height = ch;

		const requestAnimFrame = (function () {
			return (
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function (callback) {
					window.setTimeout(callback, 1000 / 60);
				}
			);
		})();

		function random(min, max) {
			return Math.random() * (max - min) + min;
		}
		function calculateDistance(p1x, p1y, p2x, p2y) {
			const xDistance = p1x - p2x;
			const yDistance = p1y - p2y;
			return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
		}
		function Firework(sx, sy, tx, ty) {
			this.x = sx;
			this.y = sy;
			this.sx = sx;
			this.sy = sy;
			this.tx = tx;
			this.ty = ty;
			this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
			this.distanceTraveled = 0;
			this.coordinates = [];
			this.coordinateCount = 3;
			while (this.coordinateCount) {
				this.coordinateCount -= 1;
				this.coordinates.push([this.x, this.y]);
			}
			this.angle = Math.atan2(ty - sy, tx - sx);
			this.speed = 2;
			this.acceleration = 1.05;
			this.brightness = random(50, 70);
			this.targetRadius = 1;
		}
		Firework.prototype.update = function (index) {
			this.coordinates.pop();
			this.coordinates.unshift([this.x, this.y]);
			if (this.targetRadius < 8) {
				this.targetRadius += 0;
			} else {
				this.targetRadius = 1;
			}
			this.speed *= this.acceleration;
			const vx = Math.cos(this.angle) * this.speed;
			const vy = Math.sin(this.angle) * this.speed;
			this.distanceTraveled = calculateDistance(
				this.sx,
				this.sy,
				this.x + vx,
				this.y + vy
			);
			if (this.distanceTraveled >= this.distanceToTarget) {
				createParticles(this.tx, this.ty);
				fireworks.splice(index, 1);
			} else {
				this.x += vx;
				this.y += vy;
			}
		};
		Firework.prototype.draw = function () {
			ctx.beginPath();
			ctx.moveTo(
				this.coordinates[this.coordinates.length - 1][0],
				this.coordinates[this.coordinates.length - 1][1]
			);
			ctx.lineTo(this.x, this.y);
			ctx.strokeStyle = `hsl(${this.hue},100%,${this.brightness}%)`;
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
			ctx.stroke();
		};
		function Particle(x, y) {
			this.x = x;
			this.y = y;
			this.coordinates = [];
			this.coordinateCount = 5;
			while (this.coordinateCount > 0) {
				this.coordinates.push([this.x, this.y]);
				this.coordinateCount = -1;
			}
			this.angle = random(0, Math.PI * 2);
			this.speed = random(1, 10);
			this.friction = 0.95;
			this.gravity = 1;
			this.hue = random(hue - 20, hue + 20);
			this.brightness = random(50, 80);
			this.alpha = 1;
			this.decay = random(0.015, 0.03);
		}
		Particle.prototype.update = function (index) {
			this.coordinates.pop();
			this.coordinates.unshift([this.x, this.y]);
			this.speed *= this.friction;
			this.x += Math.cos(this.angle) * this.speed;
			this.y += Math.sin(this.angle) * this.speed + this.gravity;
			this.alpha -= this.decay;
			if (this.alpha <= this.decay) {
				particles.splice(index, 1);
			}
		};
		Particle.prototype.draw = function () {
			ctx.beginPath();
			ctx.moveTo(
				this.coordinates[this.coordinates.length - 1][0],
				this.coordinates[this.coordinates.length - 1][1]
			);
			ctx.lineTo(this.x, this.y);
			ctx.strokeStyle = `hsla(${this.hue},100%,${this.brightness}%,${this.alpha})`;
			ctx.stroke();
		};
		function createParticles(x, y) {
			let particleCount = 300;
			while (particleCount) {
				particleCount -= 1;
				particles.push(new Particle(x, y));
			}
		}

		function loop() {
			requestAnimFrame(loop);
			hue += 0.5;
			ctx.globalCompositeOperation = "destination-out";
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			ctx.fillRect(0, 0, cw, ch);
			ctx.globalCompositeOperation = "lighter";
			let i = fireworks.length;

			while (i) {
				i -= 1;
				fireworks[i].draw();
				fireworks[i].update(i);
			}
			let o = particles.length;
			while (o) {
				o -= 1;
				particles[o].draw();
				particles[o].update(o);
			}
			if (timerTick >= timerTotal) {
				if (!mousedown) {
					fireworks.push(
						new Firework(
							cw / 2,
							ch,
							random(0, cw),
							random(0, ch / 2)
						)
					);
					timerTick = 0;
				}
			} else {
				timerTick += 1;
			}
			if (limiterTick >= limiterTotal) {
				if (mousedown) {
					fireworks.push(new Firework(cw / 2, ch, mx, my));
					limiterTick = 0;
				}
			} else {
				limiterTick += 1;
			}
		}
		loop();
	};

	render() {
		return <canvas id="canvas" ref={this.content} />;
	}
}
