import React from 'react'
import Link from 'next/link'
import Logo from '../img/Ico.png'
import Image from 'next/image'





export default function Footer() {
  return (
    <footer className='bg-[#E4E4E4] px-5 py-[50px] mt-[150px]'>
        <div className='max-w-[1180px] mx-auto'>
            <div>
                <Image
                    src={Logo}
                    className='max-h-[81px] max-w-[171px] mb-11'
                    alt='Логотип'
                />
                <p className='text-3xl mb-[121px]'>Nano -Магазин бытовых товаров извесных брендов и не только</p>
                <div className='grid grid-cols-2 max-[450px]:grid-cols-1'>
                    <div>
                        <p className='text-3xl mb-[30px]'>Навигация</p>
                        <ul className='grid grid-cols-2 gap-[19px]'>
                            <li>
                                <Link href='/'>Главная</Link>
                            </li>
                            <li>
                                <Link href='/catalog?word=&filter=&category='>Каталог</Link>
                            </li>
                            <li>
                                <Link href='/profil'>Личный кабинет</Link>
                            </li>
                            <li>
                                <Link href='/'>Корзина</Link>
                            </li>
                            <li>
                                <Link href='/login'>Войти</Link>
                            </li>
                            <li>
                                <Link href='/favourites'>Избранное</Link>
                            </li>
                            <li>
                                <Link href='/registration'>Регистрация</Link>
                            </li>
                            <li>
                                <Link href='/about'>О нас</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className='text-3xl mb-[30px]'>Социальные сети</p>
                        <ul className='grid gap-[19px]'>
                            <li>
                                <Link href='https://dzen.ru'>Яндекс дзен</Link>
                            </li>
                            <li>
                                <Link href='https://vk.com'>ВКонтакте</Link>
                            </li>
                            <li>
                                <Link href='https://YouTube.com'>YouTube</Link>
                            </li>
                            <li>
                                <Link href='https://Telegram.org'>Telegram</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

