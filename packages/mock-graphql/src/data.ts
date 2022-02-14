/* @ts-ignore */
import casual from 'casual'

casual.define('contact', function () {
  return {
    email: casual.email,
    firstname: casual.first_name,
    lastname: casual.last_name,
  }
})

export const contacts = [
  casual.contact,
  casual.contact,
  casual.contact,
  casual.contact,
  casual.contact,
  casual.contact,
  casual.contact,
  casual.contact,
]
