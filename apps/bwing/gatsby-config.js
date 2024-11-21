const { createProxyMiddleware } = require("http-proxy-middleware");
require('dotenv').config()
module.exports = {
	siteMetadata: {
		defaultLanguage: "vn",
		title: `Bwing - Nhà cái Thể thao, Casino hàng đầu Châu Á`,
		description: `Bwing is the world leading sportsbook offering one of the kind gambling experience in live betting covering all sports, casino, slots, keno, esports, rng casino, fantasy sports, virtual sports, lottery, live casino, live dealer, bingo, and racing.`,
		author: `Bwing`,
		supportedLanguages: ["en", "vn"],
		siteUrl: "https://www.Bwing.com"
	},
	plugins: [
		{
			resolve: "gatsby-plugin-eslint",
			options: {
				extensions: ["js", "jsx", "ts", "tsx"],
				exclude: [
					"node_modules",
					"bower_components",
					".cache",
					"public"
				],
				stages: ["develop"],
				emitWarning: true,
				failOnError: true
			}
		},
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				excludes: [`/en/*/`, `/en`, `*/404`, `/404.html`]
			}
		},
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/styles/img`
			}
		},
		{
			resolve: require.resolve(
				`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`
			),
			options: {
				path: __dirname
			}
		}
	],
	developMiddleware: app => {
		app.use(
			"/api",
			createProxyMiddleware({
				target: "https://stag.bwing.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
		app.use(
			"/SiteSkin",
			createProxyMiddleware({
				target: "https://stag.bwing.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
		app.use(
			"*/Cashier",
			createProxyMiddleware({
				target: "https://stag.bwing.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
		app.use(
			"*/entPage",
			createProxyMiddleware({
				target: "https://stag.bwing.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
		app.use(
			"*/liveStreamingEntPage",
			createProxyMiddleware({
				target: "https://stag.bwing.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
	}
	// proxy: [
	// 	{
	// 		prefix: "/api",
	// 		url: "https://stag.bwing.com"
	// 	},
	// 	{
	// 		prefix: "*/Cashier",
	// 		url: "https://stag.bwing.com"
	// 	},
	// 	{
	// 		prefix: "/SiteSkin",
	// 		url: "https://stag.bwing.com"
	// 	},
	// 	{
	// 		prefix: "*/entPage",
	// 		url: "https://stag.bwing.com"
	// 	},
	// 	{
	// 		prefix: "*/liveStreamingEntPage",
	// 		url: "https://stag.bwing.com"
	// 	}
	// ]
};
