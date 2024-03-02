// pages/api/organizations/invite.ts 

import { z } from 'zod'
import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from "../../../../../../packages/app-config";

const requestBodySchema = z.object({
    organizationId: z.string(),
    emails: z.array(z.string()),
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    let parsedBody
    try {
        parsedBody = requestBodySchema.parse(req.body)
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid request body',
            error: error.errors
        })
    }

    const { organizationId, emails } = parsedBody

    try {

        const invitedEmails = []

        for (const email of emails) {

            const { data,error } = await supabase.auth.admin.inviteUserByEmail(
                email,
                {
                    redirectTo: `${process.env.NEXT_PUBLIC_URL}/verify-invite?org=${organizationId}`
                }
            )
                console.log(data,error)
            if (!error) {
                invitedEmails.push(email)
                console.log(data,invitedEmails)
            }

        }

        return res.status(200).json({ invitedEmails })


    } catch (error) {

        return res.status(500).json({
            message: 'Error inviting users',
            error: error.message,
        })

    }

}
