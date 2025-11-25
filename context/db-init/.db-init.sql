CREATE TABLE Reservation (
  id SERIAL PRIMARY KEY,

  reservation_first_name VARCHAR(100) NOT NULL,
  reservation_last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(100) NOT NULL,

  adults INT NOT NULL,
  children INT NOT NULL,
  teens INT NOT NULL,

  total_nights INT NOT NULL,
  total_price INT NOT NULL,

  arrival_date DATE NOT NULL,
  departure_date DATE NOT NULL,

  status VARCHAR(20) DEFAULT 'PENDING' 
);
   


INSERT INTO Reservation
(arrival_date, departure_date, reservation_first_name, reservation_last_name, email, phone, adults, children, teens, total_nights, total_price, status)
VALUES
('2025-06-10', '2025-06-17', 'John', 'Doe', 'john@example.com', '123456789', 2, 0, 0, 7, 700, 'PENDING');
