import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/404/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProfileDetail from './pages/profile/ProfileDetail';
import ProfileEdit from './pages/profile/ProfileEdit';


function RoutePages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/me' element={<ProfileDetail />} />
        <Route path='/profile/edit' element={<ProfileEdit />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutePages;