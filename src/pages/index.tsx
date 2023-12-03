import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import Layout from "../components/Layout";

import { SendMailSchema } from "~/server/api/routers/toEmail";
import Feedback from "../img/feedpack.jpg";
import Televisor from "../img/televisor.png";
import Favourites from "../img/Favourites.svg";
import Comparison from "../img/Comparison.svg";
import Basket from "../img/Basket_white.svg";
import { useRouter } from "next/dist/client/router";
import { DOMAttributes, FormEventHandler, HTMLAttributes, PropsWithChildren, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SwiperOptions } from "swiper/types"; 

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
      interface IntrinsicElements {
          'swiper-container': React.DetailedHTMLProps<
              SwiperOptions & HTMLAttributes<unknown>,
              HTMLElement
          >;
          'swiper-slide': React.DetailedHTMLProps<HTMLAttributes<unknown>, HTMLElement>;
      }
  }
}

export default function Home() {
  const [cols, setCols] = useState(4);

  useEffect(() => {
    updateCols();

    function updateCols() {
      console.log(window.innerWidth);
      if (window.innerWidth < 1000 && window.innerWidth >= 750) setCols(3);
      else if (window.innerWidth >= 500 && window.innerWidth < 750) setCols(2);
      else if (window.innerWidth < 500) setCols(1);
      else setCols(4);
    }

    window.addEventListener("resize", updateCols);

    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return (
    <>
      <Head>
        <title>Главная</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <PostWithDiscount />

        {/* Хиты продаж */}
        <Content countCols={cols} />
        <PolularCategory/>
        <FeedbackForm/>
      </Layout>
    </>
  );
}

{
  /* Посты со скдиками */
}
const PostWithDiscount = () => {
  const [data, setData] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const {data:posts}=api.posts.getAll.useQuery()
  const filterPost=posts?.sort((a,b)=> a.popularity > b.popularity ? 1 : -1 )
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setData(23 - date.getHours());
      setMinutes(59 - date.getMinutes());
      setSeconds(59 - date.getSeconds());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-[1180px] px-5">
      <div className="grid grid-cols-2 gap-[42px] font-basic max-[1024px]:grid-cols-1 ">
        <div className="flex flex-col items-center rounded-lg border-[1px] border-solid border-base py-6 text-center shadow-xl shadow-base min-[1024px]:max-w-full">
          <p className="text-3xl">Горячие скидки</p>
          <hr className="my-2 h-[7px] w-[300px] rounded bg-base" />
          <div className="w-full">
            <swiper-container
              
              slides-per-view={1}
              navigation={true}
              pagination={true}
              loop={true}
            >
              {filterPost?.map((item)=>(
               <swiper-slide key={item.id} >
                <div className="flex px-8 p-5">
                  <img src={item.imgs[0]?.altTitle} className="w-[200px] max-h-[250px]"/>
                  <div className="flex-col flex p-5">
                    <p>{item.title}</p>
                    <p className="mt-5 text-2xl">{item.price}₽</p>
                    <p className="mt-5 line-through "> {item.price + 1000}₽</p>
                  </div>
                </div>
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </div>
        <div className="flex flex-col items-center rounded-lg border-[1px] border-solid border-base py-6 text-center shadow-xl shadow-base min-[1024px]:max-w-full">
          <div className="flex w-full justify-between px-10 ">
            <div>
              <p className="text-3xl">Товар дня</p>
              <hr className="my-2 h-[7px] w-[200px] rounded bg-base" />
            </div>
            <p className="text-3xl">
              {data}
              {":"}
              {minutes}
              {":"}
              {seconds}
            </p>
          </div>
          <div className="w-full">
            <swiper-container
              slides-per-view={1}
              navigation={true}
              pagination={true}
              loop={true}
            >
              {filterPost?.map((item)=>(
               <swiper-slide key={item.id} >
                <div className="flex px-8 p-5">
                <img src={item.imgs[0]?.altTitle} className="w-[200px] max-h-[250px]"/>

                  <div className="flex-col flex p-5">
                    <p>{item.title}</p>
                    <p className="mt-5 text-2xl">{item.price}₽</p>
                    
                  </div>
                </div>
                </swiper-slide>
              ))}
            </swiper-container>
          </div>
        </div>
      </div>
    </div>
  );
};

const Content = ({ countCols }:PropsWithChildren<{countCols?: number}>) => {
  const { data: allPosts } = api.posts.getAll.useQuery();
  const router = useRouter()
  const mutation= api.favourit.addLike.useMutation()
  
  return (
    <>
      <div className="m-[40px] mx-auto bg-base-opacity">
        <ul className="mx-auto max-w-[1180px]  px-5 py-[30px]">
          <p className="text-3xl">Хиты продаж</p>
          <hr className="my-2 h-[7px] w-[300px] rounded bg-base" />
          <swiper-container slides-per-view={countCols} loop={true}>
            {allPosts?.map((item) => (
              <swiper-slide>
                <li key = {item.id}className="border-basic mx-2 flex  min-h-[370px] flex-col items-center justify-between rounded border-[1px] border-solid bg-white p-4 pb-2 text-center">
                  <div className="min-h-[220px]">
                    <img
                      src={
                        item.imgs[0]?.altTitle
                      }
                      onClick={()=>{router.push("/product/"+item.id)}}
                      className="max-h-[180px] w-[200px] p-4 cursor-pointer"
                    />
                  </div>
                  <p
                  onClick={()=>{router.push("/product/"+item.id)}}
                  className="cursor-pointer"
                  >{item.title}</p>
                  <div className="mt-6 flex w-full justify-between">
                    <p className="font-xl font-basic font-normal ">
                      {item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                      ₽
                    </p>
                    <div className="flex gap-6">
                      <button className="rounded bg-red-600 p-1">
                        <Image alt= "корзина" src={Basket} />
                      </button>
                      
                      <button onClick={async (e)=>{
                       e.preventDefault()
                       mutation.mutateAsync(item.id)
                       }}>
                        <Image className="active:border-red-600 border-solid active:p-1" alt="избранное"src={Favourites} />
                      </button>
                    </div>
                  </div>
                </li>
              </swiper-slide>
            ))}
          </swiper-container>
        </ul>
      </div>
    </>
  );
};


const FeedbackForm=()=>{
  const mutation = api.mail.send.useMutation()

  const router=useRouter()

  const [name, setName]=useState('')
  const [email, setEmail]=useState('')
  const [message, setMessage]=useState('')

  const handleSubmit:FormEventHandler<HTMLFormElement> | undefined= async (e)=>{
    e.preventDefault()
    const success= await mutation.mutateAsync({
      name,
      email,
      message
    })
  if (!success) {
      router.push(
        `/?error=Не удалось отправить сообщение"`,
      );
    }
  router.push(`/?success=Сообщение отправлено! Ждите ответа в течение дня.`)
  }


  return(<>
  <div className="max-w-[1180px]  items-center  mx-auto font-basic text-xl p-5">
      <p className="text-3xl">Обратная связь</p>
      <hr className="my-2 h-[7px] w-[300px] rounded bg-base" />
      
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
        <div  className="grid grid-cols-2 gap-[30px]" >
        <div className="flex flex-col justify-between gap-[30px]">
          <input onChange={(e)=>{setName(e.target.value)}} className="py-2 px-1 bg-base-opacity rounded focus:border-base" name="name" type="text" placeholder='Имя'/>
          <input onChange={(e)=>{setEmail(e.target.value)}} className="py-2 px-1 bg-base-opacity rounded focus:border-base" name="email" type="email" placeholder='Почта'/>
          <textarea onChange={(e)=>{setMessage(e.target.value)}} className="py-2 px-1 bg-base-opacity rounded focus:border-base"  placeholder='Ваш вопрос, отзыв или пожелание' 
          name="comment" cols={20} rows={7}></textarea>
        </div>
          <Image alt="Обратная связь" src={Feedback} />
        </div>
        <input className='w-[300px] my-5 px-2 py-3 rounded border-solid border-black border-2' type='submit'/>
      </form>
   
  </div>
  </>)
}

const PolularCategory=()=>{
  const {data:allCategory}= api.posts.get6Category.useQuery()
  const router= useRouter()
  
  return(<>
  <div className="mx-auto max-w-[1180px] p-5">
        <p className="text-3xl">Популярные категории</p>
        <hr className="my-2 h-[7px] w-[300px] rounded bg-base" />
    <div className="grid  gap-5 grid-cols-3 content-between justify-between">
      
      {allCategory?.map((item)=>(
        <div 
        onClick={()=>{
          router.push(`catalog?word=&filter=&category=${item.title}`)
        }}
        key={item.id} className="flex gap-[30px] mx-auto  mb-5 w-[300px] items-center p-2 bg-base-opacity h-[100px]">
          <div className="bg-white">
          <img src={item.img} className="w-[50px] h-[80px] "/>
          </div>
          <p >{item.title}</p>
          </div>
      ))}
    </div>
  </div>
    </>

  )
}