import axios from 'axios'

let baseURL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'http://smsapi.foniva.net/'
} else {
  baseURL = 'http://smsapi.foniva.net/'
}

export const SMS = {
  send: async (message, number) => {
    let xml =
      `<SingleTextSMS>` +
      `<UserName>FonivaTest-2500</UserName>` +
      `<PassWord>FONSMS_test_18</PassWord>` +
      `<Action>0</Action>` +
      `<Mesgbody>${message}</Mesgbody>` +
      `<Numbers>${number}</Numbers>` +
      `<Originator>Foniva</Originator>` +
      `<SDate></SDate>` +
      `</SingleTextSMS>`
    try {
      let res = axios.post(baseURL, xml, {
        headers: {
          'Content-Type': 'text/xml',
          'Access-Control-Allow-Origin': '*'
        }
      })
      return res
    } catch (error) {
      console.log(error)
    }
  }
}
