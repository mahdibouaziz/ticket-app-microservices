import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <h1>Header {currentUser.email}</h1>
      <Component {...pageProps} />
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  console.log("APP COMPONENT");

  const response = await buildClient(appContext.ctx).get(
    "/api/users/currentuser"
  );

  // to run the getInitial props of sub pages
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return { currentUser: response.data.currentUser, pageProps };
};

export default AppComponent;
