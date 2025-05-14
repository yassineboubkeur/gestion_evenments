-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 14 mai 2025 à 22:55
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `event_management`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` datetime NOT NULL,
  `address` varchar(255) NOT NULL,
  `available_places` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `organizer_id` bigint(20) UNSIGNED NOT NULL,
  `duration_minutes` int(11) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `category` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `date`, `address`, `available_places`, `image`, `organizer_id`, `duration_minutes`, `price`, `category`, `created_at`, `updated_at`, `status`) VALUES
(183, 'Summer Music Festival', 'Annual summer music festival with multiple artists', '2023-08-15 18:00:00', '123 Main St, Cityville', 500, 'events/NMU1iSSHEWtUn5XOwdsWca0F1xqtqt5hXJebYv8V.jpg', 339, 240, 49.99, 'Music', '2025-05-11 10:23:21', '2025-05-13 15:10:21', 'approved'),
(184, 'Summer Music Festival', 'Annual summer music festival with multiple artists', '2023-08-15 18:00:00', '123 Main St, Cityville', 500, 'events/HcH3bnHmPudlsP6luuK5wD0JGnQN1ff9nOnGeQzy.jpg', 339, 240, 49.99, 'Music', '2025-05-11 10:37:20', '2025-05-13 14:58:12', 'approved'),
(185, 'Summer Music Festival', 'Annual summer music festival with multiple artists', '2023-08-15 18:00:00', '123 Main St, Cityville', 500, 'events/J1QX0yvlDQMBdgR9D9xqeW7ZBjXnzBDkAEpNoisJ.jpg', 339, 240, 29.99, 'Music', '2025-05-11 10:37:30', '2025-05-13 14:23:50', 'approved'),
(189, 'Indie Music Festival', 'Indie Music Festival', '2025-05-22 14:55:00', '202 Lens Ave, Portland, OR', 222, 'events/Hn1UqFLWmmogungFtu0qszIbjbER9IyuH4XrCpVB.jpg', 339, 222, 22.00, 'Concert', '2025-05-11 12:53:07', '2025-05-13 14:56:11', 'approved'),
(208, 'futboll match', 'fffffffffffffff', '2025-05-21 22:13:00', '478 appt 5 maghreb arabi bloc D kenitra maroc', 2222, 'events/gnwz636DJCArrfkC6ixE7tYoCv9it7ZlnvbLbwpO.jpg', 339, 222, 22.00, 'Sports', '2025-05-12 20:10:38', '2025-05-13 12:53:56', 'approved'),
(211, 'Ev Cars', 'Ev Cars', '2025-05-30 20:46:00', '236 quartier chaabi, atlas2', 100, 'events/6275VgIL1l014DtyJ9YAidqxRbuKIoBIezlIgwBf.jpg', 339, 444, 44.00, 'Conference', '2025-05-13 18:41:53', '2025-05-14 18:45:39', 'approved'),
(212, 'Beach Volleyball Tournament', 'event 22', '2025-05-30 00:37:00', '505 Peaceful Path, Sedona, AZ', 55, 'events/kJTPD8HshTjqTgGTPijHGmNfhh7nrM2xkSbhxhtY.jpg', 336, 55, 55.00, 'Concert', '2025-05-13 22:33:35', '2025-05-14 10:05:28', 'approved'),
(213, 'Rock Climbing Workshop', 'Delice Gharb', '2025-05-31 06:25:00', '236 quartier chaabi, atlas2', 55, 'events/1RiIyPdzIVXMiVVtHMEvzf6JDFLuv226DPWEWKDt.jpg', 336, 444, 55.00, 'Exhibition', '2025-05-13 23:25:52', '2025-05-14 10:05:46', 'pending'),
(214, 'Delice Gharb', 'Delice Gharb', '2025-05-30 13:40:00', '236 quartier chaabi, atlas2', 666, 'events/m0vKEINyDzI37oJs11KBc9LKSboUhoeJEvJTs9Uh.jpg', 339, 666, 5858.00, 'Exhibition', '2025-05-14 18:41:22', '2025-05-14 18:47:26', 'approved');

-- --------------------------------------------------------

--
-- Structure de la table `event_likes`
--

CREATE TABLE `event_likes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `event_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `event_likes`
--

INSERT INTO `event_likes` (`id`, `user_id`, `event_id`, `created_at`, `updated_at`) VALUES
(77, 341, 189, '2025-05-12 19:02:22', '2025-05-12 19:02:22'),
(101, 341, 183, '2025-05-13 08:53:52', '2025-05-13 08:53:52'),
(102, 341, 184, '2025-05-13 08:53:56', '2025-05-13 08:53:56'),
(104, 340, 185, '2025-05-13 19:22:22', '2025-05-13 19:22:22'),
(105, 340, 184, '2025-05-13 19:22:26', '2025-05-13 19:22:26'),
(106, 340, 183, '2025-05-13 19:22:27', '2025-05-13 19:22:27');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `failed_jobs`
--

INSERT INTO `failed_jobs` (`id`, `uuid`, `connection`, `queue`, `payload`, `exception`, `failed_at`) VALUES
(1, '46622c89-02c0-4438-81ff-8f8e6049a39f', 'database', 'default', '{\"uuid\":\"46622c89-02c0-4438-81ff-8f8e6049a39f\",\"displayName\":\"App\\\\Notifications\\\\EventCreatedNotification\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\",\"command\":\"O:48:\\\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\\\":3:{s:11:\\\"notifiables\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";a:1:{i:0;i:17;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:42:\\\"App\\\\Notifications\\\\EventCreatedNotification\\\":3:{s:8:\\\"\\u0000*\\u0000event\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:16:\\\"App\\\\Models\\\\Event\\\";s:2:\\\"id\\\";i:209;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"\\u0000*\\u0000organizer\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";i:339;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"roles\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:2:\\\"id\\\";s:36:\\\"5b495919-ac34-48b0-9a34-290c8ccf8f6d\\\";}s:8:\\\"channels\\\";a:1:{i:0;s:8:\\\"database\\\";}}\"}}', 'Illuminate\\Database\\Eloquent\\ModelNotFoundException: No query results for model [App\\Models\\Event]. in C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Builder.php:749\nStack trace:\n#0 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(110): Illuminate\\Database\\Eloquent\\Builder->firstOrFail()\n#1 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(63): Illuminate\\Notifications\\Notification->restoreModel(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#2 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesModels.php(93): Illuminate\\Notifications\\Notification->getRestoredPropertyValue(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#3 [internal function]: Illuminate\\Notifications\\Notification->__unserialize(Array)\n#4 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(95): unserialize(\'O:48:\"Illuminat...\')\n#5 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(62): Illuminate\\Queue\\CallQueuedHandler->getCommand(Array)\n#6 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#7 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(441): Illuminate\\Queue\\Jobs\\Job->fire()\n#8 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(391): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#9 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(177): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#10 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(148): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#11 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(131): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#12 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#13 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#14 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#15 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#16 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(754): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#17 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#18 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Command\\Command.php(279): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#19 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#20 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(1094): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#21 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(342): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#22 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(193): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#23 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(197): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#24 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1234): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#25 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#26 {main}', '2025-05-13 23:20:47'),
(2, '2fcde522-7672-41f2-b33c-9f2e4bf0966c', 'database', 'default', '{\"uuid\":\"2fcde522-7672-41f2-b33c-9f2e4bf0966c\",\"displayName\":\"App\\\\Notifications\\\\EventCreatedNotification\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\",\"command\":\"O:48:\\\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\\\":3:{s:11:\\\"notifiables\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";a:1:{i:0;i:341;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:42:\\\"App\\\\Notifications\\\\EventCreatedNotification\\\":3:{s:8:\\\"\\u0000*\\u0000event\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:16:\\\"App\\\\Models\\\\Event\\\";s:2:\\\"id\\\";i:209;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"\\u0000*\\u0000organizer\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";i:339;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"roles\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:2:\\\"id\\\";s:36:\\\"d1bfff88-cd16-41b5-aa23-434882a2294f\\\";}s:8:\\\"channels\\\";a:1:{i:0;s:8:\\\"database\\\";}}\"}}', 'Illuminate\\Database\\Eloquent\\ModelNotFoundException: No query results for model [App\\Models\\Event]. in C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Builder.php:749\nStack trace:\n#0 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(110): Illuminate\\Database\\Eloquent\\Builder->firstOrFail()\n#1 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(63): Illuminate\\Notifications\\Notification->restoreModel(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#2 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesModels.php(93): Illuminate\\Notifications\\Notification->getRestoredPropertyValue(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#3 [internal function]: Illuminate\\Notifications\\Notification->__unserialize(Array)\n#4 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(95): unserialize(\'O:48:\"Illuminat...\')\n#5 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(62): Illuminate\\Queue\\CallQueuedHandler->getCommand(Array)\n#6 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#7 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(441): Illuminate\\Queue\\Jobs\\Job->fire()\n#8 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(391): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#9 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(177): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#10 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(148): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#11 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(131): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#12 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#13 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#14 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#15 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#16 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(754): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#17 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#18 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Command\\Command.php(279): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#19 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#20 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(1094): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#21 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(342): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#22 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(193): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#23 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(197): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#24 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1234): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#25 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#26 {main}', '2025-05-13 23:20:47'),
(3, 'de976415-65c6-46bc-932b-33b52a4cf900', 'database', 'default', '{\"uuid\":\"de976415-65c6-46bc-932b-33b52a4cf900\",\"displayName\":\"App\\\\Notifications\\\\EventApprovedNotification\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\",\"command\":\"O:48:\\\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\\\":3:{s:11:\\\"notifiables\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";a:1:{i:0;i:339;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:43:\\\"App\\\\Notifications\\\\EventApprovedNotification\\\":2:{s:5:\\\"event\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:16:\\\"App\\\\Models\\\\Event\\\";s:2:\\\"id\\\";i:209;s:9:\\\"relations\\\";a:1:{i:0;s:9:\\\"organizer\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:2:\\\"id\\\";s:36:\\\"2e2b6e7f-66c4-4fc1-945d-d807e9d180be\\\";}s:8:\\\"channels\\\";a:1:{i:0;s:4:\\\"mail\\\";}}\"}}', 'Illuminate\\Database\\Eloquent\\ModelNotFoundException: No query results for model [App\\Models\\Event]. in C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Builder.php:749\nStack trace:\n#0 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(110): Illuminate\\Database\\Eloquent\\Builder->firstOrFail()\n#1 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(63): Illuminate\\Notifications\\Notification->restoreModel(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#2 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesModels.php(93): Illuminate\\Notifications\\Notification->getRestoredPropertyValue(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#3 [internal function]: Illuminate\\Notifications\\Notification->__unserialize(Array)\n#4 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(95): unserialize(\'O:48:\"Illuminat...\')\n#5 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(62): Illuminate\\Queue\\CallQueuedHandler->getCommand(Array)\n#6 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#7 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(441): Illuminate\\Queue\\Jobs\\Job->fire()\n#8 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(391): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#9 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(177): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#10 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(148): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#11 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(131): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#12 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#13 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#14 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#15 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#16 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(754): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#17 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#18 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Command\\Command.php(279): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#19 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#20 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(1094): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#21 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(342): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#22 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(193): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#23 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(197): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#24 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1234): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#25 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#26 {main}', '2025-05-13 23:20:47'),
(4, '0dd2b041-9f2b-409c-8410-58a1c40f6f2c', 'database', 'default', '{\"uuid\":\"0dd2b041-9f2b-409c-8410-58a1c40f6f2c\",\"displayName\":\"App\\\\Notifications\\\\EventApprovedNotification\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\",\"command\":\"O:48:\\\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\\\":3:{s:11:\\\"notifiables\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";a:1:{i:0;i:339;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:43:\\\"App\\\\Notifications\\\\EventApprovedNotification\\\":2:{s:5:\\\"event\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:16:\\\"App\\\\Models\\\\Event\\\";s:2:\\\"id\\\";i:209;s:9:\\\"relations\\\";a:1:{i:0;s:9:\\\"organizer\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:2:\\\"id\\\";s:36:\\\"2e2b6e7f-66c4-4fc1-945d-d807e9d180be\\\";}s:8:\\\"channels\\\";a:1:{i:0;s:8:\\\"database\\\";}}\"}}', 'Illuminate\\Database\\Eloquent\\ModelNotFoundException: No query results for model [App\\Models\\Event]. in C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Builder.php:749\nStack trace:\n#0 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(110): Illuminate\\Database\\Eloquent\\Builder->firstOrFail()\n#1 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(63): Illuminate\\Notifications\\Notification->restoreModel(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#2 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesModels.php(93): Illuminate\\Notifications\\Notification->getRestoredPropertyValue(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#3 [internal function]: Illuminate\\Notifications\\Notification->__unserialize(Array)\n#4 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(95): unserialize(\'O:48:\"Illuminat...\')\n#5 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(62): Illuminate\\Queue\\CallQueuedHandler->getCommand(Array)\n#6 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#7 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(441): Illuminate\\Queue\\Jobs\\Job->fire()\n#8 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(391): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#9 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(177): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#10 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(148): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#11 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(131): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#12 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#13 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#14 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#15 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#16 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(754): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#17 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#18 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Command\\Command.php(279): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#19 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#20 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(1094): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#21 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(342): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#22 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(193): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#23 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(197): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#24 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1234): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#25 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#26 {main}', '2025-05-13 23:20:48'),
(5, 'e4c7c15f-cc4b-4626-8414-16b0ee324d8b', 'database', 'default', '{\"uuid\":\"e4c7c15f-cc4b-4626-8414-16b0ee324d8b\",\"displayName\":\"App\\\\Notifications\\\\EventCreatedNotification\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\",\"command\":\"O:48:\\\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\\\":3:{s:11:\\\"notifiables\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";a:1:{i:0;i:17;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:42:\\\"App\\\\Notifications\\\\EventCreatedNotification\\\":3:{s:8:\\\"\\u0000*\\u0000event\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:16:\\\"App\\\\Models\\\\Event\\\";s:2:\\\"id\\\";i:210;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"\\u0000*\\u0000organizer\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";i:339;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"roles\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:2:\\\"id\\\";s:36:\\\"10a5944d-812b-4d71-bb5f-b90bcf730062\\\";}s:8:\\\"channels\\\";a:1:{i:0;s:8:\\\"database\\\";}}\"}}', 'Illuminate\\Database\\Eloquent\\ModelNotFoundException: No query results for model [App\\Models\\Event]. in C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Builder.php:749\nStack trace:\n#0 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(110): Illuminate\\Database\\Eloquent\\Builder->firstOrFail()\n#1 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(63): Illuminate\\Notifications\\Notification->restoreModel(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#2 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesModels.php(93): Illuminate\\Notifications\\Notification->getRestoredPropertyValue(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#3 [internal function]: Illuminate\\Notifications\\Notification->__unserialize(Array)\n#4 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(95): unserialize(\'O:48:\"Illuminat...\')\n#5 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(62): Illuminate\\Queue\\CallQueuedHandler->getCommand(Array)\n#6 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#7 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(441): Illuminate\\Queue\\Jobs\\Job->fire()\n#8 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(391): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#9 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(177): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#10 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(148): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#11 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(131): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#12 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#13 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#14 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#15 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#16 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(754): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#17 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#18 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Command\\Command.php(279): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#19 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#20 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(1094): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#21 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(342): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#22 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(193): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#23 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(197): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#24 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1234): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#25 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#26 {main}', '2025-05-13 23:20:54'),
(6, '098de190-4ab1-45dc-83dc-d91ee98c9e3a', 'database', 'default', '{\"uuid\":\"098de190-4ab1-45dc-83dc-d91ee98c9e3a\",\"displayName\":\"App\\\\Notifications\\\\EventCreatedNotification\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\",\"command\":\"O:48:\\\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\\\":3:{s:11:\\\"notifiables\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";a:1:{i:0;i:341;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:42:\\\"App\\\\Notifications\\\\EventCreatedNotification\\\":3:{s:8:\\\"\\u0000*\\u0000event\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:16:\\\"App\\\\Models\\\\Event\\\";s:2:\\\"id\\\";i:210;s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"\\u0000*\\u0000organizer\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";i:339;s:9:\\\"relations\\\";a:1:{i:0;s:5:\\\"roles\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:2:\\\"id\\\";s:36:\\\"8c2b3579-e0a0-41ed-a1c7-9b6c95386a05\\\";}s:8:\\\"channels\\\";a:1:{i:0;s:8:\\\"database\\\";}}\"}}', 'Illuminate\\Database\\Eloquent\\ModelNotFoundException: No query results for model [App\\Models\\Event]. in C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Builder.php:749\nStack trace:\n#0 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(110): Illuminate\\Database\\Eloquent\\Builder->firstOrFail()\n#1 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(63): Illuminate\\Notifications\\Notification->restoreModel(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#2 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesModels.php(93): Illuminate\\Notifications\\Notification->getRestoredPropertyValue(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#3 [internal function]: Illuminate\\Notifications\\Notification->__unserialize(Array)\n#4 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(95): unserialize(\'O:48:\"Illuminat...\')\n#5 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(62): Illuminate\\Queue\\CallQueuedHandler->getCommand(Array)\n#6 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#7 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(441): Illuminate\\Queue\\Jobs\\Job->fire()\n#8 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(391): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#9 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(177): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#10 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(148): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#11 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(131): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#12 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#13 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#14 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#15 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#16 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(754): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#17 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#18 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Command\\Command.php(279): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#19 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#20 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(1094): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#21 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(342): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#22 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(193): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#23 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(197): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#24 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1234): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#25 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#26 {main}', '2025-05-13 23:20:54');
INSERT INTO `failed_jobs` (`id`, `uuid`, `connection`, `queue`, `payload`, `exception`, `failed_at`) VALUES
(7, '88b3df63-885e-4c49-84f1-e13f345556cb', 'database', 'default', '{\"uuid\":\"88b3df63-885e-4c49-84f1-e13f345556cb\",\"displayName\":\"App\\\\Notifications\\\\EventApprovedNotification\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\",\"command\":\"O:48:\\\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\\\":3:{s:11:\\\"notifiables\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";a:1:{i:0;i:339;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:43:\\\"App\\\\Notifications\\\\EventApprovedNotification\\\":2:{s:5:\\\"event\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:16:\\\"App\\\\Models\\\\Event\\\";s:2:\\\"id\\\";i:210;s:9:\\\"relations\\\";a:1:{i:0;s:9:\\\"organizer\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:2:\\\"id\\\";s:36:\\\"97119b57-aff1-42e9-80f8-b57205bd98a2\\\";}s:8:\\\"channels\\\";a:1:{i:0;s:4:\\\"mail\\\";}}\"}}', 'Illuminate\\Database\\Eloquent\\ModelNotFoundException: No query results for model [App\\Models\\Event]. in C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Builder.php:749\nStack trace:\n#0 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(110): Illuminate\\Database\\Eloquent\\Builder->firstOrFail()\n#1 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(63): Illuminate\\Notifications\\Notification->restoreModel(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#2 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesModels.php(93): Illuminate\\Notifications\\Notification->getRestoredPropertyValue(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#3 [internal function]: Illuminate\\Notifications\\Notification->__unserialize(Array)\n#4 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(95): unserialize(\'O:48:\"Illuminat...\')\n#5 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(62): Illuminate\\Queue\\CallQueuedHandler->getCommand(Array)\n#6 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#7 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(441): Illuminate\\Queue\\Jobs\\Job->fire()\n#8 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(391): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#9 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(177): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#10 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(148): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#11 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(131): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#12 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#13 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#14 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#15 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#16 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(754): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#17 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#18 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Command\\Command.php(279): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#19 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#20 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(1094): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#21 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(342): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#22 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(193): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#23 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(197): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#24 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1234): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#25 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#26 {main}', '2025-05-13 23:20:54'),
(8, 'f65636e8-3c06-4cd5-bd62-6fd256176027', 'database', 'default', '{\"uuid\":\"f65636e8-3c06-4cd5-bd62-6fd256176027\",\"displayName\":\"App\\\\Notifications\\\\EventApprovedNotification\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\",\"command\":\"O:48:\\\"Illuminate\\\\Notifications\\\\SendQueuedNotifications\\\":3:{s:11:\\\"notifiables\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:15:\\\"App\\\\Models\\\\User\\\";s:2:\\\"id\\\";a:1:{i:0;i:339;}s:9:\\\"relations\\\";a:0:{}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:12:\\\"notification\\\";O:43:\\\"App\\\\Notifications\\\\EventApprovedNotification\\\":2:{s:5:\\\"event\\\";O:45:\\\"Illuminate\\\\Contracts\\\\Database\\\\ModelIdentifier\\\":5:{s:5:\\\"class\\\";s:16:\\\"App\\\\Models\\\\Event\\\";s:2:\\\"id\\\";i:210;s:9:\\\"relations\\\";a:1:{i:0;s:9:\\\"organizer\\\";}s:10:\\\"connection\\\";s:5:\\\"mysql\\\";s:15:\\\"collectionClass\\\";N;}s:2:\\\"id\\\";s:36:\\\"97119b57-aff1-42e9-80f8-b57205bd98a2\\\";}s:8:\\\"channels\\\";a:1:{i:0;s:8:\\\"database\\\";}}\"}}', 'Illuminate\\Database\\Eloquent\\ModelNotFoundException: No query results for model [App\\Models\\Event]. in C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Database\\Eloquent\\Builder.php:749\nStack trace:\n#0 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(110): Illuminate\\Database\\Eloquent\\Builder->firstOrFail()\n#1 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesAndRestoresModelIdentifiers.php(63): Illuminate\\Notifications\\Notification->restoreModel(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#2 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\SerializesModels.php(93): Illuminate\\Notifications\\Notification->getRestoredPropertyValue(Object(Illuminate\\Contracts\\Database\\ModelIdentifier))\n#3 [internal function]: Illuminate\\Notifications\\Notification->__unserialize(Array)\n#4 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(95): unserialize(\'O:48:\"Illuminat...\')\n#5 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\CallQueuedHandler.php(62): Illuminate\\Queue\\CallQueuedHandler->getCommand(Array)\n#6 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Jobs\\Job.php(102): Illuminate\\Queue\\CallQueuedHandler->call(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Array)\n#7 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(441): Illuminate\\Queue\\Jobs\\Job->fire()\n#8 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(391): Illuminate\\Queue\\Worker->process(\'database\', Object(Illuminate\\Queue\\Jobs\\DatabaseJob), Object(Illuminate\\Queue\\WorkerOptions))\n#9 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Worker.php(177): Illuminate\\Queue\\Worker->runJob(Object(Illuminate\\Queue\\Jobs\\DatabaseJob), \'database\', Object(Illuminate\\Queue\\WorkerOptions))\n#10 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(148): Illuminate\\Queue\\Worker->daemon(\'database\', \'default\', Object(Illuminate\\Queue\\WorkerOptions))\n#11 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Queue\\Console\\WorkCommand.php(131): Illuminate\\Queue\\Console\\WorkCommand->runWorker(\'database\', \'default\')\n#12 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(36): Illuminate\\Queue\\Console\\WorkCommand->handle()\n#13 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Util.php(43): Illuminate\\Container\\BoundMethod::Illuminate\\Container\\{closure}()\n#14 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(96): Illuminate\\Container\\Util::unwrapIfClosure(Object(Closure))\n#15 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\BoundMethod.php(35): Illuminate\\Container\\BoundMethod::callBoundMethod(Object(Illuminate\\Foundation\\Application), Array, Object(Closure))\n#16 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Container\\Container.php(754): Illuminate\\Container\\BoundMethod::call(Object(Illuminate\\Foundation\\Application), Array, Array, NULL)\n#17 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(211): Illuminate\\Container\\Container->call(Array)\n#18 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Command\\Command.php(279): Illuminate\\Console\\Command->execute(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#19 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Console\\Command.php(180): Symfony\\Component\\Console\\Command\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Illuminate\\Console\\OutputStyle))\n#20 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(1094): Illuminate\\Console\\Command->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#21 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(342): Symfony\\Component\\Console\\Application->doRunCommand(Object(Illuminate\\Queue\\Console\\WorkCommand), Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#22 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\symfony\\console\\Application.php(193): Symfony\\Component\\Console\\Application->doRun(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#23 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Console\\Kernel.php(197): Symfony\\Component\\Console\\Application->run(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#24 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\vendor\\laravel\\framework\\src\\Illuminate\\Foundation\\Application.php(1234): Illuminate\\Foundation\\Console\\Kernel->handle(Object(Symfony\\Component\\Console\\Input\\ArgvInput), Object(Symfony\\Component\\Console\\Output\\ConsoleOutput))\n#25 C:\\Users\\abdtr\\Desktop\\project fullstack\\gestion_evenments\\artisan(16): Illuminate\\Foundation\\Application->handleCommand(Object(Symfony\\Component\\Console\\Input\\ArgvInput))\n#26 {main}', '2025-05-13 23:20:55');

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_04_13_175518_create_personal_access_tokens_table', 1),
(5, '2025_04_19_210457_create_permission_tables', 2),
(6, '2025_04_24_180757_create_events_table', 3),
(7, '2025_04_29_183931_create_event_likes_table', 4),
(8, '2025_05_01_154059_create_registrations_table', 5),
(9, '2025_05_02_195053_create_contacts_table', 6),
(10, '2025_05_08_215215_add_user_profile_columns', 7),
(11, '2025_05_10_113007_add_profile_image_to_users_table', 8),
(12, '2025_05_11_102709_create_notifications_table', 9),
(13, '2025_05_11_133518_create_notifications_table', 10),
(14, '2025_05_13_110219_add_status_to_events_table', 11);

-- --------------------------------------------------------

--
-- Structure de la table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 17),
(1, 'App\\Models\\User', 341),
(2, 'App\\Models\\User', 336),
(2, 'App\\Models\\User', 339),
(3, 'App\\Models\\User', 328),
(3, 'App\\Models\\User', 340),
(3, 'App\\Models\\User', 342),
(3, 'App\\Models\\User', 343);

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) NOT NULL,
  `type` varchar(255) NOT NULL,
  `notifiable_type` varchar(255) NOT NULL,
  `notifiable_id` bigint(20) UNSIGNED NOT NULL,
  `data` text NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id`, `type`, `notifiable_type`, `notifiable_id`, `data`, `read_at`, `created_at`, `updated_at`) VALUES
('0e1b9caf-ab94-401c-962e-2caea66606a2', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 339, '{\"message\":\"Your event \\\"Ev Cars\\\" has been approved\",\"event_id\":211,\"link\":\"\\/events\\/211\"}', NULL, '2025-05-14 19:00:34', '2025-05-14 19:00:34'),
('203bb967-0c60-4bc8-a190-58824cb31efc', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 339, '{\"message\":\"Your event \\\"Summer Music Festival\\\" has been approved\",\"event_id\":185,\"link\":\"\\/events\\/185\"}', NULL, '2025-05-13 23:20:50', '2025-05-13 23:20:50'),
('25b07044-7513-46a4-81d7-3f64327e6feb', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 341, '{\"event_id\":213,\"event_name\":\"Delice Gharb\",\"organizer_name\":\"ABDESSAMAD EL MAAROUFI\",\"message\":\"A new event has been created: Delice Gharb\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/213\"}', '2025-05-14 10:12:04', '2025-05-13 23:25:54', '2025-05-14 10:12:04'),
('3d2dcb3e-aa0b-482b-a3a1-b80a23fd7d15', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 21, '{\"message\":\"Your event \\\"Indie Music Festival\\\" has been approved\",\"event_id\":28,\"link\":\"\\/events\\/28\"}', NULL, '2025-05-13 23:21:09', '2025-05-13 23:21:09'),
('43d97e5c-3ccb-4422-9b30-f38b53748f7c', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 6, '{\"message\":\"Your event \\\"Sculpture Garden Exhibition\\\" has been approved\",\"event_id\":22,\"link\":\"\\/events\\/22\"}', NULL, '2025-05-13 23:20:36', '2025-05-13 23:20:36'),
('43dc67db-e4a8-4150-a596-07d856b4ba68', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":198,\"event_name\":\"Summer Music Festival\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Summer Music Festival\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/198\"}', '2025-05-11 14:43:40', '2025-05-11 14:36:40', '2025-05-11 14:43:40'),
('46494cc9-296e-48eb-a44b-354a529f580f', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 341, '{\"event_id\":214,\"event_name\":\"Delice Gharb\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Delice Gharb\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/214\"}', NULL, '2025-05-14 19:00:27', '2025-05-14 19:00:27'),
('502949ac-2c88-4127-9ad2-1a50c95b591e', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 6, '{\"message\":\"Your event \\\"Photography Masterclass\\\" has been approved\",\"event_id\":20,\"link\":\"\\/events\\/20\"}', NULL, '2025-05-13 23:20:30', '2025-05-13 23:20:30'),
('589cea2a-49fd-4c43-bb25-8bce9cf6e8f0', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 339, '{\"message\":\"Your event \\\"Summer Music Festival\\\" has been approved\",\"event_id\":183,\"link\":\"\\/events\\/183\"}', NULL, '2025-05-13 23:20:59', '2025-05-13 23:20:59'),
('5dbd3f46-de75-4083-8024-eea2cd566dd1', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":213,\"event_name\":\"Delice Gharb\",\"organizer_name\":\"ABDESSAMAD EL MAAROUFI\",\"message\":\"A new event has been created: Delice Gharb\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/213\"}', NULL, '2025-05-13 23:25:53', '2025-05-13 23:25:53'),
('5fb44052-90ec-4fa6-b831-1751b4115d28', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 6, '{\"message\":\"Your event \\\"Jazz Night Under the Stars\\\" has been approved\",\"event_id\":21,\"link\":\"\\/events\\/21\"}', NULL, '2025-05-13 23:20:31', '2025-05-13 23:20:31'),
('5ff4e724-3de2-4dad-8375-1fd0fb2c23e9', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":202,\"event_name\":\"Summer Music Festival\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Summer Music Festival\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/202\"}', '2025-05-11 14:43:40', '2025-05-11 14:36:41', '2025-05-11 14:43:40'),
('6385ae6f-47a1-4973-b3a8-da63133d059d', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 339, '{\"message\":\"Your event \\\"Summer Music Festival\\\" has been approved\",\"event_id\":184,\"link\":\"\\/events\\/184\"}', NULL, '2025-05-13 23:20:53', '2025-05-13 23:20:53'),
('645186b2-7590-4697-82d1-17e8f78414e1', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":207,\"event_name\":\"Summer Music Festival\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Summer Music Festival\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/207\"}', NULL, '2025-05-11 16:24:55', '2025-05-11 16:24:55'),
('6554a57f-bfed-44a5-a890-72c30eccb2b2', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 339, '{\"message\":\"Your event \\\"Delice Gharb\\\" has been approved\",\"event_id\":214,\"link\":\"\\/events\\/214\"}', NULL, '2025-05-14 19:00:37', '2025-05-14 19:00:37'),
('69f7cce2-e5b8-44a2-b732-b1c510ddb881', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 339, '{\"message\":\"Your event \\\"Delice Gharb\\\" has been approved\",\"event_id\":214,\"link\":\"\\/events\\/214\"}', NULL, '2025-05-14 19:00:39', '2025-05-14 19:00:39'),
('7fd580c3-6089-41ee-a828-f70a62398123', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":194,\"event_name\":\"Summer Music Festival\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Summer Music Festival\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/194\"}', '2025-05-11 14:43:40', '2025-05-11 14:36:40', '2025-05-11 14:43:40'),
('803f7175-3a62-4f83-8cf6-af9b5e79e404', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 22, '{\"message\":\"Your event \\\"Beach Volleyball Tournament\\\" has been approved\",\"event_id\":27,\"link\":\"\\/events\\/27\"}', NULL, '2025-05-13 23:21:01', '2025-05-13 23:21:01'),
('80f2754f-b986-411d-b428-d3935458b641', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":205,\"event_name\":\"Summer Music Festival\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Summer Music Festival\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/205\"}', '2025-05-11 14:43:40', '2025-05-11 14:37:01', '2025-05-11 14:43:40'),
('8720d282-952e-4094-8eb6-c4d04eaf30e8', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":214,\"event_name\":\"Delice Gharb\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Delice Gharb\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/214\"}', NULL, '2025-05-14 19:00:27', '2025-05-14 19:00:27'),
('8f349e0e-967c-4c6c-a335-43bb382b2f60', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 339, '{\"message\":\"Your event \\\"futboll match\\\" has been approved\",\"event_id\":208,\"link\":\"\\/events\\/208\"}', NULL, '2025-05-13 23:20:46', '2025-05-13 23:20:46'),
('978a3603-7ff5-45d7-938d-85c269fa96ec', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":212,\"event_name\":\"event 22\",\"organizer_name\":\"ABDESSAMAD EL MAAROUFI\",\"message\":\"A new event has been created: event 22\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/212\"}', NULL, '2025-05-13 23:21:10', '2025-05-13 23:21:10'),
('991be613-56da-4ddf-81d7-1c2dd537942c', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":196,\"event_name\":\"Summer Music Festival\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Summer Music Festival\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/196\"}', '2025-05-11 14:43:40', '2025-05-11 14:36:40', '2025-05-11 14:43:40'),
('a05c2127-b03c-4953-91c3-866ac5d95e18', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":195,\"event_name\":\"Indie Music Festival\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Indie Music Festival\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/195\"}', '2025-05-11 14:43:40', '2025-05-11 14:36:40', '2025-05-11 14:43:40'),
('a4dcfc40-1275-458d-9fbd-6fbb4c972e01', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 22, '{\"message\":\"Your event \\\"Sourdough Bread Workshop\\\" has been approved\",\"event_id\":25,\"link\":\"\\/events\\/25\"}', NULL, '2025-05-13 23:21:06', '2025-05-13 23:21:06'),
('aecbce84-ae90-4d7f-ae82-87de663cc4f0', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":197,\"event_name\":\"Summer Music Festival\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Summer Music Festival\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/197\"}', '2025-05-11 14:43:40', '2025-05-11 14:36:40', '2025-05-11 14:43:40'),
('b1132019-7fb8-486d-a5c7-6a0f3bf40416', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 21, '{\"message\":\"Your event \\\"Music orientale\\\" has been approved\",\"event_id\":179,\"link\":\"\\/events\\/179\"}', NULL, '2025-05-13 23:20:44', '2025-05-13 23:20:44'),
('b1c09a50-b076-4f7a-b79f-d70cf79a07cc', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 336, '{\"message\":\"Your event \\\"event 22\\\" has been approved\",\"event_id\":212,\"link\":\"\\/events\\/212\"}', NULL, '2025-05-13 23:23:06', '2025-05-13 23:23:06'),
('bc9cb943-27a1-4e43-bdcd-726f0c1e0a60', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":208,\"event_name\":\"futboll match\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: futboll match\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/208\"}', NULL, '2025-05-12 21:31:38', '2025-05-12 21:31:38'),
('beec16f2-8683-4d16-a518-d2fe5a8ed984', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 22, '{\"message\":\"Your event \\\"Indie Music Festival\\\" has been approved\",\"event_id\":26,\"link\":\"\\/events\\/26\"}', NULL, '2025-05-13 23:21:03', '2025-05-13 23:21:03'),
('ca9dd1c9-ac1c-41e7-8a69-8c7654af6a40', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 339, '{\"message\":\"Your event \\\"Indie Music Festival\\\" has been approved\",\"event_id\":189,\"link\":\"\\/events\\/189\"}', NULL, '2025-05-13 23:20:52', '2025-05-13 23:20:52'),
('cb84634e-2268-4fbe-927a-e5e7307ca909', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 22, '{\"message\":\"Your event \\\"Blockchain Revolution Summit\\\" has been approved\",\"event_id\":24,\"link\":\"\\/events\\/24\"}', NULL, '2025-05-13 23:20:34', '2025-05-13 23:20:34'),
('d3fcecee-842a-49c4-8445-7262d48ac8de', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 341, '{\"event_id\":211,\"event_name\":\"Ev Cars\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Ev Cars\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/211\"}', '2025-05-14 10:12:04', '2025-05-13 23:21:09', '2025-05-14 10:12:04'),
('ee28e6ad-c2ff-46b1-b2b4-bbe86c6a917a', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 341, '{\"event_id\":208,\"event_name\":\"futboll match\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: futboll match\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/208\"}', '2025-05-12 21:32:29', '2025-05-12 21:31:38', '2025-05-12 21:32:29'),
('f2ef25c6-303c-4518-9150-f9211b9de753', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":206,\"event_name\":\"Summer Music Festival\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Summer Music Festival\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/206\"}', '2025-05-11 14:43:40', '2025-05-11 14:43:02', '2025-05-11 14:43:40'),
('f659b1f8-ec5f-4001-88d1-912c763ed5e2', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":199,\"event_name\":\"Summer Music Festival\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Summer Music Festival\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/199\"}', '2025-05-11 14:43:40', '2025-05-11 14:36:40', '2025-05-11 14:43:40'),
('f70dd874-45ad-4bd9-941a-f1f5510ab207', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 17, '{\"event_id\":211,\"event_name\":\"Ev Cars\",\"organizer_name\":\"farid organizeer\",\"message\":\"A new event has been created: Ev Cars\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/211\"}', NULL, '2025-05-13 23:21:09', '2025-05-13 23:21:09'),
('f9259694-9a09-477e-a2bb-5bcc7014aba0', 'App\\Notifications\\EventCreatedNotification', 'App\\Models\\User', 341, '{\"event_id\":212,\"event_name\":\"event 22\",\"organizer_name\":\"ABDESSAMAD EL MAAROUFI\",\"message\":\"A new event has been created: event 22\",\"url\":\"http:\\/\\/localhost\\/api\\/admin\\/events\\/212\"}', '2025-05-14 10:12:04', '2025-05-13 23:21:11', '2025-05-14 10:12:04'),
('fcaad6bd-5dc3-4125-8e11-cc208529263c', 'App\\Notifications\\EventApprovedNotification', 'App\\Models\\User', 6, '{\"message\":\"Your event \\\"Yoga Retreat Weekend\\\" has been approved\",\"event_id\":23,\"link\":\"\\/events\\/23\"}', NULL, '2025-05-13 23:20:42', '2025-05-13 23:20:42');

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'create events', 'web', '2025-04-19 20:16:04', '2025-04-19 20:16:04'),
(2, 'edit events', 'web', '2025-04-19 20:16:04', '2025-04-19 20:16:04'),
(3, 'delete events', 'web', '2025-04-19 20:16:05', '2025-04-19 20:16:05'),
(4, 'view events', 'web', '2025-04-19 20:16:05', '2025-04-19 20:16:05'),
(5, 'manage users', 'web', '2025-04-19 20:16:05', '2025-04-19 20:16:05'),
(6, 'manage all events', 'web', '2025-04-19 20:16:05', '2025-04-19 20:16:05'),
(7, 'manage events', 'web', '2025-04-24 16:24:03', '2025-04-24 16:24:03');

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 3, 'auth-token', 'e023f9958d4630b150dd12c304e399e992d7874c8b03a73226ceb3557e02555a', '[\"*\"]', NULL, NULL, '2025-04-19 20:51:56', '2025-04-19 20:51:56'),
(2, 'App\\Models\\User', 4, 'auth-token', 'd0a3eed1b6abd22a6793ca39185eeba4251ff548d92dee0e589bddf4ba2e0f6d', '[\"*\"]', NULL, NULL, '2025-04-19 20:53:10', '2025-04-19 20:53:10'),
(3, 'App\\Models\\User', 5, 'auth-token', '36eac995a12dd16fd09d53c7550a469b4e7685e72f947cc1832ed9d35144dfbf', '[\"*\"]', NULL, NULL, '2025-04-23 20:18:29', '2025-04-23 20:18:29'),
(4, 'App\\Models\\User', 5, 'auth-token', 'a8645a9ff2ec014a02eefe3430b667c206071e97b5079d794e19e3a8665e5654', '[\"*\"]', NULL, NULL, '2025-04-23 20:19:17', '2025-04-23 20:19:17'),
(5, 'App\\Models\\User', 5, 'auth-token', 'a83a01c361b0446f5a8944800c6e29982efc9e7ecf3211b7c2f990fa8e3330fd', '[\"*\"]', NULL, NULL, '2025-04-23 20:20:25', '2025-04-23 20:20:25'),
(6, 'App\\Models\\User', 5, 'auth-token', '9d4f487540aab9dc20ea148cfd76be60fe7888ab5e2af8cfac82847490cd0c7d', '[\"*\"]', NULL, NULL, '2025-04-23 20:45:04', '2025-04-23 20:45:04'),
(7, 'App\\Models\\User', 5, 'auth-token', 'df55eaf91e8fb2631a0e4457ae053ea02996b67fef297a5bac1465fad8d1475e', '[\"*\"]', NULL, NULL, '2025-04-23 20:45:12', '2025-04-23 20:45:12'),
(8, 'App\\Models\\User', 5, 'auth-token', 'a2b4f3ac99efb41f43e0cf5f8debbff9e7b678f6f86d4eab1d50eeaa7c50afc6', '[\"*\"]', NULL, NULL, '2025-04-23 20:50:36', '2025-04-23 20:50:36'),
(9, 'App\\Models\\User', 5, 'auth-token', 'db9949c9ebbdc014d286b050946e8f256f04bb88886fcf7d51c70fa01ec4d116', '[\"*\"]', NULL, NULL, '2025-04-23 20:57:07', '2025-04-23 20:57:07'),
(10, 'App\\Models\\User', 5, 'auth-token', 'edea2ceb0542c2af50bb1b4139f3c0ce278eee8e7bb7d95bb4d8a8c6e397c613', '[\"*\"]', NULL, NULL, '2025-04-23 20:58:57', '2025-04-23 20:58:57'),
(11, 'App\\Models\\User', 5, 'auth-token', 'b61976f3ce8aa2af5a483f4242a489707231ede8dcd6a6dfde9d5742689ef022', '[\"*\"]', NULL, NULL, '2025-04-23 21:02:57', '2025-04-23 21:02:57'),
(12, 'App\\Models\\User', 5, 'auth-token', '92c3fde41f23177987998bf9f32bd7435e3e013c8ab8988e7ec5fce96f5192b1', '[\"*\"]', NULL, NULL, '2025-04-23 21:03:14', '2025-04-23 21:03:14'),
(13, 'App\\Models\\User', 5, 'auth-token', 'fcee95b739c243b9ac1997af93db13db343b1972929bce5b3a53d67c96d19b7e', '[\"*\"]', NULL, NULL, '2025-04-24 15:12:30', '2025-04-24 15:12:30'),
(14, 'App\\Models\\User', 5, 'auth-token', 'dd5b77902c70e8a1b88b2185b4c4cb91871988b1cabb3cb2d96b42c57442032f', '[\"*\"]', NULL, NULL, '2025-04-24 15:14:44', '2025-04-24 15:14:44'),
(15, 'App\\Models\\User', 6, 'auth-token', '3c3c8f98ff6e3c9a583e41dd99cd7c5429d3801957ddf4fbf32579af85703ce7', '[\"*\"]', NULL, NULL, '2025-04-24 15:20:54', '2025-04-24 15:20:54'),
(16, 'App\\Models\\User', 6, 'auth-token', '522d14b821f0c99cd20071320c5282a297c9ffc91ea4bcbd7373068f94ecd43e', '[\"*\"]', NULL, NULL, '2025-04-24 15:21:31', '2025-04-24 15:21:31'),
(17, 'App\\Models\\User', 6, 'auth-token', '1727c9044c5920e2026e4be153cf662c9147f3d16a946717cbcf24ecda15ddfe', '[\"*\"]', NULL, NULL, '2025-04-24 15:27:41', '2025-04-24 15:27:41'),
(18, 'App\\Models\\User', 6, 'auth-token', 'e20ba14b12b9a465d04029e3f23897068b040309345b59d04e3d3c5e28e01044', '[\"*\"]', NULL, NULL, '2025-04-24 15:28:30', '2025-04-24 15:28:30'),
(19, 'App\\Models\\User', 6, 'auth-token', '9b664ed5372f383acbdacf7132c719bbbb19c1208666a17bf98037ff77f0d035', '[\"*\"]', NULL, NULL, '2025-04-24 15:33:41', '2025-04-24 15:33:41'),
(20, 'App\\Models\\User', 6, 'auth-token', '74469ac4ffb6c1b1c365b3a055016f21277d07079bb45a7efdf7b073713af3d4', '[\"*\"]', NULL, NULL, '2025-04-24 15:36:03', '2025-04-24 15:36:03'),
(21, 'App\\Models\\User', 5, 'auth-token', '64a5b2d9edb9937e5c69cf340ab9bef2fb41f4f3274954434bb117c8554f990d', '[\"*\"]', NULL, NULL, '2025-04-24 15:42:11', '2025-04-24 15:42:11'),
(22, 'App\\Models\\User', 7, 'auth-token', '38709fbbe2c32e671beb7bd442cb6c727337d235707ce6330ab43034aa6abd8d', '[\"*\"]', NULL, NULL, '2025-04-24 15:44:52', '2025-04-24 15:44:52'),
(23, 'App\\Models\\User', 8, 'auth-token', 'e0e72010e2d8d7127aac5a7df40a21ef441cadac20e4b4c7f6bcc09ec76b6bf2', '[\"*\"]', NULL, NULL, '2025-04-24 15:47:56', '2025-04-24 15:47:56'),
(24, 'App\\Models\\User', 9, 'auth-token', '9ca58bf17377d20104b6544a157b7dfb738b6c9d9a3a402daafb866e5fc30338', '[\"*\"]', NULL, NULL, '2025-04-24 15:53:07', '2025-04-24 15:53:07'),
(25, 'App\\Models\\User', 10, 'auth-token', '772f729850f0baf643ea81355f19c3225678713e9a04658c7b767f029aa3fe60', '[\"*\"]', NULL, NULL, '2025-04-24 15:58:11', '2025-04-24 15:58:11'),
(26, 'App\\Models\\User', 11, 'auth-token', '2160b3a2ded812b11a06ec60866d9b4781f28f4b6c8de51d9b13f785b9ca679e', '[\"*\"]', NULL, NULL, '2025-04-24 16:02:21', '2025-04-24 16:02:21'),
(27, 'App\\Models\\User', 12, 'auth-token', '920aef579e60d0af130dde9a3e704a6d219818717a4cfbfa96ca0adc5b2f945e', '[\"*\"]', NULL, NULL, '2025-04-24 16:03:41', '2025-04-24 16:03:41'),
(28, 'App\\Models\\User', 13, 'auth-token', '0f4d44097d4daff63e19a60ed98eda2885d3bd2d5c77c35ab1ed451184da2297', '[\"*\"]', NULL, NULL, '2025-04-24 16:04:14', '2025-04-24 16:04:14'),
(29, 'App\\Models\\User', 14, 'auth-token', 'b3d7228a486fdebba73810253d46f57a47a5816ea89a67e48b9aabca1086dc94', '[\"*\"]', NULL, NULL, '2025-04-24 16:05:20', '2025-04-24 16:05:20'),
(30, 'App\\Models\\User', 15, 'auth-token', '7354a6d9e27d3aadd0b2a81db78c800e00df451b87367513f47fa4f89b97ed11', '[\"*\"]', NULL, NULL, '2025-04-24 16:08:50', '2025-04-24 16:08:50'),
(31, 'App\\Models\\User', 16, 'auth-token', '8c5dd1081067605672a6040287cd9cba011d28d055d4cc1f6db9bef85f1a1bcc', '[\"*\"]', NULL, NULL, '2025-04-24 16:09:19', '2025-04-24 16:09:19'),
(32, 'App\\Models\\User', 16, 'auth-token', 'b1404658937e1ae2d5da73c7f129d47cf42568f7687d52f5ac935619e077dbeb', '[\"*\"]', NULL, NULL, '2025-04-24 16:09:41', '2025-04-24 16:09:41'),
(33, 'App\\Models\\User', 16, 'auth-token', '9e1af43e7062a0d24e4c9d7be334d8ced9740a916af0e660ed57e30831b517de', '[\"*\"]', NULL, NULL, '2025-04-24 16:15:19', '2025-04-24 16:15:19'),
(34, 'App\\Models\\User', 16, 'auth-token', '3da6541e015ab8edfe5e9f3b49fa682c3c282b52c515b4cf32fb4504d232faf1', '[\"*\"]', NULL, NULL, '2025-04-24 16:15:21', '2025-04-24 16:15:21'),
(35, 'App\\Models\\User', 6, 'auth-token', 'bd07604aa31278167cedde011e4d976f94638380fffa9ed9fd874070d18dc366', '[\"*\"]', NULL, NULL, '2025-04-24 16:16:13', '2025-04-24 16:16:13'),
(36, 'App\\Models\\User', 17, 'auth-token', '9e2920afd9613e313cf195f0a80d2fa74ba36a097e45fb96fbdc804d7305bbc6', '[\"*\"]', NULL, NULL, '2025-04-24 16:25:21', '2025-04-24 16:25:21'),
(37, 'App\\Models\\User', 6, 'auth-token', '8164b0f349972dac36e2d39825a6759bb512f2b4cc25960773c23b75156a564b', '[\"*\"]', NULL, NULL, '2025-04-24 16:36:49', '2025-04-24 16:36:49'),
(38, 'App\\Models\\User', 6, 'auth-token', 'c496708cc03ec16767576f4c8726a45e65b5492f6b966a09ce1ba085a87e587a', '[\"*\"]', NULL, NULL, '2025-04-24 16:36:56', '2025-04-24 16:36:56'),
(39, 'App\\Models\\User', 6, 'auth-token', '003e2b51916158cdbec3e6598fb608523533104009e5749e74f3664d078bc4ee', '[\"*\"]', NULL, NULL, '2025-04-24 16:37:06', '2025-04-24 16:37:06'),
(40, 'App\\Models\\User', 6, 'auth-token', '6be03861ab65ce58bd8cdbb4121761b55c3e0a0bea846783448c8521046d9cc7', '[\"*\"]', NULL, NULL, '2025-04-24 16:40:45', '2025-04-24 16:40:45'),
(41, 'App\\Models\\User', 6, 'auth-token', '0a7762c086ef83b38b469273197495a6b65b80e0a1da7e414c011aaac8b58e21', '[\"*\"]', '2025-04-24 17:53:10', NULL, '2025-04-24 17:21:24', '2025-04-24 17:53:10'),
(42, 'App\\Models\\User', 6, 'auth-token', 'd3211c8762d0648bc0acd7a352a421829a5dd6998b64bab404fc8fce953d1ca8', '[\"*\"]', '2025-04-24 19:27:54', NULL, '2025-04-24 17:59:27', '2025-04-24 19:27:54'),
(43, 'App\\Models\\User', 17, 'auth-token', '0dd61d33305a90e433fff80d271b2e9ba746a32ec9a0890099f4b5ea0c7c0c88', '[\"*\"]', NULL, NULL, '2025-04-24 18:10:23', '2025-04-24 18:10:23'),
(44, 'App\\Models\\User', 8, 'auth-token', '0a42bd71c4d9b21410c099984fe68fa27fc80cc2c24e4a0e193c2c2b54422e5d', '[\"*\"]', NULL, NULL, '2025-04-24 18:13:21', '2025-04-24 18:13:21'),
(45, 'App\\Models\\User', 6, 'auth-token', 'd2d80102d5eaade027eac12aa2797e4224f5ade03df898ae941192b1f3f826b9', '[\"*\"]', '2025-04-24 19:16:09', NULL, '2025-04-24 18:26:27', '2025-04-24 19:16:09'),
(46, 'App\\Models\\User', 6, 'auth-token', '1980549bcf36a247c3aebf1edbc375918d5c1b4d2a4eedd98f6cecd6133ac923', '[\"*\"]', '2025-04-24 21:34:32', NULL, '2025-04-24 19:33:11', '2025-04-24 21:34:32'),
(47, 'App\\Models\\User', 6, 'auth-token', '0a06c19cdb23217967212ff3ae4c4553206e8bbf8ed291808d5996e48f1c9531', '[\"*\"]', '2025-04-24 20:27:34', NULL, '2025-04-24 20:03:12', '2025-04-24 20:27:34'),
(48, 'App\\Models\\User', 6, 'auth-token', 'ae429ec8d6fc4e818be6a8ce092a40578b1e0eabff8e8d6f3a1ef734126ff857', '[\"*\"]', '2025-04-24 20:26:26', NULL, '2025-04-24 20:25:06', '2025-04-24 20:26:26'),
(49, 'App\\Models\\User', 18, 'auth-token', 'bc13e7883c8fd3ff43b5bfe4919dd6e1675e083e5612309d05d3202a8d2594b2', '[\"*\"]', NULL, NULL, '2025-04-24 20:28:45', '2025-04-24 20:28:45'),
(50, 'App\\Models\\User', 19, 'auth-token', '1b9ab5a4f66346c56bb71973392148a89bb0d2208c262879b45db6f3923c4eef', '[\"*\"]', NULL, NULL, '2025-04-24 20:29:02', '2025-04-24 20:29:02'),
(51, 'App\\Models\\User', 20, 'auth-token', 'de8e34208f7f16d9fb2f4f820d7bdfedd9f16aeb2eee824e1c1b1592d6f334ef', '[\"*\"]', NULL, NULL, '2025-04-24 20:29:24', '2025-04-24 20:29:24'),
(52, 'App\\Models\\User', 20, 'auth-token', '8a07d22a1a2a4ad45d50b7c5d818359b48138f620e3feaacf4073c3f5dad6605', '[\"*\"]', NULL, NULL, '2025-04-24 20:29:38', '2025-04-24 20:29:38'),
(53, 'App\\Models\\User', 6, 'auth-token', 'e66eeea94c54d454522bc58c659ae25c576df89becd5fca5d745ac2883fcdd6a', '[\"*\"]', '2025-04-24 21:45:43', NULL, '2025-04-24 20:30:58', '2025-04-24 21:45:43'),
(54, 'App\\Models\\User', 21, 'auth-token', 'ea48ebf58f653d01b3fb199237257f2c2499682c408dd26092f4f0caff99cc88', '[\"*\"]', NULL, NULL, '2025-04-24 21:47:02', '2025-04-24 21:47:02'),
(55, 'App\\Models\\User', 21, 'auth-token', 'fdb0969603366373c277a9768933ba81c039896aac425906893eee62492adcf9', '[\"*\"]', '2025-04-24 21:59:44', NULL, '2025-04-24 21:47:13', '2025-04-24 21:59:44'),
(56, 'App\\Models\\User', 6, 'auth-token', 'd9ee0d78c8e5e5b83de126005d34fc386b30bd02dc215ef8a05bfc4fca085c6a', '[\"*\"]', '2025-04-25 17:41:11', NULL, '2025-04-25 15:36:53', '2025-04-25 17:41:11'),
(57, 'App\\Models\\User', 6, 'auth-token', '908cbd8816adcf5ae2f7281fd0973d8d57e3cb349fb567bea49c981215490f5d', '[\"*\"]', '2025-04-25 17:28:49', NULL, '2025-04-25 17:25:28', '2025-04-25 17:28:49'),
(58, 'App\\Models\\User', 6, 'auth-token', '10342360e53ced8aa87d1629acac1e28c696d61c49477f345e14b39e34fbe8b6', '[\"*\"]', '2025-04-25 17:50:34', NULL, '2025-04-25 17:41:49', '2025-04-25 17:50:34'),
(59, 'App\\Models\\User', 21, 'auth-token', '5a188c0ad8954e4ad29ba271783c3e086eba9440b58b41b1ae609a3f4ae1b31a', '[\"*\"]', '2025-04-25 17:56:05', NULL, '2025-04-25 17:52:53', '2025-04-25 17:56:05'),
(60, 'App\\Models\\User', 17, 'auth-token', '7ed45e131780fc362961d8173a6bf173ff3541981b48c85971a9b270939b0eb6', '[\"*\"]', NULL, NULL, '2025-04-25 17:56:44', '2025-04-25 17:56:44'),
(61, 'App\\Models\\User', 6, 'auth-token', '062cd871e840027a9c8892bbf6adb983eab7b305498822f15de767f6a97b793e', '[\"*\"]', '2025-04-25 19:09:14', NULL, '2025-04-25 19:08:31', '2025-04-25 19:09:14'),
(62, 'App\\Models\\User', 9, 'auth-token', '5c0a738a3f1ade14d0dba96d1f3d0b1f61312bde035c784546a079c7128d5ba6', '[\"*\"]', NULL, NULL, '2025-04-25 19:09:46', '2025-04-25 19:09:46'),
(63, 'App\\Models\\User', 9, 'auth-token', '91708af171ff23d810137a5cf9dd5c99547e82660e8c6d2c1bec37b7962c166e', '[\"*\"]', NULL, NULL, '2025-04-25 19:48:30', '2025-04-25 19:48:30'),
(64, 'App\\Models\\User', 22, 'auth-token', '386f36028a9675307dcc229bbd335b4542e131343305a2a5b2936151623746e6', '[\"*\"]', NULL, NULL, '2025-04-25 20:17:10', '2025-04-25 20:17:10'),
(65, 'App\\Models\\User', 22, 'auth-token', 'fc100f9537d0432a153d2ee3bdd0bb77e36d077dc8b3b91fe7ae501fbf32c65c', '[\"*\"]', '2025-04-25 20:18:31', NULL, '2025-04-25 20:17:21', '2025-04-25 20:18:31'),
(66, 'App\\Models\\User', 22, 'auth-token', '6d1f04cf25aa2aba128c82b3771f196afc76695dc0a8cde9ce6c5aac1460aa95', '[\"*\"]', '2025-04-25 20:20:09', NULL, '2025-04-25 20:20:07', '2025-04-25 20:20:09'),
(67, 'App\\Models\\User', 22, 'auth-token', 'a92110021ee997abd72d98d09e09db3e98729ba7783df41cfcec9c222b81f8e3', '[\"*\"]', '2025-04-25 20:50:52', NULL, '2025-04-25 20:49:17', '2025-04-25 20:50:52'),
(68, 'App\\Models\\User', 22, 'auth-token', 'd3701dcb2f64b4ec11f2addc98c1699f6dfc474dbafbf6d365b2f3e990457aa4', '[\"*\"]', '2025-04-26 09:34:31', NULL, '2025-04-26 09:33:39', '2025-04-26 09:34:31'),
(69, 'App\\Models\\User', 23, 'auth-token', '77740f73dc3473f7a509762b8a8d534ae4109d42e10595830918dd8f5bebba02', '[\"*\"]', NULL, NULL, '2025-04-26 09:35:24', '2025-04-26 09:35:24'),
(70, 'App\\Models\\User', 23, 'auth-token', '416c821dcc942da566fcb16e0b79cfd709d02a1fb757bd05d5492f1847ae1dfa', '[\"*\"]', NULL, NULL, '2025-04-26 09:35:32', '2025-04-26 09:35:32'),
(71, 'App\\Models\\User', 23, 'auth-token', 'abc0732f81016f355fdf27756cfd9114c3a7c1f3bf27f52ecb06ce90750d2335', '[\"*\"]', NULL, NULL, '2025-04-26 12:29:17', '2025-04-26 12:29:17'),
(72, 'App\\Models\\User', 21, 'auth-token', 'cfb0cbd2357303f5bb7f9b85de53608280e8587a715dd06a5e514cdbd4eefa9c', '[\"*\"]', '2025-04-26 12:55:59', NULL, '2025-04-26 12:53:13', '2025-04-26 12:55:59'),
(73, 'App\\Models\\User', 21, 'auth-token', 'ad12134a8f1a459a10a5909d5b5a9bdc3c0d3f15c960e100d07f5d4346365920', '[\"*\"]', '2025-04-26 12:59:27', NULL, '2025-04-26 12:58:12', '2025-04-26 12:59:27'),
(74, 'App\\Models\\User', 21, 'auth-token', '822965a47d868ae5943a491ccd1bd8ba05e56ce2ca842dc065c4bf2df99f9a02', '[\"*\"]', '2025-04-26 13:02:44', NULL, '2025-04-26 13:00:46', '2025-04-26 13:02:44'),
(75, 'App\\Models\\User', 17, 'auth-token', 'eeaee9b818e28670de7458585fd1464aadd2ed6f0f63326d26fce7088e163d69', '[\"*\"]', NULL, NULL, '2025-04-26 13:04:34', '2025-04-26 13:04:34'),
(76, 'App\\Models\\User', 17, 'auth-token', '7ee19b343bc58506389a9cd465aae83b9b886d2bf99b90505040975b3e6fe487', '[\"*\"]', NULL, NULL, '2025-04-26 13:07:01', '2025-04-26 13:07:01'),
(77, 'App\\Models\\User', 17, 'auth-token', '4d316174185b7e34b382a8ab3f4e3d1aed1d6c0be2d046e124ed81b5bb78901e', '[\"*\"]', NULL, NULL, '2025-04-26 13:13:59', '2025-04-26 13:13:59'),
(78, 'App\\Models\\User', 17, 'auth-token', 'd80c5f892c12cf103c3ce50fa1772a84e6993c3a0c4423d3ef68feeb6001ef1e', '[\"*\"]', NULL, NULL, '2025-04-26 13:14:51', '2025-04-26 13:14:51'),
(79, 'App\\Models\\User', 17, 'auth-token', 'de4e379e718cd2d772f82065cbb6143d8a1b6972dfbbeadf821f32cecdd4cef8', '[\"*\"]', NULL, NULL, '2025-04-26 13:17:50', '2025-04-26 13:17:50'),
(80, 'App\\Models\\User', 17, 'auth-token', '88fa1f891d8354920900125fc317b11acd8f46eb288ef1186a990a6de3cf1012', '[\"*\"]', NULL, NULL, '2025-04-26 13:18:41', '2025-04-26 13:18:41'),
(81, 'App\\Models\\User', 23, 'auth-token', '5978900ecf234a20b1d3586efa9a31c01c85eadb2308f76e4419309cebf6f529', '[\"*\"]', NULL, NULL, '2025-04-26 13:25:22', '2025-04-26 13:25:22'),
(82, 'App\\Models\\User', 23, 'auth-token', '564f8dce3dc48c3458a18f611fe7fae6d643ecc42f08669fe2c7bdeaedb7fd86', '[\"*\"]', NULL, NULL, '2025-04-26 13:25:34', '2025-04-26 13:25:34'),
(83, 'App\\Models\\User', 21, 'auth-token', '5b4830e491bf1952b7a2268854737fefbde3cbbb1a509ee3f72ab729cb397a6e', '[\"*\"]', '2025-04-26 13:32:33', NULL, '2025-04-26 13:32:04', '2025-04-26 13:32:33'),
(84, 'App\\Models\\User', 21, 'auth-token', 'ce2adef41c9234162b404f2eba58202b540a99eb77cc1c407b9a7e1496b79f68', '[\"*\"]', '2025-04-26 18:41:36', NULL, '2025-04-26 13:35:36', '2025-04-26 18:41:36'),
(85, 'App\\Models\\User', 21, 'auth-token', '8473778923238278e06bd83079fce6d859b3acff859d56b97ac6450539ce94f3', '[\"*\"]', '2025-04-26 18:43:58', NULL, '2025-04-26 18:42:12', '2025-04-26 18:43:58'),
(86, 'App\\Models\\User', 21, 'auth-token', '12ac453dba97e4fb4dff1193e9c50a265986dfdd748e2c96a07e475260af6d61', '[\"*\"]', NULL, NULL, '2025-04-26 18:45:42', '2025-04-26 18:45:42'),
(87, 'App\\Models\\User', 21, 'auth-token', '4a815407e64aba4f032ac9f37d7f95ff48b15993a1b90ee287ff6f8cd322f748', '[\"*\"]', NULL, NULL, '2025-04-26 18:46:04', '2025-04-26 18:46:04'),
(88, 'App\\Models\\User', 21, 'auth-token', '45f84149db3a9a09bd94347f5430a4f360ab6b568e17608ba8cb3671a2616fbb', '[\"*\"]', '2025-04-26 19:15:00', NULL, '2025-04-26 18:47:21', '2025-04-26 19:15:00'),
(89, 'App\\Models\\User', 21, 'auth-token', '03a11b530c350d6338e6b5e56a6788fe444c54cd5b2284d2a32fc9e9c2583ed2', '[\"*\"]', '2025-04-26 19:33:22', NULL, '2025-04-26 19:22:47', '2025-04-26 19:33:22'),
(90, 'App\\Models\\User', 21, 'auth-token', '37c19808ccbf60d96a65f4246e0126ba1819225bf8e8e6b210ca05ee8b819934', '[\"*\"]', '2025-04-26 20:40:46', NULL, '2025-04-26 20:37:19', '2025-04-26 20:40:46'),
(91, 'App\\Models\\User', 17, 'auth-token', 'acc643b7e81f69339a6dc284b5e6f773359b42fc2e5cbf5d4084ec4c975e3f26', '[\"*\"]', NULL, NULL, '2025-04-27 13:37:23', '2025-04-27 13:37:23'),
(92, 'App\\Models\\User', 21, 'auth-token', '919eda3ead94d9096eea08920d8cdf92b434e3f3e7cfc948c10a7526fbc307a4', '[\"*\"]', '2025-04-27 13:47:40', NULL, '2025-04-27 13:39:12', '2025-04-27 13:47:40'),
(93, 'App\\Models\\User', 6, 'auth-token', 'afa53980bbbfbdc4ada69331cfa5d7901691e0c0e81807cd023e3aa92de0389d', '[\"*\"]', '2025-04-27 14:14:29', NULL, '2025-04-27 13:48:49', '2025-04-27 14:14:29'),
(94, 'App\\Models\\User', 23, 'auth-token', '2c5ada4504b9db5ec5d353c12e7c191972b4e31f997cce0f571a8c3cb6e2caef', '[\"*\"]', NULL, NULL, '2025-04-27 14:14:55', '2025-04-27 14:14:55'),
(95, 'App\\Models\\User', 22, 'auth-token', 'c7f8abb2d950402999a054c8ed92644c1809af7f91b06c76e846c95d33f9dbfc', '[\"*\"]', '2025-04-27 14:48:11', NULL, '2025-04-27 14:25:54', '2025-04-27 14:48:11'),
(96, 'App\\Models\\User', 23, 'auth-token', 'd18937bf8e043750829fe17dd46ff2e898235bdb3f19fa73b327f0c33609a0eb', '[\"*\"]', NULL, NULL, '2025-04-27 14:48:42', '2025-04-27 14:48:42'),
(97, 'App\\Models\\User', 15, 'auth-token', '2c3da860dc08b92398511d4aab43aa4edd6be0da225d686ea74ba07f67ff5f2d', '[\"*\"]', '2025-04-27 22:37:48', NULL, '2025-04-27 22:37:17', '2025-04-27 22:37:48'),
(98, 'App\\Models\\User', 22, 'auth-token', '930594d1e41018b3936099063b25e5c8af1db637566ba0a7f6da7111770e663d', '[\"*\"]', '2025-04-28 17:24:34', NULL, '2025-04-28 13:03:05', '2025-04-28 17:24:34'),
(99, 'App\\Models\\User', 23, 'auth-token', '81089194f57088a3720e7003c45cf9c0d13262297cc996052294e5e7baadd5b2', '[\"*\"]', NULL, NULL, '2025-04-28 18:18:06', '2025-04-28 18:18:06'),
(100, 'App\\Models\\User', 23, 'auth-token', '4406344298bc46c6738252ba3e212c3647e08e2fc5e680198253adbe815fb250', '[\"*\"]', NULL, NULL, '2025-04-28 18:41:35', '2025-04-28 18:41:35'),
(101, 'App\\Models\\User', 17, 'auth-token', 'ec80e8e87409461bc48d8fc239d695c6a2b837680ead2417d9936c3811782d3e', '[\"*\"]', NULL, NULL, '2025-04-28 18:43:03', '2025-04-28 18:43:03'),
(102, 'App\\Models\\User', 21, 'auth-token', '6a59128c7e4a3c2f03ed5af95ada43d3ff377043710082138ab1ef36419c0122', '[\"*\"]', '2025-04-28 19:59:05', NULL, '2025-04-28 18:48:02', '2025-04-28 19:59:05'),
(103, 'App\\Models\\User', 21, 'auth-token', '3d45c32f9f79ffab38315049b29cfb81a16c13d7c1e322aa76ff8cb4a5b97799', '[\"*\"]', '2025-04-28 20:25:39', NULL, '2025-04-28 20:23:42', '2025-04-28 20:25:39'),
(104, 'App\\Models\\User', 23, 'auth-token', '2f1eaf658d265b006822475c07a7c0422ab325f85295a0caf002741058eee05a', '[\"*\"]', NULL, NULL, '2025-04-28 20:26:06', '2025-04-28 20:26:06'),
(105, 'App\\Models\\User', 6, 'auth-token', '6937e1bf97142c04d1d27532cfe380d602bf20aacb648a4df3e358b59129ed78', '[\"*\"]', '2025-04-28 20:52:02', NULL, '2025-04-28 20:33:35', '2025-04-28 20:52:02'),
(106, 'App\\Models\\User', 23, 'auth-token', 'b37666583cf0aa0bccc12d2e7b190ea7c5e8049cb89f2898d8b59631863166bc', '[\"*\"]', NULL, NULL, '2025-04-28 20:54:57', '2025-04-28 20:54:57'),
(107, 'App\\Models\\User', 21, 'auth-token', '376157ef2c684e82813c22b2aa64db5b687863ac5180253388e1d81179a63493', '[\"*\"]', '2025-04-28 20:56:24', NULL, '2025-04-28 20:56:11', '2025-04-28 20:56:24'),
(108, 'App\\Models\\User', 21, 'auth-token', '32f9e58d7452aef0ffee974572943d481e5a64f528f3e304d6735f5af5252e33', '[\"*\"]', '2025-04-28 20:57:44', NULL, '2025-04-28 20:57:22', '2025-04-28 20:57:44'),
(109, 'App\\Models\\User', 21, 'auth-token', '46db13872cffd6afa4e864858f98d7c6db14b294817554d146d4947686c15578', '[\"*\"]', '2025-04-28 21:00:26', NULL, '2025-04-28 20:59:51', '2025-04-28 21:00:26'),
(110, 'App\\Models\\User', 6, 'auth-token', '44cc5635b8e52b34679879705e3f0ccda5ca6e2e4c47f4a10e76719924ad036d', '[\"*\"]', '2025-04-28 21:03:07', NULL, '2025-04-28 21:01:42', '2025-04-28 21:03:07'),
(111, 'App\\Models\\User', 23, 'auth-token', 'e069df1c9c004bcb67ce408f266dae31e99f998345a2736f4db7d0e865ae5546', '[\"*\"]', NULL, NULL, '2025-04-28 21:10:56', '2025-04-28 21:10:56'),
(112, 'App\\Models\\User', 18, 'auth-token', 'd7f97ac761e115a19e4820be52e485a1d285b1b8734270db2fce0b7a826b8c7f', '[\"*\"]', NULL, NULL, '2025-04-28 21:52:23', '2025-04-28 21:52:23'),
(113, 'App\\Models\\User', 17, 'auth-token', '597f04694516ba4801ca38cc5f81454895fad8bdc9ee3ab21c84c0fcd1e449d5', '[\"*\"]', NULL, NULL, '2025-04-28 22:12:53', '2025-04-28 22:12:53'),
(114, 'App\\Models\\User', 21, 'auth-token', '2e29c531cf0acd1f2dbf3c80c6d12f40029befc9896474f93ec1df22c8563f25', '[\"*\"]', '2025-04-28 22:41:57', NULL, '2025-04-28 22:18:36', '2025-04-28 22:41:57'),
(115, 'App\\Models\\User', 21, 'auth-token', '65c62d26f171596c35bd0017a2f42bc2af234c400cca8e3bcdd2c0dc1c8d478a', '[\"*\"]', '2025-04-28 22:48:54', NULL, '2025-04-28 22:48:18', '2025-04-28 22:48:54'),
(116, 'App\\Models\\User', 21, 'auth-token', 'ebec1dd88d44c93d77796e286271090754e7f7a55a25bbee82c90eb80228878c', '[\"*\"]', NULL, NULL, '2025-04-28 23:05:17', '2025-04-28 23:05:17'),
(117, 'App\\Models\\User', 23, 'auth-token', 'f8277c334ceef49321667a44ea14ebcb008a3f116e137c88fd1bb25bb7eb6e11', '[\"*\"]', NULL, NULL, '2025-04-29 17:11:56', '2025-04-29 17:11:56'),
(118, 'App\\Models\\User', 22, 'auth-token', 'a0efd95d9dfecb8c94c1687835bf8e4a76eef34819ebcc5bcc70c6ad7a595e93', '[\"*\"]', '2025-04-29 21:32:22', NULL, '2025-04-29 17:13:59', '2025-04-29 21:32:22'),
(119, 'App\\Models\\User', 23, 'auth-token', '34264fb96889b98d019a169f58d5a792f19ca290f9bf59cdc3891968207fff15', '[\"*\"]', '2025-04-29 17:51:50', NULL, '2025-04-29 17:48:46', '2025-04-29 17:51:50'),
(120, 'App\\Models\\User', 17, 'auth-token', 'dc7aa901aab46d0c9fb3509923038bd0c4b7d3f2b1bdcce49fe623db81179374', '[\"*\"]', '2025-04-30 21:01:36', NULL, '2025-04-29 21:38:19', '2025-04-30 21:01:36'),
(121, 'App\\Models\\User', 17, 'auth-token', '4c50e71b864d9d6ccf56700a70201fc5285b1181f6fdf3df836a6b63f86c1513', '[\"*\"]', NULL, NULL, '2025-05-01 13:45:40', '2025-05-01 13:45:40'),
(122, 'App\\Models\\User', 17, 'auth-token', '94af066b16f2d55976769e7725f1f2469ba75432a6d93bcad0bd7d02c7b8b8b9', '[\"*\"]', '2025-05-01 14:00:05', NULL, '2025-05-01 13:59:45', '2025-05-01 14:00:05'),
(123, 'App\\Models\\User', 23, 'auth-token', '24355f5152bcc6beabf256484fb02dffed98f6835953ce3b59f4c95f15a496b2', '[\"*\"]', '2025-05-01 14:15:09', NULL, '2025-05-01 14:01:36', '2025-05-01 14:15:09'),
(124, 'App\\Models\\User', 21, 'auth-token', 'dfec7f76489e4841439521deb4e7fe0344598a990fd0ec4c57b6baa58483d7c5', '[\"*\"]', '2025-05-01 14:18:28', NULL, '2025-05-01 14:17:27', '2025-05-01 14:18:28'),
(125, 'App\\Models\\User', 23, 'auth-token', '2ada76245fff3490d6fc43ca775c0722e7199baa3028760089ccc3658ebea55b', '[\"*\"]', '2025-05-01 15:06:31', NULL, '2025-05-01 14:19:10', '2025-05-01 15:06:31'),
(126, 'App\\Models\\User', 23, 'auth-token', '109bbdb02ff74d80f848fda9460ef3dde116f60b00a3053a6fefb55de2e1526e', '[\"*\"]', '2025-05-08 09:19:57', NULL, '2025-05-01 18:29:19', '2025-05-08 09:19:57'),
(127, 'App\\Models\\User', 7, 'auth-token', '515c839677d619cd7ff63468419c30482f3746e05960dfa6d6ed48ff5009777c', '[\"*\"]', NULL, NULL, '2025-05-01 19:24:07', '2025-05-01 19:24:07'),
(128, 'App\\Models\\User', 6, 'auth-token', '83f0db728664c89f3ab8f3007b4b57ed1c99bf4f3f89a765104cb1912a7d3be6', '[\"*\"]', '2025-05-01 19:39:54', NULL, '2025-05-01 19:39:07', '2025-05-01 19:39:54'),
(129, 'App\\Models\\User', 23, 'auth-token', '46080d5854b1f5e8b0ef29636be5fefd48ab8ed93c49c1e0de4681aa8da98ee8', '[\"*\"]', '2025-05-01 20:54:01', NULL, '2025-05-01 20:51:54', '2025-05-01 20:54:01'),
(130, 'App\\Models\\User', 11, 'auth-token', '1dd3e28f4771834362645af9b07fa8ed5a64fd4e7e7df0faf49fe65fbc74afe7', '[\"*\"]', '2025-05-03 00:03:34', NULL, '2025-05-02 17:38:27', '2025-05-03 00:03:34'),
(131, 'App\\Models\\User', 21, 'auth-token', '946d44ef43c8f7d5becce5ccef892a81d66e0659b7e4f7482c3e794b9e6f727f', '[\"*\"]', '2025-05-03 08:22:25', NULL, '2025-05-03 08:20:58', '2025-05-03 08:22:25'),
(132, 'App\\Models\\User', 21, 'auth-token', 'f64c2dd753a66d957c6b7e66e6bfb802e04c6f7c06388acd552a26c56048ead0', '[\"*\"]', '2025-05-03 08:48:24', NULL, '2025-05-03 08:47:36', '2025-05-03 08:48:24'),
(133, 'App\\Models\\User', 23, 'auth-token', 'fc847c3c1aea007e2d5a38b1c76a11448a9c6857deaf33dc5ca6c542dc0d7d85', '[\"*\"]', '2025-05-03 21:19:10', NULL, '2025-05-03 08:49:25', '2025-05-03 21:19:10'),
(134, 'App\\Models\\User', 23, 'auth-token', 'e4312d241d483cd70fa1fb644ff9d38cfca1803ca7a2b05fda6edba7313a916d', '[\"*\"]', '2025-05-03 21:21:33', NULL, '2025-05-03 21:20:08', '2025-05-03 21:21:33'),
(135, 'App\\Models\\User', 327, 'auth-token', '2aae9e9a33bf3025e2a4ed60c7b72022399122f1eb82b425a9f8a0ac264dd0d9', '[\"*\"]', '2025-05-04 22:55:08', NULL, '2025-05-03 21:23:27', '2025-05-04 22:55:08'),
(136, 'App\\Models\\User', 328, 'auth-token', 'dc0fa107b271aba3aa967b3c6afbd7585503746a1974ced625c41aa4c021018d', '[\"*\"]', NULL, NULL, '2025-05-04 22:56:00', '2025-05-04 22:56:00'),
(137, 'App\\Models\\User', 328, 'auth-token', '423772ad9f534aee11800cea92aefead4c41a20c8184b46e39238f7930400eb7', '[\"*\"]', '2025-05-08 10:25:29', NULL, '2025-05-04 22:56:15', '2025-05-08 10:25:29'),
(138, 'App\\Models\\User', 23, 'auth-token', 'cd8b1ef058b27e0a8742bb6d4b89ea11f95b049145ee462fbca45f88d3f72755', '[\"*\"]', '2025-05-12 16:08:52', NULL, '2025-05-07 23:13:18', '2025-05-12 16:08:52'),
(139, 'App\\Models\\User', 329, 'auth-token', '20c2a07280195497a59d8d38f3dbe271029037d5cc8ce116a1093b3348692850', '[\"*\"]', NULL, NULL, '2025-05-08 10:26:15', '2025-05-08 10:26:15'),
(140, 'App\\Models\\User', 329, 'auth-token', 'f2ab0362a4b587617a944fa3ed5041a6f185cd18fcae5d57b0b13b70125cff22', '[\"*\"]', '2025-05-08 10:41:08', NULL, '2025-05-08 10:26:28', '2025-05-08 10:41:08'),
(141, 'App\\Models\\User', 328, 'auth-token', '9c447691830a3d4200dd26a2cb0f559d6ba11b05cc4dcb29b7f9049c2345a8c4', '[\"*\"]', '2025-05-08 11:53:00', NULL, '2025-05-08 10:41:34', '2025-05-08 11:53:00'),
(142, 'App\\Models\\User', 327, 'auth-token', 'b158ba6b6d1fb997bb0b011ba7cc113b986e4d2de0f0591a89bca4d857bb553c', '[\"*\"]', '2025-05-08 12:59:59', NULL, '2025-05-08 11:54:27', '2025-05-08 12:59:59'),
(143, 'App\\Models\\User', 17, 'auth-token', '63112d346136b88d662e61d5ca987be4f6a74475db4dbb95bc15a63f0bb2ff40', '[\"*\"]', '2025-05-08 13:02:13', NULL, '2025-05-08 13:00:22', '2025-05-08 13:02:13'),
(144, 'App\\Models\\User', 17, 'auth-token', 'e2ba8443158f0cb39f52666f3ebf1f72e5763cdf11c164225966733c839c9fc5', '[\"*\"]', '2025-05-08 13:46:17', NULL, '2025-05-08 13:07:39', '2025-05-08 13:46:17'),
(145, 'App\\Models\\User', 17, 'auth-token', '90b791e9ae87a794667c0bb83bbf5b1afb3c7a94164255c3d6f0ac53adc8df6c', '[\"*\"]', '2025-05-08 13:54:45', NULL, '2025-05-08 13:53:33', '2025-05-08 13:54:45'),
(146, 'App\\Models\\User', 330, 'auth-token', 'e4f924933d7c9fa1d1fd32e2b4969c2ee297e6c1913f54f1b5f8ca3e4c9fc7d1', '[\"*\"]', NULL, NULL, '2025-05-08 13:58:19', '2025-05-08 13:58:19'),
(147, 'App\\Models\\User', 330, 'auth-token', 'd3f72cb42a61b680505c1c31b74ef1935e857ea08161d4b77010360bb02d65c3', '[\"*\"]', '2025-05-08 13:59:17', NULL, '2025-05-08 13:58:45', '2025-05-08 13:59:17'),
(148, 'App\\Models\\User', 17, 'auth-token', '3178b446a08827a733f547d08f3b3173b6d2737cbfc9bf2c7899525640b038f2', '[\"*\"]', '2025-05-08 16:35:10', NULL, '2025-05-08 14:04:57', '2025-05-08 16:35:10'),
(149, 'App\\Models\\User', 7, 'auth-token', 'e70b625a999044e41a8c1307f32482ab6e830c1d435484ec3d82049b1c301ad0', '[\"*\"]', '2025-05-08 16:36:25', NULL, '2025-05-08 16:35:13', '2025-05-08 16:36:25'),
(150, 'App\\Models\\User', 328, 'auth-token', 'e0cf735c37feff6a573ff591673f6cb8b59ad3555f7c565c9d3cd38eb2e719e8', '[\"*\"]', '2025-05-08 18:16:11', NULL, '2025-05-08 16:36:27', '2025-05-08 18:16:11'),
(151, 'App\\Models\\User', 21, 'auth-token', '86eab54ed0b3172043a27093cafafd07c494fa1a32c582608d44c8fd58f1ab09', '[\"*\"]', '2025-05-08 18:28:11', NULL, '2025-05-08 18:27:50', '2025-05-08 18:28:11'),
(152, 'App\\Models\\User', 23, 'auth-token', '18b5020cd163938296f8916db9370b358665f87c00a9de3f57cf5e2392eab2a8', '[\"*\"]', '2025-05-08 18:28:57', NULL, '2025-05-08 18:28:27', '2025-05-08 18:28:57'),
(153, 'App\\Models\\User', 21, 'auth-token', '39fec19d53df6280cddb6922684a1b4a7cb3b5ddb897fa634902ecdde29ffa21', '[\"*\"]', '2025-05-08 18:37:30', NULL, '2025-05-08 18:29:48', '2025-05-08 18:37:30'),
(154, 'App\\Models\\User', 23, 'auth-token', 'b63c70d9f5a9a72eb7c4c0a2ba9a2dabc774d2d00f5face4b7b3b254ecc1838f', '[\"*\"]', '2025-05-08 18:38:37', NULL, '2025-05-08 18:37:45', '2025-05-08 18:38:37'),
(155, 'App\\Models\\User', 331, 'auth-token', 'a8f0688680dfddfcca0cb5e7872f9c57cd27785246877a04fdb2fd9464641191', '[\"*\"]', NULL, NULL, '2025-05-08 18:40:11', '2025-05-08 18:40:11'),
(156, 'App\\Models\\User', 331, 'auth-token', '64e43e12a405d77112a835079248cf80cc555b7a03c60d90852a4545ac1e33ca', '[\"*\"]', '2025-05-08 18:45:53', NULL, '2025-05-08 18:40:21', '2025-05-08 18:45:53'),
(157, 'App\\Models\\User', 328, 'auth-token', 'ea0404e67cf5bc332c6cba48d6bff52205ecd9ad4798a1dc40b240a7da0cac59', '[\"*\"]', '2025-05-08 18:52:42', NULL, '2025-05-08 18:49:31', '2025-05-08 18:52:42'),
(158, 'App\\Models\\User', 17, 'auth-token', 'd0a4a52503ff8a9adb325457ff07e5d6f46aca3197723c3786fba1cb6c2e409d', '[\"*\"]', '2025-05-08 19:25:40', NULL, '2025-05-08 18:53:54', '2025-05-08 19:25:40'),
(159, 'App\\Models\\User', 17, 'auth-token', '81a2c28892421ead9db26b579b5918b61fa0bdbfb971e7e628d3602f01aff402', '[\"*\"]', '2025-05-08 20:14:50', NULL, '2025-05-08 19:26:48', '2025-05-08 20:14:50'),
(160, 'App\\Models\\User', 332, 'auth-token', 'c2acbfa954bfa5dc2f187c6fc6d8e2a2d3ecc58c89a1c4bdb2131c1865db7aad', '[\"*\"]', NULL, NULL, '2025-05-08 20:28:19', '2025-05-08 20:28:19'),
(161, 'App\\Models\\User', 17, 'auth-token', '2828f9267a661cb0b8e87344e6d6fab181b0042459639ce32f4f839a233dedbb', '[\"*\"]', '2025-05-08 20:31:33', NULL, '2025-05-08 20:28:37', '2025-05-08 20:31:33'),
(162, 'App\\Models\\User', 21, 'auth-token', '9493866083117b67d4ea9a9a61fe937f66836f5bbaac5f32bf203ca85171700c', '[\"*\"]', '2025-05-08 20:44:35', NULL, '2025-05-08 20:32:13', '2025-05-08 20:44:35'),
(163, 'App\\Models\\User', 17, 'auth-token', 'd7f74fac2d6e954f6537e793eab789a7bce4494d09108db6506da9be82ea6d57', '[\"*\"]', '2025-05-08 21:26:46', NULL, '2025-05-08 20:44:59', '2025-05-08 21:26:46'),
(164, 'App\\Models\\User', 333, 'auth-token', '3307121c5b3a10f4708267b80a39e9ce9f1d34ba11ab8dbb267c9fe9bd64d104', '[\"*\"]', NULL, NULL, '2025-05-08 21:27:19', '2025-05-08 21:27:19'),
(165, 'App\\Models\\User', 333, 'auth-token', '17d76485ee2f6327cd5155cd2b4c0b728657e65c2c333fd0045bffcd87f48836', '[\"*\"]', '2025-05-08 21:27:31', NULL, '2025-05-08 21:27:27', '2025-05-08 21:27:31'),
(166, 'App\\Models\\User', 17, 'auth-token', 'f976c646a1df20090222824ac7fb618d766f2b061ee91b62b0f9953be4d176d1', '[\"*\"]', '2025-05-08 21:31:05', NULL, '2025-05-08 21:28:35', '2025-05-08 21:31:05'),
(167, 'App\\Models\\User', 21, 'auth-token', '7e275ab837bbf86962460acffde745d68f57bdb5547a4b31a2949d91383f7fa2', '[\"*\"]', '2025-05-09 06:55:18', NULL, '2025-05-09 06:44:09', '2025-05-09 06:55:18'),
(168, 'App\\Models\\User', 334, 'auth-token', 'ca9329411b658374ae7950425fab1558accf209e13f345d91d1cbab7178b6c12', '[\"*\"]', NULL, NULL, '2025-05-09 07:01:19', '2025-05-09 07:01:19'),
(169, 'App\\Models\\User', 334, 'auth-token', 'ab76be6fc8ba7a3174357fb9dc483b0275cf2680e403c24b4a3e20f7a279e8c1', '[\"*\"]', '2025-05-09 07:01:37', NULL, '2025-05-09 07:01:33', '2025-05-09 07:01:37'),
(170, 'App\\Models\\User', 17, 'auth-token', 'b0c0d22c3d95688c8741655d8bbfadffc778b5316155c9849480a99b71b66c8f', '[\"*\"]', '2025-05-09 07:13:24', NULL, '2025-05-09 07:13:17', '2025-05-09 07:13:24'),
(171, 'App\\Models\\User', 6, 'auth-token', '9b1aeb57690db9f2aa45f3f5b66161b5aa61f3b3a4851b61f25ece658776dea5', '[\"*\"]', '2025-05-09 07:38:21', NULL, '2025-05-09 07:13:57', '2025-05-09 07:38:21'),
(172, 'App\\Models\\User', 17, 'auth-token', '51b630662ce7f81adb353a49d755b593b9fd587be6ed11ebb6e33dcbf9af7acc', '[\"*\"]', '2025-05-09 07:53:50', NULL, '2025-05-09 07:41:35', '2025-05-09 07:53:50'),
(173, 'App\\Models\\User', 21, 'auth-token', '2fd3889608e4d1d7bab4cfd2fe80cd7867ed0d98243d0b4bd937e500fc5e4591', '[\"*\"]', '2025-05-09 08:01:08', NULL, '2025-05-09 07:54:08', '2025-05-09 08:01:08'),
(174, 'App\\Models\\User', 23, 'auth-token', 'f384d083672c0eb1804c480b45a4406ff68a0872deb8a8181307d8d4d520cae9', '[\"*\"]', '2025-05-09 08:02:34', NULL, '2025-05-09 08:02:27', '2025-05-09 08:02:34'),
(175, 'App\\Models\\User', 21, 'auth-token', '6c0dd6d6415be47bf48fecd9c89e513cc00f972320c33d4e8b6a4d58352ef2c2', '[\"*\"]', '2025-05-09 08:09:32', NULL, '2025-05-09 08:09:27', '2025-05-09 08:09:32'),
(176, 'App\\Models\\User', 21, 'auth-token', '3474e4e250614be9d05fcda3caf68d57a531dded58a091fe611de2baef5ba142', '[\"*\"]', '2025-05-09 18:01:54', NULL, '2025-05-09 08:10:51', '2025-05-09 18:01:54'),
(177, 'App\\Models\\User', 332, 'auth-token', 'cca75b5ade7c11bce6e32817df16740c4cefd20bd15b658ca589f9d28590ad63', '[\"*\"]', '2025-05-09 19:13:06', NULL, '2025-05-09 18:05:02', '2025-05-09 19:13:06'),
(178, 'App\\Models\\User', 21, 'auth-token', '0690797146e8fc5b014b84fa4bbacc4f212c13bf28a9e93275315c5f6da626be', '[\"*\"]', '2025-05-10 08:17:05', NULL, '2025-05-09 21:50:27', '2025-05-10 08:17:05'),
(179, 'App\\Models\\User', 334, 'auth-token', '36c6bfc0dd2630a5516dc02f92a9df94f27d9a241bdcc29db6dc5588238ca108', '[\"*\"]', '2025-05-10 09:36:11', NULL, '2025-05-10 09:34:31', '2025-05-10 09:36:11'),
(180, 'App\\Models\\User', 17, 'auth-token', '15c4f3df25f6c5a506620dcf814728ff1a194260d04ba2ca37b95bd1054e672f', '[\"*\"]', '2025-05-10 09:58:56', NULL, '2025-05-10 09:53:22', '2025-05-10 09:58:56'),
(181, 'App\\Models\\User', 335, 'auth-token', 'f17510eea650e2087a0bab19daa7435330113a40c88b6cc7460dcdc1d636b4af', '[\"*\"]', NULL, NULL, '2025-05-10 10:31:14', '2025-05-10 10:31:14'),
(182, 'App\\Models\\User', 336, 'auth-token', '1f9cfbe019d85e9618fabab34c619ff3e29fd71f7bddc6cd2f449d05265c37d0', '[\"*\"]', NULL, NULL, '2025-05-10 10:41:34', '2025-05-10 10:41:34'),
(183, 'App\\Models\\User', 336, 'auth-token', 'fbf171f1a6cec2203a72f0b6750ac8d12f59980175ea125f40455dbed61a84b2', '[\"*\"]', '2025-05-10 10:42:09', NULL, '2025-05-10 10:42:06', '2025-05-10 10:42:09'),
(184, 'App\\Models\\User', 336, 'auth-token', '80ea3fdd6788572f8a50aac579ab4c5ed405db7200d479e5f584006dca70de67', '[\"*\"]', '2025-05-10 11:07:18', NULL, '2025-05-10 10:44:32', '2025-05-10 11:07:18'),
(185, 'App\\Models\\User', 17, 'auth-token', 'adf7215cdf01dd2d1cdc35eedea9154fc1fae6f7e9ff4308f5fdfdc7b3a6b6a9', '[\"*\"]', '2025-05-10 11:20:39', NULL, '2025-05-10 11:20:31', '2025-05-10 11:20:39'),
(186, 'App\\Models\\User', 17, 'auth-token', 'a873596485a82873f8f0cc13d8201bce2766e6940aa2e9b904efd6f71cd9b3a6', '[\"*\"]', '2025-05-10 11:21:28', NULL, '2025-05-10 11:21:02', '2025-05-10 11:21:28'),
(187, 'App\\Models\\User', 336, 'auth-token', '67e6940976036ab70251431b10bb2a133408eeff1ca92aa2e3574f179e13a4fa', '[\"*\"]', '2025-05-10 11:29:26', NULL, '2025-05-10 11:22:49', '2025-05-10 11:29:26'),
(188, 'App\\Models\\User', 336, 'auth-token', '84ab5ee29fa0cc3bbdabb557adc67a61b3b61eec1668831f33f37d192d5233bf', '[\"*\"]', '2025-05-10 11:38:22', NULL, '2025-05-10 11:29:56', '2025-05-10 11:38:22'),
(189, 'App\\Models\\User', 336, 'auth-token', '50c59475d37e26335f02c62624b5d00b43d0e855be28851a1033c3b552aae832', '[\"*\"]', '2025-05-10 11:44:16', NULL, '2025-05-10 11:39:06', '2025-05-10 11:44:16'),
(190, 'App\\Models\\User', 337, 'auth-token', 'e566e3c0d7ff8b2b68911c19c244bfe3b46c34fa9b2c4a88888a7590f3832aca', '[\"*\"]', NULL, NULL, '2025-05-10 11:49:54', '2025-05-10 11:49:54'),
(191, 'App\\Models\\User', 337, 'auth-token', 'e910c2408f602dd422a3fdd319a03ff3e375be4d70b8a759afe5345ebece15b4', '[\"*\"]', '2025-05-10 11:54:47', NULL, '2025-05-10 11:50:05', '2025-05-10 11:54:47'),
(192, 'App\\Models\\User', 337, 'auth-token', '869f42a3d9ea67af5d2cc2d27624dc99a8f4fa4b35ce09b4ab04a040caf1d397', '[\"*\"]', '2025-05-10 20:04:36', NULL, '2025-05-10 12:04:57', '2025-05-10 20:04:36'),
(193, 'App\\Models\\User', 17, 'auth-token', '2c7e1318d6ae30a189fb347ebcf210a69c949a94800e4ffeceb67ad496ee3c1b', '[\"*\"]', '2025-05-10 20:12:26', NULL, '2025-05-10 20:05:55', '2025-05-10 20:12:26'),
(194, 'App\\Models\\User', 337, 'auth-token', 'f2adb52e53f4ae7662ffdc9cfb2cbf0fd5e64cb9f950ac17e74bfbccec6270b8', '[\"*\"]', '2025-05-10 20:44:05', NULL, '2025-05-10 20:17:53', '2025-05-10 20:44:05'),
(195, 'App\\Models\\User', 17, 'auth-token', 'b44b485e1ae7801a1f36f600a9ccb29b06b75befb4b0913c0ab6353f48dc5668', '[\"*\"]', '2025-05-10 20:45:49', NULL, '2025-05-10 20:45:05', '2025-05-10 20:45:49'),
(196, 'App\\Models\\User', 336, 'auth-token', '9b599df6e4f92af61d90881e30a2c7895e641f8a491abb448f37d13a5ac4d6bb', '[\"*\"]', '2025-05-10 21:38:18', NULL, '2025-05-10 21:03:41', '2025-05-10 21:38:18'),
(197, 'App\\Models\\User', 336, 'auth-token', '9d908b45d8b8485274933cec7e79d91559d9eb468148270f6b61f5bf30531e4f', '[\"*\"]', '2025-05-10 22:05:56', NULL, '2025-05-10 22:05:52', '2025-05-10 22:05:56'),
(198, 'App\\Models\\User', 336, 'auth-token', 'e7a35e6d650927db31ceb0f74036f408cfb91ef3fb4a99d2f456eccb260b305c', '[\"*\"]', '2025-05-10 22:22:15', NULL, '2025-05-10 22:15:18', '2025-05-10 22:22:15'),
(199, 'App\\Models\\User', 336, 'auth-token', 'a612d35f329d9fb7904f14c32cbe54d5bf4d21be0ef388ec67b9ad77767dc2ea', '[\"*\"]', '2025-05-10 22:26:55', NULL, '2025-05-10 22:24:13', '2025-05-10 22:26:55'),
(200, 'App\\Models\\User', 17, 'auth-token', '414dc0d7868f211e0611de867502eb7198f807885b52a82adb103d512408618d', '[\"*\"]', '2025-05-10 22:56:25', NULL, '2025-05-10 22:27:41', '2025-05-10 22:56:25'),
(201, 'App\\Models\\User', 17, 'auth-token', 'bbc797fe5959dc0554e93a5eea33b53c59e075c1ce47d7f618ff42794003e3cf', '[\"*\"]', '2025-05-10 23:07:46', NULL, '2025-05-10 23:07:33', '2025-05-10 23:07:46'),
(202, 'App\\Models\\User', 336, 'auth-token', '8f95c2d44f1ef21be6c235fb1bde7d8f08d5e24dc4456e31d565612fd2761127', '[\"*\"]', '2025-05-10 23:28:18', NULL, '2025-05-10 23:17:08', '2025-05-10 23:28:18'),
(203, 'App\\Models\\User', 338, 'auth-token', '668de1b554a407e8c7782759facce017740aa129d44845222638fc72f2c55b95', '[\"*\"]', '2025-05-10 23:39:16', NULL, '2025-05-10 23:36:50', '2025-05-10 23:39:16'),
(204, 'App\\Models\\User', 17, 'auth-token', '7bfd937790af68cc9b6a1472f7e39e0cc443ea89f38fb9e8f4fb784c372653a1', '[\"*\"]', '2025-05-10 23:50:11', NULL, '2025-05-10 23:42:40', '2025-05-10 23:50:11'),
(205, 'App\\Models\\User', 338, 'auth-token', 'd654fc423b6bee5b0cfa5c9aaa8609e85d6ed6c84f8b864d851d4cae94b57ebb', '[\"*\"]', '2025-05-10 23:51:33', NULL, '2025-05-10 23:50:32', '2025-05-10 23:51:33'),
(206, 'App\\Models\\User', 338, 'auth-token', 'd51a90363c1ee247f8d76c038dac88b2e3b9ce4aa2812bbc81bf20c9a679324e', '[\"*\"]', '2025-05-10 23:53:16', NULL, '2025-05-10 23:53:10', '2025-05-10 23:53:16'),
(207, 'App\\Models\\User', 21, 'auth-token', '2060d620e5386f7fd384b71aef5198c498290cf9f3cc3a3251d994c15d993419', '[\"*\"]', '2025-05-11 00:20:03', NULL, '2025-05-10 23:53:56', '2025-05-11 00:20:03'),
(208, 'App\\Models\\User', 17, 'auth-token', 'be6cca72c9f8f04aa03bc9e0510f60a120b750e9dd4a8663ef8f1b34a5e567a6', '[\"*\"]', '2025-05-11 00:47:28', NULL, '2025-05-11 00:20:37', '2025-05-11 00:47:28'),
(209, 'App\\Models\\User', 338, 'auth-token', 'd64b8029976c6a93030fb5ea2ca4052fa592db3b9643642683f3240e347c40ea', '[\"*\"]', '2025-05-11 01:15:03', NULL, '2025-05-11 00:54:12', '2025-05-11 01:15:03'),
(210, 'App\\Models\\User', 334, 'auth-token', '6c487539a812cd11824981c0b4ae55f5cf64085f9f01c80d0157dbf51d76c541', '[\"*\"]', '2025-05-11 01:21:28', NULL, '2025-05-11 01:21:24', '2025-05-11 01:21:28'),
(211, 'App\\Models\\User', 339, 'auth-token', 'eaf83a17a0214a9ba60d0f9ee382fe6a543d18a3745c743ebe9760242305d7fc', '[\"*\"]', '2025-05-11 11:31:29', NULL, '2025-05-11 01:23:07', '2025-05-11 11:31:29'),
(212, 'App\\Models\\User', 339, 'auth-token', '2506e8c689ec153b4952e0a932de853b7fbd124c1dcedfb898750ee571dbf9ea', '[\"*\"]', '2025-05-11 12:01:17', NULL, '2025-05-11 09:53:56', '2025-05-11 12:01:17'),
(213, 'App\\Models\\User', 17, 'auth-token', 'e00991459367a3916fa3977d940262080fb16e0f9e85a1f9999d564a1f595223', '[\"*\"]', '2025-05-11 11:45:56', NULL, '2025-05-11 11:32:27', '2025-05-11 11:45:56'),
(214, 'App\\Models\\User', 327, 'auth-token', '89330ca2fd8d951bdd4fe05919ca90a3ce942776576ff9deceec3ec32a68d259', '[\"*\"]', '2025-05-11 11:47:50', NULL, '2025-05-11 11:46:49', '2025-05-11 11:47:50'),
(215, 'App\\Models\\User', 17, 'auth-token', 'e42445fefe9c381ebc55c37c0d18224ade22e8615205ea4d878a9e2e804166b1', '[\"*\"]', '2025-05-11 12:09:19', NULL, '2025-05-11 11:58:15', '2025-05-11 12:09:19'),
(216, 'App\\Models\\User', 17, 'auth-token', '9ac205abba6a7371cc6c664846da01121c35db8db52f2937908caf36791b11f7', '[\"*\"]', '2025-05-11 13:22:32', NULL, '2025-05-11 12:01:50', '2025-05-11 13:22:32'),
(217, 'App\\Models\\User', 339, 'auth-token', '34291dd06da8365184f9c97866fa11011e53b7ec6c5e235b308910a83ef3e54d', '[\"*\"]', '2025-05-11 14:03:53', NULL, '2025-05-11 12:46:58', '2025-05-11 14:03:53'),
(218, 'App\\Models\\User', 339, 'auth-token', '2bf2a3f28d92eb23fcad411a8d14fd91eb4e3cd4e1e8dd8a9d0b157868535379', '[\"*\"]', '2025-05-11 16:24:54', NULL, '2025-05-11 13:24:29', '2025-05-11 16:24:54'),
(219, 'App\\Models\\User', 17, 'auth-token', '32203ddbdd68c71ecfb937b0df6d7fb70c0271aad7a724d64a675bcec9a20c9a', '[\"*\"]', '2025-05-11 14:37:06', NULL, '2025-05-11 13:34:04', '2025-05-11 14:37:06'),
(220, 'App\\Models\\User', 17, 'auth-token', '1239f33f2a1976c3dcfb9824ba2776abf9cf9b3d21486ebb2afb8ed2624cb13f', '[\"*\"]', '2025-05-11 14:45:05', NULL, '2025-05-11 14:04:37', '2025-05-11 14:45:05'),
(221, 'App\\Models\\User', 339, 'auth-token', '3fe6e02beef8e7b597c8d831e225cdfb6d5b1924a23d77fcaae7e2ed6ea2e7dc', '[\"*\"]', '2025-05-11 14:56:16', NULL, '2025-05-11 14:46:36', '2025-05-11 14:56:16'),
(222, 'App\\Models\\User', 17, 'auth-token', 'b1e264b4223be6e054e4b140fdf8f6f7a32116e8e0d7e5147ff5f830ab857a75', '[\"*\"]', '2025-05-11 16:29:53', NULL, '2025-05-11 14:57:54', '2025-05-11 16:29:53'),
(223, 'App\\Models\\User', 339, 'auth-token', 'b13336697661d6c2f59f6a7d32c78e1ed9501966b327022cc007c39726af70d9', '[\"*\"]', '2025-05-11 16:33:35', NULL, '2025-05-11 16:33:31', '2025-05-11 16:33:35'),
(224, 'App\\Models\\User', 340, 'auth-token', 'a1f561940a52fdcee11a28f1296463e6f8469eb07a7800b79d3419151993cf94', '[\"*\"]', '2025-05-11 18:09:08', NULL, '2025-05-11 16:37:35', '2025-05-11 18:09:08'),
(225, 'App\\Models\\User', 17, 'auth-token', 'e80a07ebc3b2d3e608fd7e433e22915ab59a692c10746f26b8a451ed8fa2461e', '[\"*\"]', '2025-05-11 21:33:23', NULL, '2025-05-11 21:29:30', '2025-05-11 21:33:23'),
(226, 'App\\Models\\User', 341, 'auth-token', '2bf4dc29a7fb1226bd980fde36c085328eecf9648d0dde8f50b7d36c986c5cac', '[\"*\"]', '2025-05-11 21:38:51', NULL, '2025-05-11 21:35:56', '2025-05-11 21:38:51'),
(227, 'App\\Models\\User', 341, 'auth-token', '9c46fb3f776ee2b5f383f2c9aadcb0432dcabe9d00ee1eb6a4908b513321d449', '[\"*\"]', '2025-05-11 21:51:21', NULL, '2025-05-11 21:39:23', '2025-05-11 21:51:21'),
(228, 'App\\Models\\User', 339, 'auth-token', '63ea41efe2a78929d1da004326fc6659c41d273a1a20c8e4c637f37b6e16ab73', '[\"*\"]', '2025-05-11 21:55:23', NULL, '2025-05-11 21:52:23', '2025-05-11 21:55:23'),
(229, 'App\\Models\\User', 341, 'auth-token', '86c3bc1fa7d244dfb820f3af124193dc4dd85ceb05d3e9c315253a4e52a9ad14', '[\"*\"]', '2025-05-11 22:04:29', NULL, '2025-05-11 21:56:18', '2025-05-11 22:04:29'),
(230, 'App\\Models\\User', 341, 'auth-token', 'a12547f48ab3f5009e09f2ad3d5eb5b6ab353734763186573269a2020a1b3c61', '[\"*\"]', '2025-05-12 09:31:11', NULL, '2025-05-12 09:31:07', '2025-05-12 09:31:11'),
(231, 'App\\Models\\User', 341, 'auth-token', 'affe2aff7adcef85a3ea0763f3d2646d64b1c5c6fb61397b3a394d91266124a5', '[\"*\"]', '2025-05-12 20:09:07', NULL, '2025-05-12 10:35:49', '2025-05-12 20:09:07'),
(232, 'App\\Models\\User', 339, 'auth-token', 'cbd474ba4a2dd5bbbcbc6ac937f5707303e8e6852419385bd31b4e18b8315efd', '[\"*\"]', '2025-05-12 20:10:41', NULL, '2025-05-12 20:09:17', '2025-05-12 20:10:41'),
(233, 'App\\Models\\User', 341, 'auth-token', 'a3f302cab387d25babd74a969727e3e42a30cc69e81fcc2db2f9f9653e56d526', '[\"*\"]', '2025-05-12 22:32:24', NULL, '2025-05-12 20:11:24', '2025-05-12 22:32:24'),
(234, 'App\\Models\\User', 341, 'auth-token', 'f15c351c5170faf60e8846e7918dc4b804a98b1b7246c1df183dfce4c0e94fc5', '[\"*\"]', '2025-05-12 23:15:04', NULL, '2025-05-12 22:44:49', '2025-05-12 23:15:04'),
(235, 'App\\Models\\User', 341, 'auth-token', '3d1bc83155dfb4e8e390cc422c2889aec834f7f67220158dd35a52cef3032f90', '[\"*\"]', NULL, NULL, '2025-05-12 23:16:30', '2025-05-12 23:16:30'),
(236, 'App\\Models\\User', 341, 'auth-token', '3fb4f5052134e8fba174002a3dca817a81eaa6d582938469669b5a4e545d7cc9', '[\"*\"]', NULL, NULL, '2025-05-12 23:16:44', '2025-05-12 23:16:44'),
(237, 'App\\Models\\User', 341, 'auth-token', '734dc3027f65f679f5e1ef1dbe11921616edfedd013083bcb38507b6ac811937', '[\"*\"]', '2025-05-12 23:23:11', NULL, '2025-05-12 23:17:50', '2025-05-12 23:23:11'),
(238, 'App\\Models\\User', 341, 'auth-token', 'ce5b5beca05affe6184ca614b835a4365ac17125f9303b47dd156194313db8a8', '[\"*\"]', '2025-05-13 09:09:14', NULL, '2025-05-13 08:51:55', '2025-05-13 09:09:14'),
(239, 'App\\Models\\User', 341, 'auth-token', '21d773ea1e44abe1c99933345350c5fb5abe26b2ee8d8364aa8f29d271d77ba5', '[\"*\"]', '2025-05-13 09:13:33', NULL, '2025-05-13 09:10:19', '2025-05-13 09:13:33'),
(240, 'App\\Models\\User', 341, 'auth-token', '5cb7ccb648f5ed4acca675f57a02741b3c43c41216c24966e43c07073402af33', '[\"*\"]', '2025-05-13 10:39:51', NULL, '2025-05-13 10:31:09', '2025-05-13 10:39:51'),
(241, 'App\\Models\\User', 339, 'auth-token', 'f67c415513c2f4048eccf725c6d2c514261671e8e0c582df27e84f279949a2e9', '[\"*\"]', '2025-05-13 11:52:15', NULL, '2025-05-13 10:59:43', '2025-05-13 11:52:15'),
(242, 'App\\Models\\User', 341, 'auth-token', 'a04bf7e690cf5cdf9d8436198f848cab6474445cf5d6f3c880d353bf2a81fa13', '[\"*\"]', '2025-05-13 12:50:40', NULL, '2025-05-13 11:58:34', '2025-05-13 12:50:40'),
(243, 'App\\Models\\User', 341, 'auth-token', 'c67d53a58d90845ab3cb29effb063ffb11327f5ebc791e5e64230c23200a21e3', '[\"*\"]', '2025-05-13 12:30:25', NULL, '2025-05-13 12:21:36', '2025-05-13 12:30:25'),
(244, 'App\\Models\\User', 339, 'auth-token', 'b0e0415717e3ddb68585993bec7059523c98d50cfc8f3757db9fa32bc9f44514', '[\"*\"]', '2025-05-13 13:27:30', NULL, '2025-05-13 12:51:09', '2025-05-13 13:27:30'),
(245, 'App\\Models\\User', 17, 'auth-token', '4ec2cdb479ed37c23392d5dcf847985d0d0466ed680cdd9a34eb012c56ef84cc', '[\"*\"]', '2025-05-13 15:15:12', NULL, '2025-05-13 12:53:02', '2025-05-13 15:15:12'),
(246, 'App\\Models\\User', 339, 'auth-token', '6ba6465db75eb2175100a16a54d53e3c7f40f86169b342f596d13a7d75b25e5d', '[\"*\"]', '2025-05-13 14:06:32', NULL, '2025-05-13 13:29:32', '2025-05-13 14:06:32'),
(247, 'App\\Models\\User', 341, 'auth-token', '34fa12aa8a2bd495593d6a8053e27317e9c4a4b4d4b1bdc32ec27a88ca2c2a42', '[\"*\"]', '2025-05-13 15:05:56', NULL, '2025-05-13 14:18:02', '2025-05-13 15:05:56'),
(248, 'App\\Models\\User', 339, 'auth-token', 'e44632a7e9928dc7eb5def98b43b6b0f90cdc70596c22085fa23e7410ecde3e4', '[\"*\"]', '2025-05-13 15:11:58', NULL, '2025-05-13 15:06:52', '2025-05-13 15:11:58'),
(249, 'App\\Models\\User', 341, 'auth-token', '11f02f0df24c9ebfc0ff8fcbae24525884de2044c11dc30b803d8985752ab3b9', '[\"*\"]', '2025-05-13 16:02:24', NULL, '2025-05-13 15:16:57', '2025-05-13 16:02:24'),
(250, 'App\\Models\\User', 341, 'auth-token', '32588e6ddfe42a33a7d9578dacafb5ed885bbdc516da0d70ded96cc091e860c9', '[\"*\"]', '2025-05-13 18:26:32', NULL, '2025-05-13 16:37:30', '2025-05-13 18:26:32'),
(251, 'App\\Models\\User', 339, 'auth-token', 'cac91e9e72374eca9f55b43c7de771182ea4c284c1086eb47526e3a63a8982e0', '[\"*\"]', '2025-05-13 18:41:56', NULL, '2025-05-13 18:28:42', '2025-05-13 18:41:56'),
(252, 'App\\Models\\User', 339, 'auth-token', 'f0e68f255ad2b2cf5b773a062a1e42d0e5e9bf454b9bf35a2d182fbcec678d4b', '[\"*\"]', '2025-05-13 19:01:00', NULL, '2025-05-13 18:46:49', '2025-05-13 19:01:00'),
(253, 'App\\Models\\User', 340, 'auth-token', 'aa76036b5b4cb06af5ee13682b3562e7c16de1061328c92d019c2538e963e59b', '[\"*\"]', '2025-05-13 19:22:27', NULL, '2025-05-13 19:01:16', '2025-05-13 19:22:27'),
(254, 'App\\Models\\User', 339, 'auth-token', 'bed5fad92b7c0113686eb4bf13bf4962f59ee6e45e1357d9f03462091d8c567b', '[\"*\"]', '2025-05-13 22:31:29', NULL, '2025-05-13 20:49:10', '2025-05-13 22:31:29'),
(255, 'App\\Models\\User', 329, 'auth-token', '2679b6dd1550e520ad4af2df6d8ebe7ab45c177000787c30fe61a1dbe368921d', '[\"*\"]', NULL, NULL, '2025-05-13 22:31:52', '2025-05-13 22:31:52'),
(256, 'App\\Models\\User', 330, 'auth-token', '5fc74f00ef6447e3ba921f11d8e4560a23caff0ae1bb6056d4945ee9c056bbf1', '[\"*\"]', NULL, NULL, '2025-05-13 22:32:10', '2025-05-13 22:32:10'),
(257, 'App\\Models\\User', 334, 'auth-token', '9f88f456f4727f255e488b799cddda03ebbe553c9151cd2b91dffaabc564bd63', '[\"*\"]', NULL, NULL, '2025-05-13 22:32:25', '2025-05-13 22:32:25'),
(258, 'App\\Models\\User', 336, 'auth-token', 'c8b35239f0c7848981d4185d8ed4338a4d2c8203f73c2f3507bd45d3af6d2356', '[\"*\"]', '2025-05-14 10:52:11', NULL, '2025-05-13 22:32:41', '2025-05-14 10:52:11'),
(259, 'App\\Models\\User', 328, 'auth-token', '4ed197d59d8d4c409878556e7aff1c07ec5d6a756aea5a79558c4325e7ac254b', '[\"*\"]', '2025-05-13 23:24:22', NULL, '2025-05-13 23:16:49', '2025-05-13 23:24:22'),
(260, 'App\\Models\\User', 341, 'auth-token', '601db6625f416c0838762d724e6f28dacfbac8f3a0a5992f8e6031c343bcabf9', '[\"*\"]', '2025-05-13 23:23:02', NULL, '2025-05-13 23:18:19', '2025-05-13 23:23:02');
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(261, 'App\\Models\\User', 341, 'auth-token', '9157aa4e49e75a42213eafc7802789956590df26a405f2fd4641f95f2c33e984', '[\"*\"]', '2025-05-14 10:37:31', NULL, '2025-05-14 10:11:46', '2025-05-14 10:37:31'),
(262, 'App\\Models\\User', 340, 'auth-token', '903d17a9b5c2ccc9a82a4aa3bf4eff2620711385074c16a6a3545a9f2b2cf647', '[\"*\"]', '2025-05-14 10:40:04', NULL, '2025-05-14 10:39:13', '2025-05-14 10:40:04'),
(263, 'App\\Models\\User', 340, 'auth-token', '045c31339f1a961ed23d9941b3b4c0db5b1a0d7764670616b8e84b01d004f121', '[\"*\"]', '2025-05-14 12:27:51', NULL, '2025-05-14 11:11:39', '2025-05-14 12:27:51'),
(264, 'App\\Models\\User', 327, 'auth-token', '305c6269a89ed97e52a4d549cd01c183a59b929c08ab3f6224f91bc8632f837d', '[\"*\"]', '2025-05-14 12:32:21', NULL, '2025-05-14 12:31:09', '2025-05-14 12:32:21'),
(265, 'App\\Models\\User', 342, 'auth-token', '3ff497c3627d28958d7d0440ec6ebb88a74e58e2728c7fe32aa6363f794b019e', '[\"*\"]', '2025-05-14 12:51:10', NULL, '2025-05-14 12:38:44', '2025-05-14 12:51:10'),
(266, 'App\\Models\\User', 341, 'auth-token', 'eca57a31250826afc25d85f4bc733328184dc2457a091bd76fb589fbf07d27f5', '[\"*\"]', '2025-05-14 14:42:36', NULL, '2025-05-14 12:57:41', '2025-05-14 14:42:36'),
(267, 'App\\Models\\User', 342, 'auth-token', '64014365fa715c28e6038f689baa52cdfb8555504e91b97189eea87a649a97ab', '[\"*\"]', '2025-05-14 15:09:09', NULL, '2025-05-14 14:54:21', '2025-05-14 15:09:09'),
(268, 'App\\Models\\User', 339, 'auth-token', '7304d66ed521c1b78c508bfc75453fa06501f098f65068b038d9f2d6687e52ef', '[\"*\"]', '2025-05-14 15:33:26', NULL, '2025-05-14 15:09:40', '2025-05-14 15:33:26'),
(269, 'App\\Models\\User', 342, 'auth-token', '1059f496d48f8273a5c455b4aeca158e5c32a73c9416bd556ee8a967a1d75814', '[\"*\"]', NULL, NULL, '2025-05-14 15:35:23', '2025-05-14 15:35:23'),
(270, 'App\\Models\\User', 341, 'auth-token', '4deddb3da0df869bff2044400da7cfab0888ebd1fed72e38e63ea4ac3aba5d51', '[\"*\"]', '2025-05-14 15:46:14', NULL, '2025-05-14 15:35:53', '2025-05-14 15:46:14'),
(271, 'App\\Models\\User', 341, 'auth-token', 'e5f5c9a481ac838502050a4ecf95af636b42c07d92ee1b4f4d9b5071aba29b60', '[\"*\"]', NULL, NULL, '2025-05-14 15:49:17', '2025-05-14 15:49:17'),
(272, 'App\\Models\\User', 341, 'auth-token', 'b8d7d58eed91933be4269cfad4ba78fd83212dacd8e04c4834e6b20643796a6f', '[\"*\"]', '2025-05-14 15:50:32', NULL, '2025-05-14 15:49:53', '2025-05-14 15:50:32'),
(273, 'App\\Models\\User', 341, 'auth-token', '929186eed8e9631076c9cbbd6478b8a1a44420383367398a9261f1a1709fdf72', '[\"*\"]', '2025-05-14 15:52:10', NULL, '2025-05-14 15:51:25', '2025-05-14 15:52:10'),
(274, 'App\\Models\\User', 341, 'auth-token', '5c19dd25e107eab6479ebc560bc29b8aee4676275c762ef1380d1e11b357b788', '[\"*\"]', '2025-05-14 15:54:14', NULL, '2025-05-14 15:53:39', '2025-05-14 15:54:14'),
(275, 'App\\Models\\User', 341, 'auth-token', 'efdaedfca7efbae9f747514fc595ca4b6fb22dc5849d374447ee51a631b09f3e', '[\"*\"]', '2025-05-14 15:55:42', NULL, '2025-05-14 15:55:06', '2025-05-14 15:55:42'),
(276, 'App\\Models\\User', 341, 'auth-token', 'a9c5b7eeb22cd5a220021240c513e9890833b5145339776e70f4f995dc6a91a2', '[\"*\"]', '2025-05-14 15:57:06', NULL, '2025-05-14 15:56:22', '2025-05-14 15:57:06'),
(277, 'App\\Models\\User', 341, 'auth-token', '0f9ed7b21b3eebff67c46af05d0f630024b362562cf9f3d32edbf4524651b689', '[\"*\"]', '2025-05-14 15:58:01', NULL, '2025-05-14 15:57:24', '2025-05-14 15:58:01'),
(278, 'App\\Models\\User', 341, 'auth-token', '0a5a10f80bfcb6f6f54f699ce3461a5c8ea9bf962370e76234e70a33ae3f831e', '[\"*\"]', '2025-05-14 16:03:22', NULL, '2025-05-14 16:02:56', '2025-05-14 16:03:22'),
(279, 'App\\Models\\User', 341, 'auth-token', 'eff3e1d04169993d275ea6b21dea8710e2d913a17f3d22fe4cffe0594231f08c', '[\"*\"]', '2025-05-14 16:08:42', NULL, '2025-05-14 16:08:19', '2025-05-14 16:08:42'),
(280, 'App\\Models\\User', 17, 'auth-token', '0e9fa6f1e834a5e1005e3e06672192cc6e8d5b9562a2aeaf893cbb3575b31925', '[\"*\"]', '2025-05-14 16:11:07', NULL, '2025-05-14 16:10:06', '2025-05-14 16:11:07'),
(281, 'App\\Models\\User', 341, 'auth-token', '495729e527768b61a1b30b9d9c2d6a2c12f5fdd1b7bbc74b5ab39e9bfa3169a1', '[\"*\"]', '2025-05-14 16:15:08', NULL, '2025-05-14 16:14:38', '2025-05-14 16:15:08'),
(282, 'App\\Models\\User', 341, 'auth-token', '1134e74872836d319389fc00890ebfb156f8220b96a4771080c42e343756489f', '[\"*\"]', '2025-05-14 17:01:20', NULL, '2025-05-14 16:37:44', '2025-05-14 17:01:20'),
(283, 'App\\Models\\User', 341, 'auth-token', 'ada927137df6f17a36c58c8cf24825c4efc1631edc55138aa0b8f3e23bfe43c7', '[\"*\"]', NULL, NULL, '2025-05-14 17:02:33', '2025-05-14 17:02:33'),
(284, 'App\\Models\\User', 341, 'auth-token', '8f51e1af4366d72ed1758103b3ae550b8e7d3d79d9d18dd640dd883df4801172', '[\"*\"]', '2025-05-14 17:04:38', NULL, '2025-05-14 17:04:16', '2025-05-14 17:04:38'),
(295, 'App\\Models\\User', 341, 'auth-token', '2280f0af3f7ba207e9c4de61527b56e99710c850be16d897959fb367fa0b00e6', '[\"*\"]', NULL, NULL, '2025-05-14 17:35:08', '2025-05-14 17:35:08'),
(306, 'App\\Models\\User', 343, 'auth-token', '037e84080ee6715563a0f051d3c1ab7e8534f0b988a7d57037d94c37b7a63369', '[\"*\"]', '2025-05-14 18:39:58', NULL, '2025-05-14 18:35:39', '2025-05-14 18:39:58'),
(308, 'App\\Models\\User', 339, 'auth-token', 'a649f54eb343f9a561bae0095cff7d7173e8eadfcf786fd9fccfac9d7965b7b2', '[\"*\"]', '2025-05-14 18:48:57', NULL, '2025-05-14 18:46:17', '2025-05-14 18:48:57'),
(309, 'App\\Models\\User', 343, 'auth-token', '53d01d91febd8f582e34079c2ef15a7c479345d2c347d9aa5ecbc130b30a3156', '[\"*\"]', NULL, NULL, '2025-05-14 19:02:55', '2025-05-14 19:02:55'),
(310, 'App\\Models\\User', 342, 'auth-token', '4fa7bd0e225342f1423c5dab412b4a34c481fbdf5cd6dfb5fb7ca54c044614b7', '[\"*\"]', '2025-05-14 19:51:41', NULL, '2025-05-14 19:15:26', '2025-05-14 19:51:41');

-- --------------------------------------------------------

--
-- Structure de la table `registrations`
--

CREATE TABLE `registrations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `event_id` bigint(20) UNSIGNED NOT NULL,
  `payment_id` varchar(255) NOT NULL COMMENT 'PayPal Order ID',
  `payment_amount` decimal(10,2) NOT NULL,
  `payment_currency` varchar(255) NOT NULL DEFAULT 'USD',
  `payment_status` varchar(255) NOT NULL DEFAULT 'pending',
  `payment_date` timestamp NULL DEFAULT NULL,
  `payer_email` varchar(255) NOT NULL,
  `payer_name` varchar(255) NOT NULL,
  `ticket_quantity` int(11) NOT NULL DEFAULT 1,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `registrations`
--

INSERT INTO `registrations` (`id`, `user_id`, `event_id`, `payment_id`, `payment_amount`, `payment_currency`, `payment_status`, `payment_date`, `payer_email`, `payer_name`, `ticket_quantity`, `notes`, `created_at`, `updated_at`) VALUES
(270, 340, 183, 'mock_kgpgw3oo5', 49.99, 'USD', 'completed', '2025-05-11 16:38:17', 'elmaarpro4participant@gmail.com', 'karim EL marro', 1, NULL, '2025-05-11 16:38:19', '2025-05-11 16:38:19'),
(271, 340, 184, 'mock_l3mx6i6ko', 49.99, 'USD', 'completed', '2025-05-11 17:11:49', 'elmaarpro4participant@gmail.com', 'karim EL marro', 1, NULL, '2025-05-11 17:11:52', '2025-05-11 17:11:52'),
(272, 340, 185, 'mock_c6s0mtrh5', 29.99, 'USD', 'completed', '2025-05-11 17:13:32', 'elmaarpro4participant@gmail.com', 'karim EL marro', 1, NULL, '2025-05-11 17:13:34', '2025-05-11 17:13:34'),
(273, 340, 183, 'mock_qyg3infdw', 49.99, 'USD', 'completed', '2025-05-11 17:25:32', 'elmaarpro4participant@gmail.com', 'karim EL marro', 1, NULL, '2025-05-11 17:25:34', '2025-05-11 17:25:34'),
(274, 340, 185, 'mock_yffyn6i4f', 29.99, 'USD', 'completed', '2025-05-11 17:28:00', 'elmaarpro4participant@gmail.com', 'karim EL marro', 1, NULL, '2025-05-11 17:28:01', '2025-05-11 17:28:01'),
(275, 340, 184, 'mock_o4pzros2a', 49.99, 'USD', 'completed', '2025-05-11 17:29:43', 'elmaarpro4participant@gmail.com', 'karim EL marro', 1, NULL, '2025-05-11 17:29:45', '2025-05-11 17:29:45'),
(276, 340, 185, 'mock_h4t10y8qs', 29.99, 'USD', 'completed', '2025-05-11 17:37:19', 'elmaarpro4participant@gmail.com', 'karim EL marro', 1, NULL, '2025-05-11 17:37:21', '2025-05-11 17:37:21'),
(279, 340, 184, 'mock_tiqf113vs', 49.99, 'USD', 'completed', '2025-05-11 18:00:56', 'elmaarpro4participant@gmail.com', 'karim EL marro', 1, NULL, '2025-05-11 18:00:59', '2025-05-11 18:00:59'),
(281, 339, 184, 'mock_8lcl12fcc', 49.99, 'USD', 'completed', '2025-05-11 21:54:13', 'faridorganizeer@gmail.com', 'farid organizeer', 1, NULL, '2025-05-11 21:54:14', '2025-05-11 21:54:14'),
(282, 341, 184, 'mock_hah3tump7', 49.99, 'USD', 'completed', '2025-05-12 18:02:54', 'elmaarproo@gmail.com', 'Admin Elmaar', 1, NULL, '2025-05-12 18:02:55', '2025-05-12 18:02:55'),
(287, 340, 184, 'mock_6aaf5n7x7', 49.99, 'USD', 'completed', '2025-05-13 19:21:43', 'elmaarpro4participant@gmail.com', 'karim EL marro', 1, NULL, '2025-05-13 19:21:45', '2025-05-13 19:21:45'),
(289, 340, 212, 'mock_8f1rwzeaf', 55.00, 'USD', 'completed', '2025-05-14 10:40:03', 'elmaarpro4participant@gmail.com', 'karim EL marro', 1, NULL, '2025-05-14 10:40:04', '2025-05-14 10:40:04'),
(291, 342, 212, 'mock_3iu09gsm6', 55.00, 'USD', 'completed', '2025-05-14 12:39:34', 'zmaaroufi123@gmail.com', 'Amid marrou', 1, NULL, '2025-05-14 12:39:36', '2025-05-14 12:39:36'),
(293, 343, 189, 'mock_ww8217e67', 22.00, 'USD', 'completed', '2025-05-14 18:26:47', 'amirpartici@gmail.com', 'amir amir', 1, NULL, '2025-05-14 18:26:48', '2025-05-14 18:26:48'),
(294, 343, 189, 'mock_xpbfba5v9', 22.00, 'USD', 'completed', '2025-05-14 18:38:02', 'amirpartici@gmail.com', 'amir amir', 1, NULL, '2025-05-14 18:38:04', '2025-05-14 18:38:04'),
(295, 343, 208, 'mock_2tl6ur7hv', 22.00, 'USD', 'completed', '2025-05-14 18:39:57', 'amirpartici@gmail.com', 'amir amir', 1, NULL, '2025-05-14 18:39:58', '2025-05-14 18:39:58'),
(296, 342, 211, 'mock_w7u7mh70f', 44.00, 'USD', 'completed', '2025-05-14 19:15:58', 'zmaaroufi123@gmail.com', 'Amid marrou', 1, NULL, '2025-05-14 19:15:59', '2025-05-14 19:15:59'),
(297, 342, 208, 'mock_1isgzi256', 22.00, 'USD', 'completed', '2025-05-14 19:25:02', 'zmaaroufi123@gmail.com', 'Amid marrou', 1, NULL, '2025-05-14 19:25:04', '2025-05-14 19:25:04'),
(298, 342, 214, 'mock_6lujfa6iu', 5858.00, 'USD', 'completed', '2025-05-14 19:31:05', 'zmaaroufi123@gmail.com', 'Amid marrou', 1, NULL, '2025-05-14 19:31:08', '2025-05-14 19:31:08');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2025-04-19 20:16:05', '2025-04-19 20:16:05'),
(2, 'organizer', 'web', '2025-04-19 20:16:05', '2025-04-19 20:16:05'),
(3, 'participant', 'web', '2025-04-19 20:16:05', '2025-04-19 20:16:05');

-- --------------------------------------------------------

--
-- Structure de la table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(4, 3),
(5, 1),
(6, 1),
(7, 1);

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('7KrZwhrD40u0ZFzejUEmGPwPKwcjnahWH19asGPh', NULL, '127.0.0.1', 'PostmanRuntime/7.43.4', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOTk4ZkRWSVBxRXAwVkFqYVN5YXh0c1o2emlqbEpmcXV0TWpQN0JLSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1746129968),
('Fv8YhefSTIUHXiLUTckuyom2k0hthSJV2j9TP57R', NULL, '127.0.0.1', 'PostmanRuntime/7.43.4', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicWc5ek1sQ3pEUmdKTWM5MWJhMlFuajdGM1FyYnZRbDFHUHRDNnRHayI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1746698428),
('I4QW3rLWYuH4TltTwN9W92s9f28LT4RGjc512awe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibU9vTjNKTVo0Slp6M3ZJNk5mSjZkSkNwa0pUR2wwdkhBNW1PQnBjUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1746723393),
('n7lM7WseXYDqXZv7I7IZBagqmRwHcXDONHQ49z5s', NULL, '127.0.0.1', 'PostmanRuntime/7.43.3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNU9td24xREg5WEdvcXBselhEVWV4MXZNVUFvMEczOVBTOUJ2SlRlbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1745098919),
('ZsVu5YXhjMkg8WADU40RSieXsSoNkbwXw2cD753X', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTWI2azVMeTg5NlczQkd2bWFOSGRHNmpBNjRyM3ZvUGNIcFpoZFJoVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1746723312);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `birthday` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `birthday`, `gender`, `phone`, `city`, `profile_image`, `remember_token`, `created_at`, `updated_at`) VALUES
(17, 'Admin User', 'admin@example.com', '2025-04-24 16:24:03', '$2y$12$x6sLPlU1cwOxbxvC88VslujOnT1wSwSDwzna5/OESsUkC4LTFFPHG', NULL, NULL, NULL, NULL, NULL, NULL, '2025-04-24 16:24:03', '2025-04-24 16:24:03'),
(336, 'ABDESSAMAD EL MAAROUFI', 'elmaarpross@gmail.com', NULL, '$2y$12$lDh8cnPSnh9f.2L0d5tZHOpVN0jVR4qVaO8X5iO/dIMQTMfsCKm/y', '2007-05-10', 'male', '+212700161503', 'Kenitra', 'profile_images/ZxOz2rRFum2J3DPicq1IMPRZDKbBVGzk9jB8tm01.jpg', NULL, '2025-05-10 10:41:31', '2025-05-10 10:41:31'),
(339, 'farid organizeer', 'faridorganizeer@gmail.com', NULL, '$2y$12$yM2ETS8oUCtWQChfbkQo9e9DQPEVLNPh.z7wQEFrA0OEGH8xDyElG', '2008-06-11', 'male', '+212700161503', 'Kenitra', 'profile_images/z7OaJiv5d3bNMSyLnFkapwNCFWTL0ibvg0L3qFgS.jpg', NULL, '2025-05-11 01:23:04', '2025-05-11 01:23:04'),
(340, 'karim EL marro', 'elmaarpro4participant@gmail.com', NULL, '$2y$12$WYqVi5x9uBrfvIg8qAvczuMBp3sTkm6QIHRUSF4oLdauI9G3K.nKm', '2008-01-10', 'male', '+212700161503', 'Kenitra', 'profile_images/U6m4mXmFUaQ7ni0exA3waQJ3lA3nxDkyT7o8N5oy.jpg', NULL, '2025-05-11 16:37:30', '2025-05-11 16:37:30'),
(341, 'Admin Elmaar', 'elmaarproo@gmail.com', NULL, '$2y$12$KWGuTRKvpHlo8OzDRxBqxull6zyIWMuwZON96bHE6OIKaVNJspp5u', '2008-01-09', 'male', '+212700161503', 'Kenitra', 'profile_images/awOZM3qryttBD0kaS7lKkQ2cGrKARxjCvgGsvldz.png', NULL, '2025-05-11 21:35:52', '2025-05-11 21:35:52'),
(342, 'Amid marrou', 'zmaaroufi123@gmail.com', NULL, '$2y$12$zFRBjZy6f8gcCgV8XieUT.WTohSFl6oDVXpdGz4QRgIUJ8/6hVqAS', '2008-01-25', 'female', '+212700161503', 'Kenitra', 'profile_images/zShGQhR8jjlPIMupD2tMrZJT1EHyVOuHqEbkWoLV.jpg', NULL, '2025-05-14 12:38:40', '2025-05-14 12:38:40'),
(343, 'amir amir', 'amirpartici@gmail.com', NULL, '$2y$12$NQbVvxgtfZ2ZxYynyaJBMOkFFNZBDjF9Afx59CO/Q8CIbli33EuSa', '2008-01-17', 'male', '+212700161503', 'Kenitra', 'profile_images/QoPS1ZIrfrM0uEhcp14NT8m3YJc5awudgQPSRl68.jpg', NULL, '2025-05-14 18:24:36', '2025-05-14 18:24:36');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `events_organizer_id_foreign` (`organizer_id`);

--
-- Index pour la table `event_likes`
--
ALTER TABLE `event_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_likes_user_id_foreign` (`user_id`),
  ADD KEY `event_likes_event_id_foreign` (`event_id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Index pour la table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `registrations`
--
ALTER TABLE `registrations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `registrations_payment_id_unique` (`payment_id`),
  ADD KEY `registrations_event_id_foreign` (`event_id`),
  ADD KEY `registrations_user_id_event_id_index` (`user_id`,`event_id`),
  ADD KEY `registrations_payment_status_index` (`payment_status`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Index pour la table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=215;

--
-- AUTO_INCREMENT pour la table `event_likes`
--
ALTER TABLE `event_likes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=311;

--
-- AUTO_INCREMENT pour la table `registrations`
--
ALTER TABLE `registrations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=299;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=344;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_organizer_id_foreign` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `event_likes`
--
ALTER TABLE `event_likes`
  ADD CONSTRAINT `event_likes_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `event_likes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_event_id_foreign` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `registrations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
