import { useEffect, useState } from 'react'
import { Alert, Stack, Button, CircularProgress } from "@mui/material"
import connect from '../lib/connect'
import { useAppContext } from '../pages/_app'

// Certainly requires to sit on a more conventional location, but it will do for now
declare global {
    interface Window {
        // you'll need to explicitly specify the
        // type of arguments & function return type
        getOfflineSigner: any,
        keplr: any
    }
}

export default function Connect() {
    const [appState, setAppState] = useAppContext()
    const [state, setState]= useState({
        walletInstalled: true,
        connecting: false,
        connectError: ""
    })
    useEffect(() => {
        if (!globalThis.window.getOfflineSigner || !globalThis.window.keplr) {
            setState({...state, ...{walletInstalled: false}})
        } else {
            setState({...state, ...{walletInstalled: true, connecting: false, connectError: ""}})
        }
    }, [])
    return <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} spacing={2}>
        {!state.walletInstalled && <Alert severity="error">Please first install <a href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap">the Keplr wallet</a></Alert>}
        <Button disabled={!state.walletInstalled || state.connecting} variant="contained" size="large" onClick={async _ => {
            setState({...state, ...{connecting: true }})
            const connectError = await connect()
            if (!connectError) {
                setAppState({...appState, ...{ connected: true }})
            } else {
                setState({...state, ...{ connecting: false, connectError: `There was an issue when trying to connect: ${connectError}` }})
            }
        }}>Connect</Button>
        {state.connecting && <CircularProgress />}
        {state.connectError && <Alert severity="error">{state.connectError}</Alert>}
    </Stack>
}