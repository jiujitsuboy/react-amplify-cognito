import "./App.css";
import Amplify from "aws-amplify";
import {BrowserRouter ,Routes,
  //  Link, useNavigate, 
   Route} from "react-router-dom"

// import queryString from "query-string";
import SignUp from "./components/SignUp"
import AuthenticationTokens from "./components/AuthenticationTokens";
import SignIn from "./components/SignIn";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App(){

  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/signup" element={<SignUp/>}/>
      <Route  path="/signin" element={<SignIn/>}/>
      <Route path="/" element={<AuthenticationTokens />}/>
    </Routes>
    </BrowserRouter>
  );
}



export default App;
