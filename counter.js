module.exports.counter = ( from, end ) => {
  let i = from - 1
   let e = end

  return function () {
    i = (i + 1) % end
    return i
  }
}
