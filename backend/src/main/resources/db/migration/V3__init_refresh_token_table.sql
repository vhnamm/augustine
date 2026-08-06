CREATE TABLE refresh_tokens (
    token_hash VARCHAR(255),
    user_id BIGINT,
    client_ip VARCHAR(255),
    user_agent VARCHAR(255),
    expired_at TIMESTAMP,
   PRIMARY KEY (token_hash),
   CONSTRAINT fk_refresh_token_user
       FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB;