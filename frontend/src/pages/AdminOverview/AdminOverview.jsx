import React from "react";
import styles from "./AdminOverview.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import {
  faBox,
  faDollarSign,
  faFaceSmile,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const AdminOverview = () => {
  return (
    <div>
      <h2 style={{ color: "#fff" }}>Overview</h2>

      <div className={clsx("grid", styles.content)}>
        <ul className={clsx("row")}>
          <li className={clsx("col lg-3", styles.summary_item)}>
            <div className={clsx(styles.item_wrap, styles.cashPerOrder_block)}>
              <div className={styles.info_wrap}>
                <span className={styles.summary_icon}>
                  <FontAwesomeIcon className={styles.icon} icon={faMoneyBill} />
                </span>

                <h5>125.000đ</h5>
                <p>Cash Per Order</p>
              </div>

              <svg viewBox="0 0 100 40" className={styles.line}>
                <path
                  d="M0 30 C 20 10, 40 35, 60 15 S 80 5, 100 20"
                  fill="none"
                  stroke="#3e7cef"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </li>
          <li className={clsx("col lg-3", styles.summary_item)}>
            <div className={clsx(styles.item_wrap, styles.income_block)}>
              <div className={styles.info_wrap}>
                <span className={styles.summary_icon}>
                  <FontAwesomeIcon
                    className={styles.icon}
                    icon={faDollarSign}
                  />
                </span>
                <h5>76.500.000đ</h5>
                <p>Revenue</p>
              </div>

              <svg viewBox="0 0 100 40" className={styles.line}>
                <path
                  d="M0 30 C 20 10, 40 35, 60 15 S 80 5, 100 20"
                  fill="none"
                  stroke="#4caf50"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </li>

          <li className={clsx("col lg-3", styles.summary_item)}>
            <div className={clsx(styles.item_wrap, styles.totalOrder_block)}>
              <div className={styles.info_wrap}>
                <span className={styles.summary_icon}>
                  <FontAwesomeIcon className={styles.icon} icon={faBox} />
                </span>
                <h5>1.234</h5>
                <p>Orders</p>
              </div>

              <svg viewBox="0 0 100 40" className={styles.line}>
                <path
                  d="M0 20 C 20 10, 40 35, 60 15 S 80 5, 100 10"
                  fill="none"
                  stroke="#fe9865"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </li>

          <li className={clsx("col lg-3", styles.summary_item)}>
            <div className={styles.item_wrap}>
              <div className={styles.info_wrap}>
                <span className={styles.summary_icon}>
                  <FontAwesomeIcon className={styles.icon} icon={faFaceSmile} />
                </span>

                <h5>4.78 / 5</h5>
                <p>Satisfaction Rate</p>
              </div>

              <svg viewBox="0 0 100 40" className={styles.line}>
                <path
                  d="M0 30 C 20 10, 40 35, 60 15 S 80 5, 100 0"
                  fill="none"
                  stroke="#373737"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </li>
        </ul>

        <div className={clsx("row")}>
          <div className={clsx("col lg-7")}>
            <h4
              style={{
                color: "#fff",
                margin: "20px 0 12px 0",
                fontSize: "14px",
              }}
            >
              Sale Statistic
            </h4>
            <div className={styles.chart_wrap}>
              <div className={styles.chart}>
                <div className={styles.bar}>
                  <div className={styles.barGray} style={{ height: "30%" }} />
                  <div className={styles.barBlack} style={{ height: "10%" }} />
                  <span>Apr</span>
                </div>

                <div className={styles.bar}>
                  <div className={styles.barGray} style={{ height: "40%" }} />
                  <div className={styles.barBlack} style={{ height: "25%" }} />
                  <span>May</span>
                </div>

                <div className={styles.bar}>
                  <div className={styles.barGray} style={{ height: "30%" }} />
                  <div className={styles.barBlack} style={{ height: "28%" }} />
                  <span>Jun</span>
                </div>

                <div className={styles.bar}>
                  <div className={styles.barGray} style={{ height: "20%" }} />
                  <div className={styles.barBlack} style={{ height: "40%" }} />
                  <span>Jul</span>
                </div>

                <div className={styles.bar}>
                  <div className={styles.barGray} style={{ height: "45%" }} />
                  <div className={styles.barBlack} style={{ height: "45%" }} />
                  <span>Aug</span>
                </div>

                <div className={styles.bar}>
                  <div className={styles.barGray} style={{ height: "25%" }} />
                  <div className={styles.barBlack} style={{ height: "40%" }} />
                  <span>Sep</span>
                </div>

                <div className={styles.bar}>
                  <div className={styles.barGray} style={{ height: "30%" }} />
                  <div className={styles.barBlack} style={{ height: "55%" }} />
                  <span>Oct</span>
                </div>

                <div className={styles.bar}>
                  <div className={styles.barGray} style={{ height: "25%" }} />
                  <div className={styles.barBlack} style={{ height: "65%" }} />
                  <span>Nov</span>
                </div>

                <div className={styles.bar}>
                  <div className={styles.barGray} style={{ height: "30%" }} />
                  <div className={styles.barBlack} style={{ height: "75%" }} />
                  <span>Dec</span>
                </div>
              </div>
            </div>
          </div>

          <div className={clsx("col lg-5")}>
            <div className={styles.top_prod_wrap}>
              <p>Best Sellers</p>
              <ul className={styles.product_list}>
                <li className={styles.product_item}>
                  <div className={styles.prod_info_wrap}>
                    <div className={styles.prod_img}></div>
                    <span className={styles.prod_name}>
                      Áo thun nam cotton premium
                    </span>
                  </div>

                  <span>567 orrders</span>
                </li>

                <li className={styles.product_item}>
                  <div className={styles.prod_info_wrap}>
                    <div className={styles.prod_img}></div>
                    <span className={styles.prod_name}>
                      Ao thun in Augustine{" "}
                    </span>
                  </div>
                  <span>567 orders</span>
                </li>
                <li className={styles.product_item}>
                  <div className={styles.prod_info_wrap}>
                    <div className={styles.prod_img}></div>
                    <span className={styles.prod_name}>
                      Ao thun form slim fit
                    </span>
                  </div>
                  <span>567 orders</span>
                </li>
                <li className={styles.product_item}>
                  <div className={styles.prod_info_wrap}>
                    <div className={styles.prod_img}></div>
                    <span className={styles.prod_name}>
                      Áo thun in hình .Boxy
                    </span>
                  </div>
                  <span>567 orders</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.newOrder_wrap}>
        <h4 style={{ color: "#fff", fontSize: "13px", marginBottom: "13px" }}>
          Latest Orders
        </h4>

        <div className={styles.table_header}>
          <p>Order ID</p>
          <p>Date</p>
          <p>Customer Tel</p>
          <p>Amount</p>
          <p>Status</p>
        </div>

        <ul className={styles.order_list}>
          <li className={styles.order}>
            <p>#123585</p>
            <p>18/12/2025 12:03</p>
            <p>0123456789</p>
            <p>352.000đ</p>
            <p style={{ color: "#22C55E" }}>Deliveried</p>
          </li>
          <li className={styles.order}>
            <p>#123585</p>
            <p>18/12/2025 12:03</p>
            <p>0123456789</p>
            <p>352.000đ</p>
            <p style={{ color: "#FFC107" }}>Pending</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminOverview;
