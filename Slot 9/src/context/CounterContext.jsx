/**
 * CounterContext.jsx – Context quản lý state đếm (Bài 1)
 *
 * TODO 1: Tạo CounterContext bằng createContext()
 *
 * TODO 2: Tạo CounterProvider component
 *         - Dùng useState để lưu count (khởi tạo = 0)
 *         - Khai báo 3 hàm: increment, decrement, reset
 *         - Truyền { count, increment, decrement, reset } vào value của Provider
 *         - Bọc children bên trong Provider
 *
 * TODO 3: Tạo custom hook useCounter()
 *         - Gọi useContext(CounterContext)
 *         - Ném lỗi nếu context là null
 *         - Export hook này để các component sử dụng
 *
 * Export: CounterProvider (default hoặc named), useCounter
 */
import { createContext, useContext, useState } from 'react';

// TODO 1
const CounterContext = createContext(null);

// TODO 2
export function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset }}>
      {children}
    </CounterContext.Provider>
  );
}

// TODO 3
export function useCounter() {
  const context = useContext(CounterContext);
  if (context === null) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}
