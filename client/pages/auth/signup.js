import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, errors } = useRequest({
    body: {
      email,
      password,
    },
    method: "post",
    url: "/api/users/signup",
    onSuccess: () => Router.push("/"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group mt-3">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary mt-3">Sign Up</button>
    </form>
  );
};

export default signup;
