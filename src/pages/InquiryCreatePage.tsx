import Button from "../components/Button";
import styles from "./InquiryCreatePage.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Inquiry, InquiryCreateInput } from "../types/inquiry";
import { inquiryAPI } from "../api/inquiries";
import axios from "axios";

type LaravelValidationError = {
  message: string;
  errors: Record<string, string[]>;
};

type Props = {
  onCreated: (Inquiry: Inquiry) => void;
  onBack: () => void;
};

const schema = z.object({
  title: z.string().max(100, "１００文字以内で入力してください"),
  content: z.string().max(1000, "１０００文字以内で入力してください"),
  requester: z.string().max(100, "１００文字以内で入力してください"),
});

type FormData = z.infer<typeof schema>;

// 問い合わせ登録フォーム
function InquiryCreatePage({ onCreated, onBack }: Props) {
  // React Hook Form + Zod によるフォーム管理
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: InquiryCreateInput) => {
    try {
      const inquiry = await inquiryAPI.create(data);
      onCreated(inquiry);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 422) {
        const body = e.response.data as LaravelValidationError;
        Object.entries(body.errors).forEach(([field, messages]) => {
          setError(field as keyof InquiryCreateInput, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "送信中..." : "登録する"}
        </Button>
        <Button onClick={onBack} variant="primary">
          戻る
        </Button>
      </div>
    </form>
  );
}

export default InquiryCreatePage;
