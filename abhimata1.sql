-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 31, 2023 at 06:37 AM
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

--
-- Dumping data for table `api_logs`
--

INSERT INTO `api_logs` (`employeeId`, `timestamp`, `endpoint`, `method`, `requestHeaders`, `requestBody`, `responseStatus`, `responseMessage`) VALUES
('232323232', '2023-08-31 04:12:25', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"ce285eeb-f7ec-4819-9f82-10bcad94669a\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-30\",\"action\":\"Clock Out\"}', 404, '{\"respCode\":\"01\",\"respMsg\":\"No clock data found for the specified date and action\",\"data\":{}}'),
('232323232', '2023-08-31 04:12:40', '/attendance', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"d22fcc74-9f85-46fb-a49c-e4a59510a211\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"442\"}', '{\"employeeId\":\"232323232\",\"longitude\":\"dghdhdh\",\"altitude\":\"1231444\",\"latitude\":\"12.345678\",\"locationName\":\"bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir  bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir \",\"action\":\"Clock Out\",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 04:12:48', '/attendance', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"2372a07a-e886-4174-b6d9-477eeb66b728\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"215\"}', '{\"employeeId\":\"232323232\",\"longitude\":\"dghdhdh\",\"altitude\":\"1231444\",\"latitude\":\"12.345678\",\"locationName\":\"bendungan hilir jakarta pusat \",\"action\":\"Clock Out\",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('202204263', '2023-08-31 04:12:51', '/user', 'POST', '{\"x-api-key\":\"zMTT3c00nYnKfKlmLAfdO9K2IE6rHn\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"fdecf65f-1441-44dc-a117-54f82d415171\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"202204263\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Profile retrieved successfully\",\"data\":{\"EmployeeId\":\"202204263\",\"EmployeeFullName\":\"Arvid Theodorus\",\"PrimaryEmail\":\"\",\"BirthDate\":\"1 September 1990 07.00.00\",\"JoinCompany\":\"1 April 2022 07.00.00\",\"Position\":\"-\",\"Level\":\"-\",\"Work\":\"-\"}}'),
('232323232', '2023-08-31 04:15:15', '/verify-token', 'POST', '{\"x-api-key\":\"zMTT3c00nYnKfKlmLAfdO9K2IE6rHn\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"36501dfe-b8f1-4f32-ab68-138fd47a8ca4\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"232323232\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Success\",\"data\":{}}'),
('200249182', '2023-08-31 04:18:51', '/logout', 'POST', '{\"x-api-key\":\"ALoC1uk2jrDo8brxNn3749tatgOSREd\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"a5201632-2678-43e8-8e92-a8b2152e10fe\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"200249182\"}', 403, '{\"respCode\":\"02\",\"respMsg\":\"Forbidden\",\"data\":{}}'),
('200249182', '2023-08-31 04:19:05', '/logout', 'POST', '{\"x-api-key\":\"ALoC1uk2jrDo8brxNn3749tatgOSREdd\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"8337f3bf-ef7d-4248-bef8-3fd08b6b952c\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"200249182\"}', 403, '{\"respCode\":\"02\",\"respMsg\":\"Forbidden\",\"data\":{}}'),
('200249182', '2023-08-31 04:19:16', '/logout', 'POST', '{\"x-api-key\":\"qZ7je2HXeR7BcKkWfbADO3rrE1TmAy\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"b8940cd1-800a-44d4-9f4b-2985c1a48c63\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"200249182\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Logout successful\",\"data\":{}}'),
('232323232', '2023-08-31 04:27:34', '/login-otp', 'POST', '{\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"0024f5b1-37bc-49a5-9652-2e9f5117372e\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"59\"}', '{\"employeeId\":\"232323232\",\"otp\":\"8058328\"}', 404, '{\"respCode\":\"03\",\"respMsg\":\"Invalid OTP\",\"data\":{}}');

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
('232323232', '396482', '2023-11-26 14:03:46', '2023-08-28 14:03:49', 'farkhanmaul@gmail.com'),
('232323232', '702871', '2023-11-27 11:00:14', '2023-08-29 11:00:17', 'farkhanmaul@gmail.com'),
('232323232', '027955', '2023-11-27 11:04:13', '2023-08-29 11:04:16', 'farkhanmaul@gmail.com'),
('232323232', '626680', '2023-11-27 11:07:04', '2023-08-29 11:07:07', 'farkhanmaul@gmail.com'),
('232323232', '921865', '2023-11-27 11:08:24', '2023-08-29 11:08:26', 'farkhanmaul@gmail.com'),
('232323232', '379523', '2023-11-27 11:22:38', '2023-08-29 11:22:41', 'farkhanmaul@gmail.com'),
('232323232', '388354', '2023-11-27 11:24:26', '2023-08-29 11:24:29', 'farkhanmaul@gmail.com'),
('232323232', '617547', '2023-11-27 11:30:42', '2023-08-29 11:30:45', 'farkhanmaul@gmail.com'),
('232323232', '794467', '2023-11-27 11:45:47', '2023-08-29 11:45:52', 'farkhanmaul@gmail.com'),
('232323232', '530051', '2023-11-27 13:29:18', '2023-08-29 13:29:22', 'farkhanmaul@gmail.com'),
('232323232', '145056', '2023-11-27 13:31:48', '2023-08-29 13:31:51', 'farkhanmaul@gmail.com'),
('232323232', '118237', '2023-11-27 13:32:25', '2023-08-29 13:32:27', 'farkhanmaul@gmail.com'),
('232323232', '777837', '2023-11-27 13:33:26', '2023-08-29 13:33:29', 'farkhanmaul@gmail.com'),
('232323232', '042490', '2023-11-27 13:34:29', '2023-08-29 13:34:32', 'farkhanmaul@gmail.com'),
('232323232', '644764', '2023-11-27 13:35:25', '2023-08-29 13:35:28', 'farkhanmaul@gmail.com'),
('232323232', '791701', '2023-11-27 13:37:05', '2023-08-29 13:37:09', 'farkhanmaul@gmail.com'),
('232323232', '407745', '2023-11-27 13:39:02', '2023-08-29 13:39:05', 'farkhanmaul@gmail.com'),
('232323232', '325103', '2023-11-27 13:39:39', '2023-08-29 13:39:41', 'farkhanmaul@gmail.com'),
('232323232', '104717', '2023-11-27 13:40:54', '2023-08-29 13:40:56', 'farkhanmaul@gmail.com'),
('232323232', '964091', '2023-11-27 13:45:23', '2023-08-29 13:45:26', 'farkhanmaul@gmail.com'),
('232323232', '348504', '2023-11-27 13:47:45', '2023-08-29 13:47:49', 'farkhanmaul@gmail.com'),
('232323232', '936393', '2023-11-27 13:48:49', '2023-08-29 13:48:51', 'farkhanmaul@gmail.com'),
('232323232', '065148', '2023-11-27 13:53:35', '2023-08-29 13:53:38', 'farkhanmaul@gmail.com'),
('232323232', '429923', '2023-11-27 13:55:15', '2023-08-29 13:55:18', 'farkhanmaul@gmail.com'),
('232323232', '035062', '2023-11-27 13:56:07', '2023-08-29 13:56:09', 'farkhanmaul@gmail.com'),
('232323232', '234007', '2023-11-27 14:26:08', '2023-08-29 14:26:11', 'farkhanmaul@gmail.com'),
('232323232', '750494', '2023-11-27 14:26:54', '2023-08-29 14:26:58', 'farkhanmaul@gmail.com'),
('232323232', '158913', '2023-11-27 16:59:16', '2023-08-29 16:59:19', 'farkhanmaul@gmail.com'),
('232323232', '897283', '2023-11-28 10:52:26', '2023-08-30 10:52:29', 'farkhanmaul@gmail.com'),
('232323232', '773425', '2023-11-28 10:54:00', '2023-08-30 10:54:02', 'farkhanmaul@gmail.com'),
('232323232', '374430', '2023-11-28 11:00:54', '2023-08-30 11:00:56', 'farkhanmaul@gmail.com'),
('232323232', '431630', '2023-11-28 11:07:29', '2023-08-30 11:07:32', 'farkhanmaul@gmail.com'),
('232323232', '363982', '2023-11-28 11:08:23', '2023-08-30 11:08:26', 'farkhanmaul@gmail.com'),
('232323232', '386105', '2023-11-28 11:12:26', '2023-08-30 11:12:29', 'farkhanmaul@gmail.com'),
('232323232', '517478', '2023-11-28 11:12:57', '2023-08-30 11:13:01', 'farkhanmaul@gmail.com'),
('232323232', '142190', '2023-11-28 17:11:15', '2023-08-30 17:11:18', 'farkhanmaul@gmail.com'),
('232323232', '190274', '2023-11-29 10:13:25', '2023-08-31 10:13:28', 'farkhanmaul@gmail.com'),
('232323232', '411925', '2023-11-29 10:15:12', '2023-08-31 10:15:15', 'farkhanmaul@gmail.com'),
('232323232', '825586', '2023-11-29 10:25:37', '2023-08-31 10:25:41', 'farkhanmaul@gmail.com'),
('232323232', '891436', '2023-11-29 10:29:49', '2023-08-31 10:29:51', 'farkhanmaul@gmail.com'),
('232323232', '152778', '2023-11-29 10:32:35', '2023-08-31 10:32:38', 'farkhanmaul@gmail.com'),
('232323232', '566400', '2023-11-29 10:32:51', '2023-08-31 10:32:53', 'farkhanmaul@gmail.com'),
('232323232', '362005', '2023-11-29 10:33:36', '2023-08-31 10:33:39', 'farkhanmaul@gmail.com'),
('232323232', '552790', '2023-11-29 10:34:11', '2023-08-31 10:34:14', 'farkhanmaul@gmail.com'),
('232323232', '275677', '2023-11-29 10:35:48', '2023-08-31 10:35:50', 'farkhanmaul@gmail.com'),
('232323232', '405636', '2023-11-29 10:40:53', '2023-08-31 10:40:56', 'farkhanmaul@gmail.com');

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
('232323232', 0, 1231440, 12.3457, '2023-08-31 11:12:40', 'bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir  bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hilir bendungan hili', 'Clock Out', 'izin wfh'),
('232323232', 0, 1231440, 12.3457, '2023-08-31 11:12:48', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh');

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
('232323232', 'qZ7je2HXeR7BcKkWfbADO3rrE1TmAy', '2023-11-23 09:40:05', '0000-00-00 00:00:00', 'closed'),
('232323232', 'zMTT3c00nYnKfKlmLAfdO9K2IE6rHn', '2023-11-23 09:44:24', '0000-00-00 00:00:00', 'closed'),
('232323232', 'ALoC1uk2jrDo8brxNn3749tatgOSRE', '2023-11-23 11:02:14', '0000-00-00 00:00:00', 'closed'),
('232323232', 'nUT2fH1DFuBMf93lxmWs3nCr3qR8XX', '2023-11-23 11:02:15', '0000-00-00 00:00:00', ''),
('232323232', 'K7xHVL5z7jDGEgz6x2Bp8k9kHmTO51', '2023-11-26 11:00:02', '0000-00-00 00:00:00', 'open'),
('232323232', '046b8eyOLbFiGAsWPhDE8JYlqe3wOX', '2023-11-26 11:00:54', '2023-08-28 11:00:54', 'open'),
('232323232', 'wtTS5sOS3CYLF9sUtvRiM7ErYYXO42', '2023-11-26 14:05:10', '2023-08-28 14:05:10', 'open'),
('232323232', 'wDQgjrgWvDFNOnkXGC22IWmVUkbu9Q', '2023-11-26 14:06:48', '2023-08-28 14:06:48', 'open'),
('232323232', 'MELsw3WNEKgydjNETHxL284qEPNutD', '2023-11-27 17:05:30', '2023-08-29 17:05:30', 'open'),
('232323232', 'E3wqFdHT2p4VchLgpSQCoK96EpQCng', '2023-11-27 17:07:43', '2023-08-29 17:07:43', 'open');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
