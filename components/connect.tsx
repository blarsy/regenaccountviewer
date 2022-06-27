import { useEffect, useState } from 'react'
import { Alert, Stack, Button, CircularProgress } from "@mui/material"
import { Window as KeplrWindow } from "@keplr-wallet/types"
import { connect } from '../lib/connect'
import { useAppContext } from '../pages/_app'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

export default function Connect() {
    const appState = useAppContext()
    const [state, setState]= useState({
        walletInstalled: true,
        connecting: false,
        connectError: ""
    })
    useEffect(() => {
        if (!window.getOfflineSigner || !window.keplr) {
            setState({...state, ...{walletInstalled: false}})
        } else {
            setState({...state, ...{walletInstalled: true, connecting: false, connectError: ""}})
        }
    }, [])
    return <Stack sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} spacing={2}>

        {!state.walletInstalled && <Alert severity="error">Please first install <a href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap">the Keplr wallet</a></Alert>}
        
        <Button disabled={!state.walletInstalled || state.connecting} variant="contained" size="large" onClick={async _ => {
            setState({...state, ...{connecting: true }})
            const connectError = await connect(window.keplr!)
            if (!connectError) {
                appState.setAppState({...appState, ...{ connected: true }})
            } else {
                setState({...state, ...{ connecting: false, connectError: `There was an issue when trying to connect: ${connectError}` }})
            }
        }}>Connect</Button>
        
        {state.connecting && <CircularProgress />}
        {state.connectError && <Alert severity="error">{state.connectError}</Alert>}
    </Stack>
}