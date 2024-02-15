import ImageSwapper from './ImageSwapper';



const images = [

    'https://i.pinimg.com/564x/39/49/fd/3949fd4fb11823d9425dea01e48f4723.jpg',
    'https://i.pinimg.com/564x/60/32/98/603298a75474398309b317f866b47e6f.jpg'
];

export default function MainPagePhoto() {
  return (
    <div>
      <ImageSwapper images={images} />
    </div>
  );
}