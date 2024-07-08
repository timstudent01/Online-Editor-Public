"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Navbar = () => {
  const router = useRouter();

  const routesMap = [
    { id: "home", route: "/", name: "首頁" },
    { id: "htmlEditor", route: "/htmlEditor", name: "HTML 編輯器" },
    { id: "reactEditor", route: "/reactEditor", name: "React 編輯器" },
  ];

  const handleClick = (route: string) => {
    setListSwitch(!listSwitch);
    router.push(`${route}`);
  };

  const [listSwitch, setListSwitch] = useState(false);

  return (
    <div className="w-full p-4 container bg-black flex justify-between items-center relative">
      <h1 className=" font-bold text-white">歡迎使用工具</h1>
      <div
        onClick={() => setListSwitch(!listSwitch)}
        className="text-white cursor-pointer "
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </div>
      {listSwitch && (
        <div className="absolute top-16 right-0 bg-black rounded-lg  overflow-hidden">
          {routesMap.map((item) => (
            <div
              key={item.id}
              className="text-white cursor-pointer p-4 overflow-hidden hover:bg-orange-600"
              onClick={() => handleClick(item.route)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
