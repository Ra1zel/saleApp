import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import {AuthenticateUser} from "./utils/databaseUtilityFunctions";
import jsonwebtoken from 'jsonwebtoken'
import cookieParser from "cookie-parser";
import {v4 as uuidv4} from 'uuid'
import generateCSRFToken, {returnCurrentTimePlusThirtyMinutes} from "./utils/authUtils";
import cors from 'cors'

const PORT = 3000
const privateKey = fs.readFileSync('./id_rsa_priv.pem', 'utf-8')
const publicKey = fs.readFileSync('./id_rsa_pub.pem', 'utf-8')

const tempUserRecord = []

const app = express()
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())


app.get('/', (request, response) => {
  response.send(request.cookies)
})


const checkIsValidEmail = (userEmail: string) => {
  const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return validEmailRegex.test(userEmail)
}

const checkEmailInDatabase = (email: string) => {
  //TODO: actual functionality will be done later.
  return false
}


app.post('/signupPhase2', (req, res) => {
  console.log(req.body)
  res.status(200).send("Registered successfully. Welcome to the tribe.")
})
app.post('/signupPhase1', (req, res) => {
  console.log(req.body)
  const {email, password, confirmPassword} = req.body
  console.log(email, password, confirmPassword)
  const isValidEmail = checkIsValidEmail(email)
  if (isValidEmail) {
    const doesEmailAlreadyExist = checkEmailInDatabase(email)
    if (doesEmailAlreadyExist) {
      res.status(400).send("User with that email already exists. Please provide another email.")
    } else {
      if (password === confirmPassword && password.length >= 8) {
        res.sendStatus(200)
      } else {
        res.status(400).send("Bad Request.")
      }
    }
  } else {
    res.status(400).send("Bad Request.")
  }
})

app.post('/login', (req, res) => {
  console.log(req.body)
  const {email, password} = req.body
  const result = AuthenticateUser(email, password)
  if (result.success) {
    console.log("made it this far")
    const randomValueForJwt = uuidv4()
    const CSRFToken = generateCSRFToken(privateKey, randomValueForJwt)
    const token = jsonwebtoken.sign({
      userId: result.key,
      randomValue: randomValueForJwt
    }, privateKey, {algorithm: 'RS256', expiresIn: 30 * 60 * 1000})
    const tokenParts = token.split('.')
    const headerAndPayload = tokenParts[0] + '.' + tokenParts[1]
    const signature = tokenParts[2]
    console.log("made it this far")
    res.cookie('jwtWithoutSignature', headerAndPayload, {
      secure: false,
      expires: returnCurrentTimePlusThirtyMinutes(new Date())
    })
    console.log("made it this far")
    res.cookie('jwtSignature', signature, {httpOnly: true, secure: false})
    res.cookie('csrfToken', CSRFToken, {secure: false})
    console.log("made it this far")
    res.status(200).send('Login successful')
  } else {
    res.send({
      data: "user does not exist."
    })
  }
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})