CREATE DATABASE ForumBackend;

CREATE TABLE IF NOT EXISTS Users (
  user_id varchar(8) PRIMARY KEY,
  user_email varchar(100) NOT NULL,
  user_dateofregistration date NOT NULL
);

CREATE TABLE IF NOT EXISTS Board (
  board_id varchar(8) PRIMARY KEY,
  board_module TEXT NOT NULL,
  board_year varchar(9) NOT NULL
);

CREATE TABLE IF NOT EXISTS Posts (
  post_id varchar (8) PRIMARY KEY,
  keyword_id varchar(8) not null REFERENCES Keywords(keyword_id),
  post_title varchar (50) NOT NULL,
  post_content TEXT NOT NULL,
  post_likes SMALLINT NOT NULL,
  user_id varchar(8) not null REFERENCES Users(user_id)

);

CREATE TABLE IF NOT EXISTS Comments (
  comment_id varchar(8) PRIMARY KEY,
  comment_content TEXT NOT NULL,
  comment_likes SMALLINT NOT NULL,
  user_id varchar(8) NOT NULL REFERENCES Users(user_id),
  post_id varchar(8) NOT NULL REFERENCES Posts(post_id),
  reply_id varchar(8) REFERENCES Comments(comment_id)
);

CREATE TABLE IF NOT EXISTS Reports_Posts (
  report_post_id varchar(8) PRIMARY KEY,
  report_count SMALLINT NOT NULL,
  user_id varchar(8) NOT  NULL REFERENCES Users(user_id),
  post_id varchar(8) NOT NULL REFERENCES Posts(post_id)
);

CREATE TABLE IF NOT EXISTS Reports_Comments (
  report_comment_id varchar(8) PRIMARY KEY,
  report_count SMALLINT NOT NULL,
  comment_id varchar(8) NOT NULL REFERENCES Comments(comment_id)
);

/* 
Try to create a Keyword table
*/
CREATE TABLE IF NOT EXISTS Keywords (
  keyword_id varchar(8) NOT NULL,
  keyword_1 varchar(30) NOT NULL,
  keyword_2 varchar(30) NOT NULL,
  keyword_3 varchar(30) NOT NULL,
  keyword_4 varchar(30) NOT NULL,
  keyword_5 varchar(30) NOT NULL,
);
