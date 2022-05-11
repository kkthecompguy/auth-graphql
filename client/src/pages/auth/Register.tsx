import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../../api/auth";
import Layout from "../../components/layout/Layout";


interface RegisterRequest {
  email: string;
  password: string;
}

function Register() {
  const [formData, setFormData] = useState<RegisterRequest>({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const [createUser, { data, loading, error }] = useMutation(REGISTER_USER);
  console.log(error)

  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setFormData(current => {
    return {...current, [e.target.name]: e.target.value}
  });

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    createUser({ variables: { ...formData } });
    if (data && data.createUser._id) {
      navigate('/');
    } else if (error) {
      window.alert(error.message)
    }
  }

  return (
    <Layout>
      <div className="auth-wrapper">
        <div className="card-wrapper">
          <div className="custom-card">
            <div>
              <span className="material-icons text-danger">code</span>
              <span>devChallenges</span>
            </div>
            <div className="join-thou">
              <p>Join thousands of learners from around the world</p>
            </div>
            <div className="master-web">
              <p>Master web development by making real-life projects. There are multiple paths for you to choose</p>
            </div>
            <div className="form-wrapper">
              <form onSubmit={e => handleSubmit(e)}>
                <div className="custom-input-group">
                  <span className="label-icon"><i className="las la-envelope la-2x"></i></span>
                  <input
                   name="email"
                   value={formData.email}
                   onChange={e => handleChange(e)}
                   className="custom-form-control" 
                   type="email" 
                   placeholder="Email" />
                </div>
                <div className="custom-input-group">
                  <span className="label-icon"><i className="las la-lock la-2x"></i></span>
                  <input
                   name="password"
                   value={formData.password}
                   onChange={e => handleChange(e)}
                   className="custom-form-control" 
                   type="password" 
                   placeholder="Password" />
                </div>
                <div>
                  <button className="custom-form-submit" type="submit">{loading ? "loading": "Start coding now"}</button>
                </div>
              </form>
              <div className="text-center continue">
                <p>or continue with these social profile</p>
                <div className="social-icon">
                  <span className="circle-border"><i className="lab la-google-plus la-2x"></i></span>
                  <span className="circle-border"><i className="lab la-facebook-square la-2x"></i></span>
                  <span className="circle-border"><i className="lab la-twitter la-2x"></i></span>
                  <span className="circle-border"><i className="lab la-github la-2x"></i></span>
                </div>
                <p className="already">Already a member? <Link to="/">Login</Link></p>
              </div>
            </div>
          </div>

          <div className="bottom-wrapper">
            <span className="bottom-labels">created by <span className="username">username</span></span>
            <span className="bottom-labels">devChallenges.io</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;