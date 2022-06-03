-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.24 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table ims-fyp.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_type` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumping data for table ims-fyp.accounts: ~7 rows (approximately)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`user_id`, `full_name`, `email`, `password`, `role_type`, `created_at`, `updated_at`) VALUES
	(1, 'Haziq Danial', 'haziq@gmail.com', '1234', 1, '2022-03-28 17:58:01', '2022-03-28 17:58:02'),
	(2, 'Ahmad Sobri', 'sobri@gmail.com', 'sobri123', 2, '2022-03-28 18:52:31', '2022-03-28 18:52:31'),
	(3, 'Muhammad zafil', 'zafil@gmail.com', 'zafil123', 1, '2022-03-28 18:52:59', '2022-03-29 00:44:00'),
	(4, 'Wan haziq', 'wanhaziq@gmail.com', 'haziq123', 2, '2022-03-28 18:55:41', '2022-03-28 18:55:41'),
	(5, 'Wan Naufal', 'naufal@gmail.com', 'naufal123', 1, '2022-03-29 00:38:14', '2022-03-29 00:38:14'),
	(6, 'Muhammad Zulkarnain', 'zul@gmail.com', 'zul123', 2, '2022-03-31 01:43:56', '2022-03-31 01:43:56'),
	(7, 'Ahmad Zubair', 'zubair@gmail.com', 'zubair123', 1, '2022-03-31 02:14:29', '2022-03-31 02:14:29');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Dumping structure for table ims-fyp.items
CREATE TABLE IF NOT EXISTS `items` (
  `item_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) unsigned NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '0',
  `quantity` int(11) NOT NULL DEFAULT '0',
  `price_unit` double NOT NULL DEFAULT '0',
  `barcode_id` varchar(255) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table ims-fyp.items: ~4 rows (approximately)
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` (`item_id`, `vendor_id`, `name`, `quantity`, `price_unit`, `barcode_id`, `created_at`, `updated_at`) VALUES
	(1, 6, 'Crackers', 200, 1.5, '122222333', '2022-05-23 02:48:00', '2022-05-23 02:48:00'),
	(2, 5, 'Bodywash', 200, 8.5, 'LAK12322321', '2022-05-23 02:48:27', '2022-05-23 02:48:27'),
	(3, 7, 'Test item', 23, 23.5, 'HAS1234', '2022-05-23 16:38:50', '2022-05-23 16:38:50'),
	(4, 8, 'Test Item 5', 300, 23.1, 'HB1234', '2022-05-23 16:39:16', '2022-05-23 16:39:16'),
	(5, 7, 'Test Item 12', 12, 34.4, 'HBG1234', '2022-05-23 16:46:43', '2022-05-23 16:46:43'),
	(6, 5, 'Test Item 2', 3, 30.3, 'BHAH-12', '2022-06-03 03:16:14', '2022-06-03 03:16:14');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;

-- Dumping structure for table ims-fyp.vendors
CREATE TABLE IF NOT EXISTS `vendors` (
  `vendor_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- Dumping data for table ims-fyp.vendors: ~4 rows (approximately)
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` (`vendor_id`, `company_name`, `brand`, `contact`, `address`, `email`, `created_at`, `updated_at`) VALUES
	(5, 'test vendor 2', 'brand 2', '012333222', 'test address 3', 'companyemail3@gmail.com', '2022-04-17 14:03:30', '2022-04-17 14:03:30'),
	(6, 'test company 3', 'brand 3', '012222333', 'test address 3', 'companyemail3@gmail.com', '2022-04-17 14:38:13', '2022-04-17 14:38:13'),
	(7, 'test company 4', 'brand 4', '01222222', 'test address 4', 'companyemail4@gmail.com', '2022-04-17 14:43:37', '2022-04-17 14:43:37'),
	(8, 'test company 5', 'brand 5', '012222222', 'address 5', 'email5@gmail.com', '2022-04-17 14:48:20', '2022-04-17 14:48:20'),
	(9, 'Test Company 16', 'test brand 16', '012222222', 'Test Company address', 'testcompanny@gmail.com', '2022-05-23 16:40:50', '2022-05-23 16:40:50');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
