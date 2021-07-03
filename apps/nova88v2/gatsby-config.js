module.exports = {
	siteMetadata: {
		defaultLanguage: "en",
		supportedLanguages: ["en", "cs", "id", "th"]
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
		`gatsby-transformer-sharp`,

		{
			resolve: require.resolve(
				`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`
			),
			options: {
				path: __dirname
			}
		},
		`gatsby-plugin-sharp`
		// {
		//   resolve: `gatsby-plugin-manifest`,
		//   options: {
		//     name: `gatsby-starter-default`,
		//     short_name: `starter`,
		//     start_url: `/`,
		//     background_color: `#663399`,
		//     theme_color: `#663399`,
		//     display: `minimal-ui`,
		//     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
		//   },
		// },
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
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
