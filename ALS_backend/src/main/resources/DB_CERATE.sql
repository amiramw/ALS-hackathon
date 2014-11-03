-- The main schema creation
CREATE SCHEMA IF NOT EXISTS db_ALS;

-- The table with all the ALS positive 
CREATE TABLE `db_als`.`tbl_patient` (
  `id` BINARY(16) NOT NULL,
  `email` VARCHAR(225) NULL,
  `LastName` VARCHAR(45) NULL,
  `FirstName` VARCHAR(45) NULL,
  `CreationDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `Gender` BIT NULL,
  `BirthDate` DATE NULL,
  `DiagnoseDate` DATE NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));
  
-- The table with all the result of the submitted forms
CREATE TABLE `db_als`.`tbl_form` (
  `id` BINARY(16) NOT NULL,
  `SubmitionDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Q1` TINYINT NULL,
  `Q2` TINYINT NULL,
  `Q3` TINYINT NULL,
  `Q4` TINYINT NULL,
  `Q5` TINYINT NULL,
  `Q6` TINYINT NULL,
  `Q7` TINYINT NULL,
  `Q8` TINYINT NULL,
  `Q9` TINYINT NULL,
  `Q10` TINYINT NULL,
  `Q11` TINYINT NULL,
  `Q12` TINYINT NULL,
  `EXT_ID` BINARY(16),
  UNIQUE INDEX `EXT_ID_UNIQUE` (`EXT_ID` ASC)
  CONSTRAINT `fk_id_id`
    FOREIGN KEY (`id`)
    REFERENCES `db_als`.`tbl_patient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- The table with the data from the sensors (equivalent to the form)
CREATE TABLE `db_als`.`tbl_sensor` (
  `id` BINARY(16) NOT NULL,
  `SubmitionDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `SensorType` CHAR NOT NULL,
  `Data` BLOB NOT NULL,
  `EXT_ID` BINARY(16),
  UNIQUE INDEX `EXT_ID_UNIQUE` (`EXT_ID` ASC)
  CONSTRAINT `fk_id_id_sensor`
    FOREIGN KEY (`id`)
    REFERENCES `db_als`.`tbl_patient` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- The tables to add additional data about a specific sensor/form row
CREATE TABLE `db_als`.`tbl_form_ext` (
  `id` BINARY(16) NOT NULL,
  `Key` VARCHAR(225) NULL,
  `Val` VARCHAR(1000) NULL,
  INDEX `fk_ext_id_form_idx_idx` (`id` ASC),
  CONSTRAINT `fk_ext_id_form_idx`
    FOREIGN KEY (`id`)
    REFERENCES `db_als`.`tbl_form` (`EXT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `db_als`.`tbl_sensor_ext` (
  `id` BINARY(16) NOT NULL,
  `Key` VARCHAR(225) NULL,
  `Val` VARCHAR(1000) NULL,
  INDEX `fk_ext_id_sensor_idx` (`id` ASC),
  CONSTRAINT `fk_ext_id_sensor_idx`
    FOREIGN KEY (`id`)
    REFERENCES `db_als`.`tbl_sensor` (`EXT_ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
	


