-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : jeu. 13 juin 2024 à 23:52
-- Version du serveur : 5.7.39
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ColPlanner`
--
CREATE DATABASE IF NOT EXISTS `ColPlanner` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ColPlanner`;

-- --------------------------------------------------------

--
-- Structure de la table `coloc`
--

CREATE TABLE `coloc` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `crated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `coloc`
--

INSERT INTO `coloc` (`id`, `name`, `crated_at`) VALUES
(1, 'Le Faucon Millenium', '2024-06-01 21:24:12');

-- --------------------------------------------------------

--
-- Structure de la table `coloc_user`
--

CREATE TABLE `coloc_user` (
  `id` int(11) NOT NULL,
  `coloc_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_admin` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `coloc_user`
--

INSERT INTO `coloc_user` (`id`, `coloc_id`, `user_id`, `is_admin`) VALUES
(21, 1, 5, 0),
(33, 1, 7, 0),
(34, 1, 8, 0);

-- --------------------------------------------------------

--
-- Structure de la table `expence`
--

CREATE TABLE `expence` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `coloc_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `pay` int(11) DEFAULT '0',
  `count` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `expence`
--

INSERT INTO `expence` (`id`, `user_id`, `coloc_id`, `price`, `name`, `description`, `pay`, `count`, `created_at`) VALUES
(33, 5, 1, 234, 'Loyer', 'sqdf', 0, 2, '2024-06-13 12:56:28');

-- --------------------------------------------------------

--
-- Structure de la table `expences_pay`
--

CREATE TABLE `expences_pay` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `expence_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `expences_pay`
--

INSERT INTO `expences_pay` (`id`, `user_id`, `expence_id`, `created_at`) VALUES
(18, 7, 33, '2024-06-13 13:14:30'),
(20, 8, 33, '2024-06-13 13:54:18');

-- --------------------------------------------------------

--
-- Structure de la table `invitation`
--

CREATE TABLE `invitation` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `coloc_id` int(11) NOT NULL,
  `user_origine` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `coloc_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `at_before` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `current_coloc` int(11) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `current_coloc`, `date`) VALUES
(5, 'Lilyan', 'lilyan.chauveau@gmail.com', '$2y$10$wdt7fcFwFuzxbqZ35ufG6OY6iHU70fEszMO412Qbx8rNKmZ11Vkpa', 1, '2024-05-22 21:25:34'),
(7, 'Robbert', 'robert@gamil.com', '$2y$10$cL5yYJuwnLpAJ1wJuBWRnuELINHEnnvh0oG3jZ5AQhEJgJT.z3mau', 1, '2024-06-11 10:59:52'),
(8, 'Alice', 'alice@adsl.fr', '$2y$10$tpgVpN8zfwGvoUiB6cOSFOTesSiRNNIWLz2SP.jqbWhbnoCZ/zaVe', 1, '2024-06-12 10:17:05');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `coloc`
--
ALTER TABLE `coloc`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `coloc_user`
--
ALTER TABLE `coloc_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coloc_id` (`coloc_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `expence`
--
ALTER TABLE `expence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coloc_id` (`coloc_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `expences_pay`
--
ALTER TABLE `expences_pay`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `expence_id` (`expence_id`);

--
-- Index pour la table `invitation`
--
ALTER TABLE `invitation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coloc_id` (`coloc_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `user_origine` (`user_origine`);

--
-- Index pour la table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `coloc_id` (`coloc_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `current_coloc` (`current_coloc`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `coloc`
--
ALTER TABLE `coloc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `coloc_user`
--
ALTER TABLE `coloc_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT pour la table `expence`
--
ALTER TABLE `expence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `expences_pay`
--
ALTER TABLE `expences_pay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `invitation`
--
ALTER TABLE `invitation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `coloc_user`
--
ALTER TABLE `coloc_user`
  ADD CONSTRAINT `coloc_user_ibfk_1` FOREIGN KEY (`coloc_id`) REFERENCES `coloc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `coloc_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `expence`
--
ALTER TABLE `expence`
  ADD CONSTRAINT `expence_ibfk_1` FOREIGN KEY (`coloc_id`) REFERENCES `coloc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expence_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `expences_pay`
--
ALTER TABLE `expences_pay`
  ADD CONSTRAINT `expences_pay_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expences_pay_ibfk_2` FOREIGN KEY (`expence_id`) REFERENCES `expence` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `invitation`
--
ALTER TABLE `invitation`
  ADD CONSTRAINT `invitation_ibfk_1` FOREIGN KEY (`coloc_id`) REFERENCES `coloc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invitation_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invitation_ibfk_3` FOREIGN KEY (`user_origine`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`coloc_id`) REFERENCES `coloc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`current_coloc`) REFERENCES `coloc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
