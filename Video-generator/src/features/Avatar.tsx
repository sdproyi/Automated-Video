import { Img, staticFile } from "remotion";

export const Avatar = () => {
  return (
    <div className="w-1/4 left-7 bottom-7 absolute">
      <Img src={staticFile("avatar.png")} />
    </div>
  );
}