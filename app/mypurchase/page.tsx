"use client";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useModalContext } from "@/context/ModalContext";
import { userProductsUrl } from "@/global/urls";
import { UserProductsResponse, UserProducts } from "@/models/models";
import { Skeleton, Alert } from "antd";
import Image from "next/image";

const MyPurchase = () => {
  const auth = useContext(AuthContext);
  const modalContext = useModalContext();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (auth?.isAuthenticated) {
      refetchUserProducts();
    } else {
      modalContext?.setIsLoginModalOpen(true);
    }
  }, [auth?.isAuthenticated]);

  const {
    data: userProducts,
    refetch: refetchUserProducts,
    isFetching: isFetchingUserProducts,
    error: userProductsError,
  } = useQuery<UserProductsResponse>({
    queryFn: async () =>
      (
        await axios.get(userProductsUrl, {
          headers: { Authorization: `Bearer ${auth?.user?.accessToken}` },
        })
      ).data,
    queryKey: ["userProducts"],
    retry: false,
  });

  if (!mounted) {
    return null;
  }

  return (
    <div dir="rtl" className="mx-auto max-w-7xl min-h-[450px] p-6 ">
      <h1 className="text-4xl font-bold mb-8 text-gray-700 dark:text-white text-center">خرید های من</h1>
      <div>
        {auth?.isAuthenticated ? (
          isFetchingUserProducts ? (
            <Skeleton active />
          ) : userProductsError ? (
            <Alert
              message="خطا"
              description="خطا در بارگذاری اطلاعات. لطفا مجددا تلاش کنید."
              type="error"
              showIcon
              className="text-center mb-6"
            />
          ) : (
            userProducts?.user_products?.map((item: UserProducts) => (
              <div
                key={item.id}
                className={`${
                  item.completed && !item.is_cancelled
                    ? "border-green-500 bg-green-50 dark:bg-green-900"
                    : !item.completed && !item.is_cancelled
                    ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900"
                    : !item.completed && item.is_cancelled
                    ? "border-red-500 bg-red-50 dark:bg-red-900"
                    : ""
                } border-l-4 text-gray-900 dark:text-white grid grid-cols-1 md:grid-cols-8 gap-4 p-6 rounded-lg shadow-lg mb-6`}
              >
                <div className="md:col-span-2 flex items-center justify-center">
                <Image
                    src={`https://changeston.com/media/photos/${item.group_type}/${item.photo}`}
                    height={400}
                    alt={item.photo}
                    width={500}
                    priority 
                    unoptimized
                    className="w-[200px] h-[75px] rounded-lg"
                  />
                </div>
                <div className="md:col-span-3 flex flex-col justify-center text-center md:text-right truncate">
                  <p className="text-xl font-semibold text-teal-700 dark:text-teal-400 mb-2">{item.group_FaName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">مبلغ پرداختی: {item.value}</p>
                  {item.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 truncate">توضیحات: {item.description}</p>
                  )}
                </div>
                <div className="md:col-span-3 text-center md:text-right my-auto truncate">
                  <p className="text-sm font-medium mb-1 dark:text-gray-300">شماره پیگیری: {item.id}</p>
                  <p className={`text-lg font-semibold mb-1 ${
                    !item.is_cancelled && item.completed
                      ? "text-green-600 dark:text-green-400"
                      : item.is_cancelled
                      ? "text-red-600 dark:text-red-400"
                      : "text-yellow-600 dark:text-yellow-400"
                  }`}>
                    {!item.is_cancelled && item.completed
                      ? "تکمیل شده"
                      : item.is_cancelled
                      ? "کنسل شده"
                      : "در حال پیگیری"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400" dir="ltr">{item.date_time}</p>
                  {item.email && (
                    <div className="truncate">
                      <p className="text-sm font-medium mb-1 truncate dark:text-gray-300">ایمیل: {item.email}</p>
                      <p className="text-sm font-medium mb-1 truncate dark:text-gray-300">رمز عبور: {item.password}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )
        ) : (
          <Alert
            message="لطفا ابتدا وارد شوید"
            type="warning"
            showIcon
            className="text-center mb-6"
          />
        )}
      </div>
    </div>
  );
};

export default MyPurchase;
