import { moreDetails } from "@/Array/Ptoducts";
import Image from "next/image";

interface ProductsProps {
  visible: boolean;
  productId: number;
  id: number;
}

const ProductList = ({ visible, productId, id }: ProductsProps) =>
  moreDetails.map((item) => {
    if (!visible && productId == item.id) {
      return (
        <div
          className=" cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/50 rounded-xl max-w-[360px] text-center justify-center  max-h-[400px] mb-10"
          key={id}
        >
          <Image
            src={item.Photo}
            alt={item.FaName}
            width={0}
            height={0}
            className="min-w-300 min-h-40"
          />
          <p className="max-sm:font-normal font-extrabold font-lg mb-2 mt-2 ">
            {item.FaName}
          </p>
          <p className="font-extrabold max-sm:font-normal font-lg pb-10 ">
            {item.prrice}
          </p>
        </div>
      );
    } else if (visible) {
      return "";
    }
  });

export default ProductList;
