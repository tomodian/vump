import * as fg from 'fast-glob'

const glob = (matcher: string): string[] => {
  return fg.sync(
    [
      // Excludes
      '!node_modules',
      '!**/node_modules',
      // Includes
      matcher,
    ],
    {
      onlyFiles: true,
    },
  )
}

export default glob
