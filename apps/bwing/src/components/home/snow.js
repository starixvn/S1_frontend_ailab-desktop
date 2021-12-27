/* eslint-disable func-names */
/* eslint-disable vars-on-top */
/* eslint-disable no-multi-assign */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from "react";

var Particle = function (height, width) {
	this.x = this.y = this.dx = this.dy = 0;
	this.reset(height, width);
};

Particle.prototype.reset = function (height, width) {
	this.y = Math.random() * height;
	this.x = Math.random() * width;
	this.dx = Math.random() * 1 - 0.5;
	this.dy = Math.random() * 0.5 + 0.5;
};

export default () => {
	const el = useRef(null);

	useEffect(() => {
		function onResize() {
			if (el?.current) {
				width = document.documentElement.scrollWidth;
				height = document.documentElement.scrollHeight;

				el.current.width = width;
				el.current.height = height;

				createParticles((width * height) / 20000);
			}
		}

		function updateParticles() {
			if (el?.current) {
				var ctx = el.current.getContext("2d") ?? {};
				ctx.clearRect(0, 0, width, height);
				ctx.fillStyle = "#f6f9fa";

				particles.forEach(function (particle) {
					particle.y += particle.dy;
					particle.x += particle.dx;

					if (particle.y > height) {
						particle.y = 0;
					}

					if (particle.x > width) {
						particle.reset();
						particle.y = 0;
					}

					ctx.beginPath();
					ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2, false);
					ctx.fill();
				});

				window.requestAnimationFrame(updateParticles);
			}
		}

		function createParticles(count) {
			if (count != particles.length) {
				particles = [];
				for (var i = 0; i < count; i++) {
					particles.push(new Particle(height, width));
				}
			}
		}

		var width = 0;
		var height = 0;
		var particles = [];

		try {
			onResize();
			updateParticles();

			window.addEventListener("resize", onResize);
		} catch (error) {
			console.log(error);
		}

		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return <canvas ref={el} className="snow" />;
};
