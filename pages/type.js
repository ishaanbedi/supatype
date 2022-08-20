/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head"
import React, { useState, useEffect } from "react"
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
        <title>New Typing Session | SupaType ⚡️</title>
      </Head>
      {!session ? <Type signedIn={false} /> : <Type signedIn={true} />}
    </>
  )
}

export default startType