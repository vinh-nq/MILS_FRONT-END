import React, { Suspense } from "react";
import "./App.css";
import LoadingSpinner from "./components/LoadingSpinner";
import MainLayout from "./layout/MainLayout";
import "antd/dist/antd.css";

class App extends React.Component {
  render() {
    return (
      <Suspense
        fallback={<LoadingSpinner typeSpinner="Bars" colorSpinner="#8A2BE2" />}
      >
        <MainLayout />
      </Suspense>
    );
  }
}

export default App;
