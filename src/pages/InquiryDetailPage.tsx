import type { Inquiry, InquiryStatus } from "../types/inquiry";
type Props = {
  inquiry: Inquiry;
  onStatusChange:(id:number,status:InquiryStatus) => void
};
function InquiryDetailPage({ inquiry,onStatusChange }: Props) {
  return (
    <div>
      <p>内容:{inquiry.content}</p>
      <p>問い合わせた人:{inquiry.requester}</p>
      ステータス：
      <select
        value={inquiry.status}
        onChange={(e) =>
          onStatusChange(inquiry.id, e.target.value as InquiryStatus)
        }
      >
        <option value="pending">未対応</option>
        <option value="in_progress">対応中</option>
        <option value="completed">完了</option>
      </select>
    </div>
  );
}
export default InquiryDetailPage;
