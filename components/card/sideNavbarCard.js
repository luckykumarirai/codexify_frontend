import Button from "./iconbutton";
import { FcHome } from "react-icons/fc";

const SideNavbarCard = () => {
  return (
    <>
      <div className="w-11/12 mr-auto ml-auto p-4">
        <div className="max-h-60 overflow-y-auto">
          <div className="flex">
            
            <Button name="Home" />
          </div>

          <Button name="About Us" />
          <Button name="Services" />
          <Button name="Blogs" />
          <Button name="Contact Us" />
        </div>
        <p className="font-serif font-bold flex justify-start">Others</p>
        <Button name="Privacy" />
        <Button name="Content Policy" />
        <Button name="Term & Condition" />
      </div>
    </>
  );
};
export default SideNavbarCard;
