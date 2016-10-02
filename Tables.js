var AWS = require('aws-sdk');

AWS.config.update({
	region: "us-west-2",
	endpoint: "htttp://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
	TableName : "Rooms",
	KeySchema: [ 
		{AttributeName: "code", KeyType: "RANGE"}, 
		{AttributeName: "users", KeyType: "RANGE"}
	],
	AttributeDefinition: [
	{AttributeName: "code", AttributeType: "S"},
	{AttributeName: "users", AttributeType: "S"}
	],
	ProvisionedThroughout:
	{
		ReadCapacityUnits: 10,
		WriteCapacityUnits: 10
	}
};

dynamodb.createTable(params, function(err, data){
	if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
	}
});