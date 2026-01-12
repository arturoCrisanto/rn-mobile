// lib/utils.js
export function formatDate(dateString) {
  // format date nicely
  // example: from this 👉 2025-05-20 to this 👉 May 20, 2025
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export function formatAmount(amount) {
  // format amount to include commas and 2 decimal places
  // example: from this 👉 1000 to this 👉 1,000.00
  return parseFloat(amount)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
