import { useState } from "react";

type Page = "list" | "detail" | "create";

export function usePageNavigation() {
  const [currentPage, setCurrentPage] = useState<Page>("list");

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const showList = () => {
    setCurrentPage("list");
  };

  const showCreate = () => {
    setCurrentPage("create");
  };

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
