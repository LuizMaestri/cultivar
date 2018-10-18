-- MySQL Script generated by MySQL Workbench
-- Thu Aug 30 22:54:57 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cultivar` DEFAULT CHARACTER SET utf8 ;
USE `cultivar` ;

-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
create table if not exists address
(
  cod_address int auto_increment
    primary key,
  nm_city varchar(45) not null,
  nm_neighborhood varchar(45) not null,
  nm_street varchar(45) not null,
  nu_street varchar(45) default 'S/N' null
)
  engine=InnoDB
;

create table if not exists attachment
(
  cod_attachment int auto_increment
    primary key,
  nm_attachment varchar(225) not null,
  fl_required tinyint default '1' not null,
  sta_user enum('APPROVED', 'WAIT_STATEMENT', 'WAIT_COMPANY', 'WAIT_TRAINING', 'REGISTER') null,
  fl_download tinyint default '0' null
)
  engine=InnoDB
;

create table if not exists mentoring
(
  cod_question int auto_increment
    primary key,
  dsc_question int not null
)
  engine=InnoDB
;

create table if not exists personality
(
  cod_question int auto_increment
    primary key,
  dsc_question varchar(255) not null
)
  engine=InnoDB
;

create table if not exists project
(
  cod_project int auto_increment
    primary key,
  nm_project varchar(60) not null,
  dt_start date not null,
  dt_end date not null
)
  engine=InnoDB
;

create table if not exists question
(
  cod_question int auto_increment
    primary key,
  dsc_question text not null,
  dsc_responds enum('VOLUNTEER', 'COMPANY_ADMIN') not null
)
  engine=InnoDB
;

create table if not exists skill
(
  cod_skill int auto_increment
    primary key,
  nm_skill varchar(50) not null
)
  engine=InnoDB
;

create table if not exists technology
(
  cod_technology int auto_increment
    primary key,
  nm_technology varchar(50) not null
)
  engine=InnoDB
;

create table if not exists training
(
  cod_training int auto_increment
    primary key,
  nm_training varchar(225) not null,
  dsc_path varchar(225) null,
  dsc_link varchar(225) null
)
  engine=InnoDB
;

create table if not exists type_event
(
  tp_event int auto_increment
    primary key,
  nm_type varchar(50) not null
)
  engine=InnoDB
;

create table if not exists type_event_training
(
  cod_training int not null,
  tp_event int not null,
  primary key (cod_training, tp_event),
  constraint type_event_training_training_cod_training_fk
  foreign key (cod_training) references training (cod_training)
    on delete cascade,
  constraint type_event_training_type_event_tp_event_fk
  foreign key (tp_event) references type_event (tp_event)
    on delete cascade
)
  engine=InnoDB
;

create index type_event_training_type_event_tp_event_fk
  on type_event_training (tp_event)
;

create table if not exists users
(
  dt_create datetime default CURRENT_TIMESTAMP null,
  cod_cpf varchar(11) not null
    primary key,
  nm_user varchar(225) not null,
  dsc_email varchar(225) not null,
  dsc_password varchar(45) not null,
  dsc_role enum('VOLUNTEER', 'ADMIN', 'COMPANY_ADMIN', 'SCHOOL_ADMIN') default 'VOLUNTEER' null,
  sta_user enum('APPROVED', 'WAIT_STATEMENT', 'WAIT_COMPANY', 'WAIT_TRAINING', 'REGISTER') default 'REGISTER' null,
  dt_birth date not null,
  dsc_job varchar(225) not null,
  dsc_phone varchar(11) not null,
  cod_address int not null,
  constraint fk_users_address1
  foreign key (cod_address) references address (cod_address)
)
  engine=InnoDB
;

create table if not exists company
(
  cod_cnpj varchar(14) not null
    primary key,
  nm_company varchar(225) not null,
  cod_address int not null,
  cod_cpf varchar(11) not null,
  dsc_phone varchar(11) not null,
  constraint fk_company_address1
  foreign key (cod_address) references address (cod_address),
  constraint fk_company_users1
  foreign key (cod_cpf) references users (cod_cpf)
    on delete cascade
)
  engine=InnoDB
;

create index fk_company_address1_idx
  on company (cod_address)
;

create index fk_company_users1_idx
  on company (cod_cpf)
;

create table if not exists school
(
  cod_school int auto_increment
    primary key,
  nm_school varchar(225) not null,
  dsc_phone varchar(11) not null,
  cod_address int not null,
  cod_cpf varchar(11) not null,
  tp_school enum('MUNICIPAL', 'STATE', 'FEDERAL') not null,
  constraint fk_school_address1
  foreign key (cod_address) references address (cod_address),
  constraint fk_school_users1
  foreign key (cod_cpf) references users (cod_cpf)
    on delete cascade
)
  engine=InnoDB
;

create table if not exists event
(
  cod_event int auto_increment
    primary key,
  dt_start_occurrence datetime not null,
  dt_create datetime default CURRENT_TIMESTAMP null,
  cod_address int not null,
  dt_end_occurrence datetime not null,
  fl_all_day tinyint default '0' null,
  cod_school int null,
  tp_event int not null,
  cod_project int null,
  fl_evaluate tinyint(1) default '0' null,
  constraint fk_event_address1
  foreign key (cod_address) references address (cod_address),
  constraint event_school_cod_school_fk
  foreign key (cod_school) references school (cod_school)
    on delete cascade,
  constraint event_type_event_tp_event_fk
  foreign key (tp_event) references type_event (tp_event)
    on delete cascade,
  constraint event_project_cod_project_fk
  foreign key (cod_project) references project (cod_project)
    on delete cascade
)
  engine=InnoDB
;

create index event_project_cod_project_fk
  on event (cod_project)
;

create index event_school_cod_school_fk
  on event (cod_school)
;

create index event_type_event_tp_event_fk
  on event (tp_event)
;

create index fk_event_address1_idx
  on event (cod_address)
;

create table if not exists event_training
(
  cod_training int not null,
  cod_event int not null,
  primary key (cod_training, cod_event),
  constraint event_training_training_cod_training_fk
  foreign key (cod_training) references training (cod_training)
    on delete cascade,
  constraint event_training_event_cod_event_fk
  foreign key (cod_event) references event (cod_event)
    on delete cascade
)
  engine=InnoDB
;

create index event_training_event_cod_event_fk
  on event_training (cod_event)
;

create table if not exists participation
(
  cod_event int not null,
  cod_cpf varchar(11) not null,
  primary key (cod_event, cod_cpf),
  constraint fk_participation_event1
  foreign key (cod_event) references event (cod_event)
    on delete cascade,
  constraint fk_participation_users1
  foreign key (cod_cpf) references users (cod_cpf)
    on delete cascade
)
  engine=InnoDB
;

create index fk_participation_event1_idx
  on participation (cod_event)
;

create index fk_participation_users1_idx
  on participation (cod_cpf)
;

create table if not exists rating
(
  vl_rating int not null,
  dsc_rating text null,
  cod_cpf varchar(11) null,
  cod_event int null,
  constraint fk_rating_users1
  foreign key (cod_cpf) references users (cod_cpf),
  constraint fk_rating_event1
  foreign key (cod_event) references event (cod_event)
)
  engine=InnoDB
;

create index fk_rating_event1_idx
  on rating (cod_event)
;

create index fk_rating_users1_idx
  on rating (cod_cpf)
;

create index fk_school_address1_idx
  on school (cod_address)
;

create index fk_school_users1_idx
  on school (cod_cpf)
;

create index fk_users_address1_idx
  on users (cod_address)
;

create table if not exists volunteer
(
  cod_cpf varchar(11) not null,
  cod_cnpj varchar(14) not null,
  dsc_schooling enum('ELEMENTARY_SCHOOL', 'HIGH_SCHOOL', 'UNIVERSITY_GRADUATE', 'POSTGRADUATE_STUDIES') not null,
  fl_conclusion tinyint not null,
  cod_rg varchar(15) not null,
  nm_volunteer varchar(225) not null,
  cod_school int(4) null,
  dsc_course varchar(50) null,
  primary key (cod_cpf, cod_cnpj),
  constraint fk_volunteer_users1
  foreign key (cod_cpf) references users (cod_cpf)
    on delete cascade,
  constraint fk_volunteer_company1
  foreign key (cod_cnpj) references company (cod_cnpj)
    on delete cascade,
  constraint volunteer_school_cod_school_fk
  foreign key (cod_school) references school (cod_school)
    on update set null on delete set null
)
  engine=InnoDB
;

create table if not exists answer
(
  cod_question int not null,
  fl_answer tinyint default '0' null,
  dsc_answer text null,
  cod_cpf varchar(11) not null,
  primary key (cod_question, cod_cpf),
  constraint fk_answer_question1
  foreign key (cod_question) references question (cod_question)
    on delete cascade,
  constraint fk_answer_volunteer1
  foreign key (cod_cpf) references volunteer (cod_cpf)
    on delete cascade
)
  engine=InnoDB
;

create index fk_answer_question1_idx
  on answer (cod_question)
;

create index fk_answer_volunteer1_idx
  on answer (cod_cpf)
;

create table if not exists answer_mentoring
(
  cod_project int not null,
  cod_question int not null,
  cod_cpf varchar(11) not null,
  dsc_answer enum('TOTALLY_AGREE', 'AGREE', 'DISAGREE', 'TOTALLY_DISAGREE') not null,
  primary key (cod_project, cod_cpf, cod_question),
  constraint answer_mentoring_project_cod_project_fk
  foreign key (cod_project) references project (cod_project)
    on delete cascade,
  constraint answer_mentoring_mentoring_cod_question_fk
  foreign key (cod_question) references mentoring (cod_question)
    on delete cascade,
  constraint answer_mentoring_volunteer_cod_cpf_fk
  foreign key (cod_cpf) references volunteer (cod_cpf)
    on delete cascade
)
  engine=InnoDB
;

create index answer_mentoring_mentoring_cod_question_fk
  on answer_mentoring (cod_question)
;

create index answer_mentoring_volunteer_cod_cpf_fk
  on answer_mentoring (cod_cpf)
;

create table if not exists answer_personality
(
  cod_question int not null,
  cod_project int not null,
  cod_cpf varchar(11) not null,
  dsc_answer enum('TOTALLY_AGREE', 'AGREE', 'DISAGREE', 'TOTALLY_DISAGREE') not null,
  primary key (cod_question, cod_cpf, cod_project),
  constraint answer_volunteer_personality_cod_question_fk
  foreign key (cod_question) references personality (cod_question)
    on delete cascade,
  constraint answer_volunteer_project_cod_project_fk
  foreign key (cod_project) references project (cod_project)
    on delete cascade,
  constraint answer_volunteer_volunteer_cod_cpf_fk
  foreign key (cod_cpf) references volunteer (cod_cpf)
    on delete cascade
)
  engine=InnoDB
;

create index answer_volunteer_project_cod_project_fk
  on answer_personality (cod_project)
;

create index answer_volunteer_volunteer_cod_cpf_fk
  on answer_personality (cod_cpf)
;

create table if not exists answer_technology
(
  cod_technology int not null,
  cod_project int not null,
  cod_cpf varchar(11) not null,
  dsc_answer enum('NOTHING', 'BEGINNER', 'PROFICIENT', 'EXPERT') default 'NOTHING' null,
  primary key (cod_technology, cod_cpf, cod_project),
  constraint answer_technology_technology_cod_technology_fk
  foreign key (cod_technology) references technology (cod_technology)
    on delete cascade,
  constraint answer_technology_project_cod_project_fk
  foreign key (cod_project) references project (cod_project)
    on delete cascade,
  constraint answer_technology_volunteer_cod_cpf_fk
  foreign key (cod_cpf) references volunteer (cod_cpf)
    on delete cascade
)
  engine=InnoDB
;

create index answer_technology_project_cod_project_fk
  on answer_technology (cod_project)
;

create index answer_technology_volunteer_cod_cpf_fk
  on answer_technology (cod_cpf)
;

create table if not exists dispatch
(
  fl_dispatch tinyint default '0' null,
  cod_attachment int not null,
  cod_cpf varchar(11) not null,
  primary key (cod_attachment, cod_cpf),
  constraint fk_dispatch_attachment1
  foreign key (cod_attachment) references attachment (cod_attachment)
    on delete cascade,
  constraint fk_dispatch_volunteer1
  foreign key (cod_cpf) references volunteer (cod_cpf)
    on delete cascade
)
  engine=InnoDB
;

create index fk_dispatch_attachment1_idx
  on dispatch (cod_attachment)
;

create index fk_dispatch_volunteer1_idx
  on dispatch (cod_cpf)
;

create table if not exists experience
(
  cod_cpf varchar(11) not null,
  cod_project int not null,
  dsc_experience text not null,
  dsc_difficulty enum('VERY_EASY', 'EASY', 'HARD', 'VERY_HARD') not null,
  fl_enjoy enum('VERY_FUNNY', 'FUNNY', 'BORED', 'VERY_BORED') not null,
  dsc_enjoy text not null,
  dsc_not_enjoy text not null,
  dsc_suggest text not null,
  dsc_expectation enum('ALL', 'SOME', 'NOTHING') default 'NOTHING' null,
  primary key (cod_cpf, cod_project),
  constraint experience_volunteer_cod_cpf_fk
  foreign key (cod_cpf) references volunteer (cod_cpf)
    on delete cascade,
  constraint experience_project_cod_project_fk
  foreign key (cod_project) references project (cod_project)
    on delete cascade
)
  engine=InnoDB
;

create index experience_project_cod_project_fk
  on experience (cod_project)
;

create table if not exists skill_volunteer
(
  cod_skill int not null,
  cod_project int not null,
  cod_cpf varchar(11) not null,
  dsc_other varchar(60) not null,
  primary key (cod_skill, cod_project, cod_cpf),
  constraint skill_volunteer_skill_cod_skill_fk
  foreign key (cod_skill) references skill (cod_skill)
    on delete cascade,
  constraint skill_volunteer_project_cod_project_fk
  foreign key (cod_project) references project (cod_project)
    on delete cascade,
  constraint skill_volunteer_volunteer_cod_cpf_fk
  foreign key (cod_cpf) references volunteer (cod_cpf)
    on delete cascade
)
  engine=InnoDB
;

create index skill_volunteer_project_cod_project_fk
  on skill_volunteer (cod_project)
;

create index skill_volunteer_volunteer_cod_cpf_fk
  on skill_volunteer (cod_cpf)
;

create index fk_volunteer_company1_idx
  on volunteer (cod_cnpj)
;

create index fk_volunteer_users1_idx
  on volunteer (cod_cpf)
;

create index volunteer_school_cod_school_fk
  on volunteer (cod_school)
;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
