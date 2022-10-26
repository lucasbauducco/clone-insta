import axios from 'axios'
import store from '@/store'
export default axios.create({
    baseURL: 'http://192.168.3.175:4000/api',
    timeout: 1000,
    headers:{
      "Authorization": store.getters.token
    }
  });