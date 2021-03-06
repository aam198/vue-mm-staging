export default function(size: number): String {
  if (size < 1024) return size + ' B'
  let i = Math.floor(Math.log(size) / Math.log(1024))
  let num = (size / Math.pow(1024, i))
  let round = Math.round(num)
  let snum = round < 10 ? num.toFixed(2) : round < 100 ? num.toFixed(1) : round
  return `${snum} ${'KMGTPEZY'[i-1]}B`
}