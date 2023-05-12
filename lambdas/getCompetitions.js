const Responses = require('./API_Responses');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async event => {
    console.log('event', event);

    const params = {
        Item: {
            date: Date.now(),
            message: "I love your website!"
        },

        TableName : 'ondebrief-dev'
    };

    docClient.put(params, function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    });

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from the path' });
    }

    let ID = event.pathParameters.ID;

    if (data[ID]) {
        // return the data
        return Responses._200(data[ID]);
    }

    //failed as ID not in the data
    return Responses._400({ message: 'no ID in data' });
};

const data = {
    1234: { name: 'Anna Jones', age: 25, job: 'journalist' },
    7893: { name: 'Chris Smith', age: 52, job: 'teacher' },
    5132: { name: 'Tom Hague', age: 23, job: 'plasterer' },
};