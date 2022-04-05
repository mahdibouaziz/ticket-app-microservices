import { useState } from "react";
import axios from "axios";

export default ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger mt-3">
          <h4>Oooops....</h4>
          <ul className="my-0">
            {error.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};
