import React, { useState } from "react";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import Favourites from "../../img/Favourites.svg";
import Comparison from "../../img/Comparison.svg";
import Basket from "../../img/Basket_white.svg";
import { useSearchParams } from "next/navigation";

export default function Home() {
  return (
    <Layout>
      <Catalog />
      <Posts />
    </Layout>
  );
}


const Catalog = () => {
  const { data: categories } = api.posts.getCategory.useQuery();
  const searchParam= useSearchParams()

  const router=useRouter()
  return (
    <>
    <div className="mx-auto justify-start flex gap-[20px] text-basic max-w-[1180px] border-solid border-2 border-basic p-2 rounded-md">
      <div className="max-w-[300px] flex flex-wrap">
        <p>Сортировка по категории:</p>      
        <select onChange={(e)=>{
            const clone = new URLSearchParams(searchParam)
            clone.set('category', e.target.value)
            router.push(`?${clone}`) 
          }}>
          <option>Выберите тип</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.title} >
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <p>Сортировка по цене:</p>      
        <select onChange={(e)=>{
         const clone = new URLSearchParams(searchParam)
         clone.set('filter', e.target.value)
         router.push(`?${clone}`) 
       }}>
         
            <option>
            Популярные           
            </option>
            <option>
            Сначала дешёвые            
            </option>
            <option>
            Сначала дорогие           
            </option>
          
        </select>
      </div>
    </div>
    </>);
};

const Posts = () => {
  const searchParams=useSearchParams()
  
  const selectedItem=searchParams.get('category')
  const selectedFilter=searchParams.get('filter')
  const router=useRouter()
  
  const { data: allPosts } = api.posts?.getFilterPosts.useQuery(selectedItem!);
  {
  if (selectedFilter == 'Популярные'){
   allPosts?.sort((a ,b)=>(
    a.popularity > b.popularity ? 1 : -1
   ))
  }
  else if (selectedFilter == 'Сначала дешёвые'){
   allPosts?.sort((a ,b)=>(
    a.price > b.price ? 1 : -1
   ))
  }
  else if (selectedFilter == 'Сначала дорогие'){
   allPosts?.sort((a ,b)=>(
    a.price < b.price ? 1 : -1
   ))
  }
}
  {console.log(allPosts)}
  

  return (
    <>
      


      <div className="bg-base-opacity">
        <div className="mx-auto mt-4 max-w-[1180px] min-h-[511px] rounded px-5 py-[30px]">
          <p className="text-3xl">Каталог товаров</p>
          <hr className="my-2 h-[7px] w-[300px] rounded bg-base max-[360px]:w-[200px]" />
          {allPosts?.length == 0 && <p className="text-[20px]"> Tоваров данной в данной категории <b className="text-red-600">не найдено</b></p>}
          <ul className="grid grid-cols-4 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1 ">
            {allPosts?.map((item) => (
              <li
                key={item.id}
                className="border-basic mx-2 justify-self-center mb-4 flex min-h-[370px]  max-w-[285px] max-[500px]:min-w-full flex-col items-center justify-between rounded border-[1px] border-solid bg-white p-4 pb-2 text-center"
              >
                <div className="min-h-[220px]">
                  <img
                    src={item.imgs[0]?.altTitle}
                    onClick={() => {
                      router.push("/product/" + item.id);
                    }}
                    className="max-h-[180px] w-[200px] cursor-pointer p-4"
                  />
                </div>
                <p
                  onClick={() => {
                    router.push("/product/" + item.id);
                  }}
                  className="cursor-pointer"
                >
                  {item.title}
                </p>
                <div className="mt-6 flex w-full justify-between">
                  <p className="font-xl font-basic font-normal ">
                    {item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
                    ₽
                  </p>
                  <div className="flex gap-6">
                    <button className="rounded bg-red-600 p-1">
                      <Image alt="Корзина" src={Basket} />
                    </button>
                   
                    <button>
                    <Image src={Favourites} className="active:border-red-600 border-solid active:p-1" alt="избранное"/>

                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
