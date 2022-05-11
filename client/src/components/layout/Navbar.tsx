import { useState } from "react";
import ProfileDropdown from "../profile/ProfileDropdown";

interface Prop {
  name?: string;
  photo?: string;
}

function Navbar({ name, photo }: Prop) {
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);
  const handleToggleDropDown = () => setToggleDropDown(!toggleDropDown);
  return (
    <div className="custom-navbar">
      <div className="logo">
        <span className="material-icons text-danger">code</span>
        <span>devChallenges</span>
      </div>
      <div className="icon-me">
        <img src={ photo ? photo : "https://res.cloudinary.com/ndutared/image/upload/v1652183676/acqi0i83hcn2ilgrj9we.jpg"} alt="me" />
        <span className="user-name mx-3">{name}</span>
        {toggleDropDown ? <span onClick={handleToggleDropDown}><i className="las la-chevron-down text-dark"></i></span> : <span onClick={handleToggleDropDown}><i className="las la-chevron-up text-dark"></i></span> }
        {toggleDropDown && <ProfileDropdown />}
      </div>
    </div>
  )
}

export default Navbar;