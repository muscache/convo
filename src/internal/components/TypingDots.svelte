<!-- 
  Component that is shown when `isTyping` is turned on
-->

<div>
  <span />
  <span />
  <span />
</div>

<style>
  div {
    display: inline-block;
    background-color: #eee;
    border-radius: 7px;
    padding: 12px 12px;
  }
  span {
    height: 6px;
    width: 6px;
    float: left;
    margin: 0 2px;
    background-color: #9e9ea1;
    display: block;
    border-radius: 50%;
    opacity: 0.4;
  }
  span:nth-child(1) {
    animation: 1s blink infinite 0.3333s;
  }
  span:nth-child(2) {
    animation: 1s blink infinite 0.6666s;
  }
  span:nth-child(3) {
    animation: 1s blink infinite 0.9999s;
  }
  @keyframes blink {
    50% {
      opacity: 1;
    }
  }
</style>
