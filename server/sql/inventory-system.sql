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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Dumping data for table ims-fyp.vendors: ~0 rows (approximately)
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` (`vendor_id`, `company_name`, `brand`, `contact`, `address`, `email`, `created_at`, `updated_at`) VALUES
	(5, 'test vendor 2', 'brand 2', '012333222', 'test address 3', 'companyemail3@gmail.com', '2022-04-17 14:03:30', '2022-04-17 14:03:30'),
	(6, 'test company 3', 'brand 3', '012222333', 'test address 3', 'companyemail3@gmail.com', '2022-04-17 14:38:13', '2022-04-17 14:38:13'),
	(7, 'test company 4', 'brand 4', '01222222', 'test address 4', 'companyemail4@gmail.com', '2022-04-17 14:43:37', '2022-04-17 14:43:37'),
	(8, 'test company 5', 'brand 5', '012222222', 'address 5', 'email5@gmail.com', '2022-04-17 14:48:20', '2022-04-17 14:48:20');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
