import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import Layout from "../../components/layout/Layout";
import { LOGIN_USER } from "../../api/auth";


interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  tokenType: string;
  userId: string;
}


const persistUserToken = (data: LoginResponse) => {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("tokenType", data.tokenType);
  localStorage.setItem("userId", data.userId);
}


function Login() {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setFormData(current => {
    return {...current, [e.target.name]: e.target.value}
  });

  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    console.log(formData);
    loginUser({ variables: { ...formData } });
    if (data && data.login && data.login.success === true) {
      persistUserToken({accessToken: data.login.accessToken, tokenType: data.login.tokenType, userId: data.login.user._id});
      navigate('/profile/me');
    } else if (error) {
      window.alert(error.message)
    } else if (data && data.login && !data.login.success) {
      window.alert(data.login.message)
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
            <div className="login-text">
              <p>Login</p>
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
                   required
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
                   required
                   placeholder="Password" />
                </div>
                <div>
                  <button className="custom-form-submit" type="submit">{loading ? "loading...": "Login"}</button>
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
                <p className="already">Don’t have an account yet? <Link to="/register">Register</Link></p>
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
  )
}

export default Login;