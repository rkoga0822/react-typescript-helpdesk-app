import { useState } from "react";

type Props = {
  onAddInquiry: (title: string, content: string, requester: string) => void;
};

function InquiryCreatePage({ onAddInquiry }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [requester, setRequester] = useState("");
  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル"
      />
      <br />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="内容"
      />
      <br />

      <input
        value={requester}
        onChange={(e) => setRequester(e.target.value)}
        placeholder="依頼者"
      />
      <button onClick={() => onAddInquiry(title,content,requester)}>登録</button>
    </div>
  );
}
export default InquiryCreatePage;
