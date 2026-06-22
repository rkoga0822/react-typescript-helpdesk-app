import { useState } from "react";
import type {
  Inquiry,
  InquiryStatus,
} from "../types/inquiry";

export function useInquiries() {
  const [inquiries, setInquiries] =
    useState<Inquiry[]>([]);

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