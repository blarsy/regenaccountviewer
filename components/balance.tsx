import { Stack, Box, CircularProgress, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { getBalances, BalancesInfo } from "../lib/connect"

interface TableLineProps {
    cell1Variant: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined
    cell1Content: string
    cell2Variant: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" | undefined
    cell2Content: string
}

const TableLine = (props: { line: TableLineProps}) => 
    <Box key="box" sx={{
        display: 'flex', 
        justifyContent: 'space-between', 
        borderTop: '1px solid #333'}}>
        <Typography variant={props.line.cell1Variant}>{props.line.cell1Content}</Typography>
        <Typography variant={props.line.cell2Variant}>{props.line.cell2Content}</Typography>
    </Box>

export default function Balance () {
    const [state, setState] = useState({
        loading: true,
        error: "",
        balancesInfo: {} as BalancesInfo
    })
    useEffect(() => {
        const load = async () => {
            const balancesInfo = await getBalances(window.keplr!)
            if(typeof balancesInfo === 'string') {
                setState({...state, ...{error: balancesInfo, loading: false}})
            } else {
                setState({...state, ...{
                    error: "", 
                    loading: false, 
                    balancesInfo}})
            }
        }
        load()
    }, [])

    if(state.loading) {
        return <Box sx={{display: 'flex', justifyContent: 'center'}}><CircularProgress/></Box>
    }

    const lines = [{cell1Variant: 'overline', cell1Content: 'Coin', cell2Variant: 'overline', cell2Content: 'Balance'} as TableLineProps]

    state.balancesInfo.balances.forEach(balanceInfo => {
        lines.push({cell1Variant: 'overline', cell1Content: balanceInfo.coin, cell2Variant: 'body1', cell2Content: balanceInfo.amount} as TableLineProps)
    })

    return <Stack spacing={1} alignItems="stretch">
        <Typography align="center" variant="h6">Hi {state.balancesInfo.name}</Typography>
        <Typography align="center" variant="subtitle1">Here are your balances</Typography>
        {
            lines.map((line, idx) => <TableLine key={idx} line={line} />)
        }
    </Stack>
}