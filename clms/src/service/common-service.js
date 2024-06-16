import axios from 'axios'

export const apiCall = async (method = 'get', endpoint = '', data = null) => {
  try {

    const token = localStorage.getItem("token");
    const response = await axios({
      method,
      url: `${endpoint}`,
      data
    })

    return response
  } catch (error) {
    // Handle error here
    console.error('API Error:', error)
    throw error
  }
}
