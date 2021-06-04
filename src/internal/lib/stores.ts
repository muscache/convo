import {writable} from "svelte/store";

export const messages = function createMessageStore() {
  const {subscribe, update} = writable<IMessage[]>([]);

  return {
    subscribe,
    _push: (msg: IMessage) => update(n => n.concat(msg)),
  };
}();

export const quickReplies = function createQuickReplyStore() {
  const {subscribe, set} = writable<IButton[]>([]);

  return {
    subscribe,
    set: (qr: IButton[]) => set(qr),
    reset: () => set([])
  };
}();

export const isTyping = writable(false);
