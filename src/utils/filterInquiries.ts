import type { Inquiry, InquiryFilter } from "../types/inquiry";

// ステータスで問い合わせを絞り込む
export function filterInquiries(inquiries: Inquiry[], filter: InquiryFilter) {
  if (filter === "pending") {
    return inquiries.filter((i) => i.status === "pending");
  }

  if (filter === "completed") {
    return inquiries.filter((i) => i.status === "completed");
  }

  if (filter === "in_progress") {
    return inquiries.filter((i) => i.status === "in_progress");
  }

  return inquiries;
}
