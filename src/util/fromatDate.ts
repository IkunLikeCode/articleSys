export function formatDate(time: number, type?: string) {
  const date = new Date(time);
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate().toString().padStart(2, "0");
  const hh = date.getHours().toString().padStart(2, "0");
  const mm = date.getMinutes().toString().padStart(2, "0");
  const ss = date.getSeconds().toString().padStart(2, "0");
  switch (type) {
    case "YYYY-MM-DD":
      return `${YYYY}-${MM}-${DD}`;

    case "YYYY-MM-DD hh-mm-ss":
      return `${YYYY}-${MM}-${DD} ${hh}-${mm}-${ss}`;

    default:
      return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
  }
}
