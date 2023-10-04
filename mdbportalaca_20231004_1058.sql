-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2023 at 05:58 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mdbportalaca`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_otp_web`
--

CREATE TABLE `user_otp_web` (
  `employeeId` varchar(9) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expiredAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `email` varchar(256) NOT NULL,
  `mobilePhone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_otp_web`
--

INSERT INTO `user_otp_web` (`employeeId`, `otp`, `expiredAt`, `createdAt`, `email`, `mobilePhone`) VALUES
('232323232', '961176', '2023-12-18 15:23:22', '2023-09-19 15:23:26', 'farkhanmaul@gmail.com', 'none'),
('232323232', '404593', '2023-12-31 14:07:50', '2023-10-02 14:07:53', 'farkhanmaul@gmail.com', 'none'),
('232323232', '179785', '2023-12-31 14:26:13', '2023-10-02 14:26:18', 'farkhanmaul@gmail.com', 'none');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
