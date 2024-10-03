import TrendCard from "./TrendCard";

import NavIcons from "./NavIcons";

const RightSide = () => {
  return (
    <div className=" flex-col gap-8 ">
      <NavIcons location="profilePage" />
      <TrendCard />
    </div>
  );
};

export default RightSide;
