import api from './axiosInstance';
import bcrypt from 'bcryptjs';

export const authApi = {
  login: async (username, password) => {
    const { data: accounts } = await api.get('/accounts', {
      params: { username },   // Chỉ query username
    });
    if (accounts.length === 0)
      throw new Error('Tên đăng nhập hoặc mật khẩu không đúng.');
      
    const account = accounts[0];
    
    // So sánh password nhập vào với hash trong db
    const isMatch = bcrypt.compareSync(password, account.password);
    if (!isMatch) {
      throw new Error('Tên đăng nhập hoặc mật khẩu không đúng.');
    }
    
    const { data: user } = await api.get(`/users/${account.userId}`);
    return { account, user };
  },
};

export const userApi = {
  getAll:  (params={}) => api.get('/users', { params }),
  getById: (id)        => api.get(`/users/${id}`),
  create:  (data)      => api.post('/users', {
    ...data, createdAt: new Date().toISOString().split('T')[0]
  }),
  update:  (id, data)  => api.put(`/users/${id}`, data),
  patch:   (id, part)  => api.patch(`/users/${id}`, part),
  remove:  (id)        => api.delete(`/users/${id}`),
};
