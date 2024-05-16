"use client";

import Image  from "next/image";
import React, { useEffect, useState } from "react";
import ConfirmForm from "./ConfirmForm";
import {VerifyAccountRes} from '@/models/models'
import axios from "axios";


const ProductList = ({ productId,id }:any) => {
  const [purchaseVisible, setPurchaseVisible] = useState(true);
  const [purchaseId, SetPurchaseId] = useState<any>();
  const [ProductsList, SetProductsList] = useState<VerifyAccountRes[]>([])
  const [Loading,setLoading] = useState(false)
  const [ImgUrl,SetImgUrl] = useState<any>()
  const [error,setError] = useState<any>()


  const [purchasePrice,purchaseSetPrice] = useState<any>()
  const [FaName , setFaName] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://changeston.com/api/v1/verfiedpanels/list/"
        );
        SetProductsList(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const ProductsListMap = ProductsList.map((item) => {
    const purchasePageHandler =( () => {
      setPurchaseVisible(false);
      SetImgUrl(item.group.Photo)
      purchaseSetPrice(item.verfiedpanelsgroup.map(x=>x.amount))
      setFaName(item.group.FaName)     
      SetPurchaseId(item.verfiedpanelsgroup.map(x=>x.id))
       
      
    })
    
    if (productId == item.group.id) {
      return (

          <div key={item.group.id} onClick={ ()=>id(3) }>
            <div
              className=" max-sm:mt-2 cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/50 rounded-xl max-w-[360px] text-center justify-center  max-h-[400px] max-sm:mb-0 mb-10"
              onClick={purchasePageHandler}
            >
              <Image
                src={item.group.Photo}
                alt={item.group.FaName}
                width={0}
                height={0}
                className="min-w-300 min-h-52 max-h-52 "
              />
              <p className="max-sm:font-normal font-extrabold font-lg mb-2 mt-2 ">
                {item.verfiedpanelsgroup.map(x=>x.name)}
              </p>
              <p className="font-extrabold max-sm:font-normal font-lg pb-10 ">
                {item.verfiedpanelsgroup.map(x=>x.amount)}
              </p>
            </div>
          </div>
      );
    }
  });

  return purchaseVisible ? (
    <div
      className={
        "max-sm:grid-cols-1 grid grid-cols-4 justify-between place-content-center max-sm:mx-20 mx-[10%] max-sm:mt-20  mt-28 gap-4  "
      }
    >

      {ProductsListMap}
    </div>
  ) : (
    <ConfirmForm purchaseId={purchaseId} imgUrl={ImgUrl} price={purchasePrice} FaName={FaName} />
  );
};

export default ProductList;
