-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2024 at 12:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rbac_vrv`
--

-- --------------------------------------------------------

--
-- Table structure for table `all_members`
--

CREATE TABLE `all_members` (
  `name` varchar(30) NOT NULL,
  `mailId` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `role` varchar(15) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `all_members`
--

INSERT INTO `all_members` (`name`, `mailId`, `password`, `role`, `status`) VALUES
('Arun', 'arun@viki.com', 'arun', 'User', 'Active'),
('Chandru', 'chandru@viki.com', 'chandru', 'User', 'Active'),
('Dora', 'dora@viki.com', 'dora', 'User', 'Active'),
('Super Admin', 'superadmin@viki.com', 'spadmin', 'Super Admin', 'Active'),
('Admin', 'admin@viki.com', 'admin', 'Admin', 'Active'),
('Manju', 'manju@viki.com', 'manju', 'User', 'Active');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
