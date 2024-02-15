import React from "react";
import Products from "@/products/Ptoducts";


const ProductsCard = () => {
    const listItem = Products.map(item=>(

            <div className=" ring-2 ring-white radius-md w-[280px] text-center justify-center  h-[300px] mb-20" key={item.id}>
            <a href="/">
                <img src={item.Photo} alt={item.name} width={300} height={30}/>
                <p className="font-extrabold font-lg mb-2 mt-2 ">{item.name}</p>
                <p className="font-extrabold font-lg  ">{item.FaName}</p>
                </a>
            </div>
        
    ))
  return (
    
    <div className="flex justify-between place-content-center mx-[9%]  mt-20 gap-4 ">
      {listItem}
    </div>
  );
};

export default ProductsCard;
