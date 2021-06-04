<!-- 
	Entrypoint to the bot. It is the blue button that
	opens the chat window
-->
<script lang="ts">
	import { setContext, onMount } from "svelte";
	import { chatContext } from "./lib/contexts";
	import { isTyping, messages, quickReplies } from "./lib/stores";
	import MdChat from "svelte-icons/md/MdChat.svelte";
	import ChatWindow from "./components/ChatWindow.svelte";
	import { expandAfterMilis, seenDelayMilis } from "../settings";
	import onMessage from "../handlers/onMessage";

	let expanded = false;
	onMount(() => {
		if (expandAfterMilis > 0) {
			setTimeout(() => (expanded = true), expandAfterMilis);
		}
	});

	let firstTime = true;

	const ctx = {
		// Set in History.svelte
		scrollToBottom_: null,
		// Set in Chatbox.svelte
		flashTextInput_: null,

		getMessageHistory_() {
			return $messages;
		},
		setIsTyping_(typing) {
			$isTyping = typing;
		},
		sendMessage_: (m: IMessage, timeout = 0) =>
			new Promise((resolve) => {
				// We need a timeout before scrolling because Svelte
				// takes a few milliseconds to render the new message.
				// Without it, we would end up scrolling only partially!
				setTimeout(ctx.scrollToBottom_, 50);

				if (timeout > 0) {
					$isTyping = true;

					setTimeout(() => {
						ctx.sendMessage_(m, 0);
						resolve();
					}, timeout);
					return;
				}

				$isTyping = false;
				messages._push(m);

				if (m.sender_ == "me") {
					// Don't react to our own messages!
					setTimeout(() => {
						onMessage(m, ctx);
					}, seenDelayMilis);
				}
				resolve();
			}),
		// Set below
		setQuickReplies_: (qr: IButton[], timeout: number): Promise<void> =>
			new Promise((resolve) => {
				if (timeout > 0) {
					setTimeout(() => {
						ctx.setQuickReplies_(qr, 0);
						resolve();
					}, timeout);
					return;
				}
				quickReplies.set(qr);
				setTimeout(ctx.scrollToBottom_, 50);
				resolve();
			}),
		userData_: {},
	} as IChatContext;

	setContext<IChatContext>(chatContext, ctx);

	$: {
		if (expanded && firstTime) {
			firstTime = false;
			ctx.sendMessage_(
				{
					kind_: "postback",
					sender_: "me",
					payload_: "get_started",
				},
				0
			);
		}
	}
</script>

<div class="main" on:click={() => (expanded = !expanded)}>
	<div>
		<MdChat />
	</div>
	<ChatWindow {expanded} />
</div>

<style>
	.main {
		font-family: Arial, Helvetica, sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		position: fixed;
		border-radius: 50%;
		right: 24px;
		bottom: 24px;
		height: 64px;
		width: 64px;
		background-color: royalblue;
	}
	.main > div {
		height: 36px;
		width: 36px;
		color: #fff;
		cursor: pointer;
	}
	.main :global(*),
	.main :global(*:before),
	.main :global(*:after) {
		box-sizing: inherit;
	}
</style>
