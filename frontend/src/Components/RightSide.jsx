import TrendCard from "./TrendCard";

import NavIcons from "./NavIcons";

const RightSide = () => {
  return (
    <div className="flex flex-col gap-8">
      <NavIcons />
      <TrendCard />
    </div>
  );
};

export default RightSide;
