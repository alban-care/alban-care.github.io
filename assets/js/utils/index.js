export const capitalize = (string) => {
  if (!string) return string;
  if (typeof string !== "string") return string;
  if (string.length === 1) return string.toUpperCase();

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const slugify = (string) => {
  return string
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
