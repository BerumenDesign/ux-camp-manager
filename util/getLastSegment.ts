export const getLastSegment = (pathname: string): string => {
  const segments = pathname.split('/')
  return segments[segments.length - 1] || ''
}

export const getSecondLastSegment = (pathname: string): string => {
  const segments = pathname.split('/')
  return segments[segments.length - 2] || ''
}

export default getLastSegment
