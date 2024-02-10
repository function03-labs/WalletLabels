// import serversideclient supa
import { useAuth } from "@saas-ui/auth";
import { supabase } from "../../../../../../packages/app-config/src";

export const useRegisterOrg = () => {
    const { user } = useAuth()
    const registerOrg = async (orgData: any) => {
        const { data, error } = await supabase.from('organizations').insert({
            name: orgData,
            useremail: user?.email,

        })
        if (error) {
            throw error
        }
        return data
    }

    return {
        registerOrg,
    }
}
