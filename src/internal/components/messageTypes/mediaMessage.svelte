<script lang="ts">
  export let kind: IMessage["kind_"];
  export let url: IMessage["payload_"];
  export let sender: IMessage["sender_"];
</script>

<div class:me={sender == "me"} class:other={sender != "me"}>
  <div class="media-container">
    {#if kind == "img"}
      <img src={url} alt="" />
    {/if}
  </div>
</div>

<style>
  .other,
  .me {
    max-width: 70%;
    font-size: 14px;
    border-radius: 7px;
    padding: 12px 16px;
  }
  .other {
    background: #eee;
    border-bottom-left-radius: 2px;
    align-self: flex-start;
  }
  .me {
    background: royalblue;
    color: #fff;
    align-self: flex-end;
    border-bottom-right-radius: 2px;
  }
  .media-container {
    height: 200px;
    width: 100%;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
