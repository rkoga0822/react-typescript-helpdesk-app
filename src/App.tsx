import { useState } from "react";
import InquiryListPage from "./pages/InquiryListPage";
import InquiryDetailPage from "./pages/InquiryDetailPage";
import InquiryCreatePage from "./pages/InquiryCreatePage";
import type { Inquiry, InquiryFilter, InquiryStatus } from "./types/inquiry";
import Filter from "./components/Filter";
import Button from "./components/Button";
import "./App.css";
type Page = "list" | "detail" | "create";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("list");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  //詳細画面用のid取得とcurrentPageをdetailに変更する
  const handleSelectedId = (id: number) => {
    setSelectedId(id);
    setCurrentPage("detail");
  };

  //取得したidから詳細を持ってくる
  const selectedInquiry = inquiries.find(
    (inquiry) => inquiry.id === selectedId,
  );

  //ステータス変更
  const handleUpdateStatus = (id: number, status: InquiryStatus) => {
    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === id ? { ...inquiry, status } : inquiry,
      ),
    );
  };

  //新規登録
  const handleAddInquiry = (
    title: string,
    content: string,
    requester: string,
  ) => {
    const newInquiry: Inquiry = {
      id: Date.now(),
      title,
      content,
      requester,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    setInquiries([...inquiries, newInquiry]);
    setCurrentPage("list");
  };

  //フィルター機能
  const [filter, setFilter] = useState<InquiryFilter>("all");

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (filter === "pending") return inquiry.status === "pending";
    if (filter === "completed") return inquiry.status === "completed";
    if (filter === "in_progress") return inquiry.status === "in_progress";
    return true;
  });

  const handleFilterChange = (filter: InquiryFilter) => {
    setFilter(filter);
    setCurrentPage("list");
  };

  return (
    <div className="app">
      <h1 className="title">ヘルプデスク</h1>
      <div className="navigation">
        <Button onClick={() => setCurrentPage("list")} variant="secondary">
          一覧
        </Button>
        <Button onClick={() => setCurrentPage("create")} variant="primary">
          新規作成
        </Button>
        <br />
      </div>

      <Filter
        onFilterChange={handleFilterChange}
        count={filteredInquiries.length}
        currentFilter={filter}
      />

      {currentPage === "list" && (
        <InquiryListPage
          inquiries={filteredInquiries}
          onSelectInquiry={handleSelectedId}
        />
      )}

      {currentPage === "detail" && selectedInquiry && (
        <InquiryDetailPage
          inquiry={selectedInquiry}
          onStatusChange={handleUpdateStatus}
          onBack={() => setCurrentPage("list")}
        />
      )}

      {currentPage === "create" && (
        <InquiryCreatePage onAddInquiry={handleAddInquiry} />
      )}
    </div>
  );
}

export default App;
