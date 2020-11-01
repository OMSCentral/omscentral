import storage from './storage';
import useStorage from './useStorage';

export default function useSessionStorage<T = any>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  return useStorage<T>(key, initialValue, storage('session'));
}
