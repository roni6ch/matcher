-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2015 at 01:18 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `matcher`
--

-- --------------------------------------------------------

--
-- Table structure for table `academies`
--

CREATE TABLE IF NOT EXISTS `academies` (
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `academies`
--

INSERT INTO `academies` (`Name`) VALUES
('אוניברסיטה פתוחה'),
('ת''''א'),
('בן-גוריון'),
('טכניון'),
('עברית'),
('מכון ויצמן'),
('אריאל'),
('בר-אילן'),
('שנקר'),
('האקדמית ת''''א-יפו'),
('HIT מכללת'),
('מכללת פרס'),
('מכללת אפקה'),
('מכללת סמי שמעון'),
('מכללת שערי משפט'),
('מכללת לוינסקי'),
('מכללת סמינר הקיבוצים'),
('המכללה למנהל'),
('הבן-תחומי'),
('מכללת רופין');

-- --------------------------------------------------------

--
-- Table structure for table `educations`
--

CREATE TABLE IF NOT EXISTS `educations` (
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `educations`
--

INSERT INTO `educations` (`Name`) VALUES
('כלכלה'),
('מנהל עסקים'),
('מתמטיקה'),
('חשבונאות'),
('מדעי החברה'),
('מדעי הטבע'),
('הנדסת תוכנה'),
('הנדסת אלקטרוניקה'),
('הנדסת חשמל'),
('משפטים'),
('מדעי ההתנהגות'),
('אומנות'),
('אופנה'),
('מלונאות'),
('מדעי הצמח'),
('ביולוגיה'),
('כימיה'),
('פיזיקה'),
('אדריכלות'),
('קולנוע');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) NOT NULL,
  `password` varchar(10) NOT NULL,
  `Age` varchar(11) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `academy` varchar(20) NOT NULL,
  `education` varchar(20) NOT NULL,
  `year` varchar(11) NOT NULL,
  `filterGender` varchar(10) NOT NULL,
  `filterFromAge` int(11) NOT NULL,
  `filterToAge` int(11) NOT NULL,
  `filterAcademy` varchar(30) NOT NULL,
  `filterYear` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=53 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `Name`, `password`, `Age`, `gender`, `academy`, `education`, `year`, `filterGender`, `filterFromAge`, `filterToAge`, `filterAcademy`, `filterYear`) VALUES
(1, 'רוני כברה', '0', '22', 'male', 'שנקר', 'הנדסת תוכנה', 'ד', 'girls', 0, 0, '', ''),
(2, 'חיים פדידה', '0', '26', 'male', 'המכללה למנהל', 'כלכלה', 'א', 'girls', 24, 29, 'HIT מכללת', 'ג'),
(6, 'דנה לוי', '0', '22', 'female', 'בן גוריון', 'חשבונאות', 'א', 'boys', 0, 0, '', ''),
(7, 'מיכל כץ', '0', '23', 'female', 'טכניון', 'כלכלה', 'ג', 'boys', 0, 0, '', ''),
(8, 'תומר לוסטר', '0', '27', 'male', 'שנקר', 'הנדסת תוכנה', 'ד', 'girls', 0, 0, '', ''),
(9, 'דניאל דץ', '0', '21', 'male', 'טכניון', 'מדעי החברה', 'ג', 'girls', 0, 0, '', ''),
(48, 'll', '0', '56', 'male', 'אוניברסיטה פתוחה', 'כלכלה', 'א', 'boys', 18, 35, 'אוניברסיטה הפתוחה', 'ג'),
(49, 'ddd', '0', '2120', 'male', 'מכללת סמי שמעון', 'ביולוגיה', 'ד', 'boys', 23, 32, 'אוניברסיטה פתוחה', 'ד'),
(50, 'sdf', '0', '34', 'male', 'אוניברסיטה פתוחה', 'כלכלה', 'א', 'girls', 23, 35, 'אוניברסיטה הפתוחה', 'א'),
(51, 'rrr', '0', '23', 'male', 'אוניברסיטה פתוחה', 'כלכלה', 'א', 'boys', 18, 35, 'אוניברסיטה הפתוחה', 'א'),
(52, 'er', '0', '23', 'male', 'אוניברסיטה פתוחה', 'כלכלה', 'א', 'boys', 23, 35, 'אוניברסיטה הפתוחה', 'ג');

-- --------------------------------------------------------

--
-- Table structure for table `usersimgs`
--

CREATE TABLE IF NOT EXISTS `usersimgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(255) NOT NULL,
  `link` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=492 ;

--
-- Dumping data for table `usersimgs`
--

INSERT INTO `usersimgs` (`id`, `userId`, `link`) VALUES
(1, 3, 'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg'),
(2, 6, 'http://www.bemoneyaware.com/scripts/nyroModal/img2.jpg'),
(3, 7, 'http://i.ytimg.com/vi/7c9f9sr6BPg/hqdefault.jpg'),
(49, 49, '153835.jpg'),
(188, 2, 'hd-widescreen-wallpaper-3.jpg'),
(189, 2, '200827063915-8589.jpg'),
(190, 49, '27.jpg'),
(191, 49, '27.jpg'),
(192, 49, '27.jpg'),
(193, 49, 'img24.jpg'),
(194, 49, 'wallpaper29.jpg'),
(195, 49, 'wallpaper29.jpg'),
(196, 0, 'cheshire_cat.jpg'),
(197, 0, 'Dreamer_by_HenkeART.jpg'),
(198, 49, 'Four_Seasons_Wallpaper.jpg'),
(199, 49, 'israel_flag_grunge_by_xxoblivionxx.jpg'),
(200, 49, 'israel_flag_grunge_by_xxoblivionxx.jpg'),
(491, 49, 'cheshire_cat.jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
