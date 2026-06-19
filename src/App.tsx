import { useState } from "react";
import InquiryListPage from "./pages/InquiryListPage";
import InquiryDetailPage from "./pages/InquiryDetailPage";
import InquiryCreatePage from "./pages/InquiryCreatePage";
import type { Inquiry, InquiryStatus } from "./types/inquiry";

type Page = "list" | "detail" | "create";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("list");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [inquiries, setInquiries] = useState<Inquiry[]>([
    {
      id: 1,
      title: "PCが起動しない",
      content: "電源を押しても起動しません",
      requester: "山田",
      status: "pending",
      created_at: "2026-06-19",
    },
    {
      id: 2,
      title: "テスト",
      content: "テスト中",
      requester: "テストさん",
      status: "completed",
      created_at: "2026-06-19",
    },
  ]);

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
  const handleUpdateStatus = (id:number,status:InquiryStatus) =>{
    setInquiries(inquiries.map((inquiry)=>
      inquiry.id === id ? {...inquiry,status} : inquiry
    ))
  }

  return (
    <div>
      <h1>ヘルプデスク</h1>
      <button onClick={() => setCurrentPage("list")}>一覧</button>

      <button onClick={() => setCurrentPage("create")}>新規作成</button>

      {currentPage === "list" && (
        <InquiryListPage
          inquiries={inquiries}
          onSelectInquiry={handleSelectedId}
        />
      )}

      {currentPage === "detail" && selectedInquiry && (
        <InquiryDetailPage 
        inquiry={selectedInquiry} 
        onStatusChange={handleUpdateStatus}
        />
      )}

      {currentPage === "create" && <InquiryCreatePage />}
    </div>
  );
}

export default App;
