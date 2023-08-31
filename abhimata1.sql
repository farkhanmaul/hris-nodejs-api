-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 31, 2023 at 10:08 AM
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
('232323232', '2023-08-31 04:27:34', '/login-otp', 'POST', '{\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"0024f5b1-37bc-49a5-9652-2e9f5117372e\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"59\"}', '{\"employeeId\":\"232323232\",\"otp\":\"8058328\"}', 404, '{\"respCode\":\"03\",\"respMsg\":\"Invalid OTP\",\"data\":{}}'),
('232323232', '2023-08-31 04:44:05', '/verify-token', 'POST', '{\"x-api-key\":\"zMTT3c00nYnKfKlmLAfdO9K2IE6rHn\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"7797f559-e141-4356-8ae8-c3b3b9acca89\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"232323232\"}', 500, '{\"respCode\":\"99\",\"respMsg\":\"Internal Server Error\",\"data\":{}}'),
('232323232', '2023-08-31 04:44:50', '/verify-token', 'POST', '{\"x-api-key\":\"zMTT3c00nYnKfKlmLAfdO9K2IE6rHn\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"7d99fb9c-b4c8-4643-9399-c144ba79dbc6\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"232323232\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Success\",\"data\":{}}'),
('23232323', '2023-08-31 04:45:00', '/verify-token', 'POST', '{\"x-api-key\":\"zMTT3c00nYnKfKlmLAfdO9K2IE6rHn\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"4346e2d5-7f18-4052-8364-d81abf451fd8\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"35\"}', '{\"employeeId\":\"23232323\"}', 403, '{\"respCode\":\"04\",\"respMsg\":\"Token does not match employee ID\",\"data\":{}}'),
('232323232', '2023-08-31 04:45:03', '/verify-token', 'POST', '{\"x-api-key\":\"zMTT3c00nYnKfKlmLAfdO9K2IE6rHn\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"33262e17-e807-4f6a-a115-12d467f046f7\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"232323232\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Success\",\"data\":{}}'),
('232323232', '2023-08-31 04:45:19', '/verify-token', 'POST', '{\"x-api-key\":\"qZ7je2HXeR7BcKkWfbADO3rrE1TmAy\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"60eb422b-cc27-4665-90c6-62bc63ab3f97\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"232323232\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Success\",\"data\":{}}'),
('232323232', '2023-08-31 04:45:30', '/verify-token', 'POST', '{\"x-api-key\":\"qZ7je2HXeR7BcKkWfbADO3rrE1TmAy\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"8103553e-5b5a-44f3-bd05-a0f11818ebd7\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"232323232\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Success\",\"data\":{}}'),
('232323232', '2023-08-31 04:45:52', '/verify-token', 'POST', '{\"x-api-key\":\"qZ7je2HXeR7BcKkWfbADO3rrE1TmAy\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"f3930b41-7def-4bfa-bcb6-30802039e478\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"232323232\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Success\",\"data\":{}}'),
('232323232', '2023-08-31 04:46:00', '/verify-token', 'POST', '{\"x-api-key\":\"qZ7je2HXeR7BcKkWfbADO3rrE1TmAy\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"53a5f0ab-9086-4df6-aaaf-e601f899210c\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"232323232\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Success\",\"data\":{}}'),
('232323232', '2023-08-31 04:46:24', '/verify-token', 'POST', '{\"x-api-key\":\"qZ7je2HXeR7BcKkWfbADO3rrE1TmAy\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"a597e0ed-2011-4c41-8edc-61418507b70f\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"232323232\"}', 403, '{\"respCode\":\"05\",\"respMsg\":\"Token is closed\",\"data\":{}}'),
('232323232', '2023-08-31 04:57:23', '/verify-token', 'POST', '{\"x-api-key\":\"qZ7je2HXeR7BcKkWfbADO3rrE1TmAy\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"06a6f533-ec82-420d-adfb-4757af771851\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"232323232\"}', 403, '{\"respCode\":\"05\",\"respMsg\":\"Token is closed\",\"data\":{}}'),
('232323232', '2023-08-31 04:57:33', '/verify-token', 'POST', '{\"x-api-key\":\"K7xHVL5z7jDGEgz6x2Bp8k9kHmTO51\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"618c1eda-e0b4-4540-b975-e6a9b76ce194\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"232323232\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Success\",\"data\":{}}'),
('23232323', '2023-08-31 04:57:37', '/verify-token', 'POST', '{\"x-api-key\":\"K7xHVL5z7jDGEgz6x2Bp8k9kHmTO51\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"b2df25b4-22f5-4b1f-a617-a8dc85fd4104\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"35\"}', '{\"employeeId\":\"23232323\"}', 403, '{\"respCode\":\"04\",\"respMsg\":\"Token does not match employee ID\",\"data\":{}}'),
('232323232', '2023-08-31 04:57:43', '/verify-token', 'POST', '{\"x-api-key\":\"K7xHVL5z7jDGEgz6x2Bp8k9kHmTO51\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"84ae4988-ecf3-45ef-a70b-2db2ae9ab520\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"36\"}', '{\"employeeId\":\"232323232\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Success\",\"data\":{}}'),
('232323232', '2023-08-31 04:57:50', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"0ef2a119-7d3d-4337-9312-82d16b55acb1\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-30\",\"action\":\"Clock Out\"}', 404, '{\"respCode\":\"01\",\"respMsg\":\"No clock data found for the specified date and action\",\"data\":{}}'),
('232323232', '2023-08-31 04:57:59', '/attendance', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"3417d7e0-a8e9-4ccc-b0e9-dba1ec6b9987\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"215\"}', '{\"employeeId\":\"232323232\",\"longitude\":\"dghdhdh\",\"altitude\":\"1231444\",\"latitude\":\"12.345678\",\"locationName\":\"bendungan hilir jakarta pusat \",\"action\":\"Clock Out\",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 06:27:21', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"69a9ba84-5873-4110-af9c-cd3ba4625ddc\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-30\",\"action\":\"Clock Out\"}', 404, '{\"respCode\":\"01\",\"respMsg\":\"No clock data found for the specified date and action\",\"data\":{}}'),
('232323232', '2023-08-31 06:27:25', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"7b87b0a1-0c82-41ad-a6fa-078f1c4b2acd\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-31\",\"action\":\"Clock Out\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Clock time retrieved successfully\",\"data\":{\"clockTime\":\"11:57\",\"action\":\"Clock Out\",\"clockDate\":\"2023-08-30T17:00:00.000Z\"}}'),
('232323232', '2023-08-31 06:27:28', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"fe702b60-624e-4267-a617-2dd5cc77ac7b\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-31\",\"action\":\"Clock Out\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Clock time retrieved successfully\",\"data\":{\"clockTime\":\"11:57\",\"action\":\"Clock Out\",\"clockDate\":\"2023-08-30T17:00:00.000Z\"}}'),
('232323232', '2023-08-31 06:29:31', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"3beb2c93-1457-42dd-8bdc-859e46a73bc6\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-31\",\"action\":\"Clock Out\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Clock time retrieved successfully\",\"data\":{\"clockTime\":\"11:57\",\"action\":\"Clock Out\",\"clockDate\":\"31 Agustus 2023 00.00.00\"}}'),
('232323232', '2023-08-31 06:30:59', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"549ce06b-3db3-4b51-98cf-4fd0dfb4cda7\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-31\",\"action\":\"Clock Out\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Clock time retrieved successfully\",\"data\":{\"clockTime\":\"11:57\",\"action\":\"Clock Out\",\"clockDate\":\"2023-08-30T17:00:00.000Z\"}}'),
('232323232', '2023-08-31 06:32:03', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"cdcb39e4-55d4-4d40-aaad-2d049538115f\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-31\",\"action\":\"Clock Out\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Clock time retrieved successfully\",\"data\":{\"clockTime\":\"11:57\",\"action\":\"Clock Out\",\"clockDate\":\"31 Agustus 2023\"}}'),
('232323232', '2023-08-31 06:32:04', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"0521fed0-67c6-4df6-9548-50202cb1a2a6\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-31\",\"action\":\"Clock Out\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Clock time retrieved successfully\",\"data\":{\"clockTime\":\"11:57\",\"action\":\"Clock Out\",\"clockDate\":\"31 Agustus 2023\"}}'),
('232323232', '2023-08-31 06:32:50', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"66f6cb8d-077c-4f20-9ea9-423dc3ea0a07\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-31\",\"action\":\"Clock Out\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Clock time retrieved successfully\",\"data\":{\"clockTime\":\"11:57\",\"clockDate\":\"31 Agustus 2023\",\"action\":\"Clock Out\"}}'),
('232323232', '2023-08-31 06:37:37', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"ccd0ffcf-5d60-4fe0-8afb-50e2d5c25333\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-31\",\"action\":\"Clock Out\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Clock time retrieved successfully\",\"data\":{\"clockTime\":\"11:57\",\"clockDate\":\"31 Agustus 2023\",\"action\":\"Clock Out\"}}'),
('232323232', '2023-08-31 06:56:40', '/attendance', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"f26d36e3-1580-4bca-b1e2-df6597a25304\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"215\"}', '{\"employeeId\":\"232323232\",\"longitude\":\"dghdhdh\",\"altitude\":\"1231444\",\"latitude\":\"12.345678\",\"locationName\":\"bendungan hilir jakarta pusat \",\"action\":\"Clock Out\",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 07:01:34', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"e9376e51-c592-49f5-91f9-2eb8f8a35529\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-31\",\"action\":\"Clock Out\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Clock time retrieved successfully\",\"data\":{\"clockTime\":\"13:56\",\"clockDate\":\"31 Agustus 2023\",\"action\":\"Clock Out\"}}'),
('232323232', '2023-08-31 07:01:39', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"5d53af2f-d4b6-4e46-af94-a43a7564bef0\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"85\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-31\",\"action\":\"Clock in\"}', 404, '{\"respCode\":\"01\",\"respMsg\":\"No clock data found for the specified date and action\",\"data\":{}}'),
('232323232', '2023-08-31 07:01:55', '/user-attendance-clock', 'POST', '{\"x-api-key\":\"nUT2fH1DFuBMf93lxmWs3nCr3qR8XX\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"55d895df-4616-482c-82a4-11f479e761f8\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"86\"}', '{\"employeeId\":\"232323232\",\"date\":\"2023-08-31\",\"action\":\"Clock out\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Clock time retrieved successfully\",\"data\":{\"clockTime\":\"13:56\",\"clockDate\":\"31 Agustus 2023\",\"action\":\"Clock Out\"}}'),
('2323', '2023-08-31 07:56:09', '/attendance', 'POST', '{\"x-api-key\":\"zjOyM0WaNjZbavfIuOCIUiLipKX58d\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"c63e517a-0b42-41e2-a2bc-988eea178e33\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"209\"}', '{\"longitude\":\"452525\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"2323\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 403, '{\"respCode\":\"04\",\"respMsg\":\"Token does not match employee ID\",\"data\":{}}'),
('232323232', '2023-08-31 07:56:42', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"3a8d856b-b9ef-4011-835c-c1f3953cde25\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"214\"}', '{\"longitude\":\"452525\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 07:56:47', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"ce25b487-f577-410f-96a6-fe6ff9367842\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"212\"}', '{\"longitude\":\"null\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 07:57:24', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"00df96c3-8429-4ec7-96d3-a6e1b10a27e5\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"212\"}', '{\"longitude\":\"null\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 07:57:35', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"2164eb5b-6ac0-425f-a711-8b27e08e6ac8\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"212\"}', '{\"longitude\":\"4132\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 07:59:27', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"40ef5825-2c58-4a9b-b12c-084e3f7bac2c\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"212\"}', '{\"longitude\":\"4132\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 07:59:30', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"88cbcb6d-8871-4d2a-a798-7877193f6b12\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"214\"}', '{\"longitude\":\"sdadas\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 07:59:55', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"8f5a218f-58ce-4c3f-8bb3-5bc05cf3b37f\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"209\"}', '{\"longitude\":\"0\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 07:59:59', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"83041cf4-caf0-4175-8217-2f28d873206e\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"208\"}', '{\"longitude\":\"\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 08:00:40', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"ea0fe356-7553-493e-9fd7-2e9c34cf310a\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"208\"}', '{\"longitude\":\"\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 08:02:07', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"7573f827-0354-4cac-a11e-598a597eb824\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"208\"}', '{\"longitude\":\"\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 08:02:11', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"f4e08864-f5de-48b6-bed4-9862d911327e\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"209\"}', '{\"longitude\":\"s\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 08:02:14', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"a7133830-ed5b-429c-a1ab-98c73af2e6bf\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"209\"}', '{\"longitude\":\"s\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 08:02:41', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"10b2a67d-3a15-4e8c-a9e5-4327e90bdea1\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"209\"}', '{\"longitude\":\"s\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}'),
('232323232', '2023-08-31 08:06:11', '/attendance', 'POST', '{\"x-api-key\":\"GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4\",\"content-type\":\"application/json\",\"user-agent\":\"PostmanRuntime/7.32.3\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"fcd7cba4-0b3d-4e34-9d21-ed54d8550eb5\",\"host\":\"localhost:3030\",\"accept-encoding\":\"gzip, deflate, br\",\"connection\":\"keep-alive\",\"content-length\":\"209\"}', '{\"longitude\":\"s\",\"altitude\":\"1231444\",\"action\":\"Clock Out\",\"latitude\":\"12.345678\",\"employeeId\":\"232323232\",\"locationName\":\"bendungan hilir jakarta pusat \",\"notes\":\"izin wfh\"}', 200, '{\"respCode\":\"00\",\"respMsg\":\"Employee presence recorded successfully\",\"data\":{}}');

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
('232323232', 0, 1231440, 12.3457, '2023-08-31 11:12:48', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 1231440, 12.3457, '2023-08-31 11:57:59', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 1231440, 12.3457, '2023-08-31 13:56:40', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 452525, 1231440, 12.3457, '2023-08-31 14:56:42', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 1231440, 12.3457, '2023-08-31 14:56:47', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 1231440, 12.3457, '2023-08-31 14:57:24', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 4132, 1231440, 12.3457, '2023-08-31 14:57:35', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 4132, 1231440, 12.3457, '2023-08-31 14:59:27', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 1231440, 12.3457, '2023-08-31 14:59:30', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 1231440, 12.3457, '2023-08-31 14:59:55', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 1231440, 12.3457, '2023-08-31 14:59:59', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 1231440, 12.3457, '2023-08-31 15:00:40', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 0, 0, '2023-08-31 15:02:07', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 0, 0, '2023-08-31 15:02:11', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 0, 0, '2023-08-31 15:02:14', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 1231440, 12.3457, '2023-08-31 15:02:41', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh'),
('232323232', 0, 1231440, 12.3457, '2023-08-31 15:06:11', 'bendungan hilir jakarta pusat ', 'Clock Out', 'izin wfh');

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
