import Image from 'next/image'
import React from 'react'
import Imafe from '../asset/images/Enamadlogo.png'

const Footer = () => {
  return (
    <div className='flex justify-between w-full h-[20%] py-10 bg-slate-100'>
        <div className='ml-[10%] my-auto'>کلیه حقوق این سایت متعلق به چنجستون می باشد.</div>
        <div className='mr-[10%] my-auto'> <Image src={Imafe} alt='Enamad' /></div>
    </div>
  )
}

export default Footer