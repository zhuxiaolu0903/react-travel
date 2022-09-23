import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8099'
})

export default request
