const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
	siteMetadata: {
		defaultLanguage: "en",
		supportedLanguages: [
			"en",
			"cs",
			"th",
			"id",
			"hi",
			"bd",
			"my",
			"kh",
			"vn"
		]
	},
	flags: {
		FAST_DEV: true,
		PARALLEL_SOURCING: true,
		DEV_WEBPACK_CACHE: true,
		PRESERVE_WEBPACK_CACHE: true
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
				target: "https://stage.nova88dev.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
		app.use(
			"/SiteSkin",
			createProxyMiddleware({
				target: "https://stage.nova88dev.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
		app.use(
			"*/Cashier",
			createProxyMiddleware({
				target: "https://stage.nova88dev.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
		app.use(
			"*/entPage",
			createProxyMiddleware({
				target: "https://stage.nova88dev.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
		app.use(
			"*/liveStreamingEntPage",
			createProxyMiddleware({
				target: "https://stage.nova88dev.com",
				changeOrigin: true,
				secure: false // Do not reject self-signed certificates.
			})
		);
	}
};
