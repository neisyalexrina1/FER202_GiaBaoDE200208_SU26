import axios from 'axios'

const BASE = 'http://localhost:3001'

export const loginUser = async ({ email, password }) => {
  const res = await axios.get(`${BASE}/users`, { params: { email, password } })
  return res.data[0] || null   // null nếu không tìm thấy
}
