create database emp_ideas;
use emp_ideas;

create table ideas1(
id int auto_increment primary key,
idea_id varchar(20) unique not null,
emp_email varchar(100),
emp_name varchar(100),
classification varchar(100),
budget decimal(10,2),
subject varchar(100),
details text,
target_date date,
status varchar(50) default 'Pending',
created_at timestamp default current_timestamp
);
select * from ideas1;
drop table ideas1;