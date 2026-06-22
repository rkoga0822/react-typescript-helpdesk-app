import type { Inquiry } from "../types/inquiry";

export type SortType =
  | "newest"
  | "oldest"
  | "status";

// ステータス順の並び順定義
const statusOrder = {
  pending: 0,
  in_progress: 1,
  completed: 2,
};

// 問い合わせ一覧を指定条件で並び替える
export function sortInquiries(
  inquiries: Inquiry[],
  sort: SortType
) {
  // 元の配列を変更しないようコピーを作成
  const copied = [...inquiries];

  // 新しい順
  if (sort === "newest") {
    return copied.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  // 古い順
  if (sort === "oldest") {
    return copied.sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }

  // ステータス順
  return copied.sort(
    (a, b) => statusOrder[a.status] - statusOrder[b.status]
  );
}