const express = require('express')
const Event = require('./event')

const ADOBE_API_KEY = process.env.ADOBE_API_KEY

const router = express.Router()

router.get('/', (_, res) => {
  res.render('index', {title: 'AssetLog | Home', clientId: ADOBE_API_KEY})
})

router.get('/redirectims.html', (req, res) => {
  res.render('redirect_ims', {title: 'AssetLog | Authenticating', clientId: ADOBE_API_KEY})
})

router.get('/events', (req, res) => {
  Event.findAll({
    where: {
      userId: req.session.adobeId
    }
  }).then((events) => {
    res.render('events', {title: 'AssetLog | Events', events: events})
  })
})

module.exports = router
