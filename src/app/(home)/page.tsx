"use client"
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { monsterMessages } from "@/shared/constants/monster-messages.constants";
import { messages } from "@/shared/constants/messages.constant";
import Image from "next/image";
import Monster from "@/components/monster/page";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [clicks, setClicks] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [monsterMessage, setMonsterMessage] = useState<string>(monsterMessages[0]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleClick = () => {
    const min = 0;
    const max = messages.length;
    const random = Math.floor(Math.random() * (max - min) + min);
    setMessage(messages[random]);

    if (clicks + 1 <= 2) {
      setMonsterMessage(monsterMessages[clicks + 1])
      setClicks(clicks + 1)
    } else {
      setMonsterMessage(monsterMessages[0])
      setClicks(0)
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-start">
      <motion.section className="w-full flex justify-center cursor-pointer overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}>
        <Monster text={monsterMessage} clicks={clicks} />
      </motion.section>

      <section className="w-full flex justify-center mt-10 overflow-hidden">

        {
          clicks === 0 && isLoaded &&
          <motion.section className="cursor-pointer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }} >
            <Image alt="cookie inteiro" src={'/whole-cookie.png'} width={500} height={500} onClick={() => handleClick()} />
          </motion.section>
        }

        {
          clicks === 1 &&
          <motion.section className="cursor-pointer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <Image alt="Cookie partido" src={'/party-cookie.png'} width={500} height={500} onClick={() => handleClick()} />
          </motion.section>
        }

        {
          clicks === 2 &&
          <motion.section className="flex items-center cursor-pointer" onClick={() => handleClick()} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <Image className="h-[250px]" alt="Cookie esquerdo" src={'/left-party-cookie.png'} width={250} height={250} />

            <p className="p-5 font-bold text-amber-950">{message}</p>

            <Image className="h-[250px]" alt="Cookie direito" src={'/right-party-cookie.png'} width={250} height={250} style={{ height: '250px' }} />
          </motion.section>
        }

      </section>
    </div>
  );
}
