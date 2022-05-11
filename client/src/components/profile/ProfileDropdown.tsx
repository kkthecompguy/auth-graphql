import { useNavigate } from "react-router-dom";


function ProfileDropdown() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <div className="profile-card">
      <div className="item-holder">
        <span className="item-icon-dark"><i className="las la-user-circle"></i></span><span className="my-profile">My Profile</span>
      </div>
      <div className="item-holder">
        <span className="item-icon-dark"><i className="las la-user-friends"></i></span><span className="group-chat">Group Chat</span>
      </div>
      <div onClick={logout} className="item-holder">
        <span className="item-icon-red"><i className="las la-sign-out-alt"></i></span><span className="item-icon-red">Logout</span>
      </div>
    </div>
  )
}

export default ProfileDropdown;