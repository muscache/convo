<!-- 
  Message component wrapper. Renders specialized
  components for each message type
-->
<script lang="ts">
  import TextMessage from "./messageTypes/textMessage.svelte";
  import CarouselMessage from "./messageTypes/carouselMessage.svelte";
  import MediaMessage from "./messageTypes/mediaMessage.svelte";

  export let msg: IMessage;
</script>

<div>
  {#if msg.kind_ == "text" || (msg.kind_ == "postback" && msg.text_)}
    <TextMessage text={msg.text_} sender={msg.sender_} />
  {/if}

  {#if msg.kind_ == "carousel"}
    <CarouselMessage items={msg.items_} />
  {/if}

  {#if msg.kind_ == "img"}
    <MediaMessage kind={msg.kind_} url={msg.payload_} sender={msg.sender_} />
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }
</style>
