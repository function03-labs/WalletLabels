import { supabase } from "../../../../../../packages/app-config/src";

export const useFetchOrgs = () => {
    const fetchOrgs = async ({ userId }: {
        userId: string
    }) => {

        const { data, error } = await supabase
            .from('organizations')
            .select('*')
            .contains('user_ids', [userId]); // Adjusted to search in 'user_ids' array

        if (error) {
            throw error;
        }
        return data;
    };

    return {
        fetchOrgs,
    };
};
