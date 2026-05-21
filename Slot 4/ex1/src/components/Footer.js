import React from 'react';
import MyProfile from './MyProfile';

function Footer() {
  const profile = {
    id: "1",
    name: "Đỗ Minh Gia Bảo",
    email: "dominhgiabaobmg@gmail.com",
    githubLink: "https://github.com/neisyalexrina1/FER202_GiaBaoDE200208_SU26",
    avatarSrc: "https://yt3.googleusercontent.com/ytc/AIdro_nJxADKv2YieWV-VuGE7zamcpvQDLyH2U29uSfWwo6TgRM=s900-c-k-c0x00ffffff-no-rj"
  };

  return (
    <>
      { }
      <footer style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center' }}>
        <MyProfile profile={profile} />
      </footer>
    </>
  );
}

export default Footer;
