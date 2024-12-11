export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  const items = [];
  let startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    items.push(i);
  }

  return items;
};
