"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full p-4">
      <p className="text-3xl">使用者，你好</p>
      <p className="text-3xl mt-4">現在時間 : {time}</p>
      <div className=" mt-4 ">
        <a
          href="https://www.youtube.com/watch?v=fa214Ct6t9w"
          target="_blank"
          className="text-3xl underline underline-offset-4 text-blue-500"
        >
          HTML+CSS課程
        </a>
      </div>
    </div>
  );
}
