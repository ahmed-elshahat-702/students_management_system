import React, { useState, useEffect, useRef } from "react";

const UserInfo = ({ user }) => {
  const [showList, setShowList] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-12 h-12 rounded-full bg-gray-100 p-1 relative cursor-pointer"
      onClick={() => setShowList(!showList)}
      ref={dropdownRef}
    >
      {user.image ? (
        <img
          src={user.image}
          alt={`${user.name}'s profile image`}
          className="w-full h-full rounded-full"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
          {user.name[0]} {/* Fallback to user's first letter if no image */}
        </div>
      )}
      {showList && (
        <div className="absolute w-max top-full left-0 trangray-y-4 -trangray-x-3/4 p-4 bg-white shadow-lg rounded-lg">
          <ul className="space-y-2">
            <li className="py-3 border-b cursor-pointer hover:text-green-600">
              Change Password
            </li>
            <li className="py-3 border-b-0 cursor-pointer hover:text-green-600">
              Change Image
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
