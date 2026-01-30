# 電腦端與雲端同步：
我是參考以下影片的
https://youtu.be/IlNOhNeWGgY?si=ICtTXNW-1OZjFy6o
簡單來說，就是透過git保管，記得新增.gitignore文檔輸入
```
.git/
.obsidian/workspace
.obsidian/workspace-mobile
```
，保證git不會把頻繁變更的工作區狀態記錄下來，先手動上傳一次後，再用obsidian git插件實現自動化同步。這套流程跑完能保證檔案不會被莫名其妙丟失。

# 安卓手機與電腦端同步：

我原本用termux寫git同步腳本，但後來發現termux有可能在傳到一半的時候被作業系統殺掉，導致檔案損毀，之後想要push或pull都會有問題。

之後決定轉去syncthing，以前看到官方沒有再更新
手機端覺得不太可靠，後來發現社群fork了一個新的版本，於是就決定轉過去了，主要分成兩步：

第一步：用Tailscale vpn讓手機和電腦能當作是同一個網路互連

1.兩端安裝 Tailscale，然後登入同一帳號：確保設備都出現在Admin Console，並關閉金鑰過期 (Key Expiry)：對這兩台裝置點擊「Disable Key Expiry」，防止半年後突然斷線。

2.手機在設定中開啟 「始終開啟的 VPN (Always-on VPN)」，這能確保Tailscale不會被後台殺掉。

第二步：Syncthing連接設定

1.電腦端 
​監聽位址：設定 > 連線 > 監聽位址設為 default（確保它會聽 22000 埠）。
​GUI 位址：設定 > 圖形介面 > 保持 127.0.0.1:8384

​2. 手機端
​運行條件：設定 > 取消勾選「僅在 WiFi 下執行」（這樣 4G 才能跑）。
​位址對齊：在「遠端裝置 (電腦)」的進階設定中，位址列表設為 dynamic 或手動指定電腦的 Tailscale IP（例如 tcp://100.x.y.z:22000）。
系統設定：設定 > 應用程式 > Syncthing > 電池 > 設為 「不受限制 (Unrestricted)」。保證不會被後台殺掉，然後在兩端的忽略模式中填入也要填入以下內容：
```
.git/
.obsidian/workspace
.obsidian/workspace-mobile
```
