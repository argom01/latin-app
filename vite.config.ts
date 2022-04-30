import path from 'path';
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
	// ...vite configures
	server: {
		// vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
		port: 3000,
	},
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
	plugins: [
		...VitePluginNode({
			adapter: 'express',
			appPath: './src/index.ts',
			tsCompiler: 'swc',

			// Optional, default: {
			// jsc: {
			//   target: 'es2019',
			//   parser: {
			//     syntax: 'typescript',
			//     decorators: true
			//   },
			//  transform: {
			//     legacyDecorator: true,
			//     decoratorMetadata: true
			//   }
			// }
			//}

			// swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
			swcOptions: {
				minify: true,
			},
		}),
	],
});
