USE `stepchallenge`;

CREATE TABLE `currencies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(25) NOT NULL,
  `symbol` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_currency` int NOT NULL,
  `value` decimal(15,6) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rates_fk` (`id_currency`),
  CONSTRAINT `rates_fk` FOREIGN KEY (`id_currency`) REFERENCES `currencies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO currencies (id,description,symbol) VALUES
	 (1,'bitcoin','BTC'),
	 (2,'ethereum','ETH'),
	 (3,'cardano','ADA');
INSERT INTO rates (id_currency,value,created_at) VALUES
	 (1,32351.3,'2021-1-23 17:13:00'),
	 (2,1285.8,'2021-1-23 17:14:01'),
	 (3,0.3472,'2021-1-23 17:15:29');
