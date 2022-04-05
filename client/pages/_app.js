import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
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
