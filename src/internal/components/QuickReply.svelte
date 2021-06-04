<!-- 
  Quick reply button  
-->
<script lang="ts">
  import { getContext } from "svelte";
  import { chatContext } from "../lib/contexts";
  import { quickReplies } from "../lib/stores";

  export let qr: IButton;

  const ctx = getContext<IChatContext>(chatContext);

  function handleClick() {
    ctx.sendMessage_(
      {
        kind_: "postback",
        sender_: "me",
        payload_: qr.payload_,
        text_: qr.message_ ?? qr.title_,
      },
      0
    );

    // Remove all quick replies after the user has
    // finished selecting
    quickReplies.reset();
  }
</script>

<button on:click={handleClick}>{qr.title_}</button>

<style>
  button {
    display: inline-block;
    text-align: center;
    padding: 8px;
    font-size: 14px;
    cursor: pointer;
    background: #fff;
    border: 1px solid royalblue;
    color: royalblue;
    border-radius: 24px;
    margin: 8px;
  }
</style>
