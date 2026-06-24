import styles from './Filter.module.css'
const filters = [
  { value: "all", label: "全て" },
  { value: "pending", label: "未対応" },
  { value: "in_progress", label: "対応中" },
  { value: "completed", label: "完了" },
];

type StatusProps = {
  current: string;
  onChange: (status: string) => void;
};

export function StatusFilter({ current, onChange }: StatusProps) {
  return (
    <div className={styles.filterContainer}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          style={{ fontWeight: current === filter.value ? "bold" : "normal" }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
