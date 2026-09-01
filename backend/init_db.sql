-- CreateTable
CREATE TABLE `admin_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(160) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'SUPERADMIN') NOT NULL DEFAULT 'ADMIN',
    `avatar` VARCHAR(255) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLogin` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_users_email_key`(`email`),
    INDEX `admin_users_email_idx`(`email`),
    INDEX `admin_users_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `nameEn` VARCHAR(120) NULL,
    `slug` VARCHAR(140) NOT NULL,
    `description` TEXT NULL,
    `descriptionEn` TEXT NULL,
    `icon` VARCHAR(120) NULL,
    `color` VARCHAR(30) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `kategori_slug_key`(`slug`),
    INDEX `kategori_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `destinasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(180) NOT NULL,
    `titleEn` VARCHAR(180) NULL,
    `slug` VARCHAR(200) NOT NULL,
    `excerpt` VARCHAR(300) NULL,
    `excerptEn` VARCHAR(300) NULL,
    `description` TEXT NOT NULL,
    `descriptionEn` TEXT NULL,
    `content` LONGTEXT NULL,
    `contentEn` LONGTEXT NULL,
    `location` VARCHAR(180) NOT NULL,
    `address` VARCHAR(255) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `price` INTEGER NOT NULL DEFAULT 0,
    `priceForeign` INTEGER NOT NULL DEFAULT 0,
    `openHours` VARCHAR(120) NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `thumbnail` VARCHAR(255) NOT NULL,
    `images` JSON NULL,
    `facilities` JSON NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `views` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `kategoriId` INTEGER NOT NULL,

    UNIQUE INDEX `destinasi_slug_key`(`slug`),
    INDEX `destinasi_kategoriId_idx`(`kategoriId`),
    INDEX `destinasi_slug_idx`(`slug`),
    INDEX `destinasi_isFeatured_idx`(`isFeatured`),
    INDEX `destinasi_isPublished_idx`(`isPublished`),
    FULLTEXT INDEX `destinasi_title_description_idx`(`title`, `description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(180) NOT NULL,
    `titleEn` VARCHAR(180) NULL,
    `subtitle` VARCHAR(255) NULL,
    `subtitleEn` VARCHAR(255) NULL,
    `image` VARCHAR(255) NOT NULL,
    `link` VARCHAR(255) NULL,
    `ctaLabel` VARCHAR(80) NULL,
    `ctaLabelEn` VARCHAR(80) NULL,
    `position` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `banner_isActive_idx`(`isActive`),
    INDEX `banner_position_idx`(`position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `berita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `titleEn` VARCHAR(200) NULL,
    `slug` VARCHAR(220) NOT NULL,
    `excerpt` VARCHAR(400) NULL,
    `excerptEn` VARCHAR(400) NULL,
    `content` LONGTEXT NOT NULL,
    `contentEn` LONGTEXT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    `author` VARCHAR(120) NULL,
    `category` VARCHAR(120) NULL,
    `tags` JSON NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `publishedAt` DATETIME(3) NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `berita_slug_key`(`slug`),
    INDEX `berita_slug_idx`(`slug`),
    INDEX `berita_isPublished_idx`(`isPublished`),
    FULLTEXT INDEX `berita_title_content_idx`(`title`, `content`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `titleEn` VARCHAR(200) NULL,
    `slug` VARCHAR(220) NOT NULL,
    `description` TEXT NOT NULL,
    `descriptionEn` TEXT NULL,
    `content` LONGTEXT NULL,
    `contentEn` LONGTEXT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    `location` VARCHAR(180) NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `ticketPrice` INTEGER NOT NULL DEFAULT 0,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `event_slug_key`(`slug`),
    INDEX `event_slug_idx`(`slug`),
    INDEX `event_startDate_idx`(`startDate`),
    INDEX `event_isPublished_idx`(`isPublished`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `galeri_foto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(180) NOT NULL,
    `titleEn` VARCHAR(180) NULL,
    `image` VARCHAR(255) NOT NULL,
    `caption` VARCHAR(255) NULL,
    `captionEn` VARCHAR(255) NULL,
    `category` VARCHAR(120) NULL,
    `position` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `galeri_foto_category_idx`(`category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `galeri_video` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(180) NOT NULL,
    `titleEn` VARCHAR(180) NULL,
    `videoUrl` VARCHAR(400) NOT NULL,
    `thumbnail` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `descriptionEn` TEXT NULL,
    `position` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimoni` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(140) NOT NULL,
    `role` VARCHAR(140) NULL,
    `roleEn` VARCHAR(140) NULL,
    `origin` VARCHAR(140) NULL,
    `avatar` VARCHAR(255) NULL,
    `message` TEXT NOT NULL,
    `messageEn` TEXT NULL,
    `rating` INTEGER NOT NULL DEFAULT 5,
    `isApproved` BOOLEAN NOT NULL DEFAULT true,
    `position` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `testimoni_isApproved_idx`(`isApproved`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profil_website` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siteName` VARCHAR(140) NOT NULL DEFAULT 'VisitGrogol',
    `siteNameEn` VARCHAR(140) NULL,
    `tagline` VARCHAR(255) NULL,
    `taglineEn` VARCHAR(255) NULL,
    `logo` VARCHAR(255) NULL,
    `favicon` VARCHAR(255) NULL,
    `about` LONGTEXT NULL,
    `aboutEn` LONGTEXT NULL,
    `vision` TEXT NULL,
    `visionEn` TEXT NULL,
    `mission` TEXT NULL,
    `missionEn` TEXT NULL,
    `history` LONGTEXT NULL,
    `historyEn` LONGTEXT NULL,
    `heroImage` VARCHAR(255) NULL,
    `atraksiHeroImage` VARCHAR(255) NULL,
    `budayaHeroImage` VARCHAR(255) NULL,
    `kulinerHeroImage` VARCHAR(255) NULL,
    `penginapanHeroImage` VARCHAR(255) NULL,
    `kontakHeroImage` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kontak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(255) NULL,
    `phone` VARCHAR(60) NULL,
    `whatsapp` VARCHAR(60) NULL,
    `email` VARCHAR(160) NULL,
    `mapEmbed` TEXT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `facebook` VARCHAR(255) NULL,
    `instagram` VARCHAR(255) NULL,
    `twitter` VARCHAR(255) NULL,
    `youtube` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(140) NOT NULL,
    `email` VARCHAR(160) NOT NULL,
    `arrivalDate` DATETIME(3) NULL,
    `guests` INTEGER NOT NULL DEFAULT 1,
    `packageType` VARCHAR(140) NULL,
    `note` TEXT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `reservasi_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newsletter_subscriber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(160) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `newsletter_subscriber_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `destinasi` ADD CONSTRAINT `destinasi_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

