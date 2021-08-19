USE [APItest]

DROP TABLE IF EXISTS dbo.Iris;

CREATE TABLE dbo.Iris
(ID INT IDENTITY(1,1) NOT NULL
,Sepal_length DECIMAL(10,2)
,Sepal_width	 DECIMAL(10,2)
,Petal_length	 DECIMAL(10,2)
,Petal_width	DECIMAL(10,2)
,Species VARCHAR(20)
)

-- Populate sample data
INSERT INTO dbo.Iris
EXECUTE sp_execute_external_Script
 @language = N'R'
,@script = N'OutputDataSet <- iris'
--WITH result sets((
-- Sepal_length DECIMAL(10,2)
--,Sepal_width	 DECIMAL(10,2)
--,Petal_length	 DECIMAL(10,2)
--,Petal_width	DECIMAL(10,2)
--,Species VARCHAR(20)
--))



--- Table for the Model
DROP TABLE IF EXISTS dbo.iris_model;
CREATE TABLE dbo.iris_model (
                 model_name VARCHAR(30) NOT NULL DEFAULT('default model') PRIMARY KEY
                ,model VARBINARY(MAX) NOT NULL
				,model_created DATETIME NOT NULL DEFAULT(GETDATE())
);


DROP PROCEDURE IF EXISTS Create_iris_model;

CREATE OR ALTER PROCEDURE Create_iris_model (@trained_model varbinary(max) OUTPUT)
AS
BEGIN
    EXECUTE sp_execute_external_script
      @language = N'R'
    , @script = N'
        require("RevoScaleR");
		iris_train_data$Species = factor(iris_train_data$Species);
        model_dtree <- rxDTree(Species ~ Sepal_length + Sepal_width + Petal_length + Petal_width, data = iris_train_data)
        trained_model <- as.raw(serialize(model_dtree, connection=NULL));'

    , @input_data_1 = N'SELECT [Species],[Sepal_length],[Sepal_width],[Petal_length],[Petal_width] FROM [APItest].[dbo].[Iris]'
    , @input_data_1_name = N'iris_train_data'
    , @params = N'@trained_model varbinary(max) OUTPUT'
    , @trained_model = @trained_model OUTPUT;
END;
GO


--save the model
TRUNCATE TABLE [dbo].[iris_model];

DECLARE @model VARBINARY(MAX);
EXEC Create_iris_model @model OUTPUT;
INSERT INTO dbo.iris_model (model_name, model) VALUES('rxDTree', @model);
SELECT * FROM dbo.iris_model;




-- Procedure to get predicted value based on input variables
DROP PROCEDURE IF EXISTS Predict_iris;

CREATE OR ALTER PROCEDURE Predict_iris (@model VARCHAR(100),@q NVARCHAR(MAX))
AS
BEGIN
    DECLARE @rx_model VARBINARY(MAX) = (SELECT model FROM iris_model WHERE model_name = @model);

    EXECUTE sp_execute_external_script
        @language = N'R'
        , @script = N'
            require("RevoScaleR");
            iris_set = InputDataSet;
		    iris_model = unserialize(rx_model);
            iris_predictions = rxPredict(iris_model, iris_set, type = "class");'
                , @input_data_1 = @q
                , @output_data_1_name = N'iris_predictions'
                , @params = N'@rx_model varbinary(max)'
                , @rx_model = @rx_model
                WITH RESULT SETS ((
						iris_predictions VARCHAR(20)
						));

END;
GO



EXEC dbo.Predict_iris 
		@model = 'rxDTree'
	   ,@q ='SELECT CAST( 4.45 AS DECIMAL(10,2)) AS Sepal_length, 
			CAST(2.94 AS DECIMAL(10,2)) AS Sepal_width, 
			CAST(1.34 AS DECIMAL(10,2)) AS Petal_length, 
			CAST(0.41 AS DECIMAL(10,2)) AS Petal_width';
GO
