import { HStack, Text, Avatar, Spacer } from '@chakra-ui/react'

import { SidebarMenu } from '@saas-ui/page-shell'
import { MenuDivider, MenuGroup, MenuItem } from '@saas-ui/menu'

import { CheckIcon } from '@chakra-ui/icons'
import { useTenancy } from '@saas-ui/tenancy'
import { useGetCurrentUserQuery } from '@app/graphql'

interface ProjectLogoProps {
  label: string
  src?: string
}

const ProjectLogo = ({ label, src }: ProjectLogoProps) => {
  return (
    <Avatar
      display="inline-block"
      name={label}
      src={src}
      size="xs"
      me="1em"
      borderRadius={src ? 'sm' : 'full'}
    />
  )
}

export const ProjectsMenu = () => {
  const { tenant, setTenant } = useTenancy()

  const { data } = useGetCurrentUserQuery({})

  const projects =
    data?.currentUser?.organizations?.map((organization) => ({
      id: organization.id,
      slug: organization.slug,
      label: organization.name || organization.id,
      href: `/app/${organization.slug}`,
      onClick: () => setTenant(organization.slug),
    })) || []

  const selectedProject = (function () {
    for (const i in projects) {
      if (projects[i].slug === tenant) {
        return projects[i]
      }
    }
    return projects[0]
  })()
  return (
    <SidebarMenu
      label={selectedProject?.label}
      icon={<ProjectLogo label={selectedProject?.label} />}
    >
      <MenuGroup title="Projects">
        {projects.map(({ id, label, ...props }) => {
          return (
            <MenuItem
              key={id}
              value={id}
              icon={<ProjectLogo label={label} />}
              isTruncated
              {...props}
            >
              <HStack>
                <Text>{label}</Text>
                <Spacer />
                {id === selectedProject?.id ? <CheckIcon /> : null}
              </HStack>
            </MenuItem>
          )
        })}
      </MenuGroup>
      <MenuDivider />
      <MenuItem href="/projects" label="Manage projects" />
    </SidebarMenu>
  )
}
