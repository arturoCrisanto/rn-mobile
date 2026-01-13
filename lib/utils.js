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
  // example: from this 👉 1000 to this 👉 1,000
  return parseFloat(amount)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function extractUsername(user) {
  // Extract username from Clerk user object
  // example: from this 👉 user with email john@example.com to this 👉 john
  if (!user) return "User";
  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (!email) return "User";
  const parts = email.split("@");
  return parts[0] || "User";
}
