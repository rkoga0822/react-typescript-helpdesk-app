import { useEffect, useState } from "react";
import type { Inquiry } from "../types/inquiry";
import { inquiryAPI } from "../api/inquiries";

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await inquiryAPI.getAll(filter);

        setInquiries(data);
      } catch {
        setError("問い合わせの取得に失敗しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, [filter]);

  //stateの更新
  //登録
  const addInquiry = (inquiry: Inquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  //更新
  const updateInquiry = (updated: Inquiry) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === updated.id ? updated : i)),
    );
  };

  //削除
  const removeInquiry = (id: number) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id)); //trueのものだけ残す
  };

  return {
    inquiries,
    filter,
    isLoading,
    error,
    addInquiry,
    updateInquiry,
    removeInquiry,
    setFilter,
  };
}
