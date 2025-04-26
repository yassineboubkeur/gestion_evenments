-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : dim. 27 avr. 2025 à 00:25
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

--
-- Déchargement des données de la table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_c@c.comxxx|127.0.0.1', 'i:1;', 1745443530),
('laravel_cache_c@c.comxxx|127.0.0.1:timer', 'i:1745443530;', 1745443530),
('laravel_cache_part223@test.com|127.0.0.1', 'i:3;', 1745530136),
('laravel_cache_part223@test.com|127.0.0.1:timer', 'i:1745530136;', 1745530136),
('laravel_cache_test@example4.com|127.0.0.1', 'i:1;', 1745514959),
('laravel_cache_test@example4.com|127.0.0.1:timer', 'i:1745514959;', 1745514959);

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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `date`, `address`, `available_places`, `image`, `organizer_id`, `duration_minutes`, `price`, `category`, `created_at`, `updated_at`) VALUES
(2, 'Updated Event Title33updated', 'mmmmmmmmmmmmmeeeeeeeeeeee', '2025-04-24 20:26:00', 'kenitraa', 50, 'events/s8Ca58wwm1R7EKBrNoEAJGBQVguLGGkhAeI5Evlq.png', 6, 10, 120.00, 'Concert', '2025-04-24 18:27:26', '2025-04-24 21:41:20'),
(3, 'rai 2update', 'xxxxxxxxxxxxxxxxx', '2025-04-24 22:03:00', '236 quartier chaabi, atlas2', 34, 'events/EJDTWN9nglGAmBEhof7lwQsdLjEfYGaN9NInaGFS.png', 6, 27, 100.00, 'Workshop', '2025-04-24 20:04:06', '2025-04-24 21:41:32'),
(4, 'ray way wayupdated', 'zzzzzzzzzzzzzzzzzzzzzzzzz', '2025-04-28 23:43:00', '236 quartier chaabi, atlas2', 22, 'events/Pu1YKeaWxzrUNEPatlNMCNUx2eXZKxd1Frtm46C3.png', 6, 15, 777.00, 'Workshop', '2025-04-24 21:44:16', '2025-04-24 21:44:31'),
(5, 'bluse music', 'ddddddddddddddddddddddd', '2025-04-25 23:47:00', '478 appt 5 maghreb arabi bloc D kenitra maroc', 32, 'events/wad0PMaVHhRia5ScGkJvg0pbQvBlbgHQokVgNQjJ.jpg', 21, 16, 777.00, 'Conference', '2025-04-24 21:48:14', '2025-04-24 21:48:14'),
(6, 'yheatre', 'jjjjjjjjjjjjjjjjjjjjjjjjjjj', '2025-04-25 18:35:00', '236 quartier chaabi, atlas2', 27, 'events/bc51JUJNsT3ha2JShplCFYGgjD6GxSdVNVKo6VuX.png', 6, 26, 1000.00, 'Workshop', '2025-04-25 16:35:52', '2025-04-25 16:35:52'),
(7, 'zimad oyo', 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', '2025-05-07 19:08:00', '300 quartier chaabi, atlas2', 28, 'events/hix9xA4sPT6URpzgX09yBHBboY8n5L4KUZ4isGLJ.jpg', 6, 28, 1000.00, 'Conference', '2025-04-25 17:09:10', '2025-04-25 17:09:10'),
(8, 'hanza', 'xxxxxxxxxxxxxxxxxxxxx', '2025-04-29 19:48:00', 'Souk larbaa', 30, 'events/9paCPKy6DFl9mTqjsHByJRRaBn1pUftIKnDwaZSi.png', 6, 23, 44444.00, 'Conference', '2025-04-25 17:49:07', '2025-04-25 17:49:07'),
(9, 'pop', 'xdddddddddddd', '2025-04-30 22:17:00', '236 quartier chaabi, atlas2', 23, 'events/kilSxyCJVM49mmtXPQ3mS340Sr185lssqTNYtYWI.jpg', 22, 19, 777.00, 'Conference', '2025-04-25 20:18:07', '2025-04-25 20:18:07'),
(10, 'dev_elmaarpro', 'aaaaaaaaaaaaaaaa', '2025-04-23 15:54:00', '236 quartier chaabi, atlas2', 18, 'events/HJqiJDNy3Umi7wzRjERCLIIIfUCbOP5GwI2Y6X4A.png', 22, 21, 300000.00, 'Concert', '2025-04-25 20:50:50', '2025-04-25 20:50:50'),
(11, 'match futbol', 'match futbolmatch futbolmatch futbolmatch futbol', '2025-04-30 13:03:00', '236 quartier chaabi, atlas2', 19, 'events/VbNsZit5uX2Pcclzn6ikctFk52V91fds1CwnZMYR.png', 21, 19, 0.23, 'Sports', '2025-04-26 19:04:38', '2025-04-26 19:04:38'),
(12, 'Delice Gharb', 'Delice GharbDelice GharbDelice GharbDelice Gharb', '2025-04-29 21:06:00', '478 appt 5 maghreb arabi bloc D kenitra maroc', 22, 'events/w66KwNgDzPRxRxEWps7RLcmkPyOm4adHreH5NUsq.jpg', 21, 19, 0.29, 'Exhibition', '2025-04-26 19:06:58', '2025-04-26 19:06:58'),
(13, 'party', 'wwwwwwwwwwwwwwww', '2025-04-30 13:38:00', '236 quartier chaabi, atlas2', 17, 'events/2d9kXI7qaetRqyeXPSxbBq2R1T8do8sklxF8amA6.png', 21, 16, 0.26, 'Concert', '2025-04-26 20:39:34', '2025-04-26 20:39:34');

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
(6, '2025_04_24_180757_create_events_table', 3);

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
(2, 'App\\Models\\User', 4),
(2, 'App\\Models\\User', 5),
(2, 'App\\Models\\User', 6),
(2, 'App\\Models\\User', 13),
(2, 'App\\Models\\User', 14),
(2, 'App\\Models\\User', 15),
(2, 'App\\Models\\User', 21),
(2, 'App\\Models\\User', 22),
(3, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 2),
(3, 'App\\Models\\User', 3),
(3, 'App\\Models\\User', 7),
(3, 'App\\Models\\User', 8),
(3, 'App\\Models\\User', 9),
(3, 'App\\Models\\User', 10),
(3, 'App\\Models\\User', 11),
(3, 'App\\Models\\User', 12),
(3, 'App\\Models\\User', 16),
(3, 'App\\Models\\User', 18),
(3, 'App\\Models\\User', 19),
(3, 'App\\Models\\User', 20),
(3, 'App\\Models\\User', 23);

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
(90, 'App\\Models\\User', 21, 'auth-token', '37c19808ccbf60d96a65f4246e0126ba1819225bf8e8e6b210ca05ee8b819934', '[\"*\"]', '2025-04-26 20:40:46', NULL, '2025-04-26 20:37:19', '2025-04-26 20:40:46');

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
('n7lM7WseXYDqXZv7I7IZBagqmRwHcXDONHQ49z5s', NULL, '127.0.0.1', 'PostmanRuntime/7.43.3', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNU9td24xREg5WEdvcXBselhEVWV4MXZNVUFvMEczOVBTOUJ2SlRlbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1745098919);

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
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', NULL, '$2y$12$zEnNl6ZotQxjBTDQMgEvOOgKPNh6Z7DinXvvt/XGM8g.yLt.znSiG', NULL, '2025-04-19 20:45:05', '2025-04-19 20:45:05'),
(2, 'Test User', 'test@example1.com', NULL, '$2y$12$37Vv4Kl1T5I86.0aeoPSIuIJx82fBicr/4HP0YKicxRVThJEVUwa6', NULL, '2025-04-19 20:48:17', '2025-04-19 20:48:17'),
(3, 'Test User', 'test@example2.com', NULL, '$2y$12$4OE6tzM3UBsBVEC2ac3c8.G66M/UHvf/rKDk7gjWaGL3T/K7OBqqO', NULL, '2025-04-19 20:51:55', '2025-04-19 20:51:55'),
(4, 'Test User', 'test@example4.com', NULL, '$2y$12$F/vuT9Hea2m9wIV0Le0DvOiA4TE/KF2L/tlnBYtlRtvzjXTzpOs.6', NULL, '2025-04-19 20:53:10', '2025-04-19 20:53:10'),
(5, 'Event participant', 'part223@test.com', NULL, '$2y$12$/LbBu6cRqTkpZK9atjgz.ev9NRupS6JBA4t6G2L.NoXWXqgfQQBhK', NULL, '2025-04-23 20:18:29', '2025-04-23 20:18:29'),
(6, 'Event participant', 'organizer223@test.com', NULL, '$2y$12$8oHn0siEaY1vxzbcg1zoc.P7VFrqnuZnspqI2w/Wnk1VOFemrh9N2', NULL, '2025-04-24 15:20:54', '2025-04-24 15:20:54'),
(7, 'participant', 'participant@participant.participant', NULL, '$2y$12$/5c0hAp8YBtFKiban9SMJ.1UqnTqYgK5Pi25DN6nJK1.9ydLO4Ese', NULL, '2025-04-24 15:44:52', '2025-04-24 15:44:52'),
(8, 'participant', 'participant2@participant.participant', NULL, '$2y$12$OpDX4rPplxAKJallMGygoOk9u7tvCucULVvYAJiBBGk69a6eEPuCa', NULL, '2025-04-24 15:47:55', '2025-04-24 15:47:55'),
(9, 'participant', 'participant23@participant.participant', NULL, '$2y$12$ZfmGvMKGX82OK63tAXFP6Oe7yKuIyjEpSREvaXi2OEJNIqZtghSjq', NULL, '2025-04-24 15:53:07', '2025-04-24 15:53:07'),
(10, 'participant', 'participant233@participant.participant', NULL, '$2y$12$Og7M11YOnytnRUUcMDql1OIT/OBj.ccD3LoWQ1Nx.YJhcaYN1Qzoy', NULL, '2025-04-24 15:58:11', '2025-04-24 15:58:11'),
(11, 'participant', 'participant2331@participant.participant', NULL, '$2y$12$Tsh7A/p6KPHdw9uaAWG9d.WrBg2QQntd0eLRGaTrihKoS4mV27w3G', NULL, '2025-04-24 16:02:20', '2025-04-24 16:02:20'),
(12, 'participant', 'participant23391@participant.participant', NULL, '$2y$12$OjPu7FmwNJJwa747l/TrUuR3iOI2b78ujFc.I5DLp6UifC5Itbni6', NULL, '2025-04-24 16:03:40', '2025-04-24 16:03:40'),
(13, 'Event participant', 'd111111dddd@test.com', NULL, '$2y$12$HRseeI4qnOV5JseqrJE.f.dCsgIZ31l6JlOeWsUJ.n4AFcrAq3pU6', NULL, '2025-04-24 16:04:14', '2025-04-24 16:04:14'),
(14, 'Event participant', 'd11111s1dddd@test.com', NULL, '$2y$12$wCgKs4j/lf3Qu23VQAFqkOh3yGJt6rrKejbgXLLkTAeYEimlA2VRK', NULL, '2025-04-24 16:05:19', '2025-04-24 16:05:19'),
(15, 'Event participant', 'd11111s1dddd33@test.com', NULL, '$2y$12$V7xJHpEFSslUCRdz74oNtuks9oDox0Vj/akRLv3vLDEhx8wik44I6', NULL, '2025-04-24 16:08:49', '2025-04-24 16:08:49'),
(16, 'participant', 'participant233913@participant.participant', NULL, '$2y$12$FuRJLEzsAN57XzzLfzB4suDM5BwLXE8jQjZABCDaKuoJK7Q63uNFC', NULL, '2025-04-24 16:09:18', '2025-04-24 16:09:18'),
(17, 'Admin User', 'admin@example.com', '2025-04-24 16:24:03', '$2y$12$x6sLPlU1cwOxbxvC88VslujOnT1wSwSDwzna5/OESsUkC4LTFFPHG', NULL, '2025-04-24 16:24:03', '2025-04-24 16:24:03'),
(18, 'participant', 'p1@p1.p1', NULL, '$2y$12$pqrMzSr01xrPBL23tbb9juuAJQWTWQYwGf5raiMQPQKx.Un9YXqd6', NULL, '2025-04-24 20:28:45', '2025-04-24 20:28:45'),
(19, 'participant', 'p1papa@p1.p1', NULL, '$2y$12$SOSfKCdpngozubhZGQkATejmfMPxu/Ac908Qg8YH46XqIDrw7zKVW', NULL, '2025-04-24 20:29:01', '2025-04-24 20:29:01'),
(20, 'participant', 'p1papaq@p1.p1', NULL, '$2y$12$NlDFaC5WZpXl.dLgo0hV4up4/xFrZhydp43qhLSa4/xuX9vQbgflC', NULL, '2025-04-24 20:29:23', '2025-04-24 20:29:23'),
(21, 'organi2', 'organi2@organi2.organi2', NULL, '$2y$12$xriPle56qB1VqLIiaUrH5uWoRJ/3DakeU2S0s4zbIJlG/AL04qFQe', NULL, '2025-04-24 21:47:01', '2025-04-24 21:47:01'),
(22, 'zineb', 'zineb@gmail.com', NULL, '$2y$12$wL7LjxjkcBnoZUVo6mh2c.B0nqWnyeJL4Rppwtks.LN460i9CruD.', NULL, '2025-04-25 20:17:09', '2025-04-25 20:17:09'),
(23, 'participant1', 'participant1@participant1.participant1', NULL, '$2y$12$bnvL032dG2iG.TQ2qSkflufJTbpfjP/xtxSh0zBg6kpMVDrxe1S1e', NULL, '2025-04-26 09:35:23', '2025-04-26 09:35:23');

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
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `events_organizer_id_foreign` (`organizer_id`);

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
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_organizer_id_foreign` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
-- Contraintes pour la table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
