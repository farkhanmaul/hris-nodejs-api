-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2023 at 05:54 AM
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
-- Database: `mdbacamobile`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_logs`
--

CREATE TABLE `api_logs` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(9) NOT NULL,
  `timestamp` datetime NOT NULL,
  `endpoint` varchar(255) NOT NULL,
  `method` varchar(10) NOT NULL,
  `request_headers` text NOT NULL,
  `request_body` text NOT NULL,
  `response_status` int(11) NOT NULL,
  `response_message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `attendance_time_range`
--

CREATE TABLE `attendance_time_range` (
  `id` int(11) NOT NULL,
  `range_name` varchar(50) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance_time_range`
--

INSERT INTO `attendance_time_range` (`id`, `range_name`, `start_time`, `end_time`) VALUES
(1, 'Clock In', '07:00:00', '11:00:00'),
(2, 'Clock Break In', '11:00:00', '15:00:00'),
(3, 'Clock Out', '15:00:00', '19:00:00'),
(4, 'Work Time', '08:00:00', '17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `global_variables`
--

CREATE TABLE `global_variables` (
  `id` int(11) NOT NULL,
  `key_name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `global_variables`
--

INSERT INTO `global_variables` (`id`, `key_name`, `value`) VALUES
(2, 'API VERSION', 'V1'),
(3, 'force_attendance_photo', 'ON'),
(7, 'destinationAttendancePhoto', './uploads/'),
(8, 'only_clock_in', 'ON'),
(9, 'interval_booking_time', '15');

-- --------------------------------------------------------

--
-- Table structure for table `room_booking`
--

CREATE TABLE `room_booking` (
  `id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `booker_employee_id` int(11) NOT NULL,
  `pic_employee_id` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `meeting_topic` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room_booking`
--


-- --------------------------------------------------------

--
-- Table structure for table `room_booking_guest`
--

CREATE TABLE `room_booking_guest` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `room_header`
--

CREATE TABLE `room_header` (
  `id` int(11) NOT NULL,
  `room_name` varchar(255) NOT NULL,
  `capacity` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `room_image` varchar(255) DEFAULT NULL,
  `floor_location` int(11) DEFAULT NULL,
  `projector` tinyint(1) DEFAULT NULL,
  `microphone` tinyint(1) DEFAULT NULL,
  `whiteboard` tinyint(1) DEFAULT NULL,
  `webcam` tinyint(1) DEFAULT NULL,
  `availability` tinyint(1) DEFAULT NULL,
  `additional_notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room_header`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_attendance`
--

CREATE TABLE `user_attendance` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(9) NOT NULL,
  `longitude` float NOT NULL,
  `altitude` float NOT NULL,
  `latitude` float NOT NULL,
  `datetime` datetime NOT NULL,
  `location_name` varchar(255) NOT NULL,
  `action` varchar(20) NOT NULL,
  `notes` text NOT NULL,
  `photo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_device`
--

CREATE TABLE `user_device` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(9) NOT NULL,
  `device_id` varchar(255) NOT NULL,
  `inserted_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_otp`
--

CREATE TABLE `user_otp` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(9) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expired_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `email` varchar(256) DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_token`
--

CREATE TABLE `user_token` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(9) NOT NULL,
  `token` varchar(30) NOT NULL,
  `expired_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `status` enum('open','closed') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_token`
--


--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_logs`
--
ALTER TABLE `api_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendance_time_range`
--
ALTER TABLE `attendance_time_range`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `global_variables`
--
ALTER TABLE `global_variables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_booking`
--
ALTER TABLE `room_booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `room_booking_guest`
--
ALTER TABLE `room_booking_guest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `room_header`
--
ALTER TABLE `room_header`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_attendance`
--
ALTER TABLE `user_attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_device`
--
ALTER TABLE `user_device`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_otp`
--
ALTER TABLE `user_otp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_token`
--
ALTER TABLE `user_token`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_logs`
--
ALTER TABLE `api_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendance_time_range`
--
ALTER TABLE `attendance_time_range`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `global_variables`
--
ALTER TABLE `global_variables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `room_booking`
--
ALTER TABLE `room_booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `room_booking_guest`
--
ALTER TABLE `room_booking_guest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room_header`
--
ALTER TABLE `room_header`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_attendance`
--
ALTER TABLE `user_attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_device`
--
ALTER TABLE `user_device`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_otp`
--
ALTER TABLE `user_otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_token`
--
ALTER TABLE `user_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `room_booking`
--
ALTER TABLE `room_booking`
  ADD CONSTRAINT `room_booking_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `room_header` (`id`);

--
-- Constraints for table `room_booking_guest`
--
ALTER TABLE `room_booking_guest`
  ADD CONSTRAINT `room_booking_guest_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `room_booking` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
