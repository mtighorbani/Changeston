export const useLocalStorage = () => {
  const setItem = (key: string, value: string) => {
    typeof window !== "undefined" && localStorage.setItem(key, value);
  };
  const getItem = (key: string) => {
    return typeof window !== "undefined" && localStorage.getItem(key);
  };
  const removeItem = (key: string) => {
    typeof window !== "undefined" && localStorage.removeItem(key);
  };
  return { setItem, getItem, removeItem };
};
