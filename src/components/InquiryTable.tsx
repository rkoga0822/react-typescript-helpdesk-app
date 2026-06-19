import { InquiryRow } from "./InquiryRow";

// ※ Inquiry 型は仮のもの。次のレッスンで types/ に移動する
type Inquiry = {
  id: number;
  title: string;
  status: "pending" | "in_progress" | "completed";
  created_at: string;
};

type InquiryTableProps = {
  inquiries: Inquiry[];
  onSelect: (id: number) => void;
};

export const InquiryTable = ({ inquiries, onSelect }: InquiryTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>タイトル</th>
          <th>ステータス</th>
          <th>登録日</th>
        </tr>
      </thead>
      <tbody>
        {inquiries.map((inquiry) => (
          <InquiryRow
            key={inquiry.id}
            inquiry={inquiry}
            onSelect={onSelect}
          />
        ))}
      </tbody>
    </table>
  );
};