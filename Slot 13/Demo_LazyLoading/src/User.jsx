import React from "react";

const User = ({ user }) => {
  return (
    <div className="border-bottom py-3 px-2">
      <h5 className="mb-1">{user.name}</h5>
      <p className="mb-0 text-muted">{user.email}</p>
    </div>
  );
};

export default User;
