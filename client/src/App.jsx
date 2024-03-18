import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register2";
import Login from "./pages/Login2";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import NewNavbar from "./components/NewNavbar";
import Footer from "./components/Footer";
import { Outlet } from 'react-router-dom';
import Diet from "./pages/Diet";
import "./style.scss";
import "./styles/Footer.scss";
import "./styles/Home.scss";
import "./styles/LoginRegister2.scss";
import "./styles/Navbar.scss";
import "./styles/Single.scss";
import "./styles/Write.scss";
import "./styles/Menu.scss";
import "./styles/Calory.scss";
import "./styles/Diet.scss";
import "./styles/AboutUs.scss";
import "./styles/Profile.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Calory from "./pages/Calory";
import AboutUs from "./pages/AboutUs";
import OriHome from "./pages/OriHome";
import Profile from "./pages/Profile";

const Layout =() => {
  return (
    <>
    <NewNavbar />
    <Outlet />
    <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <OriHome/>
      },
      {
        path: "/PostHome",
        element: <Home/>
      },
      {
        path: "/post/:id",
        element: <Single/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/diet",
        element: <Diet/>,
      },
      {
        path: "/calculate",
        element: <Calory/>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
      }

    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  
]);

function App() {
  return <div className="app">

    <div className="container">
    <RouterProvider router={router}/>
    </div>
    
   
  </div>;
}




export default App;
