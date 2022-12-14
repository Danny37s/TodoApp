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

Insert into Users Values('An Ngo', 'anngo123', 1)
Insert into Users Values('Danh Ho', 'danhho123', 1)
Insert into Users Values('Son Phan', 'sonphan123', 1)

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

Insert into dbo.Task Values (1, 1, 'rua chen', 'rua sach chen bat', '2022-12-05', '2022-12-06', '2022-12-09', 1)
Insert into dbo.Task Values (2, 3, 'hoc Tieng Anh', 'hoc TA', NULL, '2022-12-06 10:25:38', NULL, 1)
Insert into dbo.Task Values (3, 4, 'Lau Don Nha Cua', 'don nha', NULL, '2022-12-07 19:22:05', NULL, 1)
Insert into dbo.Task Values (4, 4, 'Da bong', 'the thao', NULL, '2022-12-04 09:25:32', NULL, 1)
Insert into dbo.Task Values (5, 5, 'Lam bai tap', 'lam bai', NULL, '2022-12-08 15:10:15', NULL, 1)
Insert into dbo.Task Values (6, 3, 'Di du lich', 'Giai tri dau oc', NULL, '2022-12-05 09:39:58', NULL, 1)
Insert into dbo.Task Values (7, 3, 'Di lam toc', 'Lam dep', NULL, '2022-12-04 12:25:06', NULL, 1)
Insert into dbo.Task Values (8, 4, 'Rua xe', 'Rua xe cho sach', NULL, '2022-12-06 08:05:16', NULL, 1)
Insert into dbo.Task Values (9, 5, 'Danh dan', 'Luyen dan', NULL, '2022-12-06 07:09:15', NULL, 1)
Insert into dbo.Task Values (10, 5, 'Mua sam', 'Mua sam quan ao', NULL, '2022-12-06 19:15:02', NULL, 1)
Insert into dbo.Task Values (11, 3, 'Don dep nha cua', 'Don dep nha cua', NULL, '2022-12-03 15:06:23', NULL, 1)

GO
