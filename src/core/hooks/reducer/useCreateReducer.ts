import { useMemo, useReducer } from "react";

interface Props<T> {
  initialState: T;
}

export type ActionType<T, K extends keyof T> = {
  field: K;
  value: unknown;
};

export type ActionStateType<T> = <K extends keyof T>(
  key: K,
  value: T[K] | ((prev: T[K]) => T[K])
) => void;

const useCreateReducer = <T extends Record<string, unknown>>({
  initialState,
}: Props<T>) => {
  function reducer<T, K extends keyof T>(
    state: T,
    action: ActionType<T, K>
  ): T {
    return {
      ...state,
      [action.field]:
        typeof action.value === "function"
          ? (action.value as (prev: T[K]) => T[K])(state[action.field])
          : action.value,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  function newDispatch<K extends keyof T>(
    key: K,
    value: T[K] | ((prev: T[K]) => T[K])
  ) {
    dispatch({ field: key, value: value });
  }
  return useMemo(
    () => ({ state, dispatch: newDispatch }),
    [state, newDispatch]
  );
};

export default useCreateReducer;
