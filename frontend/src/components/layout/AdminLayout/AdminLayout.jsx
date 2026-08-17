import React from 'react';
import styles from './AdminLayout.module.scss'
import { Outlet } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import SideBar from '../../../pages/SideBar/SideBar';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <div className={styles.container}>
        <AdminHeader></AdminHeader>
        <SideBar></SideBar>

        <div className={styles.children_wrap}>
          <Outlet></Outlet>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AdminLayout;