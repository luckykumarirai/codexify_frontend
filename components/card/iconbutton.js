import {
  FcHome,
  FcContacts,
  FcCellPhone,
  FcPrivacy,
  FcLock,
  FcElectricalSensor,
  FcEditImage,
  FcSelfServiceKiosk,
  FcCollaboration,
  FcComments,
} from "react-icons/fc";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  FaRegEnvelope,
  FaRegCommentDots,
  FaRegListAlt,
  FaTags,
} from "react-icons/fa";
import {
  FiUserCheck,
  FiUsers,
  FiEdit,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setComponent } from "../../redux/reducers/componetSlice";
import { BsTags } from "react-icons/bs";

const Button = (props) => {
  const dispatch = useDispatch();

  const renderIcon = (iconName) => {
    switch (iconName) {
      case "Home":
        return <FcHome />;
      case "Contact Us":
        return <FcCellPhone />;
      case "Privacy":
        return <FcPrivacy />;
      case "Term & Condition":
        return <FcElectricalSensor />;
      case "About Us":
        return <FcCollaboration />;
      case "Comments":
        return (
          <FaRegCommentDots style={{ color: "red", fontSize: "1.5rem" }} />
        );
      case "Blogs":
        return <FcEditImage />;
      case "My Posts":
        return <FaRegListAlt style={{ color: "orange", fontSize: "1.5rem" }} />;
      case "Content Policy":
        return <FcEditImage />;
      case "Services":
        return <FcSelfServiceKiosk />;
      case "Dashboard":
        return (
          <AiOutlineDashboard style={{ color: "blue", fontSize: "1.5rem" }} />
        );
      case "Following":
        return <FiUserCheck style={{ color: "green", fontSize: "1.5rem" }} />;
      case "Followers":
        return <FiUsers style={{ color: "limegreen", fontSize: "1.5rem" }} />;
      case "Settings":
        return <FiSettings style={{ fontSize: "1.5rem" }} />;
      case "Tags Followed":
        return <BsTags style={{ color: "purple", fontSize: "1.5rem" }} />;
      default:
        return null;
    }
  };
  return (
    <>
      <button
        type="button"
        className="w-full text-slate-800 font-medium hover:bg-purple-100 hover:text-blue-800 rounded-lg px-3 py-2 flex justify-start"
        onClick={() => dispatch(setComponent(props.name))}
      >
        {props.name && renderIcon(props.name)}
        <span className="ml-2">{props.name}</span>
      </button>
    </>
  );
};
export default Button;
