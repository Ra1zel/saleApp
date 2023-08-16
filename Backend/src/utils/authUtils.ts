import crypto, {createHmac} from 'crypto'

const generateCSRFToken = (privateKey: string, randomValue: string) => {
  const randomIntToPreventCollision = crypto.randomInt(0, 10000000)
  const message = randomValue + "!" + randomIntToPreventCollision
  const hmac = createHmac("SHA256", privateKey)
  const hmacValue = hmac.update(message).digest('hex')
  return hmacValue + '.' + message
}
export const returnCurrentTimePlusThirtyMinutes = (date: Date) => {
  return new Date(date.getTime() + 30 * 60 * 1000)
}
export default generateCSRFToken;