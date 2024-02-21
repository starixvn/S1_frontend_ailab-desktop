import React, { useState, useEffect, useRef } from "react";


const NewMarquee = () => {
	return (
		<div id="Marquee">
			<div className="home-marquee">
				<i className="icon-speaker" />
				<marquee className="marquee-run">Test</marquee>
				<button className="btn-info">More</button>
			</div>
		</div>
	);
};

export default NewMarquee;
