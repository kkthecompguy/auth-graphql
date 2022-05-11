
import { ChangeEvent, FormEvent, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import Layout from "../../components/layout/Layout";
import Navbar from "../../components/layout/Navbar";
import { GET_USER, UPDATE_PROFILE, UPLOAD_AVATAR } from "../../api/profile";

interface UserObject {
  name: string;
  base64EncodedImage?: string|ArrayBuffer|null;
  bio: string;
  phone: string;
  email: string;
  password: string;
  photo?: string;
  createdAt?: string;
  updatedAt?: string;
}

function ProfileEdit() {
  const [formData, setFormData] = useState<UserObject>({
    name: "",
    phone: "",
    bio: "",
    base64EncodedImage: "",
    email: "",
    password: ""
  });
  const [user, setUser] = useState<UserObject>();
  const filePicker = useRef<HTMLInputElement>(null);
  const userId = localStorage.getItem('userId');
  // const token = localStorage.getItem("accessToken");
  const { data } = useQuery(GET_USER, {
    variables: {userId}
  });

  useEffect(() => {
    if (data) {
      setUser(current => {
        return {...current, name: data.user.name, email: data.user.email, phone: data.user.phone, password: "", bio: data.user.bio, photo: data.user.photo, createdAt: data.user.createdAt, updatedAt: data.user.updatedAt }
      });
      setFormData(current => {
        return {...current, name: data.user.name, email: data.user.email, phone: data.user.phone, password: "", bio: data.user.bio ? data.user.bio: "", photo: data.user.photo, createdAt: data.user.createdAt, updatedAt: data.user.updatedAt}
      })
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setFormData(current => {
    return {...current, [e.target.name]: e.target.value}
  });

  const handleChooseFile = () => filePicker.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0) {
      return;
    } else {
      const reader = new FileReader();
      let file = e.target.files ? e.target.files[0] : new Blob()
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData(current => {
          return {...current, base64EncodedImage: reader.result}
        });
      }
    }
  }

  const [updateUser, updateMutationResult] = useMutation(UPDATE_PROFILE);
  const [uploadAvatar, uploadMutationResult] = useMutation(UPLOAD_AVATAR);
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    updateUser({ variables: { userId, name: formData.name, email: formData.email, phone: formData.phone, password: formData.password, bio: formData.bio } })
    if (formData.base64EncodedImage) {
      uploadAvatar({ variables: { userId, base64EncodedImage: formData.base64EncodedImage } })
    }

    if (formData.base64EncodedImage && uploadMutationResult.data) {
      window.alert("profile updated successfully")
    } else if (!formData.base64EncodedImage && updateMutationResult.data) {
      window.alert("profile updated successfully")
    }
  }
  const { name, bio, phone, password, email } = formData;

  return (
    <Layout>
      <Navbar name={user?.name} photo={user?.photo} />
      <main className="profile-container">
        <div className="back-arrow"><i className="las la-chevron-left "></i><Link to="/profile/me" className="back-link">Back</Link></div>
        <div className="card card-body edit-wrapper-card">
          <div className="change-info-wrapper">
            <span className="change-info">Change Info</span>
            <span className="changes">Changes will be reflected to every services</span>
          </div>
          <div className="edit-info-wrapper">
            <div className="change-pic-wrapper">
              <div className="profile-photo">
                <img src={ user?.photo} alt="me" />
                <span onClick={handleChooseFile} className="changer"><i className="las la-camera la-2x"></i></span>
                <input ref={filePicker} type="file" onChange={e => handleFileChange(e)} name="photo" id="file" style={{display: "none"}} />
              </div>
              <span className="change-pic">CHANGE PIC</span>
            </div>
            <div className="form-edit-wrapper">
              <form onSubmit={e => handleSubmit(e)}>
                <div className="input-edit-wrapper">
                  <label htmlFor="name">Name</label>
                  <input
                   className="edit-control" 
                   type="text" 
                   name="name"
                   value={name}
                   onChange={e => handleChange(e)}
                   placeholder="Enter your name..." />
                </div>
                <div className="input-edit-wrapper mt-24">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                   name="bio"
                   value={bio}
                   onChange={e => handleChange(e)}
                   className="edit-control txt" 
                   placeholder="Enter your bio..."></textarea>
                </div>
                <div className="input-edit-wrapper mt-24">
                  <label htmlFor="phone">Phone</label>
                  <input
                   name="phone"
                   value={phone}
                   onChange={e => handleChange(e)}
                   className="edit-control" 
                   type="text" 
                   placeholder="Enter your phone..." />
                </div>
                <div className="input-edit-wrapper mt-24">
                  <label htmlFor="email">Email</label>
                  <input
                   name="email"
                   value={email}
                   onChange={e => handleChange(e)}
                   className="edit-control" 
                   type="email" 
                   placeholder="Enter your email..." />
                </div>
                <div className="input-edit-wrapper mt-24">
                  <label htmlFor="password">Password</label>
                  <input
                   name="password"
                   value={password}
                   onChange={e => handleChange(e)}
                   className="edit-control" 
                   type="password" 
                   placeholder="Enter your new password..." />
                </div>
                <div className="btn-submit-wrapper mt-24">
                  <button type="submit">{ uploadMutationResult.loading ? "saving...": "Save"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bottom-quotes">
          <span className="bottom-labels">created by <span className="username">username</span></span>
          <span className="bottom-labels">devChallenges.io</span>
        </div>
      </main>
    </Layout>
  )
}

export default ProfileEdit;