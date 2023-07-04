import React from "react";

export const useStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = React.useState<T>(() => {
    const storaged = localStorage.getItem(key);
    if (storaged) return JSON.parse(storaged);
    else return initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as const;
};
