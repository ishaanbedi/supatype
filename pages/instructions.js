import Head from 'next/head'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import NotSignedIn from '../components/NotSignedIn'
import Instructions from '../components/Instructions'
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
                <title>{!session ? "Not Signed IN | SupaType ⚡️" : "Instructions | SupaType ⚡️"}</title>
            </Head>
            <main className='relative flex md:block bg-[#1B2430] min-h-screen'>
                {!session ? NotSignedIn() : <Instructions />}
            </main>
        </div>
    )
}
