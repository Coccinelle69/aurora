import { Quintessential } from "next/font/google";
import {
  BarbecueIcon,
  BlanketIcon,
  FamilyIcon,
  FreeParkingIcon,
  OceanIcon,
  WifiIcon,
} from "../../icons";
const titleFont = Quintessential({ subsets: ["latin"], weight: "400" });

type Feature = {
  title: string;
  text: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Free Parking",
    text: "Private parking space available free of charge for our guests.",
    icon: <FreeParkingIcon color="#4a6ca3" />,
  },
  {
    title: "Free Wi-Fi",
    text: "Stay connected during your holiday with free and reliable Wi-Fi throughout the property.",
    icon: <WifiIcon color="#4a6ca3" />,
  },
  {
    title: "Sea View",
    text: "Enjoy the relaxing view of the Adriatic Sea right from your balcony or terrace.",
    icon: <OceanIcon color="#4a6ca3" />,
  },
  {
    title: "Family Apartments",
    text: "Spacious and comfortable rooms that can host couples or families — perfect for a relaxing seaside stay.",
    icon: <FamilyIcon color="#4a6ca3" />,
  },
  {
    title: "Fresh Linens & Towels",
    text: "All apartments are supplied with clean bed linens and soft towels for your comfort.",
    icon: <BlanketIcon color="#4a6ca3" />,
  },
  {
    title: "Garden & Barbecue",
    text: "Relax in our private garden surrounded by greenery — perfect for family barbecues and peaceful evenings outdoors.",
    icon: <BarbecueIcon color="#4a6ca3" />,
  },
];

export default function Features() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12">
        {/* Left: features list */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 sm:gap-x-12">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-6">
                <div className="shrink-0">{f.icon}</div>
                <div>
                  <h3
                    className={`${titleFont.className} text-xl text-[#11344b]`}
                  >
                    {f.title}
                  </h3>
                  <p className="mt-2 text-slate-600 leading-relaxed text-sm">
                    {f.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: navy panel */}
        <div className="lg:col-span-5">
          <div className="bg-[#11344b] px-10 py-12 text-center text-white shadow-md">
            <h2 className={`${titleFont.className} text-2xl md:text-3xl`}>
              Comforts that make you feel at home
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed opacity-90">
              Aurora Apartment in Zukve combines modern amenities with a warm,
              family atmosphere. It includes a private balcony, a fully equipped
              kitchenette, and a comfortable living area. Air-conditioning, free
              Wi-Fi, TV channels, and premium furnishings ensure your stay is
              easy and relaxing — all just a short walk from the beach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
