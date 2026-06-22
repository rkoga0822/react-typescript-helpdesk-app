import { useState } from "react";
import Button from "../components/Button";
import styles from "./InquiryCreatePage.module.css";

type Props = {
  onAddInquiry: (title: string, content: string, requester: string) => void;
};

function InquiryCreatePage({ onAddInquiry }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [requester, setRequester] = useState("");
  return (
    <div className={styles.form}>
      <input
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル"
      />
      <br />

      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="内容"
      />
      <br />

      <input
        className={styles.input}
        value={requester}
        onChange={(e) => setRequester(e.target.value)}
        placeholder="依頼者"
      />
      <Button
        onClick={() => onAddInquiry(title, content, requester)}
        variant="primary"
      >
        登録
      </Button>
    </div>
  );
}
export default InquiryCreatePage;
