-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2023 at 10:59 AM
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
-- Database: `abhimata1`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_otp`
--

CREATE TABLE `user_otp` (
  `employeeId` varchar(9) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expiredAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `email` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_otp`
--

INSERT INTO `user_otp` (`employeeId`, `otp`, `expiredAt`, `createdAt`, `email`) VALUES
('232323232', '805832', '2023-11-23 08:39:09', '0000-00-00 00:00:00', 'farkhanmaul@gmail.com'),
('012345678', '203906', '2023-11-23 13:15:35', '0000-00-00 00:00:00', 'arkhabagdana1@gmail.com'),
('012345678', '534914', '2023-11-23 14:38:02', '0000-00-00 00:00:00', 'arkhabagdana1@gmail.com'),
('232323232', '626970', '2023-11-23 15:06:13', '0000-00-00 00:00:00', 'farkhanmaul@gmail.com'),
('232323232', '654931', '2023-11-23 15:57:56', '0000-00-00 00:00:00', 'farkhanmaul@gmail.com'),
('232323232', '376566', '2023-11-26 13:29:40', '0000-00-00 00:00:00', 'farkhanmaul@gmail.com'),
('232323232', '229218', '2023-11-26 13:31:55', '2023-08-28 13:31:57', 'farkhanmaul@gmail.com'),
('232323232', '396482', '2023-11-26 14:03:46', '2023-08-28 14:03:49', 'farkhanmaul@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_presence`
--

CREATE TABLE `user_presence` (
  `employeeId` varchar(9) NOT NULL,
  `longitude` float NOT NULL,
  `altitude` float NOT NULL,
  `latitude` float NOT NULL,
  `datetime` datetime NOT NULL,
  `location_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_presence`
--

INSERT INTO `user_presence` (`employeeId`, `longitude`, `altitude`, `latitude`, `datetime`, `location_name`) VALUES
('123456789', 106.827, 10, -6.1751, '2023-08-28 10:00:00', 'Jakarta'),
('234567890', 112.751, 20, -7.2575, '2023-08-28 11:00:00', 'Surabaya'),
('345678901', 110.366, 5, -7.7956, '2023-08-28 12:00:00', 'Yogyakarta'),
('456789012', 115.163, 15, -8.4095, '2023-08-28 13:00:00', 'Bali'),
('567890123', 106.83, 8, -6.2088, '2023-08-28 14:00:00', 'Bandung'),
('678901234', 112.608, 6, -7.9839, '2023-08-28 15:00:00', 'Semarang'),
('789012345', 106.843, 12, -6.1754, '2023-08-28 16:00:00', 'Tangerang'),
('890123456', 112.734, 18, -7.2575, '2023-08-28 17:00:00', 'Malang'),
('232323232', 123.457, 1000, 12.3457, '2023-08-28 11:16:35', 'Office Building'),
('232323232', 123.457, 1231440, 12.3457, '2023-08-28 11:39:23', 'Office Building'),
('232323232', 123.457, 1231440, 12.3457, '2023-08-28 11:49:44', 'Office Building'),
('232323232', 123.457, 1231440, 12.3457, '2023-08-28 11:49:52', 'Office Building'),
('232323232', 123.457, 1231440, 12.3457, '2023-08-28 15:21:41', 'Office Building'),
('232323232', 123.457, 1231440, 12.3457, '2023-08-28 15:35:18', 'Office Building');

-- --------------------------------------------------------

--
-- Table structure for table `user_token`
--

CREATE TABLE `user_token` (
  `employeeId` varchar(9) NOT NULL,
  `token` varchar(30) NOT NULL,
  `expiredAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `status` enum('open','closed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_token`
--

INSERT INTO `user_token` (`employeeId`, `token`, `expiredAt`, `createdAt`, `status`) VALUES
('232323232', 'GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4', '2023-11-23 08:57:21', '0000-00-00 00:00:00', ''),
('232323232', 'ox83LHneL01ZgoF1qf5zDIYa543Jkc', '2023-11-23 08:57:34', '0000-00-00 00:00:00', ''),
('232323232', 'zjOyM0WaNjZbavfIuOCIUiLipKX58d', '2023-11-23 09:39:43', '0000-00-00 00:00:00', ''),
('232323232', 'qZ7je2HXeR7BcKkWfbADO3rrE1TmAy', '2023-11-23 09:40:05', '0000-00-00 00:00:00', ''),
('232323232', 'zMTT3c00nYnKfKlmLAfdO9K2IE6rHn', '2023-11-23 09:44:24', '0000-00-00 00:00:00', 'closed'),
('232323232', 'ALoC1uk2jrDo8brxNn3749tatgOSRE', '2023-11-23 11:02:14', '0000-00-00 00:00:00', 'closed'),
('232323232', 'nUT2fH1DFuBMf93lxmWs3nCr3qR8XX', '2023-11-23 11:02:15', '0000-00-00 00:00:00', ''),
('232323232', 'K7xHVL5z7jDGEgz6x2Bp8k9kHmTO51', '2023-11-26 11:00:02', '0000-00-00 00:00:00', 'open'),
('232323232', '046b8eyOLbFiGAsWPhDE8JYlqe3wOX', '2023-11-26 11:00:54', '2023-08-28 11:00:54', 'open'),
('232323232', 'wtTS5sOS3CYLF9sUtvRiM7ErYYXO42', '2023-11-26 14:05:10', '2023-08-28 14:05:10', 'open'),
('232323232', 'wDQgjrgWvDFNOnkXGC22IWmVUkbu9Q', '2023-11-26 14:06:48', '2023-08-28 14:06:48', 'open');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
