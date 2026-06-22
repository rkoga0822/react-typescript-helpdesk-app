import { useState } from "react";

type Page = "list" | "detail" | "create";

// 画面遷移の状態管理を行うカスタムフック
export function usePageNavigation() {
  // 現在表示中の画面
  const [currentPage, setCurrentPage] = useState<Page>("list");

  // 詳細画面で表示する問い合わせID
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 一覧画面へ遷移
  const showList = () => {
    setCurrentPage("list");
  };

  // 新規作成画面へ遷移
  const showCreate = () => {
    setCurrentPage("create");
  };

  // 詳細画面へ遷移
  const showDetail = (id: number) => {
    setSelectedId(id);
    setCurrentPage("detail");
  };

  return {
    currentPage,
    selectedId,
    showList,
    showCreate,
    showDetail,
  };
}
