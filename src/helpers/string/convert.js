const convertToUpperCase = (str) => {
  return str.toUpperCase()
}

const convertToLowerCase = (str) => {
  return str.toLowerCase()
}

const convertToCapitalizedCase = (str) => {
  return str.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }).join(' ')
}

const convertToFormatDateTime = (str) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  }

  const dateTime = new Date(str)
  return str ? dateTime.toLocaleDateString('id-ID', options) : null
}

module.exports = {
  convertToUpperCase,
  convertToLowerCase,
  convertToCapitalizedCase,
  convertToFormatDateTime
}