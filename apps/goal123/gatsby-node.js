/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const config = require("./gatsby-config");
/**
 * Makes sure to create localized paths for each file in the /pages folder.
 * For example, pages/404.js will be converted to /en/404.js and /el/404.js and
 * it will be accessible from https:// .../en/404/ and https:// .../el/404/
 */
exports.onCreatePage = async ({
	page,
	actions: { createPage, deletePage, createRedirect }
}) => {
	const originalPath = page.path;

	// if (!page.path.match(/^\/404\/$/)) {
	// 	await deletePage(page);
	// }

	await Promise.all(
		config.siteMetadata.supportedLanguages.map(async lang => {
			const localizedPath = `/${lang}${page.path}`;
			// createRedirect({
			// 	fromPath: originalPath,
			// 	toPath: localizedPath,
			// 	Language: lang,
			// 	isPermanent: false,
			// 	redirectInBrowser: isEnvDevelopment,
			// 	statusCode: 301
			// });

			await createPage({
				...page,
				path: localizedPath,
				context: {
					...page.context,
					originalPath,
					lang
				}
			});
		})
	);

	// createRedirect({
	// 	fromPath: originalPath,
	// 	toPath: `/${config.siteMetadata.defaultLanguage}${page.path}`,
	// 	isPermanent: false,
	// 	redirectInBrowser: isEnvDevelopment,
	// 	statusCode: 301
	// });
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const fs = require("fs");
const stdLibBrowser = require("node-stdlib-browser");
const {
	NodeProtocolUrlPlugin
} = require("node-stdlib-browser/helpers/webpack/plugin");
const webpack = require("webpack");

exports.onCreateWebpackConfig = ({ actions }) => {
	actions.setWebpackConfig({
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src")
			}
		},
		plugins: [
			new NodeProtocolUrlPlugin(),
			new webpack.ProvidePlugin({
				process: stdLibBrowser.process,
				Buffer: [stdLibBrowser.buffer, "Buffer"]
			})
		],
		externals: [
			{
				jquery: "jQuery"
			}
		]
	});
};

// 解決每次進到靜態檔ex: BLOCKIP/index.html 都會被導回首頁的狀況
// eslint-disable-next-line @typescript-eslint/--no-ignore
exports.onCreateDevServer = ({ app }) => {
	app.use((req, res, next) => {
		const staticPath = path.join(__dirname, "static", req.url);
		if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
			res.sendFile(staticPath);
		} else {
			next();
		}
	});
};
