/** Div ID where chatbot will be inserted. See public/index.html */
export const containerID = "convo-container";

export const profileName = "Super Speedy Delivery";
export const profileAbout = "Edit me in settings.ts";
export const profilePicture = "https://upload.wikimedia.org/wikipedia/commons/7/75/Kawaii_robot_power_clipart.svg";

/**
 * The bot will wait this much time before responding.
 * It helps provide a more human-like feel by simulating
 * a human reading what the user sent before actually responding.
 */
export const seenDelayMilis = 1000;

/**
 * The chatbox will automatically expand after this much time.
 * Can be used to bring attention to the chat feature.
 * Use 0 to disable
 */
export const expandAfterMilis = 2000; // 0 to disable
