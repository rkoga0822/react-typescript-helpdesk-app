import { useState } from "react";
import InquiryListPage from "./pages/InquiryListPage";
import InquiryDetailPage from "./pages/InquiryDetailPage";
import InquiryCreatePage from "./pages/InquiryCreatePage";
import type { InquiryFilter } from "./types/inquiry";
import Filter from "./components/Filter";
import Button from "./components/Button";
import "./App.css";
import { filterInquiries } from "./utils/filterInquiries";
import { usePageNavigation } from "./hooks/usePageNavigation";
import { useInquiries } from "./hooks/useInquiries";
import { sortInquiries, type SortType } from "./utils/sortInquiries";
function App() {
  //CRUD系まとめたCustomHook
  // 問い合わせデータ管理
  const { inquiries, addInquiry, updateStatus, deleteInquiry } = useInquiries();

  //ページ遷移のCustomHook
  const { currentPage, selectedId, showList, showCreate, showDetail } =
    usePageNavigation();

  //フィルター状態管理
  const [filter, setFilter] = useState<InquiryFilter>("all");

  //並び替え
  const handleFilterChange = (filter: InquiryFilter) => {
    setFilter(filter);
    showList();
  };

  //どの問い合わせかの状態管理
  const selectedInquiry = inquiries.find((i) => i.id === selectedId);

  //並び替えの状態管理
  const [sort, setSort] = useState<SortType>("newest");

  //追加と追加後listに遷移
  // 問い合わせ登録後は一覧画面へ戻す
  const handleAddInquiry = (
    title: string,
    content: string,
    requester: string,
  ) => {
    addInquiry(title, content, requester);
    showList();
  };

  // フィルター適用
  const filteredInquiries = filterInquiries(inquiries, filter);

  // 並び替え適用
  const displayedInquiries = sortInquiries(filteredInquiries, sort);

  return (
    <div className="app">
      <h1 className="title">ヘルプデスク</h1>
      <div className="navigation">
        <Button onClick={showList} variant="secondary">
          一覧
        </Button>
        <Button onClick={showCreate} variant="primary">
          新規作成
        </Button>
        <br />
      </div>

      <Filter
        onFilterChange={handleFilterChange}
        count={filteredInquiries.length}
        currentFilter={filter}
        sort={sort}
        onSortChange={setSort}
      />

      {currentPage === "list" && (
        <InquiryListPage
          inquiries={displayedInquiries}
          onSelectInquiry={showDetail}
          onDeleteInquiry={deleteInquiry}
        />
      )}

      {currentPage === "detail" && selectedInquiry && (
        <InquiryDetailPage
          inquiry={selectedInquiry}
          onStatusChange={updateStatus}
          onBack={showList}
        />
      )}

      {currentPage === "create" && (
        <InquiryCreatePage onAddInquiry={handleAddInquiry} />
      )}
    </div>
  );
}

export default App;
