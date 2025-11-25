"use client";
import Image from "next/image";

const BookingCard = () => {
  return (
    <div className="w-full px-4 mt-12 mb-12 flex justify-center">
      <div
        className="
          max-w-4xl w-full
          rounded-2xl shadow-lg border
          p-4 bg-white
          flex flex-col sm:flex-row gap-6
        "
      >
        {/* IMAGE */}
        <div className="w-full sm:w-56 h-56 relative flex-shrink-0">
          <Image
            src="/bookingcard.jpg"
            alt="Apartment"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Aurora apartment – 70m from the sea
            </h2>

            <div className="flex items-center text-gray-500 gap-1 mt-1">
              <span>📍</span>
              <span>Zukve, Croatia</span>
            </div>

            <p className="text-gray-600 mt-2 text-sm">
              Aurora Suites is a brand new “jewel” in the city of Chania. They
              are located in a nearby suburb of the city...
            </p>

            <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm mt-3">
              <span>• Apartment</span>
              <span>• 2 Guests</span>
              <span>• 2 Bedrooms</span>
              <span>• 1 Bathroom</span>
            </div>
          </div>

          {/* PRICE + BUTTON */}
          <div className="flex justify-between items-end mt-4">
            <div>
              <div className="text-sm text-gray-500">from</div>
              <div className="text-2xl text-gray-700 font-semibold">
                €155.00
              </div>
              <div className="text-xs text-gray-500">Per night</div>
              <div className="text-xs text-gray-400 mt-1">
                Additional charges may apply
              </div>
            </div>

            <button className="bg-sky-500 text-white px-5 py-2 rounded-lg hover:bg-sky-600 transition">
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
