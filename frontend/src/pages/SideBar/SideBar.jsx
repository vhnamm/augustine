import React, { useState } from "react";
import styles from "./SideBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faRightFromBracket,
  faUser,
  faBox,
  faListAlt,
  faClipboardCheck,
  faWarehouse,
  faChartBar,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { Link } from "react-router-dom";


const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [openSubmenus, setOpenSubmenus] = useState({});


  const toggleSubmenu = (menu) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };


  const menuItems = [
    {
      id: "main",
      title: "TỔNG QUAN",
      isSection: true,
    },
    {
      id: "dashboard",
      title: "Dashboard",
      icon: faChartLine,
      index: true
    },
    {
      id: "management",
      title: "QUẢN LÝ",
      isSection: true,
    },
    {
      id: "quan-ly-danh-muc",
      title: "Quản lý danh mục sản phẩm",
      icon: faListAlt,
    },
    {
      id: "quan-ly-san-pham",
      title: "Quản lý sản phẩm",
      icon: faBox,
    },
    {
      id: "quan-ly-bo-suu-tap",
      title: "Quản lý bộ sưu tập",
      icon: faClipboardCheck,
    },
    {
      id: "quan-ly-tai-khoan",
      title: "Quản lý tài khoản",
      icon: faUser,
    },
    {
      id: "nhap-hang",
      title: "Nhập hàng",
      icon: faWarehouse,
    },
    {
      id: "xem-bao-cao",
      title: "Xem báo cáo thống kê",
      icon: faChartBar,
    },
    {
      id: "support",
      title: "HỖ TRỢ",
      isSection: true,
    },
    {
      id: "huong-dan",
      title: "Thực hiện hỗ trợ trực tuyến",
      icon: faBook,
    },
  ];


  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>...</span>
          <span className={styles.logoText}>Augustine</span>
        </div>
      </div>


      <nav className={styles.sidebarNav}>
        {menuItems.map((item) => {
          if (item.isSection) {
            return (
              <div key={item.id} className={styles.sidebarSection}>
                {item.title}
              </div>
            );
          }


          const isActive = activeMenu === item.id;
          const isOpen = openSubmenus[item.id];
          const toURL = item.index? "/dashboard" : `/dashboard/${item.id}`

          return (
            <Link to={toURL} key={item.id} className={styles.menuItemWrapper}>
              <div
                className={clsx(styles.menuItem, {
                  [styles.active]: isActive,
                })}
                onClick={() => {
                  setActiveMenu(item.id);
                  if (item.hasSubmenu) {
                    toggleSubmenu(item.id);
                  }
                }}
              >
                <span className={styles.menuIcon}>
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                <span className={styles.menuTitle}>{item.title}</span>
                {item.hasSubmenu && (
                  <span
                    className={clsx(styles.menuArrow, {
                      [styles.open]: isOpen,
                    })}
                  >
                    ›
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>


      <Link to= "/login" className={styles.sidebarFooter}>
        <div className={styles.logoutButton}>
          <span className={styles.menuIcon}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </span>
          <span className={styles.menuTitle}>Đăng xuất</span>
        </div>
      </Link>
    </div>
  );
};


export default SideBar;



