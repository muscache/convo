<!-- 
  Houses the components of the chatbox. This is the component that
  becomes visible when you click the main blue button
-->
<script lang="ts">
  import Info from "./Info.svelte";
  import History from "./History.svelte";
  import Chatbox from "./Chatbox.svelte";

  export let expanded: boolean;
</script>

<div class="window" on:click|stopPropagation class:expanded>
  <Info />
  <History />
  <Chatbox />
</div>

<style>
  .window {
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: 120%;
    right: 0;
    width: 0; /* 375px */
    height: 0; /* 450px */
    background: #fff;
    border: 1px solid #dedede;
    border-radius: 7px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.16);
    overflow: hidden;
  }
  .expanded {
    animation: open 0.3s ease forwards alternate;
  }
  @keyframes open {
    0% {
      height: 0;
      width: 0;
      opacity: 0;
    }
    /* For the bounce effect */
    50% {
      height: 460px;
      width: 385px;
      opacity: 1;
    }
    100% {
      height: 450px;
      width: 375px;
    }
  }
</style>
