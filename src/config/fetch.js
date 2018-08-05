import axios from 'axios'
import APIS from './api'

const HOST_URL = 'http://localhost:8080'
export const getBanner = () => {
  return new Promise((resolve, reject) => {
    axios.get(HOST_URL + APIS.BANNER).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
//  获取列表;
export const getLists = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios.get(HOST_URL + APIS.RECOMMEND + '?page=' + page).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
//  获取相关推荐;
export const getOtherLists = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios.get(HOST_URL + APIS.OTHER).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
