import type { NextPage } from 'next'
import Head from 'next/head'
import { Typography, Stack, Box, CssBaseline } from '@mui/material'
import Connect from '../components/connect'
import { useAppContext } from './_app'
import Balance from '../components/balance'

const Home: NextPage = () => {
  const state = useAppContext()
  return (
    <Stack sx={{
      minHeight: '100vh', 
      padding: '1rem', 
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '1rem'}}>
      <CssBaseline/>
      <Head>
        <title>Account viewer</title>
        <meta name="description" content="Regen account viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography align='center' variant="h4" component="h1">
        Regen account viewer
      </Typography>
      {state.appState.connected ? 
        <Balance /> : 
        <Connect /> }
      <Box flexGrow="1" display="flex" justifyContent="center" alignItems="flex-end">
        <a href="https://github.com/blarsy/regenaccountviewer"
          target="_blank"
          rel="noopener noreferrer">
          Source code
        </a>
      </Box>
    </Stack>
  )
}

export default Home
