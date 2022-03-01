import "./styles/AuthenticationTokens.css";
import { Component } from "react";
import queryString from "query-string";

class AuthenticationTokens extends Component {
    render() {
      const parsed = queryString.parse(window.location.hash);
  
      console.log(Object.keys(parsed));
  
      Object.keys(parsed).forEach((key) =>
        console.log({ key, value: parsed[key] })
      );
  
      return (
        <div align="center">
          <h1 className="h1">Open English APP</h1>
          <h2 className="h2">Token info</h2>
          <table
            align="center"
            className="GamesList"
            cellPadding="10"
            cellSpacing="0"
            width="90%"
          >
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(parsed).map((key, index) => {
                return (
                  <tr key={index} className="row">
                    <td align="center">{key}</td>
                    <td>{parsed[key]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
  
  export default AuthenticationTokens;
  