import React, { useMemo, useReducer } from 'react';

interface Props<T> {
    initialState: T;
}


export type ActionType<T> = {
    field: keyof T;
    value: T[keyof T] | ((prev: T[keyof T]) => T[keyof T]);
};



const useCreateReducer = <T>({ initialState }: Props<T>) => {

    function reducer<T>(state: T, action: ActionType<T>): T {
        return {
            ...state,
            [action.field]:
                typeof action.value === "function"
                    ? (action.value as (prev: T[keyof T]) => T[keyof T])(state[action.field])
                    : action.value,
        };
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    return useMemo(() => ({ state, dispatch }), [state, dispatch]);
};

export default useCreateReducer;
