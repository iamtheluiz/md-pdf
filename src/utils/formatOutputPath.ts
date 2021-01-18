export default function formatOutputPath (path: string): string {
  const splitPath = path.split('\\')

  if (splitPath.length > 3) {
    path = `${splitPath[0]}/../${splitPath.reverse()[1]}/${splitPath[0]}`
  }

  return path
}
