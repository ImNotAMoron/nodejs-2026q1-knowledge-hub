export function paginate<T>(
  items: T[],
  page: number,
  limit: number,
): {
  total: number;
  page: number;
  limit: number;
  data: T[];
} {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  if (startIndex >= items.length)
    return {
      total: items.length,
      page: page,
      limit: limit,
      data: [],
    };
  const data = items.slice(startIndex, Math.min(endIndex, items.length));
  return {
    total: items.length,
    page: page,
    limit: limit,
    data: data,
  };
}
