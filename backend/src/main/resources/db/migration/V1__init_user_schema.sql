CREATE TABLE roles (
    id          INT AUTO_INCREMENT,
    `name`   VARCHAR(50)  NOT NULL,
    description TEXT         NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE permissions (
    id              INT AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    description      VARCHAR(255) NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE role_permissions (
    id               INT AUTO_INCREMENT,
    role_id          INT NOT NULL,
    permission_id    INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_role_permissions_role_permission (role_id, permission_id),
    CONSTRAINT fk_role_permissions_role
        FOREIGN KEY (role_id) REFERENCES roles (id),
    CONSTRAINT fk_role_permissions_permission
        FOREIGN KEY (permission_id) REFERENCES permissions (id)
) ENGINE=InnoDB;

CREATE TABLE users (
    id         BIGINT AUTO_INCREMENT,
    email      VARCHAR(50) NOT NULL,
    password   VARCHAR(255) NULL,
    full_name   VARCHAR(50) NOT NULL,
    avatar     VARCHAR(255),
    google_id VARCHAR(50),
    role_id    INT  NOT NULL,
    locked     BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP    NULL,

    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email),
    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id) REFERENCES roles (id)
) ENGINE=InnoDB;

CREATE TABLE user_address (
    id         INT AUTO_INCREMENT,
    user_id     BIGINT  NOT NULL,
    phone       VARCHAR(10),
    province    VARCHAR(50),
    ward        VARCHAR(50),
    detail      TEXT,
    is_default BOOLEAN,
PRIMARY KEY (id),
   CONSTRAINT fk_users_address_user
       FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;