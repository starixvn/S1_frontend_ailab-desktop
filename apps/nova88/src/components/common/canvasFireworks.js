import React, { useEffect, useContext } from "react";
import { userInfoContext } from "../common/context";
import { getCurrentPage } from "../common/linkItems";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	let currentPage = getCurrentPage();
	let inHomePage = currentPage === `/${userInfo.langId}`;

	useEffect(() => {
		if (inHomePage) {
			showFireworks();
		}
	}, []);

	const showFireworks = () => {
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");
		let cw = window.innerWidth;
		let ch = window.innerHeight;
		let fireworks = [];
		let particles = [];
		let hue = 120;
		let limiterTotal = 5;
		let limiterTick = 0;
		let timerTotal = 50;
		let timerTick = 50;
		let mousedown = false;
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
			let xDistance = p1x - p2x,
				yDistance = p1y - p2y;
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
			while (this.coordinateCount--) {
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
			let vx = Math.cos(this.angle) * this.speed,
				vy = Math.sin(this.angle) * this.speed;
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
			ctx.strokeStyle =
				"hsl(" + hue + ", 100%, " + this.brightness + "%)";
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
			while (this.coordinateCount--) {
				this.coordinates.push([this.x, this.y]);
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
			ctx.strokeStyle =
				"hsla(" +
				this.hue +
				", 100%, " +
				this.brightness +
				"%, " +
				this.alpha +
				")";
			ctx.stroke();
		};
		function createParticles(x, y) {
			let particleCount = 300;
			while (particleCount--) {
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
			while (i--) {
				fireworks[i].draw();
				fireworks[i].update(i);
			}
			let o = particles.length;
			while (o--) {
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
				timerTick++;
			}
			if (limiterTick >= limiterTotal) {
				if (mousedown) {
					fireworks.push(new Firework(cw / 2, ch, mx, my));
					limiterTick = 0;
				}
			} else {
				limiterTick++;
			}
		}
		loop();
	};

	return <canvas id="canvas"></canvas>;
};
