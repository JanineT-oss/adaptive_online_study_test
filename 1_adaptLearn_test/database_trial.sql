-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 03, 2022 at 11:43 AM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database_trial`
--

-- --------------------------------------------------------

--
-- Table structure for table `consent`
--

CREATE TABLE `consent` (
  `consent1` varchar(255) DEFAULT NULL,
  `consent2` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- --------------------------------------------------------

--
-- Table structure for table `demographics`
--

CREATE TABLE `demographics` (
  `age` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `education` varchar(255) NOT NULL,
  `employment` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- --------------------------------------------------------

--
-- Table structure for table `exp1`
--

CREATE TABLE `exp1` (
  `rt` int(11) DEFAULT NULL,
  `stimulus` varchar(20000) DEFAULT NULL,
  `response` varchar(255) DEFAULT NULL,
  `task` varchar(255) DEFAULT NULL,
  `correct_response` varchar(255) DEFAULT NULL,
  `trial_type` varchar(255) DEFAULT NULL,
  `trial_index` int(11) DEFAULT NULL,
  `time_elapsed` int(11) DEFAULT NULL,
  `internal_node_id` varchar(255) DEFAULT NULL,
  `correct` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Table structure for table `questionnaires`
--

CREATE TABLE `questionnaires` (
  `audit1` varchar(11) NOT NULL,
  `audit2` varchar(11) NOT NULL,
  `audit3` varchar(10) NOT NULL,
  `audit4` varchar(10) NOT NULL,
  `audit5` varchar(10) NOT NULL,
  `audit6` varchar(10) NOT NULL,
  `audit7` varchar(10) NOT NULL,
  `audit8` varchar(10) NOT NULL,
  `audit9` varchar(10) NOT NULL,
  `audit10` varchar(10) NOT NULL,
  `LA1` varchar(255) NOT NULL,
  `LA2` varchar(255) NOT NULL,
  `LA3` varchar(255) NOT NULL,
  `LA4` varchar(100) NOT NULL,
  `LA5` varchar(100) NOT NULL,
  `LA6` varchar(100) NOT NULL,
  `LA7` varchar(100) NOT NULL,
  `RA1` varchar(100) NOT NULL,
  `RA2` varchar(100) NOT NULL,
  `RA3` varchar(100) NOT NULL,
  `RA4` varchar(100) NOT NULL,
  `IU1` varchar(100) NOT NULL,
  `IU2` varchar(100) NOT NULL,
  `IU3` varchar(100) NOT NULL,
  `IU4` varchar(100) NOT NULL,
  `IU5` varchar(100) NOT NULL,
  `SS1` varchar(2000) NOT NULL,
  `SS2` varchar(2000) NOT NULL,
  `SS3` varchar(2000) NOT NULL,
  `BIS1` varchar(11) NOT NULL,
  `BIS2` varchar(11) NOT NULL,
  `BIS3` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
