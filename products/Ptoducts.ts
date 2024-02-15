
interface ProductsProps {
  FaName?:String,
  photo?:string,
  name?:string
  
}

const Products=( {FaName,photo,name}:ProductsProps) => [
  {
    FaName:'گیفت کارت پی پال',
    Photo:'https://soccersekeconis.ir/media/categories/20231219-134934-3031.jpg',
    name:'PayPal Gift Card'
  },
  {
    FaName:'گیفت کارت ایتیونز',
    Photo:'https://soccersekeconis.ir/media/categories/20231219-163123-3646.jpg',
    name:'iTunes Gift Card'
  },
  {
    FaName:'گیفت کارت جم فری فایر',
    Photo:'https://soccersekeconis.ir/media/categories/20231219-160751-8091.jpg',
    name:'Free Fire Gift Card'
  },
  {
    FaName:'گیفت کارت گابجی موبایل',
    Photo:'https://soccersekeconis.ir/media/categories/20231219-161113-7014.jpg',
    name:'PUBG Mobile Gift Card'
  }
]