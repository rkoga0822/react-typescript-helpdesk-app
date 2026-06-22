import type { InquiryFilter } from "../types/inquiry";

type Props = {
    onFilterChange:(filter:InquiryFilter)=>void
    count:number
}

function Filter({onFilterChange,count}:Props) {
  return (
    <div>
      <button onClick={() => onFilterChange("all")}>全て</button>
      <button onClick={() => onFilterChange("pending")}>未対応</button>
      <button onClick={() => onFilterChange("in_progress")}>対応中</button>
      <button onClick={() => onFilterChange("completed")}>完了</button>
       <p>件数: {count}件</p>
    </div>
  );
}
export default Filter;
