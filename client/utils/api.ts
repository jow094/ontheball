import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export default api;

export function toCamel<T extends object>(obj: T): { [key: string]: any } {
  const newObj: any = {};
  for (const key in obj) {
    const parts = key.split('_');
    const camelKey = parts
      .map((part, index) => {
        const lower = part.toLowerCase();
        return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join('');

    newObj[camelKey] = obj[key];
  }
  return newObj;
}

export function arrayToCamel<T extends object>(arr: T[]): { [key: string]: any }[] {
  return arr.map(item => toCamel<T>(item));
}

