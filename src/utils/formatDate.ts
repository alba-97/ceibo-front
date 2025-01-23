export default (date: string) => {
  return date.replace("T", " ").slice(0, 16);
};
