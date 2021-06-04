<!-- 
  Contains chat history
-->
<script lang="ts">
  import { getContext } from "svelte";
  import { isTyping, messages, quickReplies } from "../lib/stores";
  import { chatContext } from "../lib/contexts";
  import Message from "./Message.svelte";
  import QuickReply from "./QuickReply.svelte";
  import TypingDots from "./TypingDots.svelte";

  const ctx = getContext<IChatContext>(chatContext);
  let history: HTMLDivElement | null;

  ctx.scrollToBottom_ = function () {
    history.scrollTop = history.scrollHeight;
  };
</script>

<div class="history" bind:this={history}>
  {#each $messages as msg}
    <Message {msg} />
  {/each}

  {#if $isTyping}
    <TypingDots />
  {/if}

  {#if $quickReplies.length > 0}
    <div class="quick-replies">
      {#each $quickReplies as quickReply}
        <QuickReply qr={quickReply} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .history {
    position: relative;
    padding: 8px 16px;
    flex: 1;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .history::-webkit-scrollbar {
    display: none;
  }
  .quick-replies {
    bottom: 0;
    background: #fff;
    text-align: center;
  }
</style>
