CREATE DATABASE IF NOT EXISTS foodwaste;

USE foodwaste;

CREATE TABLE IF NOT EXISTS Admin (
    admin_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NULL,
    password VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS Users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),                            
    password VARCHAR(100),                            
    email VARCHAR(100),                              
    latitude DECIMAL(10, 8),                           
    longitude DECIMAL(11, 8)                         
);

ALTER TABLE users ADD COLUMN phone_number VARCHAR(15);


CREATE TABLE IF NOT EXISTS business (
    biz_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,   
    name VARCHAR(255) NOT NULL,                       
    category VARCHAR(100) NULL,                    
    email VARCHAR(255) NOT NULL UNIQUE,               
    password VARCHAR(255) NOT NULL,                    
    location VARCHAR(255),                             
    latitude DECIMAL(10, 8),                           
    longitude DECIMAL(11, 8),                          
    verification_status ENUM('verified', 'not_verified') DEFAULT 'not_verified',  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
);

ALTER TABLE business ADD COLUMN phone_number VARCHAR(15);


CREATE TABLE food_listings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    biz_id INT,
    item_name VARCHAR(255),
    category VARCHAR(50),
    expiration_date DATE,
    pickup_time VARCHAR(255),
    pickup_location VARCHAR(255),
    special_notes TEXT,
    quantity INT,
    no_of_claims INT DEFAULT 0;
    max_exceeded ENUM('Yes', 'No') DEFAULT 'No';
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (biz_id) REFERENCES business(biz_id) ON DELETE CASCADE
);

ALTER TABLE food_listings ADD COLUMN max_exceeded ENUM('Yes', 'No') DEFAULT 'No';


CREATE TABLE claimed_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    food_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES food_listings(id) ON DELETE CASCADE
);

CREATE TABLE support_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    subject VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE business_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    biz_id INT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (biz_id) REFERENCES business(biz_id) ON DELETE CASCADE
);

ALTER TABLE business_messages
ADD business_name VARCHAR(255);



[
    {
        "item_name": "Fresh Apples",
        "category": "Fruit",
        "quantity": 50,
        "expiration_date": "2024-09-20",
        "pickup_time": "10:00 AM - 5:00 PM",
        "pickup_location": "123 Main St, Cityville",
        "special_notes": "Organic apples freshly picked"
    },
    {
        "item_name": "Whole Wheat Bread",
        "category": "Bakery",
        "quantity": 30,
        "expiration_date": "2024-09-18",
        "pickup_time": "8:00 AM - 3:00 PM",
        "pickup_location": "456 Bread Lane, Townville",
        "special_notes": "No preservatives, baked this morning"
    },
    {
        "item_name": "Grilled Chicken",
        "category": "Meat",
        "quantity": 20,
        "expiration_date": "2024-09-19",
        "pickup_time": "12:00 PM - 6:00 PM",
        "pickup_location": "789 Market Blvd, Cityville",
        "special_notes": "Marinated with herbs and spices"
    },
    {
        "item_name": "Greek Yogurt",
        "category": "Dairy",
        "quantity": 100,
        "expiration_date": "2024-09-25",
        "pickup_time": "9:00 AM - 5:00 PM",
        "pickup_location": "321 Dairy Ave, Village",
        "special_notes": "Low-fat, contains probiotics"
    },
    {
        "item_name": "Spinach Salad",
        "category": "Vegetable",
        "quantity": 40,
        "expiration_date": "2024-09-17",
        "pickup_time": "10:00 AM - 4:00 PM",
        "pickup_location": "654 Green St, Townville",
        "special_notes": "Includes dressing on the side"
    },
    {
        "item_name": "Cheddar Cheese",
        "category": "Dairy",
        "quantity": 25,
        "expiration_date": "2024-09-22",
        "pickup_time": "11:00 AM - 3:00 PM",
        "pickup_location": "987 Cheese Rd, Cityville",
        "special_notes": "Aged for 6 months, sharp flavor"
    },
    {
        "item_name": "Organic Bananas",
        "category": "Fruit",
        "quantity": 60,
        "expiration_date": "2024-09-21",
        "pickup_time": "7:00 AM - 2:00 PM",
        "pickup_location": "432 Fruit Market, Village",
        "special_notes": "Certified organic bananas"
    }
]

