/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetSubscription($slug: String!) {\n    subscription(slug: $slug) {\n      id\n      plan\n      status\n      startedAt\n      trialEndsAt\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetSubscriptionDocument,
    "\n  query GetContacts($type: String) {\n    contacts(type: $type) {\n      id\n      firstName\n      lastName\n      name\n      email\n      type\n      tags\n      status\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetContactsDocument,
    "\n  query GetContact($id: String!) {\n    contact(id: $id) {\n      id\n      firstName\n      lastName\n      name\n      email\n      status\n      type\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetContactDocument,
    "\n  query GetContactActivities($id: String!) {\n    activities(contactId: $id) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        name\n        avatar\n        status\n      }\n      type\n      data\n      date\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetContactActivitiesDocument,
    "\n  mutation CreateContact($contact: CreateContactInput!) {\n    createContact(contact: $contact) {\n      id\n      firstName\n      lastName\n      name\n      email\n    }\n  }\n": types.CreateContactDocument,
    "\n  mutation AddComment($contactId: String!, $comment: String!) {\n    addActivityComment(id: $contactId, comment: $comment) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        name\n        avatar\n        status\n      }\n      type\n      data\n      date\n      createdAt\n      updatedAt\n    }\n  }\n": types.AddCommentDocument,
    "\n  mutation DeleteComment($id: String!) {\n    deleteActivityComment(id: $id)\n  }\n": types.DeleteCommentDocument,
    "\n  query GetOrganization($id: String, $slug: String) {\n    organization(id: $id, slug: $slug) {\n      id\n      name\n      slug\n      plan\n      email\n      logo\n      members {\n        roles\n        user {\n          id\n          firstName\n          lastName\n          name\n          email\n          status\n        }\n      }\n    }\n  }\n": types.GetOrganizationDocument,
    "\n  query GetOrganizations {\n    organizations {\n      id\n      name\n      slug\n      plan\n      logo\n    }\n  }\n": types.GetOrganizationsDocument,
    "\n  mutation InviteToOrganization(\n    $emails: [String]!\n    $organizationId: String!\n    $role: String\n  ) {\n    inviteToOrganization(\n      emails: $emails\n      organizationId: $organizationId\n      role: $role\n    )\n  }\n": types.InviteToOrganizationDocument,
    "\n  mutation RemoveUserFromOrganization(\n    $userId: String!\n    $organizationId: String!\n  ) {\n    removeUserFromOrganization(userId: $userId, organizationId: $organizationId)\n  }\n": types.RemoveUserFromOrganizationDocument,
    "\n  mutation CreateOrganization($organization: CreateOrganizationInput!) {\n    createOrganization(organization: $organization) {\n      id\n      name\n      slug\n      plan\n    }\n  }\n": types.CreateOrganizationDocument,
    "\n  mutation UpdateOrganization($organization: UpdateOrganizationInput!) {\n    updateOrganization(organization: $organization) {\n      id\n      name\n      slug\n      email\n    }\n  }\n": types.UpdateOrganizationDocument,
    "\n  mutation UpdateMemberRoles(\n    $userId: String!\n    $organizationId: String!\n    $roles: [String]!\n  ) {\n    updateMemberRoles(\n      userId: $userId\n      organizationId: $organizationId\n      roles: $roles\n    ) {\n      roles\n    }\n  }\n": types.UpdateMemberRolesDocument,
    "\n  query GetCurrentUser {\n    currentUser {\n      id\n      firstName\n      lastName\n      name\n      email\n      avatar\n      organizations {\n        id\n        name\n        slug\n        plan\n        logo\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  mutation UpdateUser($user: UpdateUserInput!) {\n    updateUser(user: $user) {\n      id\n      firstName\n      lastName\n      name\n      email\n      organizations {\n        id\n        name\n        slug\n        plan\n      }\n    }\n  }\n": types.UpdateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSubscription($slug: String!) {\n    subscription(slug: $slug) {\n      id\n      plan\n      status\n      startedAt\n      trialEndsAt\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetSubscription($slug: String!) {\n    subscription(slug: $slug) {\n      id\n      plan\n      status\n      startedAt\n      trialEndsAt\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetContacts($type: String) {\n    contacts(type: $type) {\n      id\n      firstName\n      lastName\n      name\n      email\n      type\n      tags\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetContacts($type: String) {\n    contacts(type: $type) {\n      id\n      firstName\n      lastName\n      name\n      email\n      type\n      tags\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetContact($id: String!) {\n    contact(id: $id) {\n      id\n      firstName\n      lastName\n      name\n      email\n      status\n      type\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetContact($id: String!) {\n    contact(id: $id) {\n      id\n      firstName\n      lastName\n      name\n      email\n      status\n      type\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetContactActivities($id: String!) {\n    activities(contactId: $id) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        name\n        avatar\n        status\n      }\n      type\n      data\n      date\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GetContactActivities($id: String!) {\n    activities(contactId: $id) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        name\n        avatar\n        status\n      }\n      type\n      data\n      date\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateContact($contact: CreateContactInput!) {\n    createContact(contact: $contact) {\n      id\n      firstName\n      lastName\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation CreateContact($contact: CreateContactInput!) {\n    createContact(contact: $contact) {\n      id\n      firstName\n      lastName\n      name\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddComment($contactId: String!, $comment: String!) {\n    addActivityComment(id: $contactId, comment: $comment) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        name\n        avatar\n        status\n      }\n      type\n      data\n      date\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation AddComment($contactId: String!, $comment: String!) {\n    addActivityComment(id: $contactId, comment: $comment) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        name\n        avatar\n        status\n      }\n      type\n      data\n      date\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteComment($id: String!) {\n    deleteActivityComment(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteComment($id: String!) {\n    deleteActivityComment(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrganization($id: String, $slug: String) {\n    organization(id: $id, slug: $slug) {\n      id\n      name\n      slug\n      plan\n      email\n      logo\n      members {\n        roles\n        user {\n          id\n          firstName\n          lastName\n          name\n          email\n          status\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOrganization($id: String, $slug: String) {\n    organization(id: $id, slug: $slug) {\n      id\n      name\n      slug\n      plan\n      email\n      logo\n      members {\n        roles\n        user {\n          id\n          firstName\n          lastName\n          name\n          email\n          status\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrganizations {\n    organizations {\n      id\n      name\n      slug\n      plan\n      logo\n    }\n  }\n"): (typeof documents)["\n  query GetOrganizations {\n    organizations {\n      id\n      name\n      slug\n      plan\n      logo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InviteToOrganization(\n    $emails: [String]!\n    $organizationId: String!\n    $role: String\n  ) {\n    inviteToOrganization(\n      emails: $emails\n      organizationId: $organizationId\n      role: $role\n    )\n  }\n"): (typeof documents)["\n  mutation InviteToOrganization(\n    $emails: [String]!\n    $organizationId: String!\n    $role: String\n  ) {\n    inviteToOrganization(\n      emails: $emails\n      organizationId: $organizationId\n      role: $role\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveUserFromOrganization(\n    $userId: String!\n    $organizationId: String!\n  ) {\n    removeUserFromOrganization(userId: $userId, organizationId: $organizationId)\n  }\n"): (typeof documents)["\n  mutation RemoveUserFromOrganization(\n    $userId: String!\n    $organizationId: String!\n  ) {\n    removeUserFromOrganization(userId: $userId, organizationId: $organizationId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrganization($organization: CreateOrganizationInput!) {\n    createOrganization(organization: $organization) {\n      id\n      name\n      slug\n      plan\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrganization($organization: CreateOrganizationInput!) {\n    createOrganization(organization: $organization) {\n      id\n      name\n      slug\n      plan\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOrganization($organization: UpdateOrganizationInput!) {\n    updateOrganization(organization: $organization) {\n      id\n      name\n      slug\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOrganization($organization: UpdateOrganizationInput!) {\n    updateOrganization(organization: $organization) {\n      id\n      name\n      slug\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateMemberRoles(\n    $userId: String!\n    $organizationId: String!\n    $roles: [String]!\n  ) {\n    updateMemberRoles(\n      userId: $userId\n      organizationId: $organizationId\n      roles: $roles\n    ) {\n      roles\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateMemberRoles(\n    $userId: String!\n    $organizationId: String!\n    $roles: [String]!\n  ) {\n    updateMemberRoles(\n      userId: $userId\n      organizationId: $organizationId\n      roles: $roles\n    ) {\n      roles\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentUser {\n    currentUser {\n      id\n      firstName\n      lastName\n      name\n      email\n      avatar\n      organizations {\n        id\n        name\n        slug\n        plan\n        logo\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    currentUser {\n      id\n      firstName\n      lastName\n      name\n      email\n      avatar\n      organizations {\n        id\n        name\n        slug\n        plan\n        logo\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($user: UpdateUserInput!) {\n    updateUser(user: $user) {\n      id\n      firstName\n      lastName\n      name\n      email\n      organizations {\n        id\n        name\n        slug\n        plan\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($user: UpdateUserInput!) {\n    updateUser(user: $user) {\n      id\n      firstName\n      lastName\n      name\n      email\n      organizations {\n        id\n        name\n        slug\n        plan\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;