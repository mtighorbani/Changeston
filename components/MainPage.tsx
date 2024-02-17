'use client'
import BlurText from './BlurText';
import ProductsCard from './GroupingCard';
import ImageSwapper from './ImageSwapper';
  


const images = [

    'https://i.pinimg.com/564x/c3/94/9d/c3949d12f955212b8b2671495754a640.jpg',
    'https://i.pinimg.com/564x/60/32/98/603298a75474398309b317f866b47e6f.jpg'
];

export default function MainPage() {
  return (
    <div className='mb-[40px] '>
      <ImageSwapper images={images} />
      <BlurText/>
      <ProductsCard/>

      
    </div>
  );
}