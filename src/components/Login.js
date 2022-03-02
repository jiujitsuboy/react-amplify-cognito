import React, { useState, Component } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true,
      newPassword: false,
      cognitoUser:{}
    };
  }

  _updateVisibleComponent(value) {
    this.setState(value, () => console.log("ESTADO......",this.state));
  }

  _getState(){
    return this.state;
  }

  render() {
    if (this.state.signIn) {
      return (
        <SignIn
          updateVisibleComponent={this._updateVisibleComponent.bind(this)}
        />
      );
    } else {
      return (
        <NewPassword
          updateVisibleComponent={this._updateVisibleComponent.bind(this)} getState={this._getState.bind(this)}
        />
      );
    }
  }
}

const NewPassword = (props) => {
  const [errMsg, setErrMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonDisabled(true);

    const cognitoUser = props.getState().cognitoUser;
    const password1 = event.target.password1.value;
    const password2 = event.target.password2.value;

    console.log("cognitoUser: ",props.getState);

    try {
      if (password1 !== password2) {
        throw Error("Password and confirmation doesn't match");
      }

      const newPassResult = await Auth.completeNewPassword(cognitoUser, password1);
      console.log("newPassResult: ", newPassResult);
      props.updateVisibleComponent({
        signIn: true,
        newPassword: false,
        cognitoUser
      });

    } catch (e) {
      console.log(e);
      setErrMsg(e.message);
      setButtonDisabled(false);
    }
  };

  return (
    <div align="center">
      <h1 className="h1">Open English APP</h1>
      <h2 className="h2">New Password</h2>
      <div className="container">
        <div
          className="errormessage"
          style={{ display: errMsg ? "block" : "none" }}
        >
          {errMsg}
        </div>
        <form className="login" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password1">New Password</label>
            <input type="password" name="password1"></input>
            <label htmlFor="password2">Enter New Password Again</label>
            <input type="password" name="password2"></input>
            <button type="submit" disabled={buttonDisabled}>
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
      const cognitoUser = await Auth.signIn(username, password);

      console.log("signInResult:",cognitoUser)

      if(cognitoUser.challengeName==="NEW_PASSWORD_REQUIRED"){
        console.log("change view")
        props.updateVisibleComponent({
          signIn: false,
          newPassword: true,
          cognitoUser: cognitoUser
        });
      }
      else{
        const currentSession = await Auth.currentSession();
        console.log(cognitoUser);
        console.log(currentSession.getAccessToken());
        navigate(
          "/#username=" +
            cognitoUser.attributes.email +
            "&purchaser_id=" +
            cognitoUser.attributes["custom:purchaserId"] +
            "&id_token=" +
            currentSession.getIdToken().getJwtToken() +
            "&access_token=" +
            currentSession.getAccessToken().getJwtToken() +
            "&refresh_token=" +
            currentSession.getRefreshToken().getToken()
        );
      }
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

export default Login;
