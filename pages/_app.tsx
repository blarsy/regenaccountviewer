import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import type { AppProps } from 'next/app'

// Here we combine:
// - using a react context to pass object to children components
// - the useState hook to create and pass a state and a state setter function
// Then, the components anywhere in the app who will 'useAppContext' will be able to view and modify an app-wide state
// Definitely overkill for the current app, but it was 5 minutes copy-pasting from a previous project
type StateRawData = {
  connected: boolean
}
type AppState = {
  appState: StateRawData
  setAppState: Dispatch<SetStateAction<StateRawData>>
}

const AppContext = createContext({ appState: { connected: false }, setAppState: () => {}} as AppState);

function MyApp({ Component, pageProps }: AppProps) {
  const [state, setState] = useState({ connected: false })

  // Wrap the root component in an AppContext provider, so that any component may use
  // 'useAppContext' to access and modify an app-wide state
  return <AppContext.Provider value={{ appState: state, setAppState: setState}}>
    <Component {...pageProps} />
  </AppContext.Provider>
}

export default MyApp

export function useAppContext() {
  return useContext(AppContext)
}