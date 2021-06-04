<script lang="ts">
  import { getContext } from "svelte";
  import { chatContext } from "../../lib/contexts";
  import MdChevronLeft from "svelte-icons/md/MdChevronLeft.svelte";
  import MdChevronRight from "svelte-icons/md/MdChevronRight.svelte";

  const ctx = getContext<IChatContext>(chatContext);

  export let items: ICarouselItem[];
  let curIdx = 0;
</script>

<div class="carousel">
  <div class="items" style="left: {curIdx * -250}px;">
    {#each items as item}
      <div class="item-container">
        <div class="item">
          <div class="name">
            <b>{item.title_}</b>
          </div>
          {#if item.image_}
            <div class="img" style="background-image: url({item.image_})" />
          {/if}
          <div class="caption">
            <p>{item.caption_}</p>
          </div>
          <div class="cta">
            {#each item.buttons_ as btn}
              <button
                class="btn"
                on:click={() => {
                  if (btn.kind_ == "url") {
                    window.open(btn.payload_, "_blank");
                  } else if (btn.kind_ == "postback") {
                    ctx.sendMessage_(
                      {
                        kind_: "postback",
                        sender_: "me",
                        payload_: btn.payload_,
                        text_: btn.message_ ?? btn.title_,
                      },
                      0
                    );
                  }
                }}
              >
                {btn.title_}
              </button>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>

  {#if items.length != 1}
    <button class="nav" on:click={() => curIdx--} disabled={curIdx == 0}>
      <div>
        <MdChevronLeft />
      </div>
    </button>

    <button
      class="nav"
      on:click={() => curIdx++}
      disabled={curIdx >= items.length - 1}
    >
      <div>
        <MdChevronRight />
      </div>
    </button>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
    overflow-x: hidden;
    padding-left: 52px;
  }
  .items {
    position: relative;
    display: inline-block;
    white-space: nowrap;
    transition: left 0.3s ease-out;
  }
  button.nav {
    position: absolute;
    top: calc(50% - 28px + 8px);
    left: 0;
    padding: 8px;
    border-radius: 50%;
    outline: none;
    border: 1px solid #dedede;
    cursor: pointer;
  }
  button.nav:active {
    transform: scale(0.96);
  }
  button.nav:last-child {
    left: unset;
    right: 0;
  }
  button.nav > div {
    width: 28px;
    height: 28px;
    color: #000;
  }

  /* Carousel item styles */
  .item-container {
    display: inline-block;
    vertical-align: top;
    margin-right: 12px;
  }
  .item {
    white-space: normal;
    width: 238px;
    padding: 16px;
    border: 1px solid #dedede;
    border-radius: 7px;
  }
  .name {
    font-size: 14px;
    margin-bottom: 8px;
  }
  .img {
    height: 150px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .caption {
    font-size: 12px;
    color: #666;
  }
  .cta {
    margin-top: auto;
  }
  .btn {
    width: 100%;
    text-align: center;
    padding: 8px;
    cursor: pointer;
    background: #fff;
    border: 1px solid royalblue;
    color: royalblue;
    border-radius: 3px;
    margin-bottom: 8px;
  }
  .btn:last-child {
    margin-bottom: 0;
  }
</style>
