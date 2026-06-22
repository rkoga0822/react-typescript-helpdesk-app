export type InquiryStatus = "pending" | "in_progress" | "completed";

export const inquiryStatusLabel: Record<InquiryStatus, string> = {
  pending: "未対応",
  in_progress: "対応中",
  completed: "完了",
};

export type Inquiry = {
  id: number;
  title: string;
  content: string;
  requester: string;
  status: InquiryStatus;
  created_at: string;
};

export type InquiryFilter = "all" | "pending" | "in_progress" | "completed";
