import React from "react";
import Products from "@/products/Ptoducts";


const ProductsCard = () => {
    const listItem = Products.map(item=>(

        <a href="/">
            <div className=" ring-2 ring-white radius-md w-[280px] text-center justify-center  h-[300px] mb-20" key={item.id}>
                <img src={item.Photo} alt={item.name} width={300} height={30}/>
                <p className="ffont-extrabold font-lg mb-2 mt-2 ">{item.name}</p>
                <p className="font-extrabold font-lg  ">{item.FaName}</p>
            </div>
        </a>
    ))
  return (
    
    <div className="flex justify-between  mx-[150px]  mt-20 ">
      {listItem}
    </div>
  );
};

export default ProductsCard;
