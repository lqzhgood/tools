import { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { reducer } from './actions';
import { initialState, type Store } from './state';

export const AppContext = createContext({
    store: initialState,
    dispatch: () => {},
} as {
    store: Store;
    dispatch: React.Dispatch<Parameters<typeof reducer>[1]>;
});

export const useStore = () => useContext(AppContext).store;
export const useActions = () => useContext(AppContext).dispatch;

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [store, dispatch] = useImmerReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ store, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}
