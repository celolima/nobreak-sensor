## Descritivo das tabelas do Projeto de Sensor de NoBreak

### TB_Device
* Id
* Cod
* Desc
* Key

### TB_Parameter
* Id
* Cod
* Desc

### TB_Device_Param
* Id
* Fk_Device
* FK_Param

### TB_Log
* Id
* FK_Dev_Param
* Value
* Data
