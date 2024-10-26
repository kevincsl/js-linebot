# js-linebot

要啟動您的應用程式，請按照以下步驟操作：

1. 確保您已經安裝了所需的依賴項： 在專案根目錄中運行以下命令來安裝 express 和 @line/bot-sdk 套件：
> npm install

2. 設置環境變數： 確保您已經設置了 LINE_CHANNEL_ACCESS_TOKEN、LINE_CHANNEL_SECRET 和 PORT 環境變數。您可以在命令行中設置這些變數：

> export LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
> export LINE_CHANNEL_SECRET=your_channel_secret
> export PORT=your_port

3. 啟動應用程式： 使用以下命令來啟動應用程式：
> npm start