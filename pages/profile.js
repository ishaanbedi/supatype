import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import Head from 'next/head'
export default function Home () {
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
        <title>{!session ? 'Sign In : SupaType ⚡️' : 'Profile : SupaType ⚡️'}</title>
      </Head>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}
