import type { InquiryFilter } from "../types/inquiry";
import Button from "./Button";
import styles from "./Filter.module.css";
import type { SortType } from "../utils/sortInquiries";

type Props = {
  onFilterChange: (filter: InquiryFilter) => void;
  count: number;
  currentFilter: InquiryFilter;
  sort: SortType;
  onSortChange: (sort: SortType) => void;
};

const FILTER_OPTIONS = [
  { value: "all", label: "全て" },
  { value: "pending", label: "未対応" },
  { value: "in_progress", label: "対応中" },
  { value: "completed", label: "完了" },
] as const;

// 問い合わせの絞り込み・並び替えを行うコンポーネント
function Filter({ onFilterChange, count, currentFilter, sort, onSortChange, }: Props) {
  return (
    <div className={styles.filterContainer}>
      {FILTER_OPTIONS.map((filter) => (
        <Button
          key={filter.value}
          variant="filter"
          active={currentFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
      <span className={styles.count}>{count}件</span>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortType)}
      >
        <option value="newest">新しい順</option>
        <option value="oldest">古い順</option>
        <option value="status">ステータス順</option>
      </select>
    </div>
  );
}
export default Filter;
