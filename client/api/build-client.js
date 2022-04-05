import axios from "axios";

const buildClient = ({ req }) => {
  // check if we are on the serveror on the browser
  if (typeof window === "undefined") {
    // we are on the server
    // we should name the request to the ingress controller
    // the base url must be: http://SERVICENAME.NAMESPACE.svc.cluster.local  this will allow us to reach nginx controller
    // and we must include the headers
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // we are on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
