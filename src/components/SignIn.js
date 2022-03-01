import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";


const SignIn = (props) => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonDisabled(true);

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const signInResult = await Auth.signIn(username, password);
      console.log("Challenge: ",signInResult.challengeName)
      const currentSession = await Auth.currentSession();
      console.log(signInResult);
      console.log(currentSession.getAccessToken());
      navigate("/#username="+signInResult.attributes.email+"&purchaser_id="+signInResult.attributes['custom:purchaserId']+"&id_token=" + currentSession.getIdToken().getJwtToken()+"&access_token="+currentSession.getAccessToken().getJwtToken()+"&refresh_token="+currentSession.getRefreshToken().getToken());
    } catch (e) {
      setErrMsg(e.message);
      setButtonDisabled(false);
    }
  };

  return (
    <div align="center">
      <h1 className="h1">Open English APP</h1>
      <h2 className="h2">User Sign In</h2>
      <div className="container">
        <div
          className="errormessage"
          style={{ display: errMsg ? "block" : "none" }}
        >
          {errMsg}
        </div>
        <form className="login" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username"></input>
            <label htmlFor="password">Password</label>
            <input type="password" name="password"></input>
            <button type="submit" disabled={buttonDisabled}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
