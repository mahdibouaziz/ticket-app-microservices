import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <div>Landing page</div>;
};

LandingPage.getInitialProps = async ({ req }) => {
  // check if we are on the serveror on the browser
  if (typeof window === "undefined") {
    // we are on the server
    // we should name the request to the ingress controller
    // the base url must be: http://SERVICENAME.NAMESPACE.svc.cluster.local  this will allow us to reach nginx controller
    const response = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    return response.data;
  } else {
    // we are on the browser
    const response = await axios.get("/api/users/currentuser");
    return response.data;
  }
};

export default LandingPage;
