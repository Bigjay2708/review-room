export const createPlaceholderDataURL = (
  width: number,
  height: number,
  text: string = 'No Image'
): string => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23e5e5e5'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='24' text-anchor='middle' alignment-baseline='middle' fill='%23999999'%3E${text}%3C/text%3E%3C/svg%3E`;
};

export const posterPlaceholder = createPlaceholderDataURL(500, 750, 'No Poster');
export const backdropPlaceholder = createPlaceholderDataURL(1280, 720, 'No Backdrop Image');
