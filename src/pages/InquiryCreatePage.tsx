import Button from "../components/Button";
import styles from "./InquiryCreatePage.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onAddInquiry: (title: string, content: string, requester: string) => void;
};

const schema = z.object({
  title: z.string().min(2, "タイトルは必須です"),
  content: z.string().min(1, "内容は必須です"),
  requester: z.string().min(1, "依頼者は必須です"),
});

type FormData = z.infer<typeof schema>;

// 問い合わせ登録フォーム
function InquiryCreatePage({ onAddInquiry }: Props) {
  // React Hook Form + Zod によるフォーム管理
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // フォーム送信時の処理
  const onSubmit = (data: FormData) => {
    onAddInquiry(data.title, data.content, data.requester);
    reset();
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <input
          className={styles.input}
          {...register("title")}
          placeholder="タイトル"
        />
        {errors.title && <p>{errors.title.message}</p>}
        <br />

        <textarea
          className={styles.textarea}
          {...register("content")}
          placeholder="内容"
        />
        {errors.content && <p>{errors.content.message}</p>}

        <br />

        <input
          className={styles.input}
          {...register("requester")}
          placeholder="依頼者"
        />
        {errors.requester && <p>{errors.requester.message}</p>}
        <Button type="submit" variant="primary">登録</Button>
      </div>
    </form>
  );
}
export default InquiryCreatePage;
