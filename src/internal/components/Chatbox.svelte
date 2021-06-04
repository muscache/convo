<!-- 
  Area at the bottom where the user types
-->
<script lang="ts">
  import { getContext } from "svelte";
  import MdSend from "svelte-icons/md/MdSend.svelte";

  import { chatContext } from "../lib/contexts";

  const ctx = getContext<IChatContext>(chatContext);

  ctx.flashTextInput_ = function () {
    shouldFlashInput = true;
    setTimeout(() => {
      shouldFlashInput = false;
    }, 1000);
  };

  let msg = "";
  let shouldFlashInput = false;

  function send() {
    if (msg.trim().length == 0) return;

    ctx.sendMessage_(
      {
        kind_: "text",
        sender_: "me",
        text_: msg,
      },
      0
    );
    msg = "";
  }
</script>

<div class="chatbox" class:flash={shouldFlashInput}>
  <input
    placeholder="Say something..."
    on:keyup={(e) => {
      if (e.key == "Enter") send();
    }}
    bind:value={msg}
  />
  <button on:click={send}>
    <div>
      <MdSend />
    </div>
  </button>
</div>

<style>
  .chatbox {
    display: flex;
    height: 52px;
    border-top: 1px solid #dedede;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 52px;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  button div {
    width: 28px;
    height: 28px;
    color: royalblue;
  }
  input {
    flex: 1;
    border: none;
    padding: 0 12px;
    border-bottom-left-radius: 12px;
    background: transparent;
    height: 100%;
    outline: none;
  }
  .flash {
    animation: flash 1s ease-out forwards;
  }
  @keyframes flash {
    0% {
      background: yellow;
    }
    100% {
      background: #fff;
    }
  }
</style>
