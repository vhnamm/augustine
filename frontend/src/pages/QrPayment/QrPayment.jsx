import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faCopy,
  faCheckCircle,
  faArrowRight,
  faBuildingColumns,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./QrPayment.module.scss";

const QrPayment = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(null);

  const paymentInfo = {
    orderId: "#0126749",
    totalAmount: "2,727,270",
    bankName: "MB BANK",
    accountNumber: "0333 666 999",
    accountName: "AUGUSTINE STORE",
    transferContent: "Ô Mài Gót",
  };



  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <button onClick={() => navigate(-1)} className={styles.backBtn}>
            <FontAwesomeIcon icon={faChevronLeft} /> Chọn ngân hàng khác
          </button>
          <div className={styles.titleWrapper}>
            <span className={styles.subTitle}>THANH TOÁN ĐƠN HÀNG</span>
            <h1 className={styles.orderId}>{paymentInfo.orderId}</h1>
          </div>
          <div className={styles.placeholder}></div>
        </header>

        <div className={styles.gridContainer}>
          <div className={styles.qrColumn}>
            <div className={styles.qrCard}>
              <div className={styles.qrHeader}>
                <FontAwesomeIcon icon={faBuildingColumns} />
                <span>Cổng thanh toán tự động</span>
              </div>

              <div className={styles.qrImageFrame}>
                <img
                  src="/assets/z7337644771452_a245a8192d1fdda9479d4e7f10a1c782.jpg"
                  alt="QR Code Payment"
                  className={styles.qrImage}
                  onError={(e) => {
                    e.target.src =
                      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DemoPayment";
                  }}
                />
              </div>

              <p className={styles.scanInstruction}>
                Mở App Ngân hàng để quét mã
              </p>
            </div>
          </div>

          <div className={styles.infoColumn}>
            <div className={styles.infoBox}>
              <div className={styles.amountGroup}>
                <label>TỔNG THANH TOÁN</label>
                <div className={styles.bigAmount}>
                  {paymentInfo.totalAmount} đ
                </div>
              </div>

              <div className={styles.detailsList}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Ngân hàng</span>
                  <span className={styles.value}>{paymentInfo.bankName}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.label}>Chủ tài khoản</span>
                  <span className={styles.value}>
                    {paymentInfo.accountName}
                  </span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.label}>Số tài khoản</span>
                  <div className={styles.copyWrapper}>
                    <span className={styles.highlightValue}>
                      {paymentInfo.accountNumber}
                    </span>
                    <button
                      className={styles.copyBtn}
                      
                      title="Sao chép"
                    >
                      {copied === "acc" ? (
                        <FontAwesomeIcon icon={faCheckCircle} />
                      ) : (
                        <FontAwesomeIcon icon={faCopy} />
                      )}
                    </button>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.label}>Nội dung CK</span>
                  <div className={styles.copyWrapper}>
                    <span className={styles.highlightValue}>
                      {paymentInfo.transferContent}
                    </span>
                    <button
                      className={styles.copyBtn}
                      onClick={() =>
                        handleCopy(paymentInfo.transferContent, "content")
                      }
                      title="Sao chép"
                    >
                      {copied === "content" ? (
                        <FontAwesomeIcon icon={faCheckCircle} />
                      ) : (
                        <FontAwesomeIcon icon={faCopy} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                className={styles.confirmBtn}
                onClick={() => navigate("/order-placed")}
              >
                XÁC NHẬN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrPayment;
