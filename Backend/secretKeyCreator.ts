const crypto = require('crypto')
const fs = require('fs')


const secret = 'AQuickBrownFoxJumpsOverTheLazyDog.'
const hash = crypto.createHmac('sha256', secret).digest('hex')

fs.writeFile('./secretKey.txt', hash, err => {
  console.log(err)
})

