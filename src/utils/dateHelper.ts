export function formatDateVN(date: Date): string {
  const weekday = date.toLocaleDateString("vi-VN", { weekday: "long" });
  const weekdayFormatted = weekday
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${weekdayFormatted} · ${day} tháng ${month}, ${year}`;
}
