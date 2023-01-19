
export const getPageFilter = (direction, page, filterNow) => {
  if (direction === 'f') {
    const filter = [...filterNow]
    filter.push(`skip=${page * 10}`)
    return filter
  } else {
    const filter = [...filterNow]
    if (page * 10 < 0) {
      // TODO: error handling here
      console.log('too low')
      return ('null')
    }
    filter.push(`skip=${page * 10}`)
    return filter
  }
}
