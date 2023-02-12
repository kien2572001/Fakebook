import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "~/api/axios";
import { Spin } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Image, Empty } from "antd";

export default function Photos({ thisProfileUser }) {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const fetchPhotos = async () => {
    const res = await axios.get(`/users/${thisProfileUser.id}/photos`, {
      params: {
        page: page,
      },
    });
    if (res.status === 200) {
      let data = res.data.data.data;
      if (typeof data === "object") {
        data = Object.values(data);
      }
      setPhotos([...photos, ...data]);
      setLastPage(res.data.data.last_page);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="max-tablet:flex-col flex flex-row mt-4 w-full">
      <div className="p-4 rounded-xl bg-white shadow-md mb-4 w-full">
        <div className="px-4">
          <p className="font-bold text-lg mb-4">Photos</p>
        </div>
        {/* photos grid */}
        <InfiniteScroll
          dataLength={photos?.length}
          next={fetchPhotos}
          hasMore={page <= lastPage}
          loader={
            <div className="flex justify-center items-center mt-4">
              <Spin />
            </div>
          }
        >
          <div className="grid grid-cols-4 gap-4">
            <Image.PreviewGroup>
              {photos.map((photo) => {
                return (
                  <Image
                    src={photo.image}
                    alt=""
                    className="w-full h-full rounded-md"
                    key={uuidv4()}
                  />
                );
              })}
            </Image.PreviewGroup>
          </div>
          {photos.length === 0 && (
            <div className="flex justify-center items-center w-full h-full mt-2">
              <Empty description="No photos yet" />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
