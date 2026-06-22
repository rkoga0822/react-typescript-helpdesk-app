# ヘルプデスクアプリ

社内の問い合わせを管理するためのシンプルなヘルプデスクアプリです。

## 概要

問い合わせの登録から対応状況の管理までを行える React + TypeScript 製のアプリケーションです。

問い合わせを一覧で確認し、詳細画面からステータスを更新できます。また、フィルターや並び替え機能により効率的に問い合わせを管理できます。

---

## 機能

### 問い合わせ管理

* 問い合わせの新規登録
* 問い合わせ一覧表示
* 問い合わせ詳細表示
* 問い合わせ削除

### ステータス管理

* 未対応
* 対応中
* 完了

詳細画面からステータスを変更できます。

### フィルター機能

問い合わせをステータスごとに絞り込みできます。

* 全て
* 未対応
* 対応中
* 完了

### 並び替え機能

* 新しい順
* 古い順
* ステータス順

### バリデーション

React Hook Form と Zod を利用し、以下の入力チェックを実施しています。

* タイトル必須
* 内容必須
* 依頼者必須

---

## 使用技術

### フロントエンド

* React 19
* TypeScript 6
* Vite 8

### ライブラリ

* React Hook Form
* Zod
* @hookform/resolvers

---

## ディレクトリ構成

```text
src/
├── components/
│   ├── Button.tsx
│   ├── Button.module.css
│   ├── Filter.tsx
│   └── Filter.module.css
│
├── hooks/
│   ├── useInquiries.ts
│   └── usePageNavigation.ts
│
├── pages/
│   ├── InquiryListPage.tsx
│   ├── InquiryListPage.module.css
│   ├── InquiryDetailPage.tsx
│   ├── InquiryDetailPage.module.css
│   ├── InquiryCreatePage.tsx
│   └── InquiryCreatePage.module.css
│
├── types/
│   └── inquiry.ts
│
├── utils/
│   ├── filterInquiries.ts
│   └── sortInquiries.ts
│
└── App.tsx
```

---

## 設計方針

責務ごとにコードを分割しています。

### hooks

状態管理や画面遷移を管理

* useInquiries
* usePageNavigation

### utils

データ加工処理を管理

* filterInquiries
* sortInquiries

### components

再利用可能な UI 部品

* Button
* Filter

### pages

画面単位のコンポーネント

* InquiryListPage
* InquiryDetailPage
* InquiryCreatePage

---

## 起動方法

### インストール

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

---

## 今後の改善案

* LocalStorage を利用したデータ永続化
* 検索機能
* ページルーティング（React Router）
* API サーバーとの連携
* 編集機能の追加
* ダークモード対応

---

## 注意事項

現在は useState でデータを管理しています。

そのためブラウザをリロードすると登録した問い合わせデータは消去されます。
