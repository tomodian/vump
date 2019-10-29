export const types = {
  markdown: {
    prefix: '## ',
    suffix: '',
  },
  slack: {
    prefix: '*',
    suffix: '*',
  },
}

export enum Output {
  markdown = 'markdown',
  slack = 'slack',
}

export interface HeaderInput {
  format: Output
  value: string
}

/**
 * Returns formatted header.
 */
export const header = (input: HeaderInput): string => {
  const prefix = types[input.format].prefix
  const suffix = types[input.format].suffix

  return `${prefix}${input.value}${suffix}`
}
