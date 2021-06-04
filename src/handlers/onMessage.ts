/**
 * This function is called every time the user sends a message or postback. Add your code here
 */
export default async function onMessage(message: IMessage, ctx: IChatContext): Promise<void> {
  // Here's simple example that illustrates most of convo's features
  if (message.payload_) {
    // While you can use JSON for payloads, it's much
    // simpler to simply split data like this
    const parts = message.payload_.split("~");
    const payloadName = parts[0];

    // The `get_started` payload is sent when the user opens the chat
    if (payloadName == "get_started") {
      // Send a text message
      await ctx.sendMessage_({
        kind_: "text",
        sender_: "system",
        text_: "Welcome to Super Speedy Delivery!\nSelect an item to proceed with the example",
      }, 1000);

      // Send a carousel
      const items: ICarouselItem[] = [];
      const exampleItemNames = [
        ["Grapes", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Close_up_grapes.jpg/640px-Close_up_grapes.jpg"],
        ["Noodles", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Chicken_noodles.jpg/640px-Chicken_noodles.jpg"],
        ["Books", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Aufgeschlagenes_Buch_--_2020_--_4204.jpg/640px-Aufgeschlagenes_Buch_--_2020_--_4204.jpg"],
        ["Space Paste", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/NASA_toothpaste_IMG_5157.jpg/640px-NASA_toothpaste_IMG_5157.jpg"],
        ["Socks", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Hand_knitted_socks.jpg/640px-Hand_knitted_socks.jpg"]
      ];
      for (const item of exampleItemNames) {
        items.push({
          title_: item[0],
          image_: item[1],
          caption_: `You are looking at an item called "${item[0]}"`,
          buttons_: [{
            kind_: "postback",
            title_: "Select item",
            message_: `I want ${item[0]}`,
            payload_: `carousel~${item[0]}`, // Remember the payload. We'll be using it below
          }],
        });
      }

      await ctx.sendMessage_({
        kind_: "carousel",
        sender_: "system",
        items_: items,
      }, 2000);
    } else if (payloadName == "carousel") {
      // Depending on context, the same index might mean different things
      const item = parts[1];

      // Not recommended! Edit IUserData in global.d.ts
      // And set up appropriate typings for your custom data
      (ctx.userData_ as any).item = item;

      // We're responding to button presses now!
      await ctx.sendMessage_({
        kind_: "text",
        sender_: "system",
        text_: `When do you want your ${item.toLowerCase()} to be delivered?`,
      }, 500);

      // Show quick replies.
      await ctx.setQuickReplies_([
        {
          kind_: "postback",
          payload_: "deliverytime~now",
          title_: "NOW! 💥",
        },
        {
          kind_: "postback",
          payload_: "deliverytime~nextweek",
          title_: "Next week 🐼",
        },
      ], 1000);
    } else if (payloadName == "deliverytime") {
      const deliveryTime = parts[1];
      const item: string = (ctx.userData_ as any).item;
      let message: string;

      if (deliveryTime == "now") {
        message = `✅ We'll have your ${item.toLowerCase()} delivered in a jiff`;
      } else if (deliveryTime == "nextweek") {
        message = `✅ We'll have your ${item.toLowerCase()} delivered next week`;
      }

      await ctx.sendMessage_({
        kind_: "text",
        sender_: "system",
        text_: message
      }, 1000);

      await ctx.sendMessage_({
        kind_: "text",
        sender_: "system",
        text_: "🎉 You've completed the example!",
      }, 3000);
    }
  }
}
