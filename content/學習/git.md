如果說docker是一種空間相關的技術的話
那麼git可以是時間相關的技術
主要原理是把記錄抽象成有向無環圖（雖然除了merge以外基本上長的就像樹）
理論的練習
[https://learngitbranching.js.org/?locale=zh_TW](https://learngitbranching.js.org/?locale=zh_TW)
實際的推薦練習
https://skills.github.com/?hl=zh-TW
理論的官方書籍
https://git-scm.tw/book/en/v2

​1. 內容 (Blob）：銀行金庫，特性：銀行一次存大量的相同物資，如果物資之間有一點差異那就會再存一份，同樣的原理，在區塊鏈或 Git 這種系統使用的是「內容定址儲存」。
​優點：重複的文件只會存一份，節省空間（去重技術）。

​2. 資料結構樹的指標（tree）：財產清冊，​它不存真正的錢，而是存「清單」。
​運作方式：如果清單裡指了10種物資的種類與數量，今天只有「黃金」變動了，那麼新的清冊只會重新記錄黃金的新位置，其他9種物資則直接指向舊的記錄。
​效率：不需要幫所有物資重新印標籤，只需更新變動的路徑。而且有需要的時候才會取用，節省時間

​3. 節點 (Commit)：借據，上面寫了需要的財產清冊以及上一張借據的位址，Hash 值 (防偽碼)：這是透過數學運算（SHA-1/SHA-256）產生的唯一指紋。裡面會考慮撰寫時間，與內容等因素。
​不可竄改性：如果你把借據借來的資產再借給別人的話，因為別人的那張借據上寫了「你的借據的防偽碼」，如果你改了你的借據，會造成你的借據的防偽碼被重新生成，導致後面所有的借據的防偽碼（Hash值）都會對不起來，這就是銀行(git)難以造假的原因。

4.指標（Branch）：指向借據的名稱，因為防偽碼難以辨認，因此我們不說0000a1b2c3... 的那張借據，而是我們跟銀行講我們要的名稱是什麼，相當於請銀行給他貼一個標籤（指標）指向借據

5.頭（HEAD）：銀行櫃員當前處理的借據更新指令，有兩種方式，第一種是告訴他借據的別稱是什麼，櫃員會取消原來的借據別稱改到更新後的借據上，第二種是告訴他防偽碼是什麼，櫃員就只會更新借據而已（Detached HEAD），萬一你又叫他處理不同借據而且沒記Hash值你之後就指定不了這份借據了（除非你能叫銀行再貼一個別稱上去）。

下面DHEAD代表單指HEAD指標（Detached HEAD狀態）
AHEAD代表HEAD指標與它所指的指標一起（Attached HEAD狀態）

git <指令> -f相當於強制執行

git commit將AHEAD延伸出一個新的分支節點
git commit --amend將在父節點延伸出一個新的分支節點後將AHEAD移動過去，內容是對原節點的修正，而目前節點會變孤立節點

git branch <new_branch_name>相當於新增一個指標在原地
git branch -f <branch_to_move> <target_destination>相當於移動<branch_to_move>指標到<target_destination>指標
git branch -u <remote/branch> <local_branch>將原有的<local_branch>改成追蹤<remote/branch>（例如origin/main）

git checkout <target>相當於HEAD指向指定的指標（AHEAD）或是指向指定的節點（DHEAD），幾乎是唯一一個能只動HEAD的指令
git checkout -b<new_local_branch><remote/branch> 新增一個<new_local_branch>標籤改成追蹤<remote/branch>（例如origin/main）
現代git為了區分職責將git checkout拆成git switch（切換分支/移動 HEAD）與git restore（還原檔案）

git merge <target_branch> 判斷AHEAD與<target_branch>，如果分叉那就當前指標往前與指定的指標指的節點合併出一個新的分支節點，如果沒有分叉那就直接接過去

git rebase <target_branch>將已經分叉後的所有節點內容複製修改後一一對應接到<target_branch>延伸出新的分支節點後，將AHEAD改成指向新的分支節點的最後一個節點，而原節點就會被孤立
git rebase -i<target_branch>將已經分叉後的所有節點內容提供使用者自由調整順序與選取與否再複製修改並一一對應接到<target_branch>延伸出新的分支節點後，將AHEAD改成指向新的分支節點的最後一個節點，而原節點就會被孤立

git reset <target>將AHEAD移到<target>並使後面沒被連接的節點被孤立，可按需求選擇模式
git reset <target>--soft 只動 HEAD
git reset <target>--mixed（預設）：動 HEAD + index
git reset <target>--hard 動HEAD + index + working tree

git revert <target>將AHEAD往前延伸出一個新的分支節點，這個節點內容是AHEAD和<target>的反向修改合併

git cherry-pick<target_1><target_2>將AHEAD往前延伸出一個新的分支節點，這個節點內容是AHEAD加上<target_1>指標對本身的修改，隨後對<target_2>指標做一樣的事

git tag <tag_name><target_commit>將名稱為<tag_name>的標籤貼在<target_commit>上面，此標籤不會被commit，被checkout時會使AHEAD變成DHEAD

git clone將遠端的複製下來，會產生一個叫origin/main的標籤，會自動的綁定遠端main標籤，反映的是你遠端最後被下載的所有內容，此標籤不會被commit，被checkout時會使AHEAD變成DHEAD

git fetch將origin/main下載更新至遠端最新的內容，但不會更改本地的進度
git fetch <remote> <remote_branch>:<local_branch>從<remote>的遠端下載<remote_branch>的遠端標籤到<local_branch>，如果<local_branch>不存在就創建一個

git pull是先git fetch(下載)再和當前分支git merge（合併本地內容）
git pull --rebase就是git fetch(下載)再git rebase 
git pull <remote> <remote_branch>:<local_branch>從<remote>的遠端下載<remote_branch>的遠端標籤到<local_branch>，如果<local_branch>不存在就創建一個，之後在與AHEAD合併

git push是如果你的本地的下載進度是和最新的遠端進度一樣時把本地你的更新的上傳至遠端，origin/main也會更新
git push <remote> <local_branch>:<remote_branch>上傳到<remote>的遠端，從<local_branch>的本地標籤到遠端的<remote_branch>標籤，如果<remote_branch>不存在就創建一個

應該還有暫存區的部分
之後補

可以透過在最後加入^來指定上一個commit
^<nums>代表merge的第幾個分支
或是~<nums>來指定上<nums>個commit

