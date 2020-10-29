import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
// import { useTranslation } from "react-i18next";
import MainLayout from "../MainLayout";
import { PATH } from "../../routers/Path";

const MainRouteWrapper = ({ component: ComponentData, ...rest }) => {
  // const [check, setCheck] = useState(true);
  // const { t } = useTranslation();
  let cookies = new Cookies();
  cookies = cookies.get("user");

  return (
    <Route
      {...rest}
      render={(props) =>
        cookies && cookies.token && cookies.userId ? (
          true ? (
            true ? (
              <MainLayout>
                <ComponentData {...props} />
              </MainLayout>
            ) : (
              <Redirect to={{ pathname: PATH.PAGE_403 }} />
            )
          ) : null
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default MainRouteWrapper;
