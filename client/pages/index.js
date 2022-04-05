import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <div>Landing page</div>;
};

LandingPage.getInitialProps = async (context) => {
  const response = await buildClient(context).get("/api/users/currentuser");
  return response.data;
};

export default LandingPage;
