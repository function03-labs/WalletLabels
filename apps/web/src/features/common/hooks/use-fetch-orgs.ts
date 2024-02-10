import { supabase } from "../../../../../../packages/app-config/src";

export const useFetchOrgs = () => {
    const fetchOrgs = async ({ userEmail }: {
        userEmail: string
    }) => {
        const { data, error } = await supabase.from('organizations').select('*').eq('useremail', userEmail)
        if (error) {
            throw error
        }
        return data
    }

    console.log('fetchOrgs', fetchOrgs)
    return {
        fetchOrgs,
    }
}
