import "./App.css";
import Amplify from "aws-amplify";
import {BrowserRouter ,Routes,
   Link, useNavigate, 
   Route} from "react-router-dom"

// import queryString from "query-string";
import SignUp from "./components/SignUp"
import SignUpV1 from "./components/SignUpV1"
import AuthenticationTokens from "./components/AuthenticationTokens";
import Login from "./components/Login";
import CvsDownloader from "./components/CvsDownloader";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App(){

  return (
    <BrowserRouter>
     <NavBar/>
    <Routes>
      <Route  path="/signup-legacy" element={<SignUpV1/>}/>
      <Route  path="/signup" element={<SignUp/>}/>
      <Route  path="/signin" element={<Login/>}/>
      <Route path="/cvsdemo" element={<CvsDownloader />}/>
      <Route path="/" element={<AuthenticationTokens />}/>       
    </Routes>
    </BrowserRouter>
  );
}

const NavBar = (props) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    navigate("/signin");
  };
  return (
    <div
      style={{
        color: "white",
        backgroundColor: "darkblue",                
        paddingLeft:"200px"
      }}
    >
      <div className="Navbar">
        <Link className="NavLink" to="/signup-legacy?email=jose.mora@toptal.com&purchaserId=123456">
          Sign up V1
        </Link>
      </div>
      <div className="Navbar">        
        <Link className="NavLink" to="/signup?email=jose.mora@openenglish.com&purchaserId=123456">
          Sign up V2
        </Link>
      </div>
      <div className="Navbar">
        <Link className="NavLink" to="/signin">
          Sign in V2
        </Link>
      </div>
      <div className="Navbar">
         <CvsDownloader className="NavLink" />
      </div>
      {/* <div style={{ display: "inline", paddingLeft: "50%" }}>
        <button onClick={handleLogout}>Log Out</button>
      </div> */}
    </div>
  );
}

export default App;
