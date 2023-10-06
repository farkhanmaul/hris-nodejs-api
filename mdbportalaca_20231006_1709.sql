-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2023 at 12:09 PM
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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_hp` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telegram_id` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `no_tlp_kantor` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `st_active` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_otp_web`
--

CREATE TABLE `user_otp_web` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(9) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expired_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `email` varchar(256) NOT NULL,
  `no_hp` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_otp_web`
--

INSERT INTO `user_otp_web` (`id`, `employee_id`, `otp`, `expired_at`, `created_at`, `email`, `no_hp`) VALUES
(1, '232323232', '961176', '2023-12-18 15:23:22', '2023-09-19 15:23:26', 'farkhanmaul@gmail.com', 'none'),
(2, '232323232', '404593', '2023-12-31 14:07:50', '2023-10-02 14:07:53', 'farkhanmaul@gmail.com', 'none'),
(3, '232323232', '179785', '2023-12-31 14:26:13', '2023-10-02 14:26:18', 'farkhanmaul@gmail.com', 'none'),
(4, '232323232', '121860', '2024-01-02 11:12:41', '2023-10-04 11:12:45', 'farkhanmaul@gmail.com', 'none'),
(5, '232323232', '374782', '2024-01-02 11:16:42', '2023-10-04 11:16:44', 'farkhanmaul@gmail.com', 'none'),
(6, '232323232', '278422', '2024-01-02 11:19:20', '2023-10-04 11:19:23', 'farkhanmaul@gmail.com', 'none'),
(7, '232323232', '255442', '2024-01-04 13:14:38', '2023-10-06 13:14:40', 'farkhanmaul@gmail.com', 'none'),
(8, '232323232', '025414', '2024-01-04 15:44:39', '2023-10-06 15:44:41', 'farkhanmaul@gmail.com', 'none');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_un` (`username`);

--
-- Indexes for table `user_otp_web`
--
ALTER TABLE `user_otp_web`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_otp_web`
--
ALTER TABLE `user_otp_web`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
