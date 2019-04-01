const AWS = require('aws-sdk')
const elasticsearch = require('elasticsearch')
const awsHttpClient = require('http-aws-es')



const client = elasticsearch.Client({
    hosts: ['host'],
    connectionClass: require('http-aws-es'),
    awsConfig: new AWS.Config({
        accessKeyId: 'AKID', secretAccessKey: 'SECRET', region: 'us-west-2'
    })
});

// create database name gov
client.indices.create({  
    index: 'gov'
  },function(err,resp,status) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("create",resp);
    }
  });