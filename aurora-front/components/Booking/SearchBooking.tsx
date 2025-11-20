import BookingSearchBar from "./BookingSearchBar";

const SearchBooking = () => {
  return (
    <div
      className="
        w-full 
        h-[610px] 
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
