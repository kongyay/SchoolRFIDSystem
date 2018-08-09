import axios from 'axios'

let baseURL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'http://192.168.2.45:44382'
} else {
  baseURL = 'http://192.168.2.45:44382'
}

export const API = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
