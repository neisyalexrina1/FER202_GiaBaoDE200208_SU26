/**
 * StatusMessage.jsx – Hiển thị trạng thái dương / âm / bằng 0 (Bài 1)
 *
 * TODO: Dùng useCounter() từ CounterContext để lấy count.
 *       Hiển thị:
 *         - "Dương" khi count > 0
 *         - "Âm"    khi count < 0
 *         - "Bằng 0" khi count = 0
 *       Component này KHÔNG nhận bất kỳ props nào.
 */
import { useCounter } from '../../context/CounterContext';

export default function StatusMessage() {
  const { count } = useCounter();

  let message;
  if (count > 0) {
    message = 'Dương';
  } else if (count < 0) {
    message = 'Âm';
  } else {
    message = 'Bằng 0';
  }

  return <div>{message}</div>;
}
