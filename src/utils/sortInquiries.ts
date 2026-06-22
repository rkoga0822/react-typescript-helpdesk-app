import type { Inquiry } from "../types/inquiry";

export type SortType =
  | "newest"
  | "oldest"
  | "status";

const statusOrder = {
  pending: 0,
  in_progress: 1,
  completed: 2,
};

export function sortInquiries(
  inquiries: Inquiry[],
  sort: SortType
) {
  const copied = [...inquiries];

  if (sort === "newest") {
    return copied.sort(
      (a, b) =>
        new Date(
          b.created_at
        ).getTime() -
        new Date(
          a.created_at
        ).getTime()
    );
  }

  if (sort === "oldest") {
    return copied.sort(
      (a, b) =>
        new Date(
          a.created_at
        ).getTime() -
        new Date(
          b.created_at
        ).getTime()
    );
  }

  return copied.sort(
    (a, b) =>
      statusOrder[a.status] -
      statusOrder[b.status]
  );
}