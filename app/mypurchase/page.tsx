"use client";

import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useModalContext } from "@/context/ModalContext";
import { userProductsUrl } from "@/global/urls";
import { UserProductsResponse } from "@/models/models";
import { Skeleton } from "antd";

const MyPurchase = () => {
  const auth = useContext(AuthContext);
  const modalContext = useModalContext();
  const [mounted, setMounted] = useState<boolean>(false);

  // ** Hooks
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    refetchUserProducts();

    if (!auth?.isAuthenticated) {
      modalContext?.setIsLoginModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.isAuthenticated]);

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
    retry: false,
  });

  if (!mounted) {
    return null;
  }

  return (
    <div dir="rtl" className="  mx-48 min-h-[450px] m-8 ">
      <h1 className=" text-2xl font-bold  mb-8">خرید های من :</h1>
      <div>
        {auth?.isAuthenticated ? (
          isFetchingUserProducts ? (
            // TODO: مهدی اسکلتون رو برای لودینگ گذاشتم، هرچی میخوای بزار جاش
            <div>
              <Skeleton />
            </div>
          ) : (
            userProducts?.user_products?.map((item) => (
              <div
                key={item.id}
                className={`${
                  item.completed && !item.is_cancelled
                    ? " bg-green-300"
                    : !item.completed && !item.is_cancelled
                    ? "bg-slate-200"
                    : !item.completed && item.is_cancelled
                    ? "bg-red-300"
                    : ""
                } !text-black grid grid-cols-8 col-span-2 gap-2 rounded-md ring-1 ring-gray-400 h-[5.7rem] my-5`}
              >
                <div className=" col-span-2 m-auto">img</div>
                <div className=" block m-auto my-4   text-center ">
                  <p className=" inline ">{item.group_FaName} </p>
                  <p className=" text-sm font-light">
                    مبلغ پرداختی: {item.value}
                  </p>
                </div>
                {item.email ? (
                  <div
                    dir="ltr"
                    className=" text-center text-sm col-span-3  my-auto"
                  >
                    <p>
                      {" "}
                      <p className="  inline text-sm font-medium">
                        {" "}
                        Email:
                      </p>{" "}
                      {item?.email}
                    </p>
                    <p>
                      <p className="  inline text-sm font-medium"> Password:</p>{" "}
                      {item.password}
                    </p>{" "}
                  </div>
                ) : !item.email && item.group_FaName == "verifiedpanel" ? (
                  <div
                    dir="ltr"
                    className=" text-center text-sm col-span-3  my-auto"
                  ></div>
                ) : (
                  ""
                )}
                {item.description ? (
                  <div className=" text-center text-sm col-span-3 block my-auto">
                    <p>
                      {" "}
                      <p className="  inline text-sm font-medium"> توضیحات: </p>
                      {item.description}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                {item.group_type ? (
                  <div
                    dir="ltr"
                    className=" text-center text-sm col-span-3 block my-auto"
                  >
                    <p>{item.app}</p>
                    <p>
                      {" "}
                      <p className="  inline text-sm font-medium">
                        {" "}
                        Gift code:{" "}
                      </p>
                      {item.code}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                <div className="text-sm col-span-2 m-auto ">
                  <p>شماره پیکیری: {item.id}</p>
                  <p className=" text-lg">
                    {" "}
                    {!item.is_cancelled && item.completed
                      ? "تکمیل شده"
                      : item.is_cancelled
                      ? "کنسل شده"
                      : !item.is_cancelled && !item.completed
                      ? "درحال پیگیری"
                      : ""}
                  </p>
                  <p dir="ltr"> {item.date_time}</p>
                </div>
              </div>
            ))
          )
        ) : (
          // TODO : مهدی اینارو اوکی کن و متنش رو تغییر بده
          <div>لطفا ابتدا وارد شوید</div>
        )}
      </div>
    </div>
  );
};

export default MyPurchase;
