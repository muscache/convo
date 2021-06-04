<script lang="ts">
  export let text: IMessage["text_"];
  export let sender: IMessage["sender_"];
</script>

<div class:me={sender == "me"} class:other={sender != "me"}>
  <p>{text}</p>
</div>

<style>
  .other,
  .me {
    max-width: 70%;
    font-size: 14px;
    border-radius: 7px;
    padding: 12px 16px;
    white-space: pre-line;
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
  p {
    margin: 0;
    line-height: 1.3em;
  }
</style>
