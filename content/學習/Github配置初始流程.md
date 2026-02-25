產生密鑰
ssh-keygen -t ed25519 -C "your_email@example.com

保持解鎖狀態，這樣就不會一直問
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

看你的ssh公鑰
cat ~/.ssh/id_ed25519.pub

貼到github的個人頭像 -> Settings -> SSH and GPG keys。

確認成功與否
ssh -T git@github.com

git clone {}，​綠色code按鈕選SSH複製貼到括弧裡後刪掉括弧，開頭必須是 git@github.com:...。