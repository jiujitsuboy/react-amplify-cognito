import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import awsExports from "../aws-exports";
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { useEffect } from "react";


const SignUp = (props) => {
  console.log(process.env.REACT_APP_ACCESS_KEY_ID)
  const navigate = useNavigate();
  const CognitoClient = new CognitoIdentityProviderClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    },
  });

  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");
  const purchaserId = query.get("purchaserId");

  useEffect(()=>{
    handleSubmit(email, purchaserId);
  }, []);

  const handleSubmit = async (email, purchaserId) => {
    const cognitoParams = {
      UserPoolId: awsExports.aws_user_pools_id,
      Username: email,
      DesiredDeliveryMediums: ["EMAIL"],
      // ForceAliasCreation: true,
      MessageAction: "SUPPRESS",
      TemporaryPassword: "!QAZzaq1",
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "email_verified",
          Value: "true",
        },
        {
          Name: "custom:purchaser_id",
          Value: purchaserId,
        },
      ],
    };

    try {
      console.log("Create user:",{cognitoParams});
      const command = new AdminCreateUserCommand(cognitoParams);
      const cognitoResponse = await CognitoClient.send(command);

      // const cognitoResponse = await Cognito.adminCreateUser(
      //   cognitoParams
      // ).promise();
      // const signUpResult = await Auth.signUp({
      //   username: email,
      //   // password,
      //   temporaryPassword: password,
      //   attributes: {
      //     email,
      //     "custom:purchaserId": purchaserId,
      //   },
      // });

      console.log("cognitoResponse: ", cognitoResponse);
    } catch (e) {      
      console.log("error", e);
      Swal.fire({ title: e.message, icon: "error" });
    }
    finally{
      navigate("/signin");
    }

  };

  return null;
};

export default SignUp;
