import { createContext, PropsWithChildren, useMemo, useState, Dispatch, SetStateAction } from 'react';
import { defaultState, State } from './state.ts';

// Define the shape of the context value
interface AppContextValue {
  state: State;
  setState: Dispatch<SetStateAction<State>>;
}

// Pass a default value that matches the type
export const AppContext = createContext<AppContextValue>({
  state: defaultState,
  setState: () => {}, // no-op default
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState(defaultState);

  const contextValue = useMemo(
    () => ({ state, setState }),
    [state] // no need to include setState; it's stable
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
