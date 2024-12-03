const { createProxyMiddleware } = require("http-proxy-middleware");

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
		},
		`gatsby-plugin-sass`
	],
	developMiddleware: app => {
		app.use(
			"/api",
			createProxyMiddleware({
				target: "https://stag.goal123.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
		app.use(
			"/SiteSkin",
			createProxyMiddleware({
				target: "https://stag.goal123.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
		app.use(
			"*/Cashier",
			createProxyMiddleware({
				target: "https://stag.goal123.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
		app.use(
			"*/entPage",
			createProxyMiddleware({
				target: "https://stag.goal123.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
		app.use(
			"*/liveStreamingEntPage",
			createProxyMiddleware({
				target: "https://stag.goal123.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
	}
};
