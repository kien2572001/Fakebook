export default function StatusDot({ color }) {
  return (
    <>
      {color === "online" && (
        <div className="rounded-full w-[8px] h-[8px] bg-success"></div>
      )}
      {color === "offline" && (
        <div className="rounded-full w-[8px] h-[8px] bg-danger"></div>
      )}
      {color === "busy" && (
        <div className="rounded-full w-[8px] h-[8px] bg-warning"></div>
      )}
    </>
  );
}
