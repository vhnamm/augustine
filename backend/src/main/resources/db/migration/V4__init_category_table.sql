CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMEMT,
    parent_id INT,
    slug VARCHAR(100),
    category_name VARCHAR(50),
    CONSTRAINT fk_recursive_category
    FOREIGN KEY (parent_id) REFERENCES categories (id)
) ENGINE=InnoDB;