import { useState } from "react";
import type {
  Inquiry,
  InquiryStatus,
} from "../types/inquiry";

// 問い合わせデータの管理を行うカスタムフック
export function useInquiries() {
  const [inquiries, setInquiries] =
    useState<Inquiry[]>([]);

  // 問い合わせを新規登録
  const addInquiry = (
    title: string,
    content: string,
    requester: string
  ) => {
    const newInquiry: Inquiry = {
      id: Date.now(),
      title,
      content,
      requester,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    setInquiries((prev) => [...prev, newInquiry]);
    
  };

  // 問い合わせのステータスを更新
  const updateStatus = (
    id: number,
    status: InquiryStatus
  ) => {
    setInquiries((prev) =>
      prev.map((inquiry) =>
        inquiry.id === id
          ? { ...inquiry, status }
          : inquiry
      )
    );
  };

  // 問い合わせを削除
  const deleteInquiry = (id: number) => {
  setInquiries((prev) =>
    prev.filter((inquiry) => inquiry.id !== id)
  );
};

  return {
    inquiries,
    addInquiry,
    updateStatus,
    deleteInquiry,
  };
}