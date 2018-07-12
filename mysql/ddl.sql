-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema cultivar
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cultivar
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cultivar` DEFAULT CHARACTER SET utf8 ;
USE `cultivar` ;

-- -----------------------------------------------------
-- Table `cultivar`.`Address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cultivar`.`Address` (
  `cod_address` INT NOT NULL AUTO_INCREMENT,
  `nm_city` VARCHAR(45) NOT NULL,
  `nm_neighborhood` VARCHAR(45) NOT NULL,
  `nm_street` VARCHAR(100) NOT NULL,
  `nu_address` VARCHAR(5) NULL DEFAULT 'S/N',
  PRIMARY KEY (`cod_address`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cultivar`.`Place`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cultivar`.`Place` (
  `cod_cnpj` VARCHAR(14) NOT NULL,
  `nm_company` VARCHAR(255) NOT NULL,
  `nu_phone` VARCHAR(11) NOT NULL,
  `fl_school` TINYINT NOT NULL DEFAULT 0,
  `cod_address` INT NOT NULL,
  `cod_cpf` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`cod_cnpj`),
  INDEX `fk_Company_Address1_idx` (`cod_address` ASC),
  INDEX `fk_Company_User1_idx` (`cod_cpf` ASC),
  CONSTRAINT `fk_Company_Address1`
    FOREIGN KEY (`cod_address`)
    REFERENCES `cultivar`.`Address` (`cod_address`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Company_User1`
    FOREIGN KEY (`cod_cpf`)
    REFERENCES `cultivar`.`Users` (`cod_cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cultivar`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cultivar`.`Users` (
  `cod_cpf` VARCHAR(11) NOT NULL,
  `nm_user` VARCHAR(255) NOT NULL,
  `nm_role` ENUM('ADMIN', 'VOLUNTEER', 'SCHOOL_ADMIN', 'COMPANY_ADMIN') NOT NULL,
  `sta_user` ENUM('APPROVED', 'WAIT_RECOMMEND', 'RECOMMENDED', 'WAIT_RT', 'WAIT_VT') NOT NULL,
  `dt_birth` DATE NOT NULL,
  `nu_phone` VARCHAR(11) NOT NULL,
  `dsc_email` VARCHAR(255) NOT NULL,
  `dsc_password` VARCHAR(255) NOT NULL,
  `cod_address` INT,
  `cod_cnpj` VARCHAR(14),
  `dt_create` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cod_cpf`),
  INDEX `fk_User_Address_idx` (`cod_address` ASC),
  UNIQUE INDEX `dsc_email_UNIQUE` (`dsc_email` ASC),
  INDEX `fk_User_Company1_idx` (`cod_cnpj` ASC),
  CONSTRAINT `fk_User_Address`
    FOREIGN KEY (`cod_address`)
    REFERENCES `cultivar`.`Address` (`cod_address`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_Company1`
    FOREIGN KEY (`cod_cnpj`)
    REFERENCES `cultivar`.`Place` (`cod_cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cultivar`.`Event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cultivar`.`Event` (
  `cod_event` INT NOT NULL AUTO_INCREMENT,
  `dt_create` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_occurrence` DATE NOT NULL,
  `tp_event` ENUM('TRAINNIG', 'TUTORING', 'MEETING') NOT NULL,
  `cod_cnpj` VARCHAR(14) NOT NULL,
  PRIMARY KEY (`cod_event`),
  INDEX `fk_Event_Place1_idx` (`cod_cnpj` ASC),
  CONSTRAINT `fk_Event_Place1`
    FOREIGN KEY (`cod_cnpj`)
    REFERENCES `cultivar`.`Place` (`cod_cnpj`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cultivar`.`Event_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cultivar`.`Event_User` (
  `cod_event` INT NOT NULL,
  `cod_cpf` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`cod_event`, `cod_cpf`),
  INDEX `fk_Event_has_User_User1_idx` (`cod_cpf` ASC),
  INDEX `fk_Event_has_User_Event1_idx` (`cod_event` ASC),
  CONSTRAINT `fk_Event_has_User_Event1`
    FOREIGN KEY (`cod_event`)
    REFERENCES `cultivar`.`Event` (`cod_event`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Event_has_User_User1`
    FOREIGN KEY (`cod_cpf`)
    REFERENCES `cultivar`.`Users` (`cod_cpf`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
