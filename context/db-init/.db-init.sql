CREATE TABLE reservation (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL,
  CONSTRAINT fk_reservation_customer
  FOREIGN KEY (customer_id)
  REFERENCES customer(id)
  ON DELETE CASCADE 
  public_token UUID NOT NULL UNIQUE,
  admin_action_expires_at TIMESTAMPTZ NOT NULL,
  admin_action_used BOOLEAN NOT NULL DEFAULT false,
  reservation_reference VARCHAR(50) NOT NULL UNIQUE,

  guests INT NOT NULL,
  adults INT NOT NULL,
  children INT NOT NULL,
  teens INT NOT NULL,

  total_nights INT NOT NULL,
  total_price NUMERIC(12,2) NOT NULL,

  arrival_date DATE NOT NULL UNIQUE,
  departure_date DATE NOT NULL,

  status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN (
  'PENDING',
  'PARTIALLY_PAID',
  'PAID',
  'CANCELLED'
)),
  message VARCHAR(2000),
  reminder_sent BOOLEAN NOT NULL DEFAULT false,
  cancellation_email_sent BOOLEAN NOT NULL DEFAULT false,
  balance_due_at DATE,
  reminder_due_at DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE reservation_sequence (
  id SERIAL PRIMARY KEY,
  year INT NOT NULL,
  last_number INT NOT NULL
);

CREATE TABLE customer (
  id SERIAL PRIMARY KEY,

  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(100) NOT NULL,
  language VARCHAR(10)  NOT NULL DEFAULT 'en',
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,

  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE payment (
  id SERIAL PRIMARY KEY,
  reservation_id INT NOT NULL,
  CONSTRAINT fk_payment_reservation
    FOREIGN KEY (reservation_id)
    REFERENCES reservation(id)
    ON DELETE CASCADE,

  payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('STRIPE', 'IBAN', 'CASH')), 

  stripe_payment_intent_id VARCHAR(100),
  stripe_charge_id VARCHAR(100),

  currency VARCHAR(3) NOT NULL DEFAULT 'EUR',

  amount_expected NUMERIC(12, 2) NOT NULL,   
  amount_paid NUMERIC(12, 2) NOT NULL DEFAULT 0, 
  amount_deposit NUMERIC(12, 2) NOT NULL DEFAULT 0,      
  amount_remaining NUMERIC(12, 2) NOT NULL DEFAULT 0,      
  amount_refunded NUMERIC(12, 2) NOT NULL DEFAULT 0,  

  discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,   
  discount_code VARCHAR(100), 

  payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (payment_status IN (
  'PENDING',
  'PARTIAL',
  'FULL',
  'REFUNDED'
)),

  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE contact (
  id SERIAL PRIMARY KEY,

  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(100) NOT NULL,
  language VARCHAR(10) NOT NULL DEFAULT 'en',
  message VARCHAR(2000) NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reservation_scheduler
ON reservation (
  reminder_due_at,
  balance_due_at,
  status,
  reminder_sent,
  cancellation_email_sent
);
   
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'ROLE_ADMIN' NOT NULL, 
    is_technical_contact BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE password_reset_token (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_password_reset_token_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
    local_date_time TIMESTAMP NOT NULL
);

