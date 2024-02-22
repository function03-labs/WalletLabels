// import serversideclient supa
import { supabase } from "../../../../../../packages/app-config/src";

export const useAddApiKey = () => {
    const addApiKey = async (orgId: string, apiKeys: string[]) => {
        const { data, error } = await supabase.from('organizations').update({
            api_keys:  apiKeys// Changed schema to include user_ids which is an array of user ids
        }).match({ id: orgId });
        if (error) {
            throw error
        }
        return data
    }

    return {
        addApiKey,
    }
}
