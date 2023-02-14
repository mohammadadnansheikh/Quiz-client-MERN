import {Route, Routes} from 'react-router-dom'
import Register from './componenents/register/Register'
import Navigation from './componenents/navbar/Navigation'
import PlayQuiz from './componenents/PlayQuiz/PlayQuiz';
import CreateQuiz from './componenents/Admin/CreateQuiz';
import Homepage from './componenents/homepage/Homepage';
import Login from './componenents/login/Login';
import AboutUs from './componenents/about/AboutUs';
import ContactUs from './componenents/contact/ContactUs';
import UserLoginDashboard from './componenents/userLoginDashboard/UserLoginDashboard';
import { useSelector } from 'react-redux';


function App() {
  const isLoggedIn = useSelector(state=>state.isLoggedIn);
  console.log(isLoggedIn)
  return( 
  <> 
  <Navigation/>  
  <Routes>
  <Route path="/" element={<Homepage/>}/> 
  <Route path="/login" element={<Login/>} />
  <Route path="/register" element={<Register />} />
  <Route path="/playquiz" element={<PlayQuiz />} />
  <Route path="/createquiz" element={<CreateQuiz />} />
  <Route path="/aboutus" element={<AboutUs/>} />
  <Route path="/contactus" element={<ContactUs/>} />
  {/* Protected routes */}
  {isLoggedIn && <Route path="/user" element={<UserLoginDashboard/>} />}
 
</Routes>
    </>
  );
 
}

export default App;
