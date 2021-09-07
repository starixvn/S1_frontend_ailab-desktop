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
				test: /\.js$|\.jsx$/,
				exclude: /(node_modules|.cache|public)/,
				stages: ["develop"],
				options: {
					emitWarning: true,
					failOnError: true
				}
			}
		},
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				exclude: [`/en/*/`, `/en`, `*/404`, `/404.html`]
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
	proxy: [
		{
			prefix: "/api",
			url: "https://stag.bwing.com"
		},
		{
			prefix: "*/Cashier",
			url: "https://stag.bwing.com"
		},
		{
			prefix: "/SiteSkin",
			url: "https://stag.bwing.com"
		},
		{
			prefix: "*/entPage",
			url: "https://stag.bwing.com"
		},
		{
			prefix: "*/liveStreamingEntPage",
			url: "https://stag.bwing.com"
		}
	]
};
