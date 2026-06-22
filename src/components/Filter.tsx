import type { InquiryFilter } from "../types/inquiry";
import Button from "./Button";
import styles from "./Filter.module.css";

type Props = {
  onFilterChange: (filter: InquiryFilter) => void;
  count: number;
  currentFilter: InquiryFilter;
};

const filters: {
  value: InquiryFilter;
  label: string;
}[] = [
  { value: "all", label: "全て" },
  { value: "pending", label: "未対応" },
  { value: "in_progress", label: "対応中" },
  { value: "completed", label: "完了" },
];

function Filter({ onFilterChange, count, currentFilter }: Props) {
  return (
    <div className={styles.filterContainer}>
      {filters.map((filter) => (
        <Button
          variant="filter"
          active={currentFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
      <span className={styles.count}>{count}件</span>
    </div>
  );
}
export default Filter;
