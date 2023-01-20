import axios from 'axios'
import store from '@/store'
export default axios.create({
    baseURL: 'http://192.168.2.199:4000/api',
    timeout: 1000,
    headers:{
      "Authorization": store.getters.token
    }
  });