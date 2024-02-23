
import React, { useState } from "react";
import CryptoPurchaseForm from "./CryptoPurchesForm";


const CurrencyComponents = ({id}) => {
  
const [amount,setAmount]= useState('')
const [crypto,setCrypto]= useState('')
const [cardAddress,setCardAddress]= useState('')
const [purchasePage,setParchasePge] = useState(false)


const purchasePageHandler = ()=>{
  id(3)
  setParchasePge(true)
} 

  return (
    <>
    {!purchasePage?
    <div
      dir="rtl"
      className=" m-auto w-[50%] rounded-lg h-[450px] dark:bg-black bg-[#EEEEEE] mt-24"
    >
      <h1 className=" font-bold text-2xl p-6">خرید ارز</h1>
      <form dir="rtl" className="max-w-sm mr-8 mt-4">
    <label
      typeof="currency"
      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
    >
      نوع ارز خود را انتخاب نمایید
    </label>
    <select
      value={crypto} 
      id="currency"
      onChange={(target)=>setCrypto(target.target)}

      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option title="ترون"  selected>ترون</option>
    </select>

    <form className="max-w-sm mx-auto mt-4">
      <label
        typeof="number-input"
        className="block mb-2 text-sm text-gray-900 dark:text-white font-bold"
        required
      >
        مقدار ارز را وارد نمایید
      </label>
      <input
        value={amount}
        onChange={({target})=>setAmount(target?.value)}
        required
        type="number"
        id="number-input"
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="2"
        
      />
    </form>
    <label
      typeof="email"
      required
      className="block  dark:text-white rtl:mr-0 mt-2 h-[10%] text-sm  font-bold mb-1 text-gray-900"
    >
      <p dir="rtl" className="text-right ">
        آدرس کیف پول خود را وارد نمایید
      </p>
    </label>
    <input
      type="address"
      id="address"
      dir="ltr"
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      placeholder=""
      value={cardAddress}
      onChange={({target})=>setCardAddress(target?.value)}
      required
    />
    <button
    onClick={purchasePageHandler}
    
      typeof="submit"
      className="w-[40%] text-center cursor-pointer h-10  text-white pr-3 pt-[4px] mt-10   rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]  "
    >
      <div >
      تایید اطلاعات
      </div>
    </button>
  </form>
  
    </div>:
    <CryptoPurchaseForm crypto={crypto} amount={amount} cardAddress={cardAddress}/>}
    </>
  );
};

export default CurrencyComponents;