const regExpSyntaxCharacter = /[.*+?^${}()|[\]\\]/g

export function escapeRegExp(value: string) {
  return value.replace(regExpSyntaxCharacter, '\\$&')
}
