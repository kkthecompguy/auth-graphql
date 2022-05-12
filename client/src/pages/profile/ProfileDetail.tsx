import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Layout from "../../components/layout/Layout";
import Navbar from '../../components/layout/Navbar';
import { GET_USER } from '../../api/profile';
import moment from 'moment';

interface UserObject {
  name?: string;
  photo?: string;
  bio?: string;
  phone?: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: Date;
}

function ProfileDetail() {
  const [user, setUser] = useState<UserObject>();
  const navigate = useNavigate();
  const navigateToEdit = () => navigate('/profile/edit');

  const userId = localStorage.getItem('userId');
  // const token = localStorage.getItem("accessToken");
  const { data } = useQuery(GET_USER, {
    variables: {userId}
  });
  
  useEffect(() => {
    if (data) {
      setUser(current => {
        return {...current, name: data.user.name, email: data.user.email, phone: data.user.phone, password: "", bio: data.user.bio, photo: data.user.photo, createdAt: data.user.createdAt, updatedAt: data.user.updatedAt, lastLogin: new Date(Number(data.user.lastLogin)) }
      });
    }
  }, [data]);

  return (
    <Layout>
      <Navbar name={user?.name} photo={user?.photo} />
      <main className="profile-container">
        <div className="personal-info">Personal info</div>
        <div className="basic-info">Basic info, like your name and photo</div>
        <div className="card card-body info-wrapper-card">
          <div className="edit-wrapper">
            <div>
              <span className="profile-head">Profile</span>
              <span className="some-info">Some info may be visible to other people</span>
            </div>
            <button onClick={navigateToEdit}>Edit</button>
          </div>
          <div className="detail-wrapper">
            <div className="detail-label">PHOTO</div>
            <div className="detail-info"><img src={ user?.photo ? user.photo: "https://res.cloudinary.com/ndutared/image/upload/v1652183676/acqi0i83hcn2ilgrj9we.jpg"} alt="photome" /></div>
          </div>
          <div className="detail-wrapper">
            <div className="detail-label">NAME</div>
            <div className="detail-info">{user?.name}</div>
          </div>
          <div className="detail-wrapper">
            <div className="detail-label">BIO</div>
            <div className="detail-info">{user?.bio}...</div>
          </div>
          <div className="detail-wrapper">
            <div className="detail-label">PHONE</div>
            <div className="detail-info">{user?.phone}</div>
          </div>
          <div className="detail-wrapper">
            <div className="detail-label">EMAIL</div>
            <div className="detail-info">{user?.email}</div>
          </div>
          <div className="detail-wrapper">
            <div className="detail-label">LAST LOGIN</div>
            <div className="detail-info">{moment(user?.lastLogin).format('LLLL')}</div>
          </div>
          <div className="detail-wrapper">
            <div className="detail-label">PASSWORD</div>
            <div className="detail-info">**********</div>
          </div>
        </div>
        <div className="bottom-info-wrapper">
          <span className="bottom-labels">created by <span className="username">username</span></span>
          <span className="bottom-labels">devChallenges.io</span>
        </div>
      </main>
    </Layout>
  );
}

export default ProfileDetail;