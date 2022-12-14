import Head from 'next/head'
import Hero from '../components/Hero'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
export default function Home() {
  const [session, setSession] = useState(null)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <div>
      <Head>
        <title>SupaType ⚡️</title>
        <meta name="description" content="Take unlimited only typing tests, for free!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='relative flex md:block bg-[#1B2430] min-h-screen'>
        {!session ? <Hero signedIn={false} /> : <Hero signedIn={true} />}
      </main>
    </div>
  )
}
