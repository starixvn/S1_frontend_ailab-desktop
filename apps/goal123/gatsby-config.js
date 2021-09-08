module.exports = {
	siteMetadata: {
		defaultLanguage: "vn",
		title: `Goal123`,
		description: `Goal123 là trang cá cược thể thao hàng đầu thế giới, cung cấp trải nghiệm tốt nhất cho người dùng trên tất cả môn thể thao, casino, xèng, keno, thể thao điện tử, casino RNG, thể thao fantasy, thể thao ảo, xổ số, casino trực tiếp, dealer trực tiếp, bingo và đua xe.`,
		author: `Goal123`,
		supportedLanguages: ["en", "vn"],
		siteUrl: "https://www.goal123.com"
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
			url: "https://stag.goal123.com"
		},
		{
			prefix: "*/Cashier",
			url: "https://stag.goal123.com"
		},
		{
			prefix: "/SiteSkin",
			url: "https://stag.goal123.com"
		},
		{
			prefix: "*/entPage",
			url: "https://stag.goal123.com"
		},
		{
			prefix: "*/liveStreamingEntPage",
			url: "https://stag.goal123.com"
		}
	]
};
