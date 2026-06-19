import { type InquiryStatus, inquiryStatusLabel } from "../types/inquiry";

type StatusBadgeProps = {
  status: InquiryStatus;
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <span>{inquiryStatusLabel[status]}</span>;
};