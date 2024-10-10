import React, { useState } from "react";

const UserInfo = ({ user }) => {
  const [showList, setShowList] = useState(false);

  return (
    <div
      className="w-12 h-12 rounded-full bg-slate-100 p-1 relative cursor-pointer"
      onClick={() => {
        setShowList(!showList);
      }}
    >
      <img
        href={user.image}
        alt="user image"
        className="w-full h-full rounded-full"
      />
      {showList && (
        <div className="absolute w-max top-full left-0 translate-y-4 -translate-x-3/4 p-4  bg-white shadow">
          <ul className="space-y-2">
            <li className="py-3 border-b hover:text-blue-600">
              change password
            </li>
            <li className="py-3 border-b-0 hover:text-blue-600">
              change image
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
