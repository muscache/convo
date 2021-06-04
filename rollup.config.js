import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import {terser} from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import cssPlugin from "rollup-plugin-css-only";

const production = process.env.NODE_ENV == "production";

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
				stdio: ["ignore", "inherit", "inherit"],
				shell: true
			});

			process.on("SIGTERM", toExit);
			process.on("exit", toExit);
		}
	};
}

export default {
	input: "src/internal/main.ts",
	output: {
		sourcemap: !production,
		format: "iife",
		name: null,
		file: "public/build/bundle.js"
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({sourceMap: !production}),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
				cssHash: ({hash, css}) => {
					return `x-${hash(css)}`;
				},
				// immutable: true,
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		cssPlugin({output: "bundle.css"}),

		resolve({
			browser: true,
			dedupe: ["svelte"]
		}),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload("public"),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		// production && terser()
		production && terser({
			// IMPORTANT:
			// We use terser to minify property names. This
			// gives us an even smaller bundle
			// To opt in, simply append an underscore to your
			// property names. ie:
			// {example: ""} becomes {example_: ""}
			mangle: {
				properties: {
					regex: /_$/,
				}
			}
		})
	],
	watch: {
		clearScreen: false
	}
};
