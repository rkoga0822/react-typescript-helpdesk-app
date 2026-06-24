import { useState } from "react";
import InquiryListPage from "./pages/InquiryListPage";
import InquiryDetailPage from "./pages/InquiryDetailPage";
import InquiryCreatePage from "./pages/InquiryCreatePage";
import type { Inquiry, InquiryFilter, InquiryStatus } from "./types/inquiry";
import Filter from "./components/Filter";
import Button from "./components/Button";
import "./App.css";
import { filterInquiries } from "./utils/filterInquiries";
import { usePageNavigation } from "./hooks/usePageNavigation";
import { useInquiries } from "./hooks/useInquiries";
import { sortInquiries, type SortType } from "./utils/sortInquiries";
import { inquiryAPI } from "./api/inquiries";
function App() {
  //CRUD系まとめたCustomHook
  // 問い合わせデータ管理
  const { inquiries, addInquiry, updateInquiry, removeInquiry } =
    useInquiries();

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
  const handleCreated = (inquiry: Inquiry) => {
    addInquiry(inquiry);
    showList();
  };

  const handleBack = () => {
    showList();
  };

  const [actionError, setActionError] = useState<string | null>(null);

  const handleUpdateStatus = async (id: number, status: InquiryStatus) => {
    setActionError(null);
    try {
      const updated = await inquiryAPI.updateStatus(id, status);
      updateInquiry(updated);
    } catch {
      setActionError("ステータスの更新に失敗しました");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("この問い合わせを削除しますか？")) return setActionError(null);
    try {
      await inquiryAPI.delete(id);
      removeInquiry(id);
      handleBack();
    } catch {
      setActionError("削除に失敗しました");
    }
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
          onDeleteInquiry={removeInquiry}
        />
      )}

      {currentPage === "detail" && selectedInquiry && (
        <InquiryDetailPage
          inquiry={selectedInquiry}
          onStatusChange={handleUpdateStatus}
          onBack={showList}
          onDelete={handleDelete}
        />
      )}

      {currentPage === "create" && (
        <InquiryCreatePage onBack={handleBack} onCreated={handleCreated} />
      )}
      {actionError && <p style={{ color: 'red' }}>{actionError}</p>}
    </div>
  );
}

export default App;
