/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useMatch, useLocation } from "@reach/router";
import config from "../config";
import path from "../router";

const query = graphql`
	query {
		site {
			siteMetadata {
				supportedLanguages
			}
		}
	}
`;

const defMetaData = {
	"/": {
		en: {
			title: `Nova88 - The Best Online Sportsbook, Casino and Online Gambling in Asia`,
			description: `Nova88 is Asia's best and most trusted online betting and gambling site. Join and play sportsbook, live casino, casino slot, lottery, keno, and fishing.`,
			keyword: `Nova88, Nova88 link, online casino, online gambling, online gambling malaysia, sports betting, lottery, live casino malaysia`
		},
		cs: {
			title: `Nova88 欧亚体育 - 亚洲最佳体育博彩，真人娱乐与在线博彩。`,
			description: `Nova88 欧亚体育 -亚洲知名品牌与最受信任的在线博彩网站。立即注册并享受顶尖的体育博彩，真人娱乐，电子游戏老虎机，彩票，快乐彩，和捕鱼游戏。`,
			keyword: `Nova88 欧亚体育，Nova88 欧亚体育链接，在线博彩，在线赌博，马来西亚在线博彩，体育博彩，彩票，马来西亚真人娱乐场`
		},
		id: {
			title: `Nova88 - Situs Judi Online - Bandar Taruhan Bola Terpercaya`,
			description: `Nova88 adalah Situs Online Terbaik Berlisensi Resmi dan Terpercaya dengan berbagai permainan Casino Online, Taruhan Bola dan Slot Mesin Online yang akan menghibur Anda.`,
			keyword: `Nova88, Nova88 Indo, Situs Bola Terpercaya, Situs Bola Lisensi Resmi, Bola Online, Slot Mesin Online, Casino Online`
		},
		th: {
			title: `Nova88 - หน้าเว็บเดิมพันกีฬา,คาสิโนออนไลน์ที่ดีที่สุดในเอเชีย`,
			description: `Nova88  เป็นเว็บไซต์เดิมพันออนไลน์ที่หน้าเชื่อถือและดีสุดในเอเชีย เข้าร่วมและเดิมพันกีฬา,คาสิโนสด,สล็อต คาสิโน,ลอตเตอรี,คีโน,และ ตกปลา`,
			keyword: `Nova88, ลิงค์ Nova88, คาสิโนออนไลน์, การพนันออนไลน์, การพนันออนไลน์ไทย, การเดิมพันกีฬา, ลอตเตอรี, ไทยคาสิโนสด`
		}
	},
	[path.casino.root]: {
		en: {
			title: `Nova88 - Online Slots Gambling Game Malaysia`,
			description: `Nova88 is the hottest and latest online casino slots games in Malaysia. Spin and Win real money slots, jackpot slots, 918kiss, mega888, pragmatic play slots.`,
			keyword: `Nova88, Nova88 slots, 918kiss, mega88, pragmatic slot, online slots, online casino slots, casino slots, progressive slots, real money slots`
		},
		cs: {
			title: `Nova88 欧亚体育 - 马来西亚在线电子老虎机`,
			description: `Nova88 欧亚体育马来西亚最热门和最新的在线赌场老虎机游戏。 旋转并赢得奖金，积宝大奖老虎机，918kiss，mega888，Pragmatic Play。`,
			keyword: `Nova88 欧亚体育，Nova88 欧亚体育老虎机 , 918kiss, mega88, Pragmatic Play, 线上老虎机, 在线老虎机, 在线电子游戏, 积宝奖金老虎机, 现金老虎机`
		},
		th: {
			title: `Nova88 - การเดิมพันเกมส์สล็อตออนไลน์ในไทย`,
			description: `Nova88  เว็บสล็อตคาสิโนออนไลน์ที่ใหม่และมาแรงที่สุดในไทย เล่นจริง จ่ายจริง!  Jackpot สล็อต, 918kiss, mega888, pragmatic  เล่นเลย.`,
			keyword: `Nova88, สล็อต Nova88, 918kiss, mega88, pragmatic slot, สล็อตออนไลน์, สล็อตคาสิโนออนไลน์, คาสิโนสล็อต, สล็อตที่ดีที่สุด, จ่ายจริง`
		},
		id: {
			title: `Nova88 - Situs Judi Slot Mesin Online Indonesia`,
			description: `Nova88 adalah Situs Slot Online, Judi slot jackpot terpopuler dan terbaru di Indonesia. Putar dan menangkan uang asli di Slot Mesin Pragmatic, Joker123`,
			keyword: `Nova88, Nova88 Slot Mesin Online, Slot online, Judi Mesin Slot, Slot Kasino, Slot pragmatic, slot joker123.`
		}
	},
	[path.promotion.root]: {
		en: {
			title: `Nova88 - Online Casino Promotions`,
			description: `Nova88 promotion offered to boost your winning chances, from welcome bonus, cash rebates, reload bonus, and special bonuses tailored for you. Claim now!`,
			keyword: `Nova88, Nova88 promotion, welcome bonus, deposit bonus, online casino bonus, reload bonus, redeposit bonus, casino slot bonus, freebet`
		},
		cs: {
			title: `Nova88欧亚体育 - 在线博彩优惠活动`,
			description: `Nova88欧亚体育 - 优惠活动提高您获胜的机率。从首存红利，现金返水，再存红利与各种为您量身定制的优惠促销，马上领取！`,
			keyword: `Nova88欧亚体育，Nova88欧亚体育优惠活动，首存红利，存款优惠，在线博彩优惠，再存红利，现金反水，电子游戏老虎机优惠，免费金额`
		},
		th: {
			title: `Nova88 - โปรโมชั่นคาสิโนออนไลน์`,
			description: `Nova88 เพิ่มโอกาสในการชนะของคุณ ด้วยโบนัสต้อนรับ, โบนัสคืนเงิน, โบนัสฝากเงินซ้ำ, และโบนัสพิเศษที่เหมาะสำหรับคุณ  เข้าร่วมตอนนี้!`,
			keyword: `Nova88, โปรโมชั่น Nova88, โบนัสต้อนรับ, โบนัสเงินฝาก, โบนัสคาสิโนออนไลน์, โบนัสฝากเงินซ้ำ, โบนัสสล็อต, ฟรีเครดิต`
		},
		id: {
			title: `Nova88 Indonesia Promosi Kasino Online`,
			description: `Nova88 menawarkan Bonus untuk meningkatkan peluang menang Anda, menawarkan welcome bonus, rebate tunai, bonus re-deposit, dan bonus lainnya. Klaim sekarang!`,
			keyword: `Nova88, Nova88 Promosi, Welcome Bonus Nova88, Bonus Deposit, Bonus Reload, Bonus ReDepo, Bonus Redeposit, bonus slots, bonus slot mesin, bonus rebate, bonus cashback`
		}
	},
	[path.sports.root]: {
		en: {
			title: `Nova88 - Asia's Most Trusted Online Sportsbooks`,
			description: `Nova88 Sportsbook betting offers you the most sports event, the best odds and Asian handicap, with live stream, also special number games. Play now!`,
			keyword: `Nova88, Nova88 sportsbook, online football, online betting, live score, basketball bookie, soccer matches, online sports, football games`
		},
		cs: {
			title: `Nova88 欧亚体育 - 亚洲最受信任在线体育博彩`,
			description: `Nova88 欧亚体育 | 体育博彩提供您广泛的赛事，最佳赔率，多种投注类型，覆盖现场直播，以及精彩的百练赛。马上体验！`,
			keyword: `Nova88 欧亚体育，Nova88 欧亚体育 体育博彩，在线足球，在线博彩，即时比分，篮球庄家，足球赛事，在线体育，足球盘口`
		},
		th: {
			title: `Nova88 - หน้าเว็บเดิมพันกีฬาออนไลน์ที่น่าเชื่อถือที่สุดในเอเชีย`,
			description: `Nova88 หน้าเว็บเดิมพันกีฬาที่มีการแข่งขันที่มากที่สุด อัตราต่อรองที่ดีที่สุดและแฮนดิแคปเอเชียพร้อมสตรีมสด อีกทั้งยังมีเกมส์หมายเลขพิเศษ. เล่นเลย!`,
			keyword: `Nova88 หน้าเว็บเดิมพันกีฬา, ฟุตบอลออนไลน์, การเดิมพันออนไลน์, ผลบอลสด, เจ้ามือรับแทงบาสเก็ตบอล, การแข่งขันฟุตบอล, กีฬาออนไลน์, เกมส์ฟุตบอล`
		},
		id: {
			title: `Nova88 - Taruhan Bola Terpercaya - Situs Bola Resmi`,
			description: `Nova88 Sports menawarkan berbagai taruhan olahraga dengan odds dan handicap Asia terbaik, dengan live streaming dan juga permainan angka. Main Sekarang!`,
			keyword: `Nova88, Nova88 Sports, Taruhan Olahraga, Nova88 Indo, Situs Bola Terpercaya, Situs Bola Lisensi Resmi, Bola Online, Judi Bola`
		}
	}
};

function SEO({ description, lang, meta, title }) {
	const {
		site: {
			siteMetadata: { supportedLanguages }
		}
	} = useStaticQuery(query);

	const location = useLocation()
		?.pathname?.split("/")
		.filter(p => p !== "");

	let metaData = defMetaData["/"];
	if (
		location.length >= 2 &&
		supportedLanguages.includes(location[0]) &&
		defMetaData[location[1]]
	) {
		metaData = defMetaData[location[1]] ?? metaData;
	}

	const {
		title: _title,
		keyword: _keyword,
		description: _description
	} = metaData[lang];

	return (
		<>
			<Helmet
				htmlAttributes={{
					lang
				}}
				title={_title}
				link={[{ rel: "icon", type: "image/png", href: "favicon.ico" }]}
				meta={[
					{
						name: `description`,
						content: _description
					},
					{
						name: `keyword`,
						content: _keyword
					},
					{
						property: `og:title`,
						content: _title
					},
					{
						property: `og:description`,
						content: _description
					},
					{
						property: `og:type`,
						content: `website`
					},
					{
						name: `twitter:card`,
						content: `summary`
					},
					{
						name: `twitter:creator`,
						content: _title
					},
					{
						name: `twitter:title`,
						content: _title
					},
					{
						name: `twitter:description`,
						content: _description
					}
				].concat(meta)}
			/>
			<GATag gaCode={"UA-163834722-1"} />
			<LiveChat />
			<Iovation />
			<FPS />
		</>
	);
}

SEO.defaultProps = {
	lang: `en`,
	meta: [],
	description: ``
};

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string
};

const LiveChat = () => {
	return (
		<Helmet>
			<script>
				{`window.__lc = window.__lc || {};
        window.__lc.license = 11638088;
        window.__lc.chat_between_groups = false;
        ; (function (n, t, c) { function i(n) { return e._h ? e._h.apply(null, n) : e._q.push(n) } var e = { _q: [], _h: null, _v: "2.0", on: function () { i(["on", c.call(arguments)]) }, once: function () { i(["once", c.call(arguments)]) }, off: function () { i(["off", c.call(arguments)]) }, get: function () { if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load."); return i(["get", c.call(arguments)]) }, call: function () { i(["call", c.call(arguments)]) }, init: function () { var n = t.createElement("script"); n.async = !0, n.type = "text/javascript", n.src = "https://cdn.livechatinc.com/tracking.js", t.head.appendChild(n) } }; !n.__lc.asyncInit && e.init(), n.LiveChatWidget = n.LiveChatWidget || e }(window, document, [].slice))
        LiveChatWidget.call('hide');
        LiveChatWidget.call('hide_greeting')`}
			</script>
		</Helmet>
	);
};

const GATag = ({ gaCode }) => {
	return (
		<Helmet>
			<script
				async
				src={
					"https://www.googletagmanager.com/gtag/js?id=" + gaCode
				}></script>
			<script>
				{`window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', '${gaCode}');`}
			</script>
		</Helmet>
	);
};

const Iovation = () => {
	return (
		<Helmet>
			<script>
				{`
				   	window.IGLOO = window.IGLOO || {
						"enable_flash" : false,
						"loader" : {
						"fp_dyn" : false,
						"version" : "5.2.2"
						}
				  	};
				`}
			</script>
			<script
				src={`${config.t_and_cURL}/common/js/loader_only.js?v=201027`}
				type="text/javascript"></script>
		</Helmet>
	);
};

const FPS = () => {
	return (
		<Helmet>
			<script
				async=""
				defer=""
				src="//sc.detecas.com/di/activator.ashx"></script>
		</Helmet>
	);
};

export default SEO;
