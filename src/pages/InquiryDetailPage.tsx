import Button from "../components/Button";
import type { Inquiry, InquiryStatus } from "../types/inquiry";
import styles from "./InquiryDetailPage.module.css";

type Props = {
  inquiry: Inquiry;
  onStatusChange: (id: number, status: InquiryStatus) => void;
  onBack: () => void;
};

// 問い合わせ詳細画面
function InquiryDetailPage({ inquiry, onStatusChange, onBack }: Props) {
  return (
    <div className={styles.container}>
      <p className={styles.row}>内容:{inquiry.content}</p>
      <p className={styles.row}>問い合わせた人:{inquiry.requester}</p>
      <div className={styles.row}>
        ステータス：
        <select
          className={styles.select}
          value={inquiry.status}
          onChange={(e) =>
            onStatusChange(inquiry.id, e.target.value as InquiryStatus)
          }
        >
          <option value="pending">未対応</option>
          <option value="in_progress">対応中</option>
          <option value="completed">完了</option>
        </select>
        <br />
        <Button onClick={onBack}>戻る</Button>
      </div>
    </div>
  );
}
export default InquiryDetailPage;
