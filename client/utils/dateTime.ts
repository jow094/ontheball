export function parseDateToKoreanArray(
  isoString: string | undefined,
  index: number[]
): string {
  if (!isoString) return "unknown";

  const date = new Date(isoString);

  const parts = [
    `${date.getFullYear()}년`, // 0
    `${String(date.getMonth() + 1).padStart(2, "0")}월`, // 1
    `${String(date.getDate()).padStart(2, "0")}일`, // 2
    `${String(date.getHours()).padStart(2, "0")}시`, // 3
    `${String(date.getMinutes()).padStart(2, "0")}분`, // 4
    `${String(date.getSeconds()).padStart(2, "0")}초`, // 5
  ];

  // index 배열에 있는 값만 선택 후 합치기
  const selected = index.map((i) => parts[i]).filter(Boolean);

  return selected.join(" ");
}