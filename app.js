
// 用 Express 建立一個簡單的伺服器，並且使用 @line/bot-sdk 套件來處理 LINE Bot 的訊息事件。 
// 這個範例會回覆使用者傳來的訊息。
// 指令: node app.js

// 設定 LINE Bot 的 Channel Access Token 和 Channel Secret
// 指令: export LINE_CHANNEL_ACCESS_TOKEN
// 指令: export LINE_CHANNEL_SECRET
// 指令: export PORT=8000


// 安裝 express and @line/bot-sdk 套件
// 指令: npm install express @line/bot-sdk

import express from 'express';
import { middleware, Client } from '@line/bot-sdk';

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};

const client = new Client(config);
const app = express();

app.post('/', middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
    const line_client_id = event.source.userId;
    const echo = { type: 'text', text: event.message.text };
    return client.replyMessage(event.replyToken, echo+line_client_id);
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
