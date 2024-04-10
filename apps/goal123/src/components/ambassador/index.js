import React from "react";
import AmbassadorBanner from "./AmbassadorBanner";
import AmbassadorInfo from "./AmbassadorInfo";
import CareerSection from "./CareerSection";
import RewardSection from "./RewardSection";
import AppDownloadSection from "./AppDownloadSection";

const AmbassadorContent = () => {
	return (
		<main className="ambassador">
			<AmbassadorBanner />
			<AmbassadorInfo />
			<CareerSection />
			<RewardSection />
			<AppDownloadSection />
		</main>
	);
};

export default AmbassadorContent;
