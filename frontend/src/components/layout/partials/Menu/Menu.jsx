import React from "react";
import styles from "./Menu.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popper from "~components/common/Popper/Popper";
import { Link } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
const Menu = ({className}) => {
  return (
    <div className={clsx( className,styles.menu_wrap)}>
      <h2>Menu</h2>

      <Popper className={clsx(styles.menu_dropdown)}>
        <ul className={clsx(styles.menu_options)}>
          <li className={clsx(styles.option_nam)}>
            <Link className={clsx(styles.link)} to="/category/for-him">For him
              <FontAwesomeIcon className={styles.icon} icon={faChevronRight} />
            </Link>
            
          </li>
          <li className={clsx(styles.option_nu)}>
            <Link className={clsx(styles.link)} to="/category/for-her">For her
              <FontAwesomeIcon className={styles.icon} icon={faChevronRight} />
            </Link>
            
          </li>
        </ul>
      </Popper>
    </div>
  );
};

export default Menu;
