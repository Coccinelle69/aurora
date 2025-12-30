CREATE TABLE reservation (
  id SERIAL PRIMARY KEY,
  public_token UUID NOT NULL UNIQUE,
  admin_action_expires_at TIMESTAMPTZ NOT NULL,
  admin_action_used BOOLEAN NOT NULL DEFAULT false,
  reservation_reference VARCHAR(50) NOT NULL UNIQUE,

  main_contact_first_name VARCHAR(100) NOT NULL,
  main_contact_last_name VARCHAR(100) NOT NULL,
  main_contact_email VARCHAR(100) NOT NULL,
  main_contact_phone VARCHAR(100) NOT NULL,
  language VARCHAR(10)  NOT NULL DEFAULT 'en',

  guests INT NOT NULL,
  adults INT NOT NULL,
  children INT NOT NULL,
  teens INT NOT NULL,

  total_nights INT NOT NULL,
  total_price INT NOT NULL,

  arrival_date DATE NOT NULL,
  departure_date DATE NOT NULL,

  status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  message VARCHAR(2000)

);

CREATE TABLE reservation_sequence (
  id SERIAL PRIMARY KEY,
  year INT NOT NULL;
  last_number INT NOT NULL;
);

CREATE TABLE payment (
  id SERIAL PRIMARY KEY,
  reservation_id INT NOT NULL,
  CONSTRAINT fk_payment_reservation
    FOREIGN KEY (reservation_id)
    REFERENCES reservation(id)
    ON DELETE CASCADE,

  payment_method VARCHAR(20) NOT NULL, 

  stripe_payment_intent_id VARCHAR(100),
  stripe_charge_id VARCHAR(100),

  currency VARCHAR(3) NOT NULL DEFAULT 'EUR',

  amount_expected INT NOT NULL,   
  amount_paid INT NOT NULL DEFAULT 0,       
  amount_refunded INT NOT NULL DEFAULT 0,  

  discount_amount INT NOT NULL DEFAULT 0,   
  discount_code VARCHAR(100), 

  payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

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
   
