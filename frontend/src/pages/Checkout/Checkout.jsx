import React, { useState } from "react";
import styles from "./Checkout.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const formatPrice = (num) =>
  num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " đ";

const ChevronRightIcon = () => <span>›</span>;

const DollarSignIcon = () => (
  <span style={{ fontSize: "24px", margin: "0 10px" }}>$</span>
);

const CreditCardIcon = () => <span style={{ fontSize: "24px" }}>💳</span>;

const BankIcon = () => <span style={{ fontSize: "24px" }}>🏦</span>;

const SHIPPING_OPTIONS = [
  { id: "pick-up", icon: faBagShopping, label: "Pick up in Store" },
  { id: "door-to-door", icon: faTruck, label: "Door to Door Delivery" },
];

const PAYMENT_OPTIONS = [
  { id: "cod", icon: DollarSignIcon, label: "Cash on Delivery" },
  { id: "credit-card", icon: CreditCardIcon, label: "Credit/Debit Card" },
  { id: "bank-transfer", icon: BankIcon, label: "Bank Transfer" },
];

const PACKAGING_OPTIONS = [
  {
    id: "standard",
    label: "Standard Packaging",
    image: "/assets/pack2.png",
  },
  {
    id: "gift",
    label: "Gift Packaging",
    image: "/assets/id-11134207-7r98s-lrwr71lvzgp28f.jpg",
  },
];

const OptionCard = ({ selected, onClick, icon: Icon, label, isFA }) => (
  <div
    className={selected ? styles.optionCardSelected : styles.optionCard}
    onClick={onClick}
  >
    <div className={styles.optionDetails}>
      <span className={styles.optionIcon}>
        {isFA ? <FontAwesomeIcon icon={Icon} /> : <Icon />}
      </span>
      <span className={styles.optionName}>{label}</span>
    </div>
    <input type="checkbox" checked={selected} readOnly />
  </div>
);

const Checkout = () => {
  const [selectedShipping, setSelectedShipping] = useState("door-to-door");
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [selectedPackaging, setSelectedPackaging] = useState("standard");
  const [showPackagingDropdown, setShowPackagingDropdown] = useState(false);

  const subtotal = 2500.0;
  const taxes = 227.27;
  const total = subtotal + taxes;

  const selectedPackagingData = PACKAGING_OPTIONS.find(
    (p) => p.id === selectedPackaging
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backButton}>
        <Link to="/cart" className={styles.backLink}>
          <span className={styles.backArrow}>&lt;</span>
          Back
        </Link>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.checkoutLayoutGrid}>
          <div className={styles.leftColumn}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>Shipping Method</span>
              </div>
              <div className={styles.optionsList}>
                {SHIPPING_OPTIONS.map((option) => (
                  <OptionCard
                    key={option.id}
                    selected={selectedShipping === option.id}
                    onClick={() => setSelectedShipping(option.id)}
                    icon={option.icon}
                    label={option.label}
                    isFA
                  />
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>Shipping Address</span>
              </div>
              <div className={styles.addressCard}>
                <div className={styles.addressDetails}>
                  <div className={styles.addressName}>Your Name</div>
                  <div className={styles.addressPhone}>(+84) 0123456789</div>
                  <div className={styles.addressStreet}>
                    123, Nguyen Trai Street, Ha Dong District, Ha Noi
                  </div>
                </div>
                <span className={styles.addressIconBtn}>
                  <ChevronRightIcon />
                </span>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>Order Summary</span>
                <span className={styles.colCount}>1 product</span>
              </div>

              <div className={styles.orderSummaryCard}>
                <div className={styles.orderItemImage}>
                  <img
                    src="/assets/Him/AoThun/AoThunSSS/sssDen1.webp"
                    alt="Product"
                    className={styles.img}
                  />
                </div>
                <div className={styles.orderItemDetails}>
                  <div className={styles.productInfo}>
                    <div className={styles.productNameSmall}>Product name</div>
                    <div className={styles.productVariant}>Black</div>
                    <div className={styles.productPriceSmall}>
                      {formatPrice(subtotal)}
                    </div>
                  </div>
                </div>
                <div className={styles.sizeQuantity}>
                  <div className={styles.productSize}>XL</div>
                  <div className={styles.itemQuantity}>x1</div>
                </div>
              </div>

              <div className={styles.packagingSection}>
                <div
                  className={styles.packagingCard}
                  onClick={() =>
                    setShowPackagingDropdown(!showPackagingDropdown)
                  }
                >
                  <div className={styles.packagingLabel}>
                    <img
                      className={styles.img}
                      src={selectedPackagingData.image}
                      alt="Packaging"
                    />
                    {selectedPackagingData.label}
                  </div>

                  <div
                    className={clsx(styles.packagingArrow, {
                      [styles.arrowOpen]: showPackagingDropdown,
                    })}
                  >
                    <ChevronRightIcon />
                  </div>
                </div>

                {showPackagingDropdown && (
                  <div className={styles.packagingDropdown}>
                    {PACKAGING_OPTIONS.map((option) => (
                      <div
                        key={option.id}
                        className={
                          selectedPackaging === option.id
                            ? styles.packagingOptionSelected
                            : styles.packagingOption
                        }
                        onClick={() => {
                          setSelectedPackaging(option.id);
                          setShowPackagingDropdown(false);
                        }}
                      >
                        <span>{option.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>Payment Method</span>
              </div>
              <div className={styles.optionsList}>
                {PAYMENT_OPTIONS.map((option) => (
                  <OptionCard
                    key={option.id}
                    selected={selectedPayment === option.id}
                    onClick={() => setSelectedPayment(option.id)}
                    icon={option.icon}
                    label={option.label}
                    isFA={false}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            <div className={styles.columnHeader}>
              <span className={styles.colTitle}>Total</span>
            </div>
            <div className={styles.totalSummaryCard}>
              <div className={styles.totalSummaryRow}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.totalSummaryRow}>
                <span>Taxes</span>
                <span>{formatPrice(taxes)}</span>
              </div>
              <div
                className={clsx(
                  styles.totalSummaryRow,
                  styles.totalSummaryTotalRow
                )}
              >
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Link to="/payment" className={styles.checkoutBtn}>
                Process to Checkout
              </Link>
              <button className={styles.continueBtn}>Continue Shopping</button>

              <p className={styles.agreementText}>
                By placing your order, you agree to the{" "}
                <a href="#">Terms of Services</a>
              </p>

              <div className={styles.noteWrapper}>
                <label>Note</label>
                <textarea placeholder="Add a note..."></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
