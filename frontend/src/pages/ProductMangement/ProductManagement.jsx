import React, { useState } from 'react';
import styles from './ProductManagement.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faPlus, faSave, faCheck, faSearch, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Table, Tag, Popconfirm, message } from 'antd';

const initialProducts = [
    {
        key: '8763',
        id: '#8763',
        name: 'Modern Muse Trench',
        image: '/assets/Collections/summer/ethical_summer_clothing_idea_large.jpg',
        category: 'Jacket',
        stock: 77,
        price: 47.55,
        status: 'active',
    },
    {
        key: '8764',
        id: '#8764',
        name: 'Linen Summer Dress',
        image: '/assets/Collections/spring/photo-1515886657613-9f3515b0c78f.avif',
        category: 'Dress',
        stock: 12,
        price: 120.0,
        status: 'active',
    },
    {
        key: '8765',
        id: '#8765',
        name: 'Velvet Evening Gown',
        image: '/assets/Collections/spring/photo-1566174053879-31528523f8ae.avif',
        category: 'Dress',
        stock: 0,
        price: 250.0,
        status: 'outstock',
    },
];

const ProductManagement = () => {
    const [products, setProducts] = useState(initialProducts);

    const handleDelete = (record) => {
        setProducts((prev) => prev.filter((p) => p.key !== record.key));
        message.success(`Đã xoá "${record.name}"`);
    };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            width: '40%',
            render: (name, record) => (
                <div className={styles.colProduct}>
                    <img src={record.image} alt="" />
                    <div className={styles.productInfo}>
                        <span className={styles.productName}>{name}</span>
                        <span className={styles.productID}>{record.id}</span>
                    </div>
                </div>
            ),
        },
        { title: 'Category', dataIndex: 'category' },
        {
            title: 'Stock',
            dataIndex: 'stock',
            render: (stock) => `${stock} in stock`,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (price) => `$${price.toFixed(2)}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) =>
                status === 'active' ? (
                    <Tag color="success">Active</Tag>
                ) : (
                    <Tag color="error">Out Stock</Tag>
                ),
        },
        {
            title: 'Action',
            render: (_, record) => (
                <div className={styles.actions}>
                    <button title="Edit">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <Popconfirm
                        title={`Xoá "${record.name}"?`}
                        okText="Xoá"
                        cancelText="Huỷ"
                        onConfirm={() => handleDelete(record)}
                    >
                        <button title="Delete" className={styles.btnDelete}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Add New Product</h1>
                <div className={styles.actions}>
                    <button className={styles.btnDraft}> 
                        <FontAwesomeIcon icon={faSave} style={{marginRight: '8px'}} /> Draft 
                    </button>
                    <button className={styles.btnAdd}> 
                        <FontAwesomeIcon icon={faCheck} style={{marginRight: '8px'}} /> Publish 
                    </button>
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.leftCol}>
                    <div className={styles.card}>
                        <h3>General Information</h3>
                        <div className={styles.formGroup}>
                            <label>Name Product</label>
                            <input type="text" placeholder="e.g. Puffer Jacket With Pocket Detail" />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Description Product</label>
                            <textarea placeholder="Description of the product..." />
                        </div>

                        <div className={styles.row2}>
                            <div className={styles.formGroup}>
                                <label>Size</label>
                                <div className={styles.sizeSelector}>
                                    <div className={styles.sizeOption}>XS</div>
                                    <div className={styles.sizeOption}>S</div>
                                    <div className={clsx(styles.sizeOption, styles.active)}>M</div>
                                    <div className={styles.sizeOption}>L</div>
                                    <div className={styles.sizeOption}>XL</div>
                                    <div className={styles.sizeOption}>XXL</div>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Gender</label>
                                <div className={styles.genderSelector}>
                                    <label><input type="radio" name="gender" defaultChecked /> Men</label>
                                    <label><input type="radio" name="gender" /> Women</label>
                                    <label><input type="radio" name="gender" /> Unisex</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <h3>Pricing And Stock</h3>
                        <div className={styles.row2}>
                            <div className={styles.formGroup}>
                                <label>Base Pricing ($)</label>
                                <input type="number" placeholder="47.55" />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Stock</label>
                                <input type="number" placeholder="77" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.rightCol}>
                    <div className={styles.card}>
                        <h3>Upload Img</h3>
                        <div className={styles.uploadArea}>
                             <FontAwesomeIcon icon={faCloudUploadAlt} style={{fontSize: '2rem', marginBottom: '10px'}} />
                             <span>Upload Image</span>
                        </div>
                        <div className={styles.thumbnailList}>
                            <div className={styles.thumb}></div>
                            <div className={styles.thumb}></div>
                            <div className={styles.thumb}></div>
                            <div className={clsx(styles.thumb, styles.addThumb)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3>Category</h3>
                        <div className={styles.formGroup}>
                            <label>Product Category</label>
                            <select>
                                <option>Jacket</option>
                                <option>Dress</option>
                                <option>Pants</option>
                                <option>Accessories</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles.sectionDivider}>
                <h2>Recent Products</h2>
            </div>

            <div className={styles.controlBar}>
                <div className={styles.searchBox}>
                    <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                    <input type="text" placeholder="Search product..." />
                </div>
                
                <select className={styles.filterSelect}>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Out of Stock</option>
                </select>
            </div>

            <div className={styles.tableWrapper}>
                <Table columns={columns} dataSource={products} pagination={false} />
            </div>
            
            <div style={{height: '50px'}}></div>
        </div>
    );
};

export default ProductManagement;