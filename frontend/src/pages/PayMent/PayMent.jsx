import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faBuildingColumns,
  faCheck,
  faQrcode,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Payment.module.scss";

const Payment = () => {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState(null);

  const bankList = [
    { id: "vcb", name: "Vietcombank", sub: "Ngân hàng Ngoại Thương" },
    { id: "tcb", name: "Techcombank", sub: "Ngân hàng Kỹ Thương" },
    { id: "mb", name: "MB Bank", sub: "Ngân hàng Quân Đội" },
    { id: "acb", name: "ACB", sub: "Ngân hàng Á Châu" },
    { id: "momo", name: "MoMo QR", sub: "Ví điện tử MoMo" },
    { id: "vnpay", name: "VNPay", sub: "Cổng thanh toán VNPay" },
  ];

  const bankIconMap = {
    vcb: "/assets/Icon-Vietcombank.webp",
    tcb: "/assets/logotech.jpg",
    mb: "/assets/mb-bank-ngan-hang-dien-tu-trong-tay-ban-logo-26-12-2023.png",
    acb: "/assets/logo-acb.png",
    momo: "/assets/logo.webp",
    vnpay: "/assets/Icon-VNPAY-QR.webp",
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backButton}>
        <Link to="/checkout" className={styles.backLink}>
          <span className={styles.backArrow}>&lt;</span>
          Back
        </Link>
      </div>
      <div className={styles.mainContent}>
        <header className={styles.paymentHeader}>
          <div className={styles.orderIdentity}>
            <span className={styles.label}>ĐANG THANH TOÁN ĐƠN HÀNG</span>
            <h1 className={styles.orderNumber}>#0126749</h1>
          </div>
        </header>

        <div className={styles.paymentLayoutGrid}>
          <div className={styles.leftColumn}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>
                  Chọn ngân hàng thanh toán
                </span>
              </div>
              <p className={styles.helperText}>
                Vui lòng chọn ngân hàng của bạn.
              </p>

              <div className={styles.bankGrid}>
                {bankList.map((bank) => (
                  <div
                    key={bank.id}
                    className={`${styles.bankCard} ${
                      selectedBank === bank.id ? styles.bankCardSelected : ""
                    }`}
                    onClick={() => setSelectedBank(bank.id)}
                  >
                    <div className={styles.bankIconBox}>
                      <img
                        src={bankIconMap[bank.id]}
                        alt=""
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className={styles.bankInfo}>
                      <div className={styles.bankName}>{bank.name}</div>
                      <div className={styles.bankSub}>{bank.sub}</div>
                    </div>
                    {selectedBank === bank.id && (
                      <div className={styles.checkMarker}>
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.paymentSidebar}>
              <div className={styles.sidebarLabel}>TỔNG CẦN THANH TOÁN</div>
              <div className={styles.finalPrice}>2.727.000 đ</div>

              <div className={styles.orderBriefBox}>
                <div className={styles.briefRow}>
                  <span>Số lượng:</span>
                  <span>01 Sản phẩm</span>
                </div>
                <div className={styles.briefRow}>
                  <span>Vận chuyển:</span>
                  <span className={styles.freeText}>1 tỷ đ</span>
                </div>
              </div>

              <button
                className={styles.generateQrBtn}
                disabled={!selectedBank}
                onClick={() => navigate("/qr-payment")}
              >
                <FontAwesomeIcon icon={faQrcode} /> TẠO MÃ QR THANH TOÁN
              </button>

              <div className={styles.securityBadge}>
                <FontAwesomeIcon icon={faShieldHalved} />
                <span>Giao dịch được bảo mật bởi Mạnh deptry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
