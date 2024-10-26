
// 用 Express 建立一個簡單的伺服器，並且使用 @line/bot-sdk 套件來處理 LINE Bot 的訊息事件。 
// 這個範例會回覆使用者傳來的訊息。
// 指令: node app.js

// 設定 LINE Bot 的 Channel Access Token 和 Channel Secret
// 設定 LINE Bot 的 Channel Access Token 和 Channel Secret

// 安裝 express and @line/bot-sdk 套件
// 指令: npm install express @line/bot-sdk
// body-parser 套件是用來解析 POST 請求的內容
// 指令: npm install body-parser

const express = require('express');
const bodyParser = require('body-parser');
const line = require('@line/bot-sdk');

const app = express();
// 設定 port 預設參數 8000  
// env 會用來判斷目前執行環境的 port
// 如果有設定 port 環境變數，就使用設定的 port，否則使用 8000
// 這樣可以讓程式在不同的環境上執行，不需要每次都手動設定 port
// 指令: export PORT=8000
const port = process.env.PORT || 8000;

const config = {
// 設定 LINE Bot 的 Channel Access Token 和 Channel Secret
    channelAccessToken: 'u7CRiMZO93OhPzdxwO9D1qanyZ4ShycTHtM4lGTPAs9qAlQqnHSaQlFvNOgKy6rzu3vl5MPmOdsqKx1EecYGLR8AAZeKRPiHzNLerEDE1Ecod397T1ajfrkl+O4XB3SVStXWiTe9mStmWfU5q8m6MQdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'b44fedbc1b061b2ad22c9a9328adee25'
};


app.use(bodyParser.json());

app.post('/', line.middleware(config), (req, res) => {
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

    const echo = { type: 'text', text: event.message.text };

    return client.replyMessage(event.replyToken, echo);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
