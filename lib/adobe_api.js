const https = require('https')

const APPLICATION_ID = process.env.ADOBE_APPLICATION_ID
const CONSUMER_ID = process.env.ADOBE_CONSUMER_ID
const API_KEY = process.env.ADOBE_API_KEY
// const API_SECRET = process.env.ADOBE_API_SECRET
const HOSTNAME = process.env.HOSTNAME

function performRequest (options, postData) {
  return new Promise((resolve, reject) => {
    let req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        let result = ''
        res.setEncoding('utf8')
        res.on('data', (d) => { result += d })
        res.on('end', () => resolve(JSON.parse(result)))
      } else {
        reject(res)
      }
    })

    req.on('error', reject)

    if (postData) {
      req.write(postData)
    }

    req.end()
  })
}

function validateAccessToken (accessToken) {
  return performRequest({
    method: 'POST',
    host: 'ims-na1.adobelogin.com',
    path: `/ims/validate_token/v1?token=${accessToken}&client_id=${API_KEY}`
  })
}

module.exports = {validateAccessToken}
