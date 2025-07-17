import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Monitor,
  Tablet,
  TabletSmartphone,
  CardSim,
  Newspaper,
} from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const category = [
    { name: "Điện thoại", icon: <Smartphone /> },
    { name: "Laptop", icon: <Laptop /> },
    { name: "Phụ kiện", icon: <Headphones /> },
    { name: "Smartwatch", icon: <Watch /> },
    { name: "Đồng hồ", icon: <Watch /> },
    { name: "Tablet", icon: <Tablet /> },
    { name: "Máy cũ, Thu cũ", icon: <TabletSmartphone /> },
    { name: "Màn hình, Máy in", icon: <Monitor /> },
    { name: "Sim, Thẻ cào", icon: <CardSim /> },
    { name: "Dịch vụ tiện ích", icon: <Newspaper /> },
  ];

  return (
    <div className="bg-[#ffd400] w-full  flex flex-col gap-2">
      <Image
        src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/e4/d2/e4d215b404d123b25e8b8f5c01ac2f56.png"
        alt="header"
        width={1366}
        height={40}
        quality={100}
        className="max-w-full w-full h-auto object-cover"
        priority={true}
      />
      <div className="bg-[#ffd400] w-full  flex flex-col gap-2">
        <div className="flex sticky items-center justify-between mx-11 px-4">
          <div className="flex items-center gap-2">
            <Image src="/assets/images/thegioididong-logo.jpg" alt="logo" width={220} height={40} />
          </div>

          <div className="flex-1 mx-4 max-w-xl">
            <div className="bg-white rounded-full px-4 py-2 flex items-center">
              <Search size={16} className="text-gray-400 w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Bạn tìm gì..."
                className="w-full text-black outline-none text-sm py-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-black">
            <div className=" hover:bg-[#fe9] flex items-center gap-1 cursor-pointer text-[16px] py-2 px-2.5 rounded-full">
              <User className="w-4 h-4" />
              Đăng nhập
            </div>
            <div className="hover:bg-[#fe9] flex items-center gap-1 cursor-pointer text-[16px] py-2 px-2.5 rounded-full">
              <ShoppingCart className="w-4 h-4" />
              Giỏ hàng
            </div>
            <div className="hover:bg-[#fe9] flex w-[300px] items-center gap-1 cursor-pointer bg-yellow-300 rounded-full py-2 px-2.5 text-[16px]">
              <MapPin className="w-4 h-4" />
              <span className="flex-1 justify-between flex">
                Hồ Chí Minh <span className=""> &gt; </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-evenly  text-sm text-black font-medium mx-6 px-4 pb-1.5">
          {category.map((item, index) => (
            <div
              key={index}
              className="flex items-center hover:bg-[#fe9] rounded-full px-2.5 py-1.5 gap-1 cursor-pointer whitespace-nowrap"
            >
              <span className="text-base">{item.icon}</span>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
