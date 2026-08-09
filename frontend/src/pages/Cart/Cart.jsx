import React, { useState } from "react";
import styles from "./Cart.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";

const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: "Sweater Loose Fit",
    size: "XL",
    color: "Black",
    price: 2500.0,
    quantity: 1,
    image: "assets/Him/Sweater/loose_blk1.png?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Polyester Shirt",
    size: "32",
    color: "White",
    price: 1800.0,
    quantity: 1,
    image: "assets/Him/SoMi/polyeste/somipoly.png?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Knit Socks",
    size: "L",
    color: "Blue",
    price: 3200.0,
    quantity: 2,
    image: "assets/Him/SoMi/KeSoc/kexanh1.png?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Boxy T-Shirt",
    size: "M",
    color: "Black",
    price: 4500.0,
    quantity: 1,
    image:
      "assets/Him/AoThun/ThunInBoxy/thunBoxy-black.png?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Puffer Jacket",
    size: "L",
    color: "Black",
    price: 890.0,
    quantity: 3,
    image:
      "assets/Him/AoPhao/ChanBongCoTuiFormLose/chanBong-black.png?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Hoodie Boxy",
    size: "XL",
    color: "Grey",
    price: 3800.0,
    quantity: 1,
    image: "assets/Him/Hoodie/Boxy/hoodieboxy.webp?w=400&h=400&fit=crop",
  },
];

const formatPrice = (num) =>
  num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + "đ";

const EmptyCart = () => (
  <div className={styles.pageContainer}>
    <div className={`${styles.emptyStateWrapper} grid wide`}>
      <div className={styles.emptyIconBox}>
        <span style={{ fontSize: "60px" }}>🛍️</span>
      </div>
      <h2 className={styles.emptyTitle}>
        Your shopping bag is currently empty
      </h2>
      <p className={styles.emptyText}>
        Add items to place an order or log in to retrieve your shopping bag
      </p>
    </div>
  </div>
);

const DeleteModal = ({ onCancel, onConfirm }) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <h3 className={styles.modalTitle}>Remove Item</h3>
      <p className={styles.modalText}>
        Are you sure you want to remove this item from your cart?
      </p>
      <div className={styles.modalActions}>
        <button className={styles.modalCancelBtn} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.modalConfirmBtn} onClick={onConfirm}>
          Remove
        </button>
      </div>
    </div>
  </div>
);

const ProductCard = ({ item, onUpdateQuantity, onDelete }) => (
  <div className={styles.productCard}>
    <div className={styles.imageBox}>
      <img src={item.image} alt={item.name} className={styles.img} />
    </div>

    <div className={styles.cardDetails}>
      <div className={styles.cardTop}>
        <h3 className={styles.productName}>{item.name}</h3>
        <button className={styles.removeBtn} onClick={() => onDelete(item.id)}>
          <span style={{ fontSize: "24px" }}>×</span>
        </button>
      </div>

      <div className={styles.variantInfo}>
        <div className={styles.variantRow}>
          <span>Size</span> <span>{item.size}</span>
        </div>
        <div className={styles.variantRow}>
          <span>Colour</span> <span>{item.color}</span>
        </div>
      </div>

      <div className={styles.cardBottom}>
        <div className={styles.qtyWrapper}>
          <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
        </div>
        <div className={styles.itemPrice}>
          {formatPrice(item.price * item.quantity)}
        </div>
      </div>
    </div>
  </div>
);

const OrderSummary = ({ subtotal, taxes, total }) => (
  <div className={styles.stickyWrapper}>
    <div className={styles.columnHeader}>
      <span className={styles.colTitle}>Total</span>
    </div>
    <div className={styles.summaryCard}>
      <div className={styles.summaryRow}>
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>Taxes</span>
        <span>{formatPrice(taxes)}</span>
      </div>
      <div className={clsx(styles.summaryRow, styles.totalRow)}>
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      <Link to="/checkout" className={styles.checkoutBtn}>
        Proceed to Checkout
      </Link>
      <button className={styles.continueBtn}>Continue Shopping</button>
    </div>
  </div>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemToDelete));
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.09;
  const total = subtotal + taxes;

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backButton}>
        <Link to="/" className={styles.backLink}>
          <span className={styles.backArrow}>&lt;</span>
          Back
        </Link>
      </div>

      <div className={`${styles.mainContent} grid wide`}>
        <div className={styles.layoutGrid}>
          <div className={styles.leftColumn}>
            <div className={styles.columnHeader}>
              <span className={styles.colTitle}>Products</span>
              <span className={styles.colCount}>
                {cartItems.length} product{cartItems.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className={styles.productList}>
              {cartItems.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          </div>

          <div className={styles.rightColumn}>
            <OrderSummary subtotal={subtotal} taxes={taxes} total={total} />
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteModal onCancel={cancelDelete} onConfirm={confirmDelete} />
      )}
    </div>
  );
};

export default Cart;
