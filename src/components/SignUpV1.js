import React, { Component, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { Auth } from "aws-amplify";


// Auth.configure({
//   authenticationFlowTypes: 'USER_PASSWORD_AUTH'
// });

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: true,
      verifySignUp: false,
    };
  }

  _updateVisibleComponent(value) {
    this.setState(value, () => console.log(this.state));
  }

  render() {
    if (this.state.signUp) {
      return (
        <SignUp
          updateVisibleComponent={this._updateVisibleComponent.bind(this)}
        />
      );
    } else {
      return (
        <VerifyAccount
          updateVisibleComponent={this._updateVisibleComponent.bind(this)}
        />
      );
    }
  }
}

const VerifyAccount = (props) => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");

  const [errMsg, setErrMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonDisabled(true);

    const email = event.target.email.value;
    const confirmCode = event.target.confirmCode.value;

    try {
      const signUpResult = await Auth.confirmSignUp(email,confirmCode);

      Swal.fire({title:'User Email verified Successfully', icon:'success'});

      props.updateVisibleComponent({
        signUp: true,
        verifySignUp: false,
      });
      console.log(signUpResult);
      navigate("/signin");
    } catch (e) {
      setErrMsg(e.message);
      setButtonDisabled(false);
    }
  };

  return (
    <div align="center">
      <h1 className="h1">Open English APP</h1>
      <h2 className="h2">User Confirm Sign Up</h2>
      <div className="container">
        <div
          className="errormessage"
          style={{ display: errMsg ? "block" : "none" }}
        >
          {errMsg}
        </div>
        <form className="login" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={email}></input>
            <label htmlFor="confirmCode">Confirmation Code</label>
            <input type="number" name="confirmCode"></input>
            <button type="submit" disabled={buttonDisabled}>
              Verify
            </button>
            <button
              className="cancelbtn"
              onClick={() =>
                props.updateVisibleComponent({
                  signUp: true,
                  verifySignUp: false,
                })
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SignUp = (props) => {
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");
  const purchaserId = query.get("purchaserId");

  const [errMsg, setErrMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonDisabled(true);

    const email = event.target.email.value;
    const password = event.target.password.value;
    const purchaserId = event.target.purchaserId.value;

    try {
      const signUpResult = await Auth.signUp({
        username: email,
        password,        
        attributes: {
          email,
          "custom:purchaserId": purchaserId,
        },
      });

      Swal.fire({title:'User SignUp Successfully', icon:'success'});

      console.log("signUpResult: ", signUpResult);
      props.updateVisibleComponent({
        signUp: false,
        verifySignUp: true,
      });
    } catch (e) {
      setErrMsg(e.message);
      setButtonDisabled(false);
    }
  };

  return (
    <div align="center">
      <h1 className="h1">Open English APP</h1>
      <h2 className="h2">User Sign Up</h2>
      <div className="container">
        <div
          className="errormessage"
          style={{ display: errMsg ? "block" : "none" }}
        >
          {errMsg}
        </div>
        <form className="login" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={email} readOnly></input>
            <label htmlFor="password">Password</label>
            <input type="password" name="password"></input>
            <label htmlFor="purchaserId">Purchaser Id</label>
            <input type="text" name="purchaserId" value={purchaserId} readOnly></input>
            <button type="submit" disabled={buttonDisabled}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authentication;