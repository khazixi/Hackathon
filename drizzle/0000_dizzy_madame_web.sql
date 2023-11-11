CREATE TABLE `post` (
	`id` integer PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`author` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`image` blob
);
