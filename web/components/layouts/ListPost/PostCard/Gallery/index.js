import { useState } from "react";
import { Image } from "antd";

export default function Gallery({ listImage,boxSize }) {
  const [visible, setVisible] = useState(false);

  if (listImage.length === 1) {
    return (
      <Image src={listImage[0]} style={{ width: "100%", cursor: "pointer" }} />
    );
  } else if (listImage.length === 2) {
    return (
      <div className="flex cursor-pointer">
        <img
          src={listImage[0]}
          className="w-1/2"
          onClick={() => setVisible(true)}
        />
        <img
          src={listImage[1]}
          className="w-1/2"
          onClick={() => setVisible(true)}
        />
        <div className="hidden">
          <Image.PreviewGroup
            preview={{
              visible,
              onVisibleChange: (visible) => setVisible(visible),
            }}
          >
            <Image src={listImage[0]} />
            <Image src={listImage[1]} />
          </Image.PreviewGroup>
        </div>
      </div>
    );
  } else if (listImage.length === 3) {
    return (
      <div className="flex flex-col cursor-pointer">
        <div
          style={{
            height: `${(boxSize.width - 48) / 2}px`,
          }}
          className="flex gap-1"
        >
          <img
            src={listImage[0]}
            className="w-full"
            onClick={() => setVisible(true)}
          />
        </div>
        <div
          className="flex gap-1"
          style={{
            height: `${(boxSize.width - 48) / 2}px`,
          }}
        >
          <img
            src={listImage[1]}
            className="w-1/2 "
            onClick={() => setVisible(true)}
          />
          <img
            src={listImage[2]}
            className="w-1/2"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="hidden">
          <Image.PreviewGroup
            preview={{
              visible,
              onVisibleChange: (visible) => setVisible(visible),
            }}
          >
            <Image src={listImage[0]} />
            <Image src={listImage[1]} />
            <Image src={listImage[2]} />
          </Image.PreviewGroup>
        </div>
      </div>
    );
  } else if (listImage.length === 4) {
    return (
      <div className="flex flex-col cursor-pointer gap-1">
        <div
          style={{
            height: `${(boxSize.width - 48) / 2}px`,
          }}
          className="flex gap-1 "
        >
          <img
            src={listImage[0]}
            className="w-1/2"
            onClick={() => setVisible(true)}
          />
          <img
            src={listImage[1]}
            className="w-1/2 "
            onClick={() => setVisible(true)}
          />
        </div>
        <div
          className="flex gap-1"
          style={{
            height: `${(boxSize.width - 48) / 2}px`,
          }}
        >
          <img
            src={listImage[1]}
            className="w-1/2 "
            onClick={() => setVisible(true)}
          />
          <img
            src={listImage[2]}
            className="w-1/2"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="hidden">
          <Image.PreviewGroup
            preview={{
              visible,
              onVisibleChange: (visible) => setVisible(visible),
            }}
            
          >
            <Image src={listImage[0]} />
            <Image src={listImage[1]} />
            <Image src={listImage[2]} />
            <Image src={listImage[3]} />
          </Image.PreviewGroup>
        </div>
      </div>
    );
  }
}
