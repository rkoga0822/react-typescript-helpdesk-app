import { inquiryStatusLabel, type Inquiry } from "../types/inquiry";

type Props = {
  inquiries: Inquiry[];
  onSelectInquiry: (id: number) => void;
};
function InquiryListPage({ inquiries, onSelectInquiry }: Props) {
  return (
    <div>
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} style={{ border: "solid 10px #0188ff" }}>
          <p onClick={() => onSelectInquiry(inquiry.id)}>
            タイトル:{inquiry.title}
          </p>
          <p>ステータス：{inquiryStatusLabel[inquiry.status]}</p>
        </div>
      ))}
    </div>
  );
}
export default InquiryListPage;
