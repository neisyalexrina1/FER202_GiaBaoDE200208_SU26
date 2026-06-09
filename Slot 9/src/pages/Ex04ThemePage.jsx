import React from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import ThemeNavbar from '../components/theme/ThemeNavbar';
import ThemedCard from '../components/theme/ThemedCard';
import ThemedButton from '../components/theme/ThemedButton';
import ThemedInput from '../components/theme/ThemedInput';

function ThemePageContent() {
  const { colors } = useTheme();

  return (
    <div style={{
      backgroundColor: colors.background,
      color: colors.text,
      minHeight: '100vh',
      transition: 'all 0.2s'
    }}>
      <ThemeNavbar />
      
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <ThemedCard title="Thông tin người dùng">
          <p>Chào mừng bạn đến với hệ thống quản lý Theme. Giao diện này sẽ tự động thay đổi theo lựa chọn của bạn hoặc theo cài đặt của hệ thống.</p>
          <ThemedInput placeholder="Nhập email của bạn..." />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <ThemedButton variant="primary">Lưu thay đổi</ThemedButton>
            <ThemedButton variant="outline">Hủy bỏ</ThemedButton>
          </div>
        </ThemedCard>

        <ThemedCard title="Cài đặt thông báo">
          <p>Nhận thông báo qua email hoặc tin nhắn SMS khi có bản cập nhật mới.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <ThemedButton variant="outline">Bật thông báo</ThemedButton>
          </div>
        </ThemedCard>

        <ThemedCard title="Thống kê">
          <p>Chưa có dữ liệu thống kê nào được ghi nhận trong hôm nay.</p>
        </ThemedCard>
      </div>
    </div>
  );
}

export default function Ex04ThemePage() {
  return (
    <ThemeProvider>
      <ThemePageContent />
    </ThemeProvider>
  );
}
