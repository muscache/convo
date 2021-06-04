/**
 * IButton is the type used for buttons and quick replies.
 */
declare type IButton = {
  /** Shown on button */
  title_: string;
  /** Message that is sent when the button is pressed. If empty, the message is `title` */
  message_?: string;
  /**
   * Kind of button:
   * 
   * `url`: The button acts as an \<a> tag. The payload is URI. It always opens in a new tab
   * 
   * `postback`: The button emits `payload` when clicked
   */
  kind_: "url" | "postback";
  /** Additional data for the button. The contents depend on `kind` */
  payload_: string;
};

/**
 * ICarouselItem is the type used for carousel items.
 */
declare type ICarouselItem = {
  /** Text that is shown above each item */
  title_: string;
  /** Description text shown below the image */
  caption_: string;
  /** Optional image for item */
  image_?: string;
  /** Buttons present under item */
  buttons_: IButton[];
};

/**
 * IMessage is the type used for messages.
 * Everything, including postbacks, is a message
 */
declare type IMessage = {
  /** Sender of the message. "me" refers to the user */
  sender_: "me" | "system";
  /**
   * Kind of message:
   * 
   * `postback`: Represents a postback. This type of message is not shown in the
   * chat window unless `text` is present. You will never need to send this type
   * yourself; use Buttons or QuickReplies instead
   * 
   * `text`: Represents a text message. When using this type, the `text`
   * property must be populated
   * 
   * `carousel`: Represents a carousel message which contains one or more items
   * to choose from. When using this type, the `items` property is mandatory
   * 
   * `img`: Represents an image (including GIFs). When using this type,
   * the `payload` property must contain the resource URI.
   * 
   */
  kind_: "postback" | "text" | "carousel" | "img";
  /** Text in the message. Only used when `kind` is "postback" or "text" */
  text_?: string;
  /** Arbitrary payload. The contents depend on `kind` */
  payload_?: string;
  /** Used when `kind` is "carousel" */
  items_?: ICarouselItem[];
};

/**
 * IUserData is a type that is meant to be filled by you.
 * 
 * It holds custom data you might want to store such as
 * names and emails
 * 
 * We encourage you to change this JSDoc to better describe this type
 */
declare type IUserData = {
  // Your types here
};

/**
 * IChatContext is the type used for chat context.
 * 
 * It contains various useful functions that you can
 * use to work with the chat window.
 */
declare interface IChatContext {
  /** Returns the message history */
  getMessageHistory_: () => IMessage[];
  /** Scrolls to the bottom of the chat history */
  scrollToBottom_: () => void;
  /** Flashes chatbox. Can be used to give an indication to the user to type */
  flashTextInput_: () => void;
  /** Sends a message. A timeout can be provided to show a typing status */
  sendMessage_: (msg: IMessage, timeoutMilis: number) => Promise<void>;
  /** Shows quick replies to the user. A delay can be provided to show the quick replies after some time */
  setQuickReplies_: (qr: IButton[], delayMilis: number) => Promise<void>;
  /** Changes typing status. */
  setIsTyping_: (typing: boolean) => void;
  /** Arbitrary data */
  userData_: IUserData;
}
