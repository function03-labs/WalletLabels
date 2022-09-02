import { ButtonGroup } from '@saas-ui/react'
import { Button } from '@app/features/core/components/button'
import { usePath } from '@app/features/core/hooks/use-path'
import { useParams } from '@saas-ui/router'

export const ContactTypes = () => {
  const params = useParams()
  return (
    <ButtonGroup isAttached variant="outline">
      <Button href={usePath('contacts')} isActive={!params?.type}>
        All
      </Button>
      <Button
        href={usePath('contacts/leads')}
        isActive={params?.type === 'leads'}
      >
        Leads
      </Button>
      <Button
        href={usePath('contacts/customers')}
        isActive={params?.type === 'customers'}
      >
        Customers
      </Button>
    </ButtonGroup>
  )
}
