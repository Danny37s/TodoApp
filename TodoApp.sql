CREATE DATABASE TodoApp
GO 

USE TodoApp
GO

CREATE TABLE dbo.Users (
	UserID int identity(1,1) PRIMARY KEY,
	Username varchar(255) not null,
	Passwd varchar(255) not null,
	Active int not null
)
GO

CREATE TABLE dbo.Task (
	TaskID int PRIMARY KEY,
	UserID int references dbo.Users(UserID) not null,
	TaskTitle varchar(255) not null,
	TaskDescription text not null,
	ScheduledDate DateTime,
	CreatedDate Datetime not null,
	CompletedDate DateTime,
	Important int not null
)
GO