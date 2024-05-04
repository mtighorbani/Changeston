"use client";

import { AuthContext } from "@/context/AuthContext";
import { useModalContext } from "@/context/ModalContext";
import { userProductsUrl } from "@/global/urls";
import { UserProductsResponse } from "@/models/models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect } from "react";

const MyPurchase = () => {
  const auth = useContext(AuthContext);
  const modalContext = useModalContext();


  useEffect(()=>{
    if(!auth?.isAuthenticated){
      modalContext?.setIsLoginModalOpen(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[auth?.isAuthenticated])

  const {
    data: userProducts,
    refetch: refetchUserProducts,
    isFetching: isFetchingUserProducts,
  } = useQuery<UserProductsResponse>({
    queryFn: async () =>
      (
        await axios.get(userProductsUrl, {
          headers: { Authorization: `Bearer ${auth?.user?.accessToken}` },
        })
      ).data,
    queryKey: ["userProducts"],
  });
  return (
    <div dir="rtl" className="  mx-48 min-h-[450px] m-8 block">
      <h1 className=" text-2xl font-bold  mb-8">خرید های من :</h1>
      <div>
        <div className=" rounded-md ring-1 ring-gray-400 h-20">
          {auth?.isAuthenticated ? 
            userProducts &&
              userProducts?.user_products &&
              userProducts?.user_products[0]?.id : 'برای مشاهده ی بخش خرید های من لطفا ابتدا وارد شوید'}
        </div>
      </div>
    </div>
  );
};

export default MyPurchase;
