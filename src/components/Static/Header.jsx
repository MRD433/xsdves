import { Transition } from '@headlessui/react'
import { useTheme } from "../../context/theme.js";
import Link from "next/link";
import { useRouter } from "next/router"
import { Fragment, useState, useEffect } from "react";
import config from "../../../site.config.js";
import { motion } from "framer-motion";
import Tippy from '@tippyjs/react';

export default function Header() {
    const pages = config.pages;
    const { isTheme, toggleTheme } = useTheme();

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMoreMenu, setIsOpenMoreMenu] = useState(false);

    const [lanyardAvatar, setLanyardAvatar] = useState(null);
    const [lanyardID, setLanyardID] = useState(null);

    const [scrolled, setScrolled] = useState(true);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(false);
    } else {
      setScrolled(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    const socials = [
      {
          name: "Twitter",
          icon: "fab fa-twitter cursor-pointer",
          link: config.social.twitter,
      },
      {
          name: "GitHub",
          icon: "fab fa-github cursor-pointer",
          link: config.social.github,
      },
      {
          name: "Discord",
          icon: "fab fa-discord cursor-pointer",
          link: config.social.discord,
      }
  ]

  useEffect(() => {
    setLanyardAvatar(window.localStorage.getItem("lanyard") ? JSON.parse(window.localStorage.getItem("lanyard")).discord_user.avatar : null);
    setLanyardID(window.localStorage.getItem("lanyard") ? JSON.parse(window.localStorage.getItem("lanyard")).discord_user.id : null);
  }, []);

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-50 transition-all max-w-7xl duration-300 ease-in-out mx-auto px-4 sm:px-6 lg:px-8 ${scrolled ? "bg-transparent" : "bg-black/70 top-2 left-0 right-0 md:top-4 md:left-8 md:right-8 rounded-none md:rounded-xl outline outline-2 outline-primary/70"}`} style={{ backdropFilter: (scrolled ? "blur(0px)" : "blur(10px)") }}>
                 <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                 <div className="flex items-center gap-4 hover:opacity-80 transition duration-200 cursor-pointer" onClick={() => router.push("/")}>
                         <div className="flex items-center gap-4">
                         <img className="h-12 w-12 rounded-md" src={lanyardAvatar ? "https://cdn.discordapp.com/avatars/" + lanyardID + "/" + lanyardAvatar + ".png?size=256" : "https://cdn.discordapp.com/attachments/971049189377179718/1044214018618953769/unknown.png"} alt="avatar" />
                         <a className="text-2xl font-bold transition-all duration-200 button-text text-black/90 dark:text-white/90 -ml-2">{config.siteMetadata.author}<span className="text-primary">.</span><span className="text-1xl">me</span></a>
                         </div>
                 </div>
                    <motion.div
                   whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                        className="-mr-2 md:hidden"
                     >
                   <a
                             onClick={() => setIsOpen(!isOpen)}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="bg-primary/10 shadow-2xl text-2xl text-white hover:text-white hover:dark:text-white cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 border border-primary/20 hover:bg-primary/20 active:bg-primary/30"
                         >
                             <i className="text-2xl fas fa-bars" />
                         </a>
                </motion.div>
                <nav className="hidden md:flex space-x-10 items-center justify-center">
                     {pages.map((page) => (
                            <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                           >
                             <Link href={page.href} key={page.name} legacyBehavior>
                                 <button
                                     className={`${
                                         router.pathname === page.href
                                             ? "text-gray-900 dark:text-gray-100 button"
                                             : "text-gray-500 dark:text-gray-400 button"
                                     } hover:text-gray-900 dark:hover:text-gray-100 font-semibold button-text button transition-all duration-200`}
                                 >
                                     {router.pathname === page.href ? (
                                         <span className="border-b-2 border-black dark:border-white padding button"> <i className={`${page.icon.active} text-gray-900 dark:text-gray-100 button`} /> <span className="button">{page.name}</span></span>
                                     ) : (
                                         <span> <i className={`${page.icon.default} text-black dark:text-white padding-2 button`} /> <span className="button">{page.name}</span></span>
                                     )}
                                 </button>
                             </Link>
                            </motion.div>
                         ))}
                     </nav>
                     <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                         {socials.slice(0, 3).map((social) => (
                          <div className="ml-4 relative flex-shrink-0 button">
                          <Tippy content={social.name} placement="bottom" arrow={false}>
                          <motion.div
                                 whileHover={{ scale: 1.05 }}
                                 whileTap={{ scale: 0.95 }}
                                >
                          <div className="flex items-center gap-4 button">
                          <a
                              onClick={() => router.push(social.link)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-primary/10 shadow-2xl text-2xl text-white hover:text-white hover:dark:text-white cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 button border border-primary/20 hover:bg-primary/20 active:bg-primary/30"
                          >
                              <i className={social.icon} />
                          </a>
                          </div>
                             </motion.div>
                                </Tippy>
                             </div>
                          ))}
                         <div className="-mr-2 -my-2 md:hidden">
                         <button
                             onClick={() => setIsOpen(!isOpen)}
                             type="button"
                             className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                             aria-expanded="false"
                         >
                             <i className="fa-solid fa-bars" />
                         </button>
                         </div>
             </div>
             </div>
             </div>
             
             <Transition
            as={Fragment}
            show={isOpen ? true : false}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            >
            <div style={{ zIndex: 9999 }} className={`fixed ${scrolled ? "top-[0rem]" : "top-[0rem]"} inset-x-0 p-2 transition transform origin-top-right md:hidden ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"} transition-all duration-200 ease-in-out`}>
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-black divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
            <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 button-text">{config.siteMetadata.author}<span className="text-primary">.</span><span className="text-1xl">me</span></h1>
            </div>
            <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            <div className="-mr-2">
            <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="bg-primary/10 shadow-2xl text-2xl text-white hover:text-white hover:dark:text-white cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 border border-primary/20 hover:bg-primary/20 active:bg-primary/30"
            >
            <i className="fa-solid fa-times" />
            </button>
            </div>
            </motion.div>
            </div>
            <div className="mt-6">
            <nav className="grid gap-y-8">
            {pages.map((page) => (
            <Link href={page.href} key={page.name} legacyBehavior>
            <a
            className={`-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 dark:hover:bg-gray-900/50 button-text ${
            router.pathname === page.href
            ? "bg-gray-50 dark:bg-gray-900/50"
            : "text-gray-900 dark:text-gray-100"
            }`}
            >
            <i className={`${router.pathname === page.href ? page.icon.active : page.icon.default} text-black dark:text-white button-text`} />
            <span className="ml-3 text-base font-bold">
            {page.name}
            </span>
            </a>
            </Link>
            ))}
            </nav>
            </div>
            </div>
            <div className="py-6 px-5 space-y-2">
            <a
            onClick={() => router.push(config.social.discord)}
            className="bg-primary/10 shadow-2xl text-2xl w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-base font-medium text-white border border-primary/20 hover:bg-primary/20 active:bg-primary/30"
            >
            <h1 className="text-white dark:text-white button-text">
            <i className="fab fa-discord" /> Discord Server
            </h1>
            </a>
            <a
            onClick={() => router.push(config.social.twitter)}
            className="bg-primary/10 shadow-2xl text-2xl w-full flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-base font-medium text-white border border-primary/20 hover:bg-primary/20 active:bg-primary/30"
            >
            <h1 className="text-white dark:text-white button-text">
            <i className="fab fa-twitter" /> Twitter
            </h1>
            </a>
            </div>
            </div>
            </div>
            </Transition>
         </>
        );
};
