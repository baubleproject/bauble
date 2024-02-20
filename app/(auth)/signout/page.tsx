import { initialProfile } from '@/actions/InitialProfile'
import { redirect } from 'next/navigation'

export default async function signout() {
    const profile = await initialProfile()
    if (profile) {
        return redirect("/home")
    }else{
        return redirect("signin")
    }
    
  return null
}
