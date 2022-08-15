/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head"
import React, { useRef, useState, useEffect } from "react"
import Type from '../components/Type'
import { supabase } from '../utils/supabaseClient'
function startType() {
  const [session, setSession] = useState(null)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <>
      <Head>
        <title>New Typing Session</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? <Type signedIn={false} /> : <Type signedIn={true} />}
    </>
  )
}

export default startType