const axios = require('axios')

const { eyesonApiKey, eyesonApiUrl } = require('../config')

const API_CALL = axios.create({
  baseURL: eyesonApiUrl,
})

API_CALL.defaults.headers['Authorization'] = eyesonApiKey

module.exports = async (path, data, method = 'POST') => {

  try {

    const response = await API_CALL({
      url: path,
      method,
      data,
    })

    return response

  } catch (error) {
    throw error
  }
}
