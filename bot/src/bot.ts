import { url } from "inspector";
import { text } from "stream/consumers";
import { callback } from "telegraf/typings/button";
import { Telegraf, Markup } from "telegraf";

// Import the necessary packages
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const axios = require("axios");
const express = require("express");
const cors = require("cors");
// const http = require('http');

// Create a new Express app
// const app = express();
// Load environment variables
dotenv.config();

const token = process.env.TELEGRAM_TOKEN;
console.log("Bot token:", token); // Confirm token is loaded

// Create a new Telegram bot using polling to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Assign telegram channel id
const groupUsername = process.env.GROUP_USERNAME;
const channelUsername = process.env.CHANNEL_USERNAME;
const twitter = process.env.TWITTER_ID;

let groupId: number = 0;
let channelID: number = 0;
let twitterID: number = 0;

let USER_ID: number = 0;
let USER_NAME: string = "Leo_mint";
let chatId: number = 0;

bot
  .getChat(groupUsername)
  .then((chat: any) => {
    groupId = chat.id;
    console.log("Group ID:", groupId);
  })
  .catch((error: any) => {
    console.error("Error getting chat:", error);
  });

bot
  .getChat(channelUsername)
  .then((chat: any) => {
    channelID = chat.id;
    console.log("channel ID:", channelID);
  })
  .catch((error: any) => {
    console.error("Error getting chat:", error);
  });

// Define the inline keyboard layout for interaction
const options = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "👋 Start Now  ️",
          web_app: { url: "https://mintmastergame-frontend.onrender.com/" },
        },
      ],
      [
        {
          text: "💪💋Join community  ",
          url: "https://t.me/mintastergame",
        },
      ],
      [{ text: "🤔 How to earn from the game  ", callback_data: "earn" }],
      //[{ text: "Task 📝", callback_data: "task" }],
    ],
  },
};

const option1 = {
  parse_mode: "HTML",
  disable_web_page_preview: true,

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "💰 Join Mint Master telegram group?   Sure! 👌 ",
          callback_data: "join",
        },
      ],
      [
        {
          text: "💰 Subscribe Mint Master Channel?   Sure! 👌 ",
          callback_data: "subscribe",
        },
      ],
      [
        {
          text: "💰 Follow Mint Master Twitter?          Sure! 👌 ",
          callback_data: "follow",
        },
      ],
    ],
  },
};

const options3 = {
  parse_mode: "HTML",
  disable_web_page_preview: true,

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "👋 Start Now",
          web_app: { url: "https://mintmastergame-frontend.onrender.com/" },
        },
      ],
      [
        {
          text: "💪 Join community",
          url: "https://t.me/mintastergame",
        },
      ],
      [{ text: "Tap to Earn 💰", callback_data: "earn" }],
     // [{ text: "Task 📝", callback_data: "task" }],
    ],
  },
};

// Handle the /start command
bot.onText(/\/start/, (msg: any) => {
  chatId = msg.chat.id;
  const userID = msg.from.id;
  // USER_ID = chatId;

  console.log("--//---myChatID----//---", chatId);

  const welcomeMessage =
    "Hello! Welcome to the Mint Master  😎                  \n\nStart our tap-to-earn game by clicking the “Play” button below. Choose your adventure and start tapping the screen to collect coins.   \n\nBoost your passive income and develop your own strategy with multi-taps, higher energy, and referrals. Join our social media to become an active member of the Mint Master Game society with the exclusive “Mint Master Token.” \n\nIn Mint Master, all activities are rewarded. Gather as many coins as possible. Once our token is listed on exchanges, you'll receive mysterious, valuable prizes directly to your wallets.\n\nDon't forget to invite your friends — you can earn even more together!";

  // Send the welcome message with the inline keyboard
  bot.sendMessage(chatId, welcomeMessage, options);
});

bot.on("message", async (msg: any) => {
  chatId = msg.chat.id;
  USER_ID = chatId;
  const userID = msg.from.id;
  USER_NAME = msg.from?.username;

  console.log("--//---myChatID----//---", chatId);
  console.log("--//---myUserID----//---", userID);

  // Check if the message is from the specific group and the specific user
  if (msg.chat.id === groupId && msg.from.id === userID) {
    console.log(`User ${msg.from.username} (ID: ${msg.from.id}) posted a message in the group.`);
    // Here, you can do something with the message, like logging or sending a confirmation
    bot.sendMessage(msg.chat.id, `User ${msg.from.username} posted a message in the group.`);

    try {
      await axios.post(
        `https://mintmastergame-backend.onrender.com/api/vibe/add`,
        {
          username: msg.from.username,
        }
      );

      console.log("--//---OK!!!--vibe user--//---", msg.from.username);
    } catch (error) {
      console.error(error);
    }
  }
});

// Handle callback queries from inline buttons
bot.on("callback_query", (callbackQuery: any) => {
  const message = callbackQuery.message;
  const category = callbackQuery.data; // The 'callback_data' associated with the button pressed.

  if (category === "earn") {
    // Replace 'URL_TO_CHANNEL' with your channel's URL
    const messagetext =
      "How to play Mint Master 🤔                              \n\n 💰 Tap to Earn \n\nTap the screen and collect coins. These coins will be exchanged to tokens at the end of the event.  \n\n  ⛏ Mine\n\nUpgrade your status by buying special NFTs that will give you higher passive income opportunities (coming soon).  \n\n ⏰ Profit Per Hour \n\nThe bot itself as well as your status will work for you and mine more coins while you are away!  \n\nNote: You need to log in to the game again once in a while. \n\n  👥 Friends & Family \n\nInvite your friends and family and you will get bonuses. Help a friend move to the higher levels and you will get even more bonuses. \n\n📑 The exact date of T1 & T2 Exchange listings will be announced in our announcement channel.\n\nHave fun and enjoy earning! 💰💰";
    // Options to disable web page preview

    bot.sendMessage(message.chat.id, messagetext, options3);
  }

  //if (category === "task") {
    // Replace 'URL_TO_CHANNEL' with your channel's URL
   // const messagetext =
     // "   😊   You will gain bonus!  🚀                    \n\n 😎  Join Mint Master telegram group  \n       https://t.me/MintMasterGroupOfficial \n       You will receive 25.000 coins \n\n 🤩  Join Mint Master Channel  \n       https://t.me/mintastergame \n       You will receive 25.000 coins \n\n  😍  Follow our twitter!\n       https://twitter.com/MintMasterGame\n       You will receive 25.000 coins \n\n";
   // bot.sendMessage(message.chat.id, messagetext, options);
  //}

});

bot.onText(/\/start (.+)/, async (msg: any, match: any) => {
  const chatId = msg.chat.id;
  const referrerUsername = match[1]; // Extracted from the start parameter

  console.log("--//---OK!!!----//---");
  console.log("--//---referrerUsername----//---", referrerUsername);
  console.log("--//---USER_NAME----//---", USER_NAME);

  try {
    await axios.post(
      `https://mintmastergame-backend.onrender.com/api/friend/add`,
      {
        username: referrerUsername,
        friend: USER_NAME,
      }
    );

    const response00 = await axios.post(
      `https://mintmastergame-backend.onrender.com/api/wallet/add`,
      {
        username: USER_NAME,
      }
    );

    const response0 = await axios.post(
      `https://mintmastergame-backend.onrender.com/api/wallet/updateBalance/${USER_NAME}`,
      { balance: 25000 }
    );

    const response1 = await axios.post(
      `https://mintmastergame-backend.onrender.com/api/wallet/${referrerUsername}`
    );
    const response2 = await axios.post(
      `https://mintmastergame-backend.onrender.com/api/wallet/updateBalance/${referrerUsername}`,
      { balance: 25000 + response1.data.balance }
    );

    console.log(response2.data);
  } catch (error) {
    console.error(error);
  }
});

const app = express();
app.use(cors());
app.use(express.json());


app.post("/joinTG", (req: any, res: any) => {
  console.log("---request---", req.body["username"]);
  const username = req.body["username"];
  console.log("--//---USER_NAME----//---", username);
  console.log("--//---USER_ID----//---", USER_ID);
  // Check if the user is already joined group
  bot
    .getChatMember(groupId, USER_ID)
    .then(async (member: any) => {
      if (member.status !== "left" && member.status !== "kicked") {
        console.log("💪 You will gain 25.000 coins!");
        try {
          await axios.post(
            `https://mintmastergame-backend.onrender.com/api/earnings/add`,
            { username: username }
          );
          axios.post(
            `https://mintmastergame-backend.onrender.com/api/earnings/update/joinTelegram/${username}`,
            { status: true, earned: false }
          );
          res.status(200).json({ message: "ok", username: username });
          console.log("---444---", res.msg);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        res
          .status(400)
          .json({ message: "you are not in group now", username: username });
      }
    })
    .catch((error: any) => {
      console.error("Error checking chat member:", error);
      res
        .status(404)
        .json({ message: "Error checking chat member", username: username });
    });

  // res.json({ message: "ok", username : username });
});

app.post("/joinTC", (req: any, res: any) => {
  console.log("---request---", req.body["username"]);
  const username = req.body["username"];
  console.log("--//---USER_ID----//---", USER_ID);

  bot
    .getChatMember(channelID, USER_ID)
    .then(async (member: any) => {
      if (member.status !== "left" && member.status !== "kicked") {
        console.log("💪 You will gain 25.000 coins!");
        try {
          await axios
            .post(
              `https://mintmastergame-backend.onrender.com/api/earnings/add`,
              {
                username: username,
              }
            )
            .then(() => {
              axios.post(
                `https://mintmastergame-backend.onrender.com/api/earnings/update/subscribeTelegram/${username}`,
                {
                  status: true,
                  earned: false,
                }
              );
            });

          res.status(200).json({ message: "ok", username: username });
          console.log("---444---", res.msg);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        res.status(400).json({ message: "you are not in group now", username: username });
        console.log("🤔 you are not in group now");
      }
    })
    .catch((error: any) => {
      console.error("Error checking chat member:", error);
      res.status(404).json({ message: "Error checking chat member", username: username });
    });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
