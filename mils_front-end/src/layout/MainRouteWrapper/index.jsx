import React from "react";
import { Route } from "react-router-dom";
// import Cookies from "universal-cookie";
// import { useTranslation } from "react-i18next";
import MainLayout from "../MainLayout";

const MainRouteWrapper = ({ component: ComponentData, ...rest }) => {
  // const [check, setCheck] = useState(false);
  // const { t } = useTranslation();
  // let cookies = new Cookies();
  // cookies = cookies.get("user");

  return (
    <Route
      {...rest}
      render={
        (props) => (
          <MainLayout>
            <ComponentData {...props} />
          </MainLayout>
        )
        // cookies && cookies.token && cookies.userId ? (
        //   check ? (
        //     1 == 1 ? (
        //       <Layout>
        //         <Component {...props} />
        //       </Layout>
        //     ) : (
        //       <Redirect to={{ pathname: "/error-authentication" }} />
        //     )
        //   ) : null
        // ) : (
        //   <Redirect
        //     to={{
        //       pathname: "/login",
        //       state: { from: props.location },
        //     }}
        //   />
        // )
      }
    />
  );
};

export default MainRouteWrapper;
