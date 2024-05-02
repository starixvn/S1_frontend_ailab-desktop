import React, { useState } from "react";
import { bannerImgUrl } from "../../config";

const FooterProvider = () => {
	const [isHovered, setIsHovered] = useState({});

	const providers = [
		{ id: "saba", base: "saba.png", hover: "saba-a.png" },
		{ id: "tfg", base: "tfg.png", hover: "tfg-a.png" },
		{ id: "sbo", base: "sbo.png", hover: "sbo-a.png" },
		{ id: "bti", base: "bti.png", hover: "bti-a.png" },
		{ id: "ag", base: "ag.png", hover: "ag-a.png" },
		{ id: "ae", base: "ae.png", hover: "ae-a.png" },
		{ id: "n2live", base: "n2live.png", hover: "n2live-a.png" },
		{ id: "ygg", base: "ygg.png", hover: "ygg-a.png" },
		{ id: "cq9", base: "cq9.png", hover: "cq9-a.png" },
		{ id: "png", base: "png.png", hover: "png-a.png" },
		{ id: "jili", base: "jili.png", hover: "jili-a.png" },
		{ id: "v8power", base: "v8power.png", hover: "v8power-a.png" },
		{ id: "km", base: "km.png", hover: "km-a.png" },
		{ id: "tc", base: "tc.png", hover: "tc-a.png" },
		{ id: "next", base: "next.png", hover: "next-a.png" },
		{ id: "im", base: "im.png", hover: "im-a.png" },
		{ id: "im-esports", base: "im-esports.png", hover: "im-esports-a.png" },
		{ id: "spribe", base: "spribe.png", hover: "spribe-a.png" },
		{ id: "es", base: "es.png", hover: "es-a.png" },
		{ id: "world", base: "world.png", hover: "world-a.png" },
		{ id: "fachai", base: "fachai.png", hover: "fachai-a.png" }
	];

	const handleMouseEnter = id => {
		setIsHovered(prev => ({ ...prev, [id]: true }));
	};

	const handleMouseLeave = id => {
		setIsHovered(prev => ({ ...prev, [id]: false }));
	};

	return (
		<div className="provider">
			<div>
				{providers.map(provider => (
					<a
						key={provider.id}
						onClick={e => e.preventDefault}
						style={{ cursor: "default" }}
					>
						<img
							src={`${bannerImgUrl}/desktop/img/home-page/provider/${
								isHovered[provider.id]
									? provider.hover
									: provider.base
							}`}
							alt=""
							onMouseEnter={() => handleMouseEnter(provider.id)}
							onMouseLeave={() => handleMouseLeave(provider.id)}
						/>
					</a>
				))}
			</div>
		</div>
	);
};
export default FooterProvider;
