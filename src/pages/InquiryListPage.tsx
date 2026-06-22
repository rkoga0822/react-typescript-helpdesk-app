import Button from "../components/Button";
import { inquiryStatusLabel, type Inquiry } from "../types/inquiry";
import styles from "./InquiryListPage.module.css";

type Props = {
  inquiries: Inquiry[];
  onSelectInquiry: (id: number) => void;
  onDeleteInquiry: (id: number) => void;
};

// 問い合わせ一覧画面
function InquiryListPage({
  inquiries,
  onSelectInquiry,
  onDeleteInquiry,
}: Props) {
  // 該当データがない場合の表示
  if (inquiries.length === 0) {
    return <p className={styles.empty}>該当する問い合わせはありません</p>;
  }
  
  return (
    <div className={styles.list}>
      {inquiries.map((inquiry) => (
        <div
          key={inquiry.id}
          className={styles.card}
          onClick={() => onSelectInquiry(inquiry.id)}
        >
          <div className={styles.title}>{inquiry.title}</div>

          <p>
            ステータス：
            {inquiryStatusLabel[inquiry.status]}
          </p>
          <p>{inquiry.created_at}</p>

          <Button
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteInquiry(inquiry.id);
            }}
          >
            削除
          </Button>
        </div>
      ))}
    </div>
  );
}
export default InquiryListPage;
