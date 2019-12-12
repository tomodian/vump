import * as fg from 'fast-glob'

const glob = (matcher: string): string[] => {
  return fg.sync(
    [
      // Excludes
      '!node_modules',
      '!**/node_modules',
      '!.git',
      // Includes
      matcher,
    ],
    {
      dot: true,
      onlyFiles: true,
    },
  )
}

export default glob
