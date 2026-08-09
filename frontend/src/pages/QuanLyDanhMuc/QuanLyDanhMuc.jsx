import React, { useState } from "react";
import styles from "./QuanLyDanhMuc.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faMars,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { Modal, Form, Input, Popconfirm, message } from "antd";

const initialCategories = {
  Nam: [
    { name: "Shirts", count: "45 sản phẩm" },
    { name: "Trousers", count: "32 sản phẩm" },
    { name: "Accessories", count: "28 sản phẩm" },
    { name: "Underwear", count: "15 sản phẩm" },
    { name: "Hoodie", count: "22 sản phẩm" },
  ],
  "Nữ": [
    { name: "Shirts", count: "45 sản phẩm" },
    { name: "Trousers", count: "32 sản phẩm" },
    { name: "Accessories", count: "28 sản phẩm" },
    { name: "Underwear", count: "15 sản phẩm" },
    { name: "Hoodie", count: "22 sản phẩm" },
  ],
};

const icons = { Nam: faMars, "Nữ": faVenus };

const QuanLyDanhMuc = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [modalState, setModalState] = useState(null); // { mode: 'main' | 'sub', mainCategory, subCategory }
  const [form] = Form.useForm();

  const openAddMain = () => {
    form.resetFields();
    setModalState({ mode: "main" });
  };

  const openAddSub = (mainCategory) => {
    form.resetFields();
    setModalState({ mode: "sub", mainCategory });
  };

  const openEditSub = (mainCategory, subCategory) => {
    form.setFieldsValue({ name: subCategory.name });
    setModalState({ mode: "sub", mainCategory, subCategory });
  };

  const handleDeleteSub = (mainCategory, subCategory) => {
    setCategories((prev) => ({
      ...prev,
      [mainCategory]: prev[mainCategory].filter((c) => c.name !== subCategory.name),
    }));
    message.success(`Đã xoá "${subCategory.name}"`);
  };

  const handleOk = async () => {
    const values = await form.validateFields();

    if (modalState.mode === "main") {
      setCategories((prev) => ({ ...prev, [values.name]: [] }));
      message.success(`Đã thêm danh mục chính "${values.name}"`);
    } else {
      const { mainCategory, subCategory } = modalState;
      setCategories((prev) => {
        const list = prev[mainCategory];
        if (subCategory) {
          return {
            ...prev,
            [mainCategory]: list.map((c) =>
              c.name === subCategory.name ? { ...c, name: values.name } : c
            ),
          };
        }
        return {
          ...prev,
          [mainCategory]: [...list, { name: values.name, count: "0 sản phẩm" }],
        };
      });
      message.success(subCategory ? "Đã cập nhật danh mục con" : "Đã thêm danh mục con");
    }
    setModalState(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quản Lý Danh Mục</h1>
        <button className={styles.addBtn} onClick={openAddMain}>
          + Thêm Danh Mục Chính
        </button>
      </div>

      <div className={styles.mainCategoriesGrid}>
        {Object.entries(categories).map(([mainCategory, subCategories]) => (
          <div className={styles.mainCategoryCard} key={mainCategory}>
            <div className={styles.mainCatHeader}>
              <div className={styles.mainCatTitle}>
                <span className={styles.mainCatIcon}>
                  <FontAwesomeIcon icon={icons[mainCategory]} />
                </span>
                <h3>{mainCategory}</h3>
              </div>
              <button
                className={styles.addSubBtn}
                onClick={() => openAddSub(mainCategory)}
              >
                + Thêm Danh Mục Con
              </button>
            </div>

            <div className={styles.subCategoriesList}>
              {subCategories.map((sub) => (
                <div className={styles.subCategoryItem} key={sub.name}>
                  <div className={styles.subCatInfo}>
                    <span className={styles.subCatName}>{sub.name}</span>
                    <span className={styles.subCatCount}>{sub.count}</span>
                  </div>
                  <div className={styles.subCatActions}>
                    <button
                      className={styles.editIconBtn}
                      onClick={() => openEditSub(mainCategory, sub)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <Popconfirm
                      title={`Xoá "${sub.name}"?`}
                      onConfirm={() => handleDeleteSub(mainCategory, sub)}
                      okText="Xoá"
                      cancelText="Huỷ"
                    >
                      <button className={styles.deleteIconBtn}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </Popconfirm>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={!!modalState}
        title={
          modalState?.mode === "main"
            ? "Thêm Danh Mục Chính"
            : modalState?.subCategory
            ? "Sửa Danh Mục Con"
            : "Thêm Danh Mục Con"
        }
        onOk={handleOk}
        onCancel={() => setModalState(null)}
        okText="Lưu"
        cancelText="Huỷ"
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input placeholder="VD: Shirts" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLyDanhMuc;
