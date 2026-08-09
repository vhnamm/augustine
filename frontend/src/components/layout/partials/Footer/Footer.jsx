import React from "react";
import clsx from "clsx";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.footer, "grid", "wide")}>
        <div className={clsx(styles.update_wrap)}>
          <h3>SIGN UP FOR UPDATES FROM AUGUSTINE</h3>
          <h4>
            Get exclusive updates on the collection's launch, personalised
            communication and our latest news.
          </h4>
          <input type="text" placeholder="Your Email" className={clsx(styles.email_frm)}/>
        </div>

        <div className={clsx(styles.about_wrap, "row")}>
          <div className={clsx("col", "lg-3 md-6 sm-12")}>
            <div className={clsx(styles.item_wrap)}>
              <h3>The company</h3>
              <ul>
                <li>About us</li>
                <li>Privacy & Policy</li>
                <li>FAQs</li>
                <li>augustine equilibrium</li>
                <li>placeholder</li>
                <li>placeholder</li>
              </ul>
            </div>
          </div>

          <div className={clsx("col", "lg-3 md-6 sm-12")}>
            <div className={clsx(styles.item_wrap)}>
              <h3>Our services</h3>
              <ul>
                <li>About us</li>
                <li>Privacy & Policy</li>
                <li>FAQs</li>
                <li>augustine equilibrium</li>
                <li>placeholder</li>
                <li>placeholder</li>
              </ul>
            </div>
          </div>

          <div className={clsx("col", "lg-3 md-6 sm-12")}>
            <div className={clsx(styles.item_wrap)}>
              <h3>Need help?</h3>
              <ul>
                <li>About us</li>
                <li>Privacy & Policy</li>
                <li>FAQs</li>
                <li>augustine equilibrium</li>
                <li>placeholder</li>
                <li>placeholder</li>
              </ul>
            </div>
          </div>

          <div className={clsx("col", "lg-3 md-6 sm-12")}>
            <div className={clsx(styles.item_wrap)}>
              <h3>Contact us</h3>
              <ul>
                <li>About us</li>
                <li>Privacy & Policy</li>
                <li>FAQs</li>
                <li>augustine equilibrium</li>
                <li>placeholder</li>
                <li>placeholder</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={clsx(styles.social_wrap)}>
          <FontAwesomeIcon className={clsx(styles.icon)} icon={faFacebook} />
          <FontAwesomeIcon className={clsx(styles.icon)} icon={faXTwitter} />
          <FontAwesomeIcon className={clsx(styles.icon)} icon={faInstagram} />

          <h4>
            © 2016 - 2025 augustine - All rights reserved. SIAE LICENCE #
            1234/I/5678 and 9876/I/1423
          </h4>
        </div>
        <h2>augustine</h2>
      </div>
    </div>
  );
};

export default Footer;
