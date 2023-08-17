'use client'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/site/constants'
import { useAuthProvider } from '@/app/context/auth'
import { toast } from 'react-toastify'
export default function AccountForm() {
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [website, setWebsite] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)
    const { user } = useAuthProvider()
    // console.log(user, "USER")

    const getProfile = useCallback(async () => {
        if (user) {
            try {
                setLoading(true)

                let { data, error, status } = await supabase
                    .from('profiles')
                    .select(`full_name, username, website, avatar_url`)
                    .eq('id', user?.id)
                    .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setFullname(data.full_name)
                    setUsername(data.username)
                    setWebsite(data.website)
                    setAvatarUrl(data.avatar_url)
                }
            } catch (error) {
                console.log(error)
                alert(JSON.stringify(error))
            } finally {
                setLoading(false)
            }
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string | null
        fullname: string | null
        website: string | null
        avatar_url: string | null
    }) {
        try {
            setLoading(true)

            let { error } = await supabase.from('profiles').upsert({
                id: user?.id as string,
                full_name: fullname,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            })
            if (error) throw error
            toast('Profile updated!')
        } catch (error) {
            toast.error(JSON.stringify(error))
        } finally {
            setLoading(false)
        }
    }

    return user && (
        <div className="w-full bg-white mx-auto rounded-md shadow dark:border  sm:max-w-md  dark:bg-black dark:border-zinc-800 p-4 text-black dark:text-zinc-200 -mt-16">
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Email
                </label>
                <input
                    id="email"
                    type="text"
                    value={user?.email}
                    disabled
                    className="mt-1 px-2 py-1 w-full rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900  text-black dark:text-white "
                />
            </div>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Full Name
                </label>
                <input
                    id="fullName"
                    type="text"
                    value={fullname || ''}
                    onChange={(e) => setFullname(e.target.value)}
                    className="mt-1 px-2 py-1 w-full border rounded-md focus:ring focus:ring-teal-900 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900  text-black dark:text-white "
                />
            </div>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 px-2 py-1 w-full border rounded-md focus:ring focus:ring-teal-900 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900  text-black dark:text-white "
                />
            </div>
            <div className="mb-4">
                <label htmlFor="website" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Website
                </label>
                <input
                    id="website"
                    type="url"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="mt-1 px-2 py-1 w-full border rounded-md focus:ring focus:ring-teal-900 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900  text-black dark:text-white "
                />
            </div>

            <div className="mb-4">
                <button
                    className="button primary bg-teal-900 rounded-md border border-zinc-600 hover:bg-teal-800 hover:border-zinc-700 block w-full text-white ease-in-out duration-300 text-sm p-1.5"
                    onClick={() => updateProfile({ fullname, username, website, avatar_url })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                <form action="/auth/signout" method="post">
                    <button className="button block w-full" type="submit">
                        Sign out
                    </button>
                </form>
            </div>
        </div>

    )
}