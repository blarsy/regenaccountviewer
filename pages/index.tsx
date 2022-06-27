import type { NextPage } from 'next'
import Head from 'next/head'
import { Typography, Container, Box, CssBaseline } from '@mui/material'
import Connect from '../components/connect'
import { useAppContext } from './_app'
import Balance from '../components/balance'

const Home: NextPage = () => {
  const state = useAppContext()
  return (
    <Container maxWidth="sm" sx={{
      display: 'flex', 
      minHeight: '100vh', 
      padding: '1rem', 
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '1rem'}}>
      {/* MUI's Bunch of CSS basic styles, such as removing all border from 'body' */}
      <CssBaseline/>
      {/* NextJs's way of easily setting base html header info */}
      <Head>
        <title>Account viewer</title>
        <meta name="description" content="Regen account viewer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography align='center' variant="h4" component="h1">
        Account viewer
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
    </Container>
  )
}

export default Home
