-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2023 at 11:31 AM
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
-- Table structure for table `api_logs`
--

CREATE TABLE `api_logs` (
  `employeeId` varchar(9) NOT NULL,
  `timestamp` datetime NOT NULL,
  `endpoint` varchar(255) NOT NULL,
  `method` varchar(10) NOT NULL,
  `requestHeaders` text NOT NULL,
  `requestBody` text NOT NULL,
  `responseStatus` int(11) NOT NULL,
  `responseMessage` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_device`
--

CREATE TABLE `user_device` (
  `employeeId` varchar(9) NOT NULL,
  `deviceId` varchar(255) NOT NULL,
  `insertedDate` datetime NOT NULL,
  `lastUpdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_otp`
--

CREATE TABLE `user_otp` (
  `employeeId` varchar(9) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expiredAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `email` varchar(256) NOT NULL,
  `mobilePhone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_otp`
--

INSERT INTO `user_otp` (`employeeId`, `otp`, `expiredAt`, `createdAt`, `email`, `mobilePhone`) VALUES
('202204263', '123456', '2023-12-31 23:59:59', '2023-09-13 16:27:26', 'example@example.com', 'none'),
('202204263', '123456', '2023-12-31 23:59:59', '2023-09-13 16:27:46', 'none', '62812345678');

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
  `location_name` varchar(255) NOT NULL,
  `action` varchar(20) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_presence`
--

INSERT INTO `user_presence` (`employeeId`, `longitude`, `altitude`, `latitude`, `datetime`, `location_name`, `action`, `notes`) VALUES
('202204263', 123.456, 100, 45.678, '2023-09-01 09:00:00', 'Office', 'Clock In', 'Regular work hours'),
('202204263', 123.456, 100, 45.678, '2023-09-01 12:00:00', 'Cafeteria', 'Clock Break In', 'Lunch break'),
('202204263', 123.456, 100, 45.678, '2023-09-01 18:00:00', 'Office', 'Clock Out', 'End of workday'),
('202204263', 123.456, 100, 45.678, '2023-09-02 09:00:00', 'Office', 'Clock In', 'Regular work hours'),
('202204263', 123.456, 100, 45.678, '2023-09-02 12:00:00', 'Cafeteria', 'Clock Break In', 'Lunch break'),
('202204263', 123.456, 100, 45.678, '2023-09-02 18:00:00', 'Office', 'Clock Out', 'End of workday'),
('202204263', 123.456, 100, 45.678, '2023-09-03 09:00:00', 'Office', 'Clock In', 'Regular work hours'),
('202204263', 123.456, 100, 45.678, '2023-09-03 12:00:00', 'Cafeteria', 'Clock Break In', 'Lunch break'),
('202204263', 123.456, 100, 45.678, '2023-09-03 18:00:00', 'Office', 'Clock Out', 'End of workday'),
('202204263', 123.456, 100, 45.678, '2023-09-07 09:00:00', 'Office', 'Clock In', 'Regular work hours'),
('202204263', 123.456, 100, 45.678, '2023-09-07 12:00:00', 'Cafeteria', 'Clock Break In', 'Lunch break'),
('202204263', 123.456, 100, 45.678, '2023-09-07 18:00:00', 'Office', 'Clock Out', 'End of workday');

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
('202204263', '1bb30273046d62253cd3abbfe82a90', '2023-12-31 23:59:59', '2023-09-13 16:29:04', 'open'),
('232323232', '1bb30273046d62253cd3abbfe82a90', '2023-12-31 23:59:59', '2023-09-13 16:30:44', 'open'),
('202204263', '4aeb230ad8820296c293d823f7e0f1', '2023-12-31 23:59:59', '2023-09-13 16:31:14', 'closed'),
('232323232', 'b60ca166ac6473a3150f1af7e765d4', '2023-12-31 23:59:59', '2023-09-13 16:31:22', 'closed');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
