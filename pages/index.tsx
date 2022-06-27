import type { NextPage } from 'next'
import Head from 'next/head'
import { Typography, Stack, Box, CssBaseline } from '@mui/material'
import Connect from '../components/connect'
import { useAppContext } from './_app'
import Balance from '../components/balance'

const Home: NextPage = () => {
  const [state] = useAppContext()
  return (
    <Stack sx={{
      minHeight: '100vh', 
      padding: '1rem', 
      flexDirection: 'column', 
      justifyContent: 'space-between', // just make sure at least 100% of the viewport height is filled
      alignItems: 'center'}}>
      <CssBaseline/>
      <Head>
        <title>Regen account viewer</title>
        <meta name="description" content="Regen account viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography variant="h4" component="h1">
        Regen account viewer
      </Typography>
      {state.connected ? 
        <Balance /> : 
        <Connect /> }
      <Box>
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
