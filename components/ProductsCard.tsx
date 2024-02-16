import React from "react";
import Products from "@/Array/Ptoducts";
import Image from "next/image";


const ProductsCard = () => {
    const listItem = Products.map(item=>(

            <div className=" hover:shadow-2xl hover:shadow-cyan-500/50 rounded-xl max-w-[360px] text-center justify-center  max-h-[400px] mb-10" key={item.id}>
            <a href="/">
                <Image src={item.Photo} alt={item.name} width={300} height={30}/>
                <p className="max-sm:font-normal font-extrabold font-lg mb-2 mt-2 ">{item.name}</p>
                <p className="font-extrabold max-sm:font-normal font-lg mb-2 ">{item.FaName}</p>
                <p className="font-extrabold font-lg max-sm:font-normal sm:pb-10 ">Min Price:{item.basePrice}</p>
                </a>
            </div>
        
    ))
  return (
    
    <div className=" max-sm:grid-cols-2 grid grid-cols-4 justify-between place-content-center mx-[9%] max-sm:mt-16  mt-28 gap-4 ">
      {listItem}
    </div>
  );
};

export default ProductsCard;
