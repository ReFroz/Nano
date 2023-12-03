import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router"

// Images and SVGs
import Logo from "../img/Ico.png"
import Basket from "../img/Basket.svg"
import Comparison from "../img/Comparison.svg"
import Favourites from "../img/Favourites.svg"
import Profil from "../img/Profil.svg"
import Search from "../img/Search.svg"
import User from "../img/user.png"






export default function Header() {
    const {data: sessionData} = useSession()
    const router= useRouter()
    const [active,isActive]=useState(false)
    const [searchWord, setSearchWord]=useState("")

  return (<>
    <header className="pb-14">
        <div className="max-w-[1180px] mx-auto flex items-center gap-[30px] justify-between  px-5 py-[18px] font-basic bg-white">
            <div className="">
                <Link href="/">
                    <Image
                    src={Logo}
                    className="max-h-[81px] max-w-[171px]"
                    alt="Логотип"
                    />
                </Link>
            </div>
            <div
                className="flex px-5 pt-2 pb-1 justify-between min-w-[350px] border-basic rounded border-solid border-2 max-[670px]:hidden"
            >
                <input 
                    onChange={(e)=>setSearchWord(e.target.value)}
                    placeholder="Поиск по каталогу"
                    className="w-[85%] focus:outline-none"
                    value={searchWord}
                    type="search" />
                <Image 
                    onClick={
                        (e)=>{
                        router.push(`/catalog?word=${searchWord}&filter=&category=`)
                        setSearchWord("")
                        }}
                    className="w-[]"
                    src={Search}
                    alt="Иконка"
                    height={20}
                />
                <div className={
                    searchWord.length < 1 ? 
                    "hidden" :
                    "w-[350px] bg-white z-50 break-words p-2 absolute top-[80px] border-solid border-basic border-[1px] drop-shadow-lg max-w-[300px] "
                }>
                    <p className="">{searchWord}</p>
                </div>
            </div>
            <div>
                <nav>
                    <ul className="flex gap-[25px] items-center text-[12px] max-[1070px]:hidden max-[1130px]:gap-[15px] ">
                        <li className="flex whitespace-nowrap flex-col items-center">
                            <Link href="/about">О нас</Link>
                        </li>
                        
                        <li >
                            <Link 
                            className="flex flex-col items-center justify-center"
                            href="/basket">
                                <Image 
                                    src={Basket}
                                    alt="Иконка"
                                />
                                Корзина
                            </Link>
                        </li>
                        <li >
                            <Link 
                            className="flex flex-col items-center justify-center"
                            href="/favourites">
                                <Image 
                                    src={Favourites}
                                    alt="Иконка"
                                />
                                Избранное
                            </Link>
                            
                        </li>
                        <li >
                            <Link 
                            className="flex flex-col items-center justify-center"
                            href="/profil">
                                <Image 
                                    src={Profil}
                                    alt="Иконка"
                                />
                                Профиль
                            </Link>
                        
                        </li>
                        <li >
                            <button
                            onClick={sessionData ? () => void signOut() : () => void signIn()}
                            >
                                <div className="flex flex-col items-center">
                                    {sessionData ? 
                                    <Image
                                        className="rounded-[50%]"
                                        src={User} 
                                        alt="Фото профиля" 
                                        width={30} height={30}
                                    />
                                    : 
                                    "Войти"}
                                    {sessionData?.user.name?.split(" ")[0]}
                                </div>
                            </button>
                        </li>
                    </ul>
                    <div onClick={(e)=>{
                        e.preventDefault()
                        isActive(!active)
                    }} 
                        className="space-y-2 min-[1070px]:hidden cursor-pointer">
                        <div className="w-12 h-2 rounded bg-base "></div>
                        <div className="w-12 h-2 rounded bg-base "></div>
                        <div className="w-12 h-2 rounded bg-base "></div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    
        <div className={active ?
        "transition-transform absolute right-[0px] min-w-[200px] rounded-bl-xl z-40 bg-white":
        "transition-transform absolute right-[0px] z-40 bg-white hidden"
        }>
            <nav>
                <ul className="flex items-end flex-col p-4 gap-6">
                        <li className="">
                            <input 
                                onChange={(e)=>setSearchWord(e.target.value)}
                                placeholder="Поиск по каталогу"
                                className="w-[85%] focus:outline-none mobile:hidden "
                                value={searchWord}
                                type="search" 
                            />
                        </li>
                        <li className="border-black border-solid border-b-2 border-spacing-4">
                            <Link href="/about">О нас</Link>
                        </li>
                        
                        <li className="border-black border-solid border-b-2 border-spacing-4">
                            <Link 
                            className="flex gap-[10px]"
                            href="/basket">
                                <Image 
                                    src={Basket}
                                    alt="Иконка"
                                />
                                Корзина
                            </Link>
                        </li>
                        <li className="border-black border-solid border-b-2 border-spacing-4">
                            <Link 
                            className="flex gap-[10px]"
                            href="/favourites">
                                <Image 
                                    src={Favourites}
                                    alt="Иконка"
                                />
                                Избранное
                            </Link>
                            
                        </li>
                        <li className="border-black border-solid border-b-2 border-spacing-4">
                            <Link 
                            className="flex gap-[10px]"
                            href="/profil">
                                <Image 
                                    src={Profil}
                                    alt="Иконка"
                                />
                                Профиль
                            </Link>
                        
                        </li>
                        <li className="border-black border-solid border-b-2 border-spacing-4">
                            <button
                            onClick={sessionData ? () => void signOut() : () => void signIn()}
                            >
                                <div className="flex flex-col items-center">
                                    
                                    {sessionData ? 
                                    "Добро пожаловать, " + sessionData?.user.name?.split(" ")[0]
                                    :
                                    "Войти"
                                    }
                                </div>
                            </button>
                        </li>

                </ul>
            </nav>
        </div>
    <div 
    onClick={(e)=>{
        e.preventDefault()
        isActive(!active)
    }}   
    className={active ?"transition-opacity duration-500 absolute opacity-30 bg-black min-w-[100%] min-h-[100vh] " :
     "duration-500 transition-opacity absolute opacity-0 bg-black min-w-[100%] "}></div>
  
</>)
}