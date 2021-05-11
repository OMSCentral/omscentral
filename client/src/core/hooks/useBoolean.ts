import { useCallback, useState } from 'react';

const useBoolean = (
  initialState: boolean,
): {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
} => {
  const [value, setValue] = useState(initialState);

  return {
    value,
    setTrue: useCallback(() => setValue(true), []),
    setFalse: useCallback(() => setValue(false), []),
  };
};

export default useBoolean;
