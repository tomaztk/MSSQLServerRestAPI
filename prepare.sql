CREATE DATABASE [APItest]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'APItest', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER2019\MSSQL\DATA\APItest.mdf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'APItest_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER2019\MSSQL\DATA\APItest_log.ldf' , SIZE = 8192KB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [APItest] SET COMPATIBILITY_LEVEL = 150
GO

USE APItest;
GO

CREATE LOGIN tk123  
    WITH PASSWORD = 'tk123';  
GO  

-- Creates a database user for the login created above.  
CREATE USER tk123 FOR LOGIN tk123;  
GO  

CREATE USER [tk123] FROM LOGIN [sntk\tk123];
GO

USE APITest;

CREATE TABLE dbo.UsersAD
( ID INT IDENTITY(1,1) NOT NULL
,EmloyeeID INT 
,SamAccountName VARCHAR(100)
,DisplayName VARCHAR(200)
,Email VARCHAR(100)
)


INSERT INTO dbo.UsersAD (EmloyeeID, SamAccountName, DisplayName, Email)
          SELECT 21,'MichelH','Michel Houell','michelh@account.com'
UNION ALL SELECT 22,'NielT','Niel Ty','NielT@account.com'
UNION ALL SELECT 25,'ImmanuelK','Immanuel Kan','ImmanuelK@account.com'
UNION ALL SELECT 30,'BillG','Bill William Gate','BillG@account.com'



/* ---------------------------------------------------
*
* For Write Data
* Sample table (usersAD2) to test two input integers
* Sample table (TestChar) to test input as character
-------------------------------------------------- */
DROP TABLE IF EXISTS dbo.usersAD2
CREATE TABLE dbo.usersAD2 
(id INT IDENTITY(1,1) NOT NULL
,dateinserted DATETIME DEFAULT(getdate()) NOT NULL
,val INT
,val2 INT)


DROP TABLE IF EXISTS dbo.TestChar
CREATE TABLE dbo.TestChar
(id INT IDENTITY(1,1) NOT NULL
,tekst VARCHAR(100)
,ts DATETIME DEFAULT(getdate()) NOT NULL)


