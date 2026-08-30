-- AlterTable
ALTER TABLE `banner` ADD COLUMN `ctaLabelEn` VARCHAR(80) NULL,
    ADD COLUMN `subtitleEn` VARCHAR(255) NULL,
    ADD COLUMN `titleEn` VARCHAR(180) NULL;

-- AlterTable
ALTER TABLE `berita` ADD COLUMN `contentEn` LONGTEXT NULL,
    ADD COLUMN `excerptEn` VARCHAR(400) NULL,
    ADD COLUMN `titleEn` VARCHAR(200) NULL;

-- AlterTable
ALTER TABLE `destinasi` ADD COLUMN `contentEn` LONGTEXT NULL,
    ADD COLUMN `descriptionEn` TEXT NULL,
    ADD COLUMN `excerptEn` VARCHAR(300) NULL,
    ADD COLUMN `titleEn` VARCHAR(180) NULL;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `contentEn` LONGTEXT NULL,
    ADD COLUMN `descriptionEn` TEXT NULL,
    ADD COLUMN `titleEn` VARCHAR(200) NULL;

-- AlterTable
ALTER TABLE `galeri_foto` ADD COLUMN `captionEn` VARCHAR(255) NULL,
    ADD COLUMN `titleEn` VARCHAR(180) NULL;

-- AlterTable
ALTER TABLE `galeri_video` ADD COLUMN `descriptionEn` TEXT NULL,
    ADD COLUMN `titleEn` VARCHAR(180) NULL;

-- AlterTable
ALTER TABLE `kategori` ADD COLUMN `descriptionEn` TEXT NULL,
    ADD COLUMN `nameEn` VARCHAR(120) NULL;

-- AlterTable
ALTER TABLE `profil_website` ADD COLUMN `aboutEn` LONGTEXT NULL,
    ADD COLUMN `historyEn` LONGTEXT NULL,
    ADD COLUMN `missionEn` TEXT NULL,
    ADD COLUMN `siteNameEn` VARCHAR(140) NULL,
    ADD COLUMN `taglineEn` VARCHAR(255) NULL,
    ADD COLUMN `visionEn` TEXT NULL;

-- AlterTable
ALTER TABLE `testimoni` ADD COLUMN `messageEn` TEXT NULL,
    ADD COLUMN `roleEn` VARCHAR(140) NULL;
