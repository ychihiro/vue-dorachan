# きみはだれ？〜ぼくドラえもん

10個の質問に答えていただくと、ユーザーにそっくりなキャラクターが見つかります。
<img width="512" alt="スクリーンショット 2023-03-11 16 54 11" src="https://user-images.githubusercontent.com/114800637/224474105-843162d5-da0b-4192-bb8a-0e9a0ad58fe5.png">

## 作成した目的
卒業課題のため私が作ってみたかったアプリを作成しました。

## 他のリポジトリ
[Lalavelリポジトリ](https://github.com/ychihiro/laravel-doraemon.git)

## 機能一覧
- 登録機能
- ログイン機能
- ログアウト機能
- メール認証機能
- 診断機能
- 診断結果一覧
- 診断名・キャラクター名・人気順の検索機能
- お気に入り登録機能
- お気に入り解除機能
- お気に入り一覧機能
- 診断評価機能
- マイページ機能
- 診断結果確認用のQRコード機能
- 一斉メール送信機能
- 商品購入(決済)機能
- 購入履歴確認機能
- 商品購入のための住所・お届け日時登録機能
- 住所・お届け日時変更機能
- リマインダー送信機能
- ステッカー抽選機能

## 使用技術
- Laravel8.83.27
- Vue3
- Firebase8.6

## テーブル設計
<img width="370" alt="スクリーンショット 2023-03-12 9 35 20" src="https://user-images.githubusercontent.com/114800637/224517902-0f342547-d8d7-4388-a4da-69d0032a0602.png">

<img width="364" alt="スクリーンショット 2023-03-12 9 35 59" src="https://user-images.githubusercontent.com/114800637/224517938-184c59d5-c235-48b1-833f-84d9ddbcfb8c.png">

## ER図
<img width="751" alt="スクリーンショット 2023-03-12 9 20 20" src="https://user-images.githubusercontent.com/114800637/224517953-2fe2607d-c7db-41ee-b023-641d27f1e249.png">

# 環境構築方法
①フロントエンド
- git clone https://github.com/ychihiro/laravel-doraemon.git
- vscodeを開ける
- npm install -g @vue/cli
- [Node.jsインストール]https://nodejs.org/ja/download/
- yarn install
- yarn serve

②バックエンド
- git clone https://github.com/ychihiro/laravel-doraemon.git
- vscodeにワークスペースとして追加
- composer update
- .env.exampleを.envに変更
- .envファイルの修正
<img width="251" alt="スクリーンショット 2023-03-12 10 36 36" src="https://user-images.githubusercontent.com/114800637/224519446-47f7504d-d4f9-4cbc-beb9-d7925cca75c1.png">

- php artisan key:generate
- php artisan migrate:fresh
- php artisan db:seed
- php artisan serve

## テストユーザー
①ユーザー
- メールアドレス：nobi@nobita.com
- パスワード：nobinobita

②診断作成者
- メールアドレス：create@diagnosis.com
- パスワード：creatediagnosis

③管理者
- メールアドレス：addmin@user.com
- パスワード：addminuser
