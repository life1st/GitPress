export const str2Obj = (str) => {
  return str
  .split('&')
  .reduce((counter, currentVal) => {
    const val = currentVal.split('=')
    counter[val[0]] = val[1]
    return counter
  }, {})
}