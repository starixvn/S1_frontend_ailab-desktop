module.exports = {
	siteMetadata: {
		defaultLanguage: "en",
		supportedLanguages: [
			"en",
			"cs",
			"th",
			"th_en",
			"id",
			"id_en",
			"hi",
			"hi_en"
		]
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
			url: "https://www.n88dev.com"
		},
		{
			prefix: "*/Cashier",
			url: "https://www.n88dev.com"
		},
		{
			prefix: "/SiteSkin",
			url: "https://www.n88dev.com"
		},
		{
			prefix: "*/entPage",
			url: "https://www.n88dev.com"
		},
		{
			prefix: "*/liveStreamingEntPage",
			url: "https://www.n88dev.com"
		}
	]
};
