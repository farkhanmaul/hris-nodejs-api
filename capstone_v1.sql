-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2023 at 02:43 PM
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
-- Database: `capstone_v1`
--

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(3) NOT NULL,
  `userEmail` varchar(256) NOT NULL,
  `informationName` varchar(256) NOT NULL,
  `condition` varchar(256) NOT NULL,
  `percentage` varchar(256) NOT NULL,
  `urlImage` text NOT NULL,
  `createdDate` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `userEmail`, `informationName`, `condition`, `percentage`, `urlImage`, `createdDate`) VALUES
(50, 'maulanaaa@adaf.csd', 'Orange', 'Fresh', '99.98%', 'https://storage.googleapis.com/freshcancoba1/c1476d22-06f1-458a-a7af-23641a4102e6.jpg', '6/14/2023, 18:55:06'),
(51, 'maulanaaa@adaf.csd', 'Cucumber', 'Rotten', '26.57%', 'https://storage.googleapis.com/freshcancoba1/f080256f-06d1-447f-8652-3fdfb541561b.png', '6/14/2023, 19:04:40');

-- --------------------------------------------------------

--
-- Table structure for table `information`
--

CREATE TABLE `information` (
  `id` int(3) NOT NULL,
  `name` varchar(256) NOT NULL,
  `botanical_name` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `benefit` text NOT NULL,
  `funfact` text NOT NULL,
  `allergy` text NOT NULL,
  `energy` varchar(15) NOT NULL,
  `water` float NOT NULL,
  `protein` float NOT NULL,
  `total_fat` float NOT NULL,
  `carbohydrates` float NOT NULL,
  `fiber` float NOT NULL,
  `sugars` float NOT NULL,
  `calsium` float NOT NULL,
  `iron` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `information`
--

INSERT INTO `information` (`id`, `name`, `botanical_name`, `description`, `benefit`, `funfact`, `allergy`, `energy`, `water`, `protein`, `total_fat`, `carbohydrates`, `fiber`, `sugars`, `calsium`, `iron`) VALUES
(1, 'Orange', 'Citrus aurantium', 'Jeruk adalah jenis buah yang berair dan memiliki rasa manis dengan sedikit keasaman. Buah jeruk umumnya memiliki ukuran sedang hingga besar, dengan diameter sekitar 7 hingga 10 cm. Bentuknya bulat atau sedikit lonjong, dengan kulit yang tebal dan kasar.', 'Mengandung flavonoid yang membantu meningkatkan sistem kekebalan tubuh dari radikal bebas dan peradangan ', 'Kulit jeruk dapat digunakan sebagai bahan alami untuk membersihkan permukaan atau mengusir serangga', 'Citrus Allergy', '47/197', 86.75, 0.94, 0.12, 11.75, 2.4, 9.35, 40, 0.1),
(2, 'Apple', 'Pyrus malus', 'Apel adalah buah yang memiliki tekstur renyah dan juicy. Buah apel memiliki ukuran yang bervariasi, tetapi umumnya memiliki diameter sekitar 6 hingga 9 cm. Rasa apel dapat bervariasi dari manis hingga sedikit asam tergantung pada varietasnya. ', 'Senyawa polifenol pada apel dapat membantu melindungi sel-sel tubuh dari kerusakan oksidatif dan mengurangi risiko penyakit jantung, kanker, dan penuaan dini.', 'Mengunyah apel dapat membantu membersihkan gigi secara alami karena kandungan serat dalam apel membantu mengangkat plak dan meningkatkan produksi air liur, yang dapat melawan kerusakan gigi dan bau mulut.', 'Oral Allergy Syndrome', '48/200', 86.7, 0.27, 0.13, 12.7, 1.3, 10.1, 5, 0.07),
(3, 'Banana', 'Musa paradisicum', 'Pisang adalah buah yang rasanya manis dengan sentuhan keasaman ringan. Bentuknya panjang dan silindris berwarna kuning saat matang dengan ukuran hingga 20 cm atau lebih. Dalam beberapa budaya, pisang memiliki makna simbolis seperti dalam kepercayaan Hindu di mana pisang dianggap sebagai simbol kesuburan dan kelimpahan.', 'Pisang mengandung triptofan (asam amino esensial) yang membantu produksi serotonin dalam tubuh sehingga dapat meningkatkan mood dan membantu mengatasi depresi ringan.', 'Pisang sebenarnya adalah buah beri. Meskipun ukurannya besar dan bentuknya berbeda dari buah beri tradisional, seperti blueberry atau strawberry, secara botani, pisang termasuk dalam keluarga buah beri.', 'Banana Allergy', '89/371', 74.91, 1.09, 0.33, 22.84, 2.6, 12.23, 5, 0.26),
(4, 'Bitter Gourd', 'Momordica charantia', 'Pare adalah sayur dengan rasa yang pahit sehingga menjadi salah satu sayuran yang kontroversial dalam hal preferensi rasa. Bentuknya panjang dan ramping yang berukuran panjang sekitar 15-30 cm dengan permukaan bergerigi dan berduri. ', 'Kandungan serat yang tinggi dalam pare dapat membantu meningkatkan pencernaan dan mengurangi masalah sembelit.', 'Pare dapat digunakan sebagai bahan alami untuk mengusir nyamuk atau sebagai bahan alami dalam obat-obatan anti-parasit.', '-', '19/79', 94, 1, 0.2, 4, 2.8, 1, 17, 0.43),
(5, 'Capsicum', 'Capsicum annuum', 'Paprika adalah sayuran yang memiliki ciri khas dengan bentuknya yang seperti lonceng atau kerucut terbalik. Buah paprika umumnya memiliki panjang sekitar 7-10 cm. Rasa paprika bisa bervariasi, mulai dari yang manis hingga yang sedikit pedas, tergantung pada jenisnya. ', 'Mengonsumsi paprika dapat membantu memperkuat sistem kekebalan tubuh dan menjaga kesehatan kulit.', 'Meskipun secara botani diklasifikasikan sebagai sayuran, paprika juga dianggap sebagai buah karena merupakan bagian dari keluarga cabai dan tomat. Namun, dalam konteks kuliner, paprika lebih sering dianggap sebagai sayuran atau rempah.', 'Pollen Allergy', '26/108', 92, 0.9, 0.3, 6, 1.7, 4.2, 10, 0.3),
(6, 'Carrot', '\r\nDaucas carota', 'Wortel adalah sayuran yang terkenal dengan akar yang berbentuk silindris dan berwarna oranye cerah. Bentuk wortel biasanya silindris dengan ujung yang meruncing dengan panjang sekitar 15-20 cm. Rasanya manis dengan sedikit kekriuk-kriuk saat digigit. ', 'Wortel mengandung beta-karoten yang dapat diubah menjadi vitamin A oleh tubuh, yang penting untuk menjaga kesehatan mata dan meningkatkan penglihatan.', 'Meskipun yang paling umum dikonsumsi adalah akarnya, daun wortel juga dapat dikonsumsi menjadi salad atau dimasak seperti sayuran hijau lainnya.', 'Hypersensitivity', '41/173', 88.29, 0.93, 0.24, 9.58, 2.8, 4.74, 33, 0.3),
(7, 'Guava', 'Psidium guava', 'Jambu biji adalah buah yang memiliki ukuran sedang hingga besar, dengan diameter sekitar 5-10 cm. Buah jambu biji umumnya memiliki bentuk bulat atau sedikit oval, dengan kulit yang halus dan berwarna hijau atau kuning saat matang dengan daging buah yang berwarna putih atau merah muda dengan biji yang berada di sekitarnya.', 'Mengonsumsi jambu biji secara teratur dapat membantu menjaga keseimbangan pencernaan.', 'Sebagian besar buah jambu biji terdiri dari air, sehingga memberikan efek yang menyegarkan ketika dikonsumsi.', 'Oral Allergy Syndrome', '68/285', 80.8, 2.55, 0.95, 14.32, 5.4, 8.92, 18, 0.26),
(8, 'Lemon', 'Citrus Limonium', 'Lemon adalah buah yang memiliki rasa yang sangat asam, segar, dan citrus yang khas. Bentuk buah ini bulat hingga sedikit oval dengan diameter sekitar 5-8 cm.', 'Lemon dapat membantu meredakan gejala batuk dan pilek. Lemon mengandung vitamin C dan senyawa lain yang dapat membantu memperkuat sistem kekebalan tubuh. ', 'Lemon memiliki sifat antiseptik karena kandungan asam sitrat membuatnya menjadi pembersih alami yang efektif. ', 'Citrus Allergy', '20/84', 87.4, 1.2, 0.3, 10.7, 4.7, 0, 61, 0.7),
(9, 'Lime', 'Citrus latifolia', 'Jeruk nipis adalah buah yang sangat asam, segar, dan citrus dengan aroma yang kuat dan menyegarkan. Bentuknya bulat kecil berukuran sekitar 3-4 cm dengan kulit yang halus dan mengkilap. ', 'Aroma jeruk nipis diketahui dapat memberikan efek menenangkan dan membantu mengurangi stres. Bau jeruk nipis dapat merangsang sistem saraf, mengurangi kecemasan, dan meningkatkan suasana hati secara alami. ', 'Satu jeruk nipis dapat menyediakan sekitar 22% kebutuhan harian vitamin C yang direkomendasikan.', 'Citrus Allergy', '30/126', 88.26, 0.7, 0.2, 10.54, 2.8, 1.69, 33, 0.6),
(10, 'Mango', 'Mangifera indica', 'Mangga adalah buah yang memiliki bentuk bulat atau oval dengan permukaan yang sedikit berlekuk atau bergelombang dengan diameter sekitar 5-15 cm dan berat sekitar 150-400 gram. Daging buahnya sangat juicy dan memiliki tekstur yang lembut dan berair.', 'Mangga mengandung serat yang tinggi, yang membantu menjaga rasa kenyang lebih lama dan membantu mengendalikan gula darah.', 'Mangga dianggap sebagai buah nasional di beberapa negara, termasuk India, Pakistan, dan Filipina. Hal ini menunjukkan betapa pentingnya mangga dalam budaya dan kehidupan sehari-hari di negara-negara tersebut.', 'Oral Allergy Syndrome', '65/272', 81.71, 0.51, 0.27, 17, 1.8, 14.8, 10, 0.13),
(11, 'Pomegranate', 'Punica granatum', 'Delima adalah buah yang memiliki kulit yang keras dan berwarna merah cerah atau merah tua dengan ukuran diameter sekitar 5-12 cm. Rasa delima umumnya manis dan sedikit asam dengan sentuhan kesegaran. Tekstur daging buahnya renyah dan juicy. ', 'Delima mengandung senyawa-senyawa antioksidan yang kuat, terutama punicalagin yang dapat membantu melawan radikal bebas dalam tubuh dan melindungi sel-sel dari kerusakan oksidatif.', 'Delima telah lama menjadi simbol keindahan, kekayaan, dan kelimpahan. Di banyak budaya, delima dianggap sebagai simbol kesuburan, keberuntungan, dan kehidupan yang berlimpah.', 'Oral Allergy Syndrome', '83/346', 77.93, 1.67, 1.17, 18.7, 4, 13.67, 10, 0.3),
(12, 'Potato', 'Solanum tubersum', 'Kentang adalah sayuran yang berbentuk bulat atau oval dengan kulit yang halus.Buah kentang memiliki ukuran yang bervariasi, mulai dari kecil sebesar kelereng hingga besar seukuran bola tenis. ', 'Mengonsumsi kentang dalam bentuk yang tepat dapat membantu menjaga kesehatan jantung, menjaga fungsi otak, dan meningkatkan sistem kekebalan tubuh. ', 'Kulit kentang mengandung kolin yang bisa digunakan untuk mengompres area kulit yang terbakar sinar matahari sehingga membantu meredakan peradangan.', 'Potato Allergy', '77/322', 79, 2, 0.1, 17, 2, 0.8, 11, 0.8),
(13, 'Strawberry', 'Fragaria x ananassa', 'Strawberry adalah buah yang memiliki rasa manis dengan sentuhan keasaman yang menyegarkan. Bentuknya bulat atau sedikit cembung berdiameter sekitar sekitar 2 hingga 5 cm dengan permukaan yang bergerigi dan berwarna merah cerah.', 'Strawberry mengandung senyawa bernama flavonoid yang disebut fisetin yang membantu melindungi mata dari kerusakan oksidatif dan memperkuat struktur sel-sel mata.', 'Kandungan asam pada strawberry dapat membantu mengurangi noda pada gigi. ', 'Salicylate Allergy', '32/136', 90.95, 0.67, 0.3, 7.68, 2, 4.89, 16, 0.41),
(14, 'Tomato', '\r\nLycopersican esculentum', 'Tomat adalah buah yang umumnya dikelompokkan sebagai sayuran. Bentuk tomat umumnya bulat atau oval dengan permukaan yang halus berdiameter sekitar 5-10 cm. Tomat memiliki rasa yang segar, manis, dan sedikit asam. ', 'Kandungan vitamin C dan antioksidannya membuat tomat efektif sebagai bahan alami untuk merawat kulit, mengurangi jerawat, dan memberikan kilau alami pada rambut.', 'Tomat memiliki kadar air yang tinggi, sekitar 94% sehingga dapat memberikan efek hidrasi yang baik bagi tubuh', 'Nightshade Allergy', '18/74', 94.52, 0.88, 0.2, 3.89, 1.2, 2.63, 10, 0.27),
(15, 'Cucumber', 'Cucumis sativas', 'Timun adalah buah yang berkulit halus dan berwarna hijau, umumnya memiliki ukuran sedang hingga panjang, dengan panjang berkisar antara 15 hingga 30 cm. aging dalam timun biasanya berwarna putih pucat, renyah, dan memiliki banyak biji kecil di dalamnya.', 'Timun dapat membantu mengurangi bau tidak sedap di mulut dan memberikan rasa segar', 'Timun dapat mengandung sekitar 95% air, menjadikannya buah yang sangat melembapkan dan menyegarkan.', '-', '15/63', 95.2, 0.6, 0.2, 3.6, 0.5, 1.7, 16, 0.4);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(3) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(67, 'Maulanaa', 'maulanaaa@adaf.csd', '$2b$10$sbtDRmAIIjzSNV3Wema.WePydiJCyYhqhJXR9MUUECFSmLeKV8bsG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_userEmail` (`userEmail`);

--
-- Indexes for table `information`
--
ALTER TABLE `information`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `information`
--
ALTER TABLE `information`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `FK_userEmail` FOREIGN KEY (`userEmail`) REFERENCES `user` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
