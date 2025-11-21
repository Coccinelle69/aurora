import { BookingSearchBar } from "@/components";

const SearchBooking = () => {
  return (
    <div
      className="
        w-full 
        h-full
        bg-[url('/beach2.jpg')] 
        bg-cover 
        bg-center 
        flex 
        items-center 
        justify-center
      "
    >
      <BookingSearchBar />
    </div>
  );
};

export default SearchBooking;
