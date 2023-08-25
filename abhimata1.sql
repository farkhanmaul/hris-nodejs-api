-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2023 at 10:30 AM
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
-- Table structure for table `employee_presence`
--

CREATE TABLE `employee_presence` (
  `employeeId` varchar(9) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `latitude` decimal(9,6) NOT NULL,
  `datetime` datetime NOT NULL,
  `location_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee_presence`
--

INSERT INTO `employee_presence` (`employeeId`, `longitude`, `latitude`, `datetime`, `location_name`) VALUES
('123456', '123.456789', '12.345678', '2023-08-25 09:30:00', 'Office Building'),
('123456', '123.456789', '12.345678', '2023-08-25 09:30:00', 'Office Building'),
('123456', '123.456789', '12.345678', '2023-08-25 09:30:00', 'Office Building'),
('123456', '123.456789', '12.345678', '2023-08-25 09:30:00', 'Office Building'),
('1234567', '123.456789', '12.345678', '2023-08-25 09:30:00', 'Office Building'),
('1234567', '123.456789', '12.345678', '2023-08-25 09:30:00', 'Office Building'),
('232323232', '123.456789', '12.345678', '2023-08-25 15:25:30', 'Office Building'),
('232323232', '123.456789', '12.345678', '2023-08-25 15:25:40', 'Office Building');

-- --------------------------------------------------------

--
-- Table structure for table `user_dummy`
--

CREATE TABLE `user_dummy` (
  `EmployeeId` varchar(9) NOT NULL,
  `EmployeeFullName` varchar(50) NOT NULL,
  `PrimaryEmail` varchar(256) NOT NULL,
  `BirthDate` date NOT NULL,
  `JoinCompany` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_dummy`
--

INSERT INTO `user_dummy` (`EmployeeId`, `EmployeeFullName`, `PrimaryEmail`, `BirthDate`, `JoinCompany`) VALUES
('123456789', 'John Doe', 'johndoe@gmail.com', '1990-01-01', '2020-01-01 09:30:00'),
('987654321', 'Jane Smith', 'janesmith@gmail.com', '1992-05-10', '2018-02-15 14:45:00'),
('246813579', 'Michael Johnson', 'michaeljohnson@gmail.com', '1985-09-20', '2015-06-30 11:00:00'),
('135792468', 'Emily Davis', 'emilydavis@gmail.com', '1991-03-15', '2019-08-10 16:20:00'),
('864209753', 'David Wilson', 'davidwilson@gmail.com', '1988-11-25', '2017-04-05 10:10:00'),
('753190246', 'Sarah Brown', 'sarahbrown@gmail.com', '1993-07-08', '2021-03-12 13:30:00'),
('582301674', 'Matthew Taylor', 'matthewtaylor@gmail.com', '1987-12-02', '2016-10-20 15:15:00'),
('419638275', 'Olivia Anderson', 'oliviaanderson@gmail.com', '1994-06-18', '2022-02-28 09:00:00'),
('296475810', 'Daniel Martinez', 'danielmartinez@gmail.com', '1989-09-12', '2014-12-07 12:45:00'),
('296475810', 'Daniel Martinez', 'danielmartinez@gmail.com', '1989-09-12', '2014-12-07 12:45:00'),
('123456789', 'Farkhan M', 'darisekarang@gmail.com', '1989-09-13', '2014-12-04 12:45:00'),
('012345678', 'Arkhab A', 'arkhabagdana1@gmail.com', '1989-09-12', '2014-12-07 12:45:00'),
('657294183', 'Sophia Gonzalez', 'sophiagonzalez@gmail.com', '1996-02-28', '2023-05-15 17:30:00'),
('000000000', 'Farhan', 'farhan@gmail.com', '1990-01-01', '2020-01-01 00:00:00'),
('111111111', 'John Doe', 'johndoe@gmail.com', '1995-05-10', '2018-07-15 00:00:00'),
('123456789', 'Jane Smith', 'janesmith@gmail.com', '1988-09-20', '2010-03-12 00:00:00'),
('987654321', 'Michael Johnson', 'michaeljohnson@gmail.com', '1992-12-05', '2015-06-30 00:00:00'),
('555555555', 'Emily Davis', 'emilydavis@gmail.com', '1999-07-18', '2017-09-22 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_otp`
--

CREATE TABLE `user_otp` (
  `employeeId` varchar(9) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expiredAt` datetime NOT NULL,
  `email` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_otp`
--

INSERT INTO `user_otp` (`employeeId`, `otp`, `expiredAt`, `email`) VALUES
('232323232', '805832', '2023-11-23 08:39:09', 'farkhanmaul@gmail.com'),
('012345678', '203906', '2023-11-23 13:15:35', 'arkhabagdana1@gmail.com'),
('012345678', '534914', '2023-11-23 14:38:02', 'arkhabagdana1@gmail.com'),
('232323232', '626970', '2023-11-23 15:06:13', 'farkhanmaul@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `user_token`
--

CREATE TABLE `user_token` (
  `employeeId` varchar(9) NOT NULL,
  `token` varchar(30) NOT NULL,
  `expiredAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_token`
--

INSERT INTO `user_token` (`employeeId`, `token`, `expiredAt`) VALUES
('232323232', 'GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4', '2023-11-23 08:57:21'),
('232323232', 'ox83LHneL01ZgoF1qf5zDIYa543Jkc', '2023-11-23 08:57:34'),
('232323232', 'zjOyM0WaNjZbavfIuOCIUiLipKX58d', '2023-11-23 09:39:43'),
('232323232', 'qZ7je2HXeR7BcKkWfbADO3rrE1TmAy', '2023-11-23 09:40:05'),
('232323232', 'zMTT3c00nYnKfKlmLAfdO9K2IE6rHn', '2023-11-23 09:44:24'),
('232323232', 'ALoC1uk2jrDo8brxNn3749tatgOSRE', '2023-11-23 11:02:14'),
('232323232', 'nUT2fH1DFuBMf93lxmWs3nCr3qR8XX', '2023-11-23 11:02:15');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
