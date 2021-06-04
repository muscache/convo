import App from "./App.svelte";
import {containerID} from "../settings";

const app = new App({
	target: document.getElementById(containerID),
});

export default app;
