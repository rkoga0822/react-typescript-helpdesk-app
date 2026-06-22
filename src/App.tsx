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
  const { inquiries, addInquiry, updateStatus, deleteInquiry } = useInquiries();

  const { currentPage, selectedId, showList, showCreate, showDetail } =
    usePageNavigation();

  const [filter, setFilter] = useState<InquiryFilter>("all");

  const selectedInquiry = inquiries.find((i) => i.id === selectedId);

  const [sort, setSort] = useState<SortType>("newest");

  const handleFilterChange = (filter: InquiryFilter) => {
    setFilter(filter);
    showList();
  };

  const handleAddInquiry = (
    title: string,
    content: string,
    requester: string,
  ) => {
    addInquiry(title, content, requester);
    showList();
  };

  const filteredInquiries = filterInquiries(inquiries, filter);

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
