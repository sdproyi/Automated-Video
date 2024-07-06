import { Img, staticFile } from "remotion";

export const Avatar = () => {
  return (
    <div className="w-1/5 left-14 bottom-0 absolute">
      <Img src={staticFile("avatar.png")} />
    </div>
  );
}