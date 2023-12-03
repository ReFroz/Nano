import React from 'react'
import Image from "next/image";
import Layout from '~/components/Layout'
import About1 from "../../img/about1.png"
import About2 from "../../img/about2.png"
import About3 from "../../img/about3.png"
export default function About() {
  return (
    <Layout  className='font-basic'>
      <div>
        <div className='flex overflow-clip max-[840px]:h-[700px] max-[740px]:h-[500px] justify-center items-center flex-col text-base font-basic  bg-[url("../img/start.png")] h-[900px] object-cover bg-no-repeat bg-cover text-center'>
            <h3 className='z-[35] text-5xl  max-[1132px]:text-5xl max-[840px]:text-4xl max-[740px]:text-3xl'>О нас</h3>
            <hr className="my-2 h-[7px] w-[300px] rounded bg-base-opacity max-[360px]:w-[200px]" />
            <p className='font-basic z-[35] p-10 max-w-[600px] text-4xl max-[1132px]:text-4xl max-[840px]:text-3xl max-[740px]:text-2xl max-[604px]:text-xl'>Nano - онлайн магазин бытовых товаров известных брендов в России</p>
            <div className='absolute z-30 bg-black h-[900px] max-[840px]:h-[700px] max-[740px]:h-[500px] opacity-50 top-[169.25px] right-0 w-full'></div>
        </div>
      </div>

    <div className='flex flex-col justify-center mt-5 gap-8 px-5 '>
    <div className='mx-auto rounded-xl p-6  flex justify-center max-w-[1180px] shadow-xl
    max-[1132px]:min-h-[529px] max-[840px]:min-h-[370px] max-[740px]:min-h-[329px]  max-[604px]:min-h-[300px] 
    '>
      <div className='grid items-center text-5xl grid-cols-2 justify-center'>
      <div className='p-5'>
        <p className='font-basic max-w-[600px]  max-[1132px]:text-4xl max-[840px]:text-3xl max-[740px]:text-2xl max-[604px]:text-xl'>Магазин специализируется только на продаже бытовой техники.</p>
      </div>
      <div>
        <Image
        src={About1} className='rounded-xl h-full' alt="Хуй"/>
      </div>
      </div>
    </div>
    
    <div className='mx-auto rounded-xl p-6  flex justify-center max-w-[1180px] shadow-xl
    max-[1132px]:min-h-[529px] max-[840px]:min-h-[370px] max-[740px]:min-h-[329px]  max-[604px]:min-h-[300px] 
    '>
      <div className='grid items-center text-5xl grid-cols-2 justify-center'>
      <div>
        <Image
        src={About2} className='rounded-xl  h-full' alt="Хуй"/>
      </div>
      <div>
      <p className='font-basic max-w-[600px] p-5 max-[1182px]:text-3xl max-[840px]:text-2xl max-[800px]:text-xl max-[720px]:text-lg max-[6x20px]:text-lg'>Все заказы обрабатываются в течение нескольких часов. если диспетчер подтвердил вам заказ - это гарантия того, что заказ будет доставлен..</p>
      </div>
      
      </div>
    </div>

    <div className='mx-auto rounded-xl p-6  flex justify-center max-w-[1180px] shadow-xl
    max-[1132px]:min-h-[529px] max-[840px]:min-h-[370px] max-[740px]:min-h-[329px]  max-[604px]:min-h-[300px] 
    '>
      <div className='grid items-center text-5xl grid-cols-1 justify-center text-center'>
      <div>
        <Image
        src={About3} className='rounded-xl  max-w[300px]' alt="Хуй"/>
      </div>
      
      <div>
      <p className='font-basic max-[1182px]:text-4xl p-10  max-[840px]:text-3xl max-[740px]:text-2xl max-[604px]:text-xl'>Постоянное наличие широкого ассортимента техники на наших складах, поэтому доставка может быть выполнена уже на следующий день после оформления вами заказа.</p>
      </div>
      
      </div>
    </div>
    </div>

    </Layout>
  )
}
