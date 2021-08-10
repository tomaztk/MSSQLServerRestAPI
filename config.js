
var config = {
  production: {
     driver: 'msnodesqlv8',
     connectionString: 'Driver=SQL Server Native Client 11.0;Server=sntk\mssqlserver2019_PROD;Database=APITest;Trusted_Connection=yes'
     },
  development: {
     driver: 'msnodesqlv8',
     connectionString: 'Driver=SQL Server Native Client 11.0;Server=sntk\mssqlserver2019_DEV;Database=APITest;Trusted_Connection=yes'
     },
   sandbox: {
      driver: 'msnodesqlv8',
      connectionString: 'Driver=SQL Server Native Client 11.0;Server=sntk\mssqlserver2019_SANDBOX;Database=APITest;Trusted_Connection=yes'
      },
   QA: {
      driver: 'msnodesqlv8',
      connectionString: 'Driver=SQL Server Native Client 11.0;Server=sntk\mssqlserver2019_QA;Database=APITest;Trusted_Connection=yes'
      },
   UAT: {
         driver: 'msnodesqlv8',
         connectionString: 'Driver=SQL Server Native Client 11.0;Server=sntk\mssqlserver2019_UAT;Database=APITest;Trusted_Connection=yes'
         }
 
};
module.exports = config;

