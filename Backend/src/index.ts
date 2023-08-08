import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import {AuthenticateUser} from "./utils/databaseUtilityFunctions";
import jsonwebtoken from 'jsonwebtoken'
import cookieParser from "cookie-parser";


const PORT = 3000
const privateKey = fs.readFileSync('./id_rsa_priv.pem', 'utf-8')
const publicKey = fs.readFileSync('./id_rsa_pub.pem', 'utf-8')

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())


app.get('/', (request, response) => {
  response.send(request.cookies)
})
app.post('/', (req, res) => {
  console.log(req.body)
  const {email, password} = req.body
  const result = AuthenticateUser(email, password)
  if (result.success) {
    const token = jsonwebtoken.sign({userId: result.key}, privateKey, {algorithm: 'RS256', expiresIn: 30 * 60 * 1000})
    const tokenParts = token.split('.')
    const headerAndPayload = tokenParts[0] + '.' + tokenParts[1]
    const signature = tokenParts[2]
    res.cookie('jwtWithoutSignature', headerAndPayload)
    res.cookie('jwtSignature', signature)
    res.send(200)
  } else {
    res.send({
      data: "user does not exist."
    })
  }
  res.send({
    foo: result
  })
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})