# Convo
Easy to build chatbot that runs directly in the browser - no server needed.

# Get started
```sh
git clone https://github.com/muscache/convo.git --depth 1
cd convo
npm install
npm run dev
```

# Customizing Convo
1. Edit `src/settings.ts` to customize the chat window.
2. Add type definitions for `IUserData` in `src/global.d.ts`.
3. Edit `src/onMessage.ts` to control what the bot says.

`src/internal/components` contains the UI components that make up convo. Every file has a description of what the component does. If you don't like how something looks, simply find the appropriate file and edit it!

# Frequently Asked Questions
## Why do the property names end with an underscore?
Convo makes use of [terser's property mangling feature](https://github.com/terser/terser#mangle-properties-options) to emit smaller bundles.

If you like, you can opt-in to an even smaller bundle by appending an underscore to your property names.

## I'm getting a warning about missing output.name
That is expected. Since this a standalone script, we don't need to export anything and therefore don't need `output.name`.

## What is a good way to use `payload`?
For simple use cases, I'd recommend delimiting your data with a separator like this:
```js
const encoded = "ADD_TO_CART" + "~" + "<ItemID>";
const decoded = encoded.split("~");
```
When there are complex interactions involved, I generally use JSON.
