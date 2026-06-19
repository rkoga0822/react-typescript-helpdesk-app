// ※ Inquiry 型は仮のもの。次のレッスンで types/ に移動する
type Inquiry = {
  id: number;
  title: string;
  status: "pending" | "in_progress" | "completed";
  created_at: string;
};

type InquiryRowProps = {
  inquiry: Inquiry;
  onSelect: (id: number) => void;
};

export const InquiryRow = ({ inquiry, onSelect }: InquiryRowProps) => {
  return (
    <tr>
      <td>{inquiry.id}</td>
      <td>
        <button onClick={() => onSelect(inquiry.id)}>
          {inquiry.title}
        </button>
      </td>
      <td>
        {/* 自分で StatusBadge を使って実装してみよう */}
      </td>
      <td>{inquiry.created_at}</td>
    </tr>
  );
};