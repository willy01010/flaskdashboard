-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2023 年 07 月 25 日 08:43
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `mlb`
--

-- --------------------------------------------------------

--
-- 資料表結構 `mlb_info`
--

CREATE TABLE `mlb_info` (
  `result_ID` int(255) NOT NULL,
  `computer_ID` int(1) NOT NULL,
  `date` date NOT NULL,
  `spent_time` float NOT NULL,
  `init_tp` float NOT NULL,
  `MLB_tp` float NOT NULL,
  `ue_init_dist` mediumtext NOT NULL,
  `ue_MLB_dist` mediumtext NOT NULL,
  `CIO_table` mediumtext NOT NULL,
  `init_satisfied_1_1` float NOT NULL,
  `init_satisfied_0_6` float NOT NULL,
  `init_satisfied_0_1` float NOT NULL,
  `MLB_satisfied_1_1` float NOT NULL,
  `MLB_satisfied_0_6` float NOT NULL,
  `MLB_satisfied_0_1` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `mlb_info`
--

INSERT INTO `mlb_info` (`result_ID`, `computer_ID`, `date`, `spent_time`, `init_tp`, `MLB_tp`, `ue_init_dist`, `ue_MLB_dist`, `CIO_table`, `init_satisfied_1_1`, `init_satisfied_0_6`, `init_satisfied_0_1`, `MLB_satisfied_1_1`, `MLB_satisfied_0_6`, `MLB_satisfied_0_1`) VALUES
(1, 1, '2023-07-25', 2.7, 45.26, 57.94, '[69.0, 17.0, 2.0, 0.0, 1.0, 11.0, 0.0]', '[53.0, 17.0, 8.0, 2.0, 7.0, 13.0, 0.0]', '[[0.0, -3.0, -6.0, -4.0, 5.0, -5.0, -2.0],[1.0, 0.0, -3.0, -4.0, -5.0, -3.0, -5.0],[0.0, 1.0, 0.0, 1.0, 2.0, -1.0, 6.0],[2.0, -1.0, 6.0, 0.0, -6.0, -3.0, 6.0],[0.0, 1.0, -2.0, -2.0, 0.0, 1.0, 5.0],[6.0, 1.0, -3.0, 4.0, -3.0, 0.0, 4.0],[3.0, -1.0, 0.0, -1.0, -1.0, 5.0, 0.0]]', 13, 11, 20, 19, 19, 20),
(2, 1, '2023-07-25', 1.6, 45.26, 58.05, '[69.0, 17.0, 2.0, 0.0, 1.0, 11.0, 0.0]', '[52.0, 17.0, 8.0, 2.0, 7.0, 14.0, 0.0]', '[[0.0, -3.0, -6.0, -5.0, -4.0, -6.0, -4.0],[3.0, 0.0, -4.0, -2.0, -4.0, -5.0, -3.0],[0.0, -2.0, 0.0, -4.0, 3.0, 4.0, 0.0],[-6.0, 1.0, 0.0, 0.0, 1.0, 3.0, -6.0],[1.0, -1.0, -6.0, -5.0, 0.0, -3.0, 0.0],[2.0, -1.0, -3.0, 5.0, -5.0, 0.0, -1.0],[-6.0, 4.0, -3.0, 0.0, -4.0, -5.0, 0.0]]', 13, 11, 20, 18, 18, 20),
(3, 1, '2023-07-25', 1.7, 45.26, 56.6, '[69.0, 17.0, 2.0, 0.0, 1.0, 11.0, 0.0]', '[54.0, 15.0, 8.0, 2.0, 10.0, 11.0, 0.0]', '[[0.0, -2.0, -6.0, -5.0, -6.0, -6.0, 2.0],[1.0, 0.0, 6.0, -1.0, -6.0, 1.0, 3.0],[0.0, 0.0, 0.0, 2.0, 0.0, -1.0, 1.0],[5.0, 0.0, -5.0, 0.0, -5.0, 0.0, -1.0],[5.0, -1.0, 0.0, -5.0, 0.0, -5.0, 1.0],[-1.0, 3.0, -6.0, 3.0, -5.0, 0.0, -1.0],[-3.0, 0.0, -2.0, 0.0, -1.0, -1.0, 0.0]]', 13, 11, 20, 22, 20, 20),
(4, 1, '2023-07-25', 1.9, 45.26, 57.76, '[69.0, 17.0, 2.0, 0.0, 1.0, 11.0, 0.0]', '[55.0, 15.0, 9.0, 2.0, 6.0, 13.0, 0.0]', '[[0.0, -1.0, -6.0, -4.0, -6.0, -6.0, -1.0],[2.0, 0.0, -1.0, -1.0, 0.0, -2.0, -4.0],[0.0, 1.0, 0.0, -1.0, 2.0, -1.0, -3.0],[3.0, -3.0, 4.0, 0.0, 4.0, 0.0, 1.0],[3.0, 1.0, 6.0, 2.0, 0.0, 4.0, -6.0],[1.0, -2.0, -5.0, -1.0, -6.0, 0.0, 4.0],[1.0, -3.0, -4.0, 0.0, -6.0, -1.0, 0.0]]', 13, 11, 20, 22, 18, 20),
(5, 1, '2023-07-25', 1.6, 45.26, 58.17, '[69.0, 17.0, 2.0, 0.0, 1.0, 11.0, 0.0]', '[56.0, 14.0, 8.0, 2.0, 7.0, 13.0, 0.0]', '[[0.0, -2.0, -6.0, -6.0, -6.0, -4.0, -4.0],[1.0, 0.0, 0.0, -3.0, -3.0, -3.0, -1.0],[1.0, 1.0, 0.0, 4.0, 1.0, -6.0, -1.0],[-6.0, 4.0, 6.0, 0.0, 5.0, 1.0, 1.0],[5.0, 3.0, 6.0, 1.0, 0.0, -6.0, -3.0],[3.0, 5.0, -5.0, -1.0, 2.0, 0.0, 1.0],[0.0, -6.0, 3.0, 5.0, -1.0, 3.0, 0.0]]', 13, 11, 20, 24, 18, 20);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `mlb_info`
--
ALTER TABLE `mlb_info`
  ADD PRIMARY KEY (`result_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
