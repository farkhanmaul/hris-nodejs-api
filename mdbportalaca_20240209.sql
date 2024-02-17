-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2024 at 03:57 PM
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
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `display_name` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `creaby` varchar(9) DEFAULT NULL,
  `dtcrea` timestamp NULL DEFAULT NULL,
  `modiby` varchar(9) DEFAULT NULL,
  `dtmodi` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `display_name`, `description`, `creaby`, `dtcrea`, `modiby`, `dtmodi`) VALUES
(23, 'superadmin', 'superadmin', 'super admin portal aca', '202204263', '2023-10-16 01:36:50', NULL, NULL),
(24, 'superuser', 'superuser', 'super user portal aca', '202204263', '2023-10-16 01:36:50', NULL, NULL),
(25, 'user', 'User', 'portal aca user only', '202204263', '2023-10-18 00:17:47', '202204263', '2023-10-18 00:42:03'),
(26, 'tracker-project-view', 'Tracker - Project - View', 'user can only view project menu on tracker', '202204263', '2023-10-18 00:56:17', '202204263', '2023-10-18 00:58:32'),
(27, 'tracker-project-create', 'Tracker - Project - Create', 'user can only create in project menu on tracker', '202204263', '2023-10-18 00:57:04', '202204263', '2023-10-18 00:58:12'),
(28, 'tracker-project-update', 'Tracker - Project - Update', 'user can only update and delete data in project menu on Tracker', '202204263', '2023-10-18 00:57:37', '202204263', '2023-10-18 00:58:20'),
(29, 'admin-pullgit', 'Admin - Pull Git', 'Permission for Pull Git only', '202204263', '2023-10-19 00:15:33', NULL, NULL),
(30, 'admin-user-view', 'Admin - User - View', 'Permission for view user in admin menu', '202204263', '2023-10-19 00:15:33', NULL, NULL),
(31, 'admin-user-create', 'Admin - User - Create', 'Permission for create user in admin menu', '202204263', '2023-10-19 00:15:33', NULL, NULL),
(32, 'admin-user-update', 'Admin - User - Update', 'Permission for update user in admin menu', '202204263', '2023-10-19 00:15:33', NULL, NULL),
(33, 'admin-role-view', 'Admin - Role - View', 'Permission for view role in admin menu', '202204263', '2023-10-19 00:15:33', NULL, NULL),
(34, 'admin-role-create', 'Admin - Role - Create', 'Permission for create role in admin menu', '202204263', '2023-10-19 00:15:33', NULL, NULL),
(35, 'admin-role-update', 'Admin - Role - Update', 'Permission for update role in admin menu', '202204263', '2023-10-19 00:15:33', NULL, NULL),
(36, 'admin-permission-view', 'Admin - Permission - View', 'Permission for view permission in admin menu', '202204263', '2023-10-19 00:15:33', NULL, NULL),
(37, 'admin-permission-create', 'Admin - Permission - Create', 'Permission for create permission in admin menu', '202204263', '2023-10-19 00:15:33', NULL, NULL),
(38, 'admin-permission-update', 'Admin - Permission - Update', 'Permission for update permission in admin menu', '202204263', '2023-10-19 00:15:33', NULL, NULL),
(39, 'tracker-employee-view', 'Tracker - Empoyee - View', 'Permission for view employee menu on trackermenu', '202204263', '2023-10-19 00:36:05', NULL, NULL),
(40, 'dashboard-employeepresence-view', 'Dashboard - Employee Presence - View', 'Permission for view employee presence in dashboard menu', '202204263', '2023-10-19 00:37:57', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `display_name` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `creaby` varchar(9) DEFAULT NULL,
  `dtcrea` timestamp NULL DEFAULT NULL,
  `modiby` varchar(9) DEFAULT NULL,
  `dtmodi` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `display_name`, `description`, `creaby`, `dtcrea`, `modiby`, `dtmodi`) VALUES
(8, 'superadmin', 'Super Admin', 'role super admin portal aca', '202204263', '2023-10-16 01:36:50', NULL, NULL),
(9, 'superuser', 'Super User', 'super userportal aca', '202204263', '2023-10-16 01:36:50', NULL, NULL),
(10, 'tracker_project_admin', 'Tracker - Project - Admin', 'role for project menu admin on Tracker', '202204263', '2023-10-18 01:36:35', '202204263', '2023-10-18 02:58:02'),
(11, 'tracker-project-create', 'Tracker - Project - Create', 'create project only', '202204263', '2023-10-18 02:34:21', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `id` int(11) NOT NULL,
  `roles_id` int(11) DEFAULT NULL,
  `permissions_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`id`, `roles_id`, `permissions_id`) VALUES
(25, 1, 1),
(26, 1, 2),
(27, 4, 7),
(28, 7, 8),
(29, 3, 7),
(30, 3, 8),
(31, 3, 9),
(32, 1, 10),
(33, 1, 11),
(34, 1, 12),
(35, 1, 13),
(36, 1, 14),
(37, 1, 15),
(38, 1, 16),
(39, 1, 17),
(40, 1, 18),
(41, 1, 19),
(42, 1, 20),
(43, 1, 22);

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
(1, '202204263', '014544', '2024-02-25 10:14:30', '2023-11-27 10:14:34', 'farkhanmaul@gmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(9) DEFAULT NULL,
  `roles_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`id`, `employee_id`, `roles_id`) VALUES
(9, '202204263', 1),
(10, '200901689', 1),
(11, '202307284', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_otp_web`
--
ALTER TABLE `user_otp_web`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `user_otp_web`
--
ALTER TABLE `user_otp_web`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
