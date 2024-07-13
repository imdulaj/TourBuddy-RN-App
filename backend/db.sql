create table place(
    pid int  AUTO_INCREMENT,
    title varchar(100),
    description varchar(300),
    date DATE,
    image varchar(50),
    primary key(pid)
);

CREATE DATABASE tour;


ALTER TABLE place ADD COLUMN latitude DOUBLE;
ALTER TABLE place ADD COLUMN longitude DOUBLE;

ALTER TABLE place DROP COLUMN latitude;
ALTER TABLE place DROP COLUMN longitude;

create table users(
    userId int  AUTO_INCREMENT,
    name varchar(50),
    email varchar(50),
    password varchar(100),
    primary key(userId)
);