import freeFire_prev_ui from "../asset/images/freeFire_prev_ui.png";
import SPOTIFY_prev_ui from "../asset/images/SPOTIFY_prev_ui.png";
import googleplay_prev_ui from "../asset/images/googleplay_prev_ui.png";
import itunes_prev_ui from "../asset/images/itunes_prev_ui.png";
import paypal_prev_ui from "../asset/images/paypal_prev_ui.png";
import pubg_prev_ui from "../asset/images/pubg_prev_ui.png";
import giftCard from "../asset/images/giftcard.jpg";
import Crypto from "../asset/images/cryptocurrency.jpg";

const Products = [
  {
    id: 2,
    FaName: "شارژ پنل وایز",
    Photo: Crypto,
    name: "WISE",
    basePrice: "20$",
  },
  {
    id: 1,
    FaName: "خرید انواع گیفت کارت",
    Photo: giftCard,
    name: "Gift Crads",
    basePrice: "10$",
  },
];



const moreDetails = [
 
  {
    id: 1,
    purchesId: 4,
    FaName: "گیفت کارت 1.5 دلاری",
    Photo: paypal_prev_ui,
    prrice: "90,000 تومان  ",
  },
  {
    id: 1,
    purchesId: 5,
    FaName: "گیفت کارت 2 دلاری",
    Photo: paypal_prev_ui,
    prrice: "40,000  تومان  ",
  },
  {
    id: 1,
    purchesId: 6,
    FaName: "گیفت کارت ایتیونز 0.5 سنت",
    Photo: itunes_prev_ui,
    prrice: "40,000  تومان  ",
  },
  {
    id: 1,
    purchesId: 7,
    FaName: "گیفت کارت ایتیونز 1 دلاری",
    Photo: itunes_prev_ui,
    prrice: "60,000  تومان  ",
  },
 
  {
    id: 1,
    purchesId: 10,
    FaName: "گیفت کارت جم فری فایر 0.5 سنت",
    Photo: freeFire_prev_ui,
    prrice: "40,000  تومان  ",
  },
  {
    id: 1,
    purchesId: 11,
    FaName: "گیفت کارت جم فری فایر 1 دلاری",
    Photo: freeFire_prev_ui,
    prrice: "60,000 تومان ",
  },
 
  {
    id: 1,
    purchesId: 16,
    FaName: "گیفت کارت پابجی موبایل 1.5 دلاری",
    Photo: pubg_prev_ui,
    prrice: "90,000 تومان ",
  },
  {
    id: 1,
    purchesId: 16,
    FaName: "گیفت کارت پابجی موبایل 2 دلاری",
    Photo: pubg_prev_ui,
    prrice: "40,000 تومان ",
  },
  {
    id: 1,
    purchesId: 17,
    FaName: "گیفت کارت اسپاتیفای 0.5 سنت",
    Photo: SPOTIFY_prev_ui,
    prrice: "40,000 تومان ",
  },
  {
    id: 1,
    purchesId: 18,
    FaName: "گیفت کارت اسپاتیفای 1 دلاری",
    Photo: SPOTIFY_prev_ui,
    prrice: "60,000 تومان ",
  },
  {
    id: 1,
    purchesId: 23,
    FaName: "گیفت کارت گوگل پلی 1.5 دلاری",
    Photo: googleplay_prev_ui,
    prrice: "90,000 تومان ",
  },
  {
    id: 24,
    purchesId: 2,
    FaName: "گیفت کارت گوگل پلی 2 دلاری",
    Photo: googleplay_prev_ui,
    prrice: "40,000 تومان ",
  },
];



export { Products, moreDetails };
