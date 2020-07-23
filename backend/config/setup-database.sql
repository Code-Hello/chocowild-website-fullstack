CREATE DATABASE chocowild CHARACTER SET utf8mb4 collate utf8mb4_unicode_ci;
USE chocowild;

CREATE TABLE `user` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,   
    `firstname` VARCHAR(100) NOT NULL,    
    `lastname` VARCHAR(100) NOT NULL,
    `street` VARCHAR(150) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `postal_code` VARCHAR(50) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE, 
    `phone_number` VARCHAR(50),
    `password` VARCHAR(150) NOT NULL,
    `role` VARCHAR(10) NOT NULL
);

CREATE TABLE `category` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL
);

CREATE TABLE `product` ( 
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    `name` VARCHAR(150) NOT NULL, 
    `description` VARCHAR(255) NOT NULL, 
    `price` DECIMAL(10, 2) NOT NULL, 
    `image` VARCHAR(255),
    `stock_quantity` INT NOT NULL, 
    `id_category` INT, 
    FOREIGN KEY (id_category) REFERENCES category(id)
);

CREATE TABLE `order` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `id_user` INT,
    `creation_date` DATE NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id)
);

CREATE TABLE `order_product` ( 
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    `id_order` INT, 
    `id_product` INT, 
    `quantity` INT NOT NULL, 
    FOREIGN KEY (`id_order`) REFERENCES `order`(`id`), 
    FOREIGN KEY (`id_product`) REFERENCES `product`(`id`)
);




