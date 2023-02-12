
import InfiniteScroll from "react-infinite-scroll-component";


export default function Photos({}) {
  return (
    <div className="max-tablet:flex-col flex flex-row mt-4 w-full">
      <div className="p-4 rounded-xl bg-white shadow-md mb-4 w-full">
        <div className="px-4">
          <p className="font-bold text-lg mb-4">Photos</p>
        </div>
        {/* photos grid */}
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
            (photo, index) => {
              return (
                <div className="">
                  <img
                    src="http://fakebook-kien2572001.s3.ap-southeast-1.amazonaws.com/images/1676094905.jpg"
                    alt=""
                    className="w-full h-full rounded-md"
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
