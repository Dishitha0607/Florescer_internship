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

alter table ideas1 add column rating int null, add column rejection_reason text null;
alter table ideas1 change rejection_reason admin_feedback text;
alter table ideas1 add column actual_budget decimal(10,2), add column implementation_details text, add column implementation_image varchar(255), add column kaizen_status varchar(50) default 'Pending';
select * from ideas1;