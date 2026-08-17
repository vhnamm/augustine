import React from "react";
import clsx from "clsx";
import styles from "./Home.module.scss";

import HomeProducts from "./components/HomeProducts/HomeProducts";

const Home = () => {
  return (
    <div className={clsx(styles.body_container)}>
      <HomeProducts />
    </div>
  );
};

export default Home;
