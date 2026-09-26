-- CreateTable
CREATE TABLE `social_media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `platform` ENUM('INSTAGRAM', 'TIKTOK', 'FACEBOOK') NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `username` VARCHAR(120) NULL,
    `url` VARCHAR(500) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `position` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `social_media_platform_key`(`platform`),
    INDEX `social_media_isActive_position_idx`(`isActive`, `position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
