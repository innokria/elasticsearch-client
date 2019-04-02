# elasticsearch-client
# make call to aws elastic search apis through nodejs 
Use the elasticsearch-js client with Amazon ES

- npm install --save http-aws-es aws-sdk elasticsearch
- add your aws credentials
- run "node server.js" 
- ignore my node_module folder which is checked in


- An ElasticSearch cluster can contain multiple Indices (databases), which in turn contain multiple Types (tables). These types hold multiple Documents (rows), and each document has Properties (columns).


## cheatsheet on DB opertaions in ES (copied from internet )

// 1. Create index
	initIndex: function(req, res, indexName){

	    elasticClient.indices.create({
	        index: indexName
	    }).then(function (resp) {
	        // console.log(resp);
	        res.status(200)
	        return res.json(resp)
	    }, function (err) {
	        // console.log(err.message);
	        res.status(500)
	        return res.json(err)
	    });
	},
	
	// 2. Check if index exists
	indexExists: function(req, res, indexName){
	    elasticClient.indices.exists({
	        index: indexName
	    }).then(function (resp) {
	        // console.log(resp);
	        res.status(200);
	        return res.json(resp)
	    }, function (err) {
	        // console.log(err.message);
	        res.status(500)
	        return res.json(err)
	    });
	},

	// 3.  Preparing index and its mapping
	initMapping: function(req, res, indexName, docType, payload){

	    elasticClient.indices.putMapping({
	        index: indexName,
	        type: docType,
	        body: payload
	    }).then(function (resp) {
	        res.status(200);
	        return res.json(resp)
	    }, function (err) {
	        res.status(500)
	        return res.json(err)
	    });
	},

	// 4. Add/Update a document
	addDocument: function(req, res, indexName, _id, docType, payload){
	    elasticClient.index({
	        index: indexName,
	        type: docType,
	        id: _id,
	        body: payload
	    }).then(function (resp) {
	        // console.log(resp);
	        res.status(200);
	        return res.json(resp)
	    }, function (err) {
	        // console.log(err.message);
	        res.status(500)
	        return res.json(err)
	    });
	},



	// 5. Update a document
	updateDocument: function(req, res, index, _id, docType, payload){
		elasticClient.update({
		  index: index,
		  type: docType,
		  id: _id,
		  body: payload
		}, function (err, resp) {
		  	if(err) return res.json(err);
		  	return res.json(resp);
		})
	},

	// 6. Search
	search: function(req, res, indexName, docType, payload){
		elasticClient.search({
	        index: indexName,
	        type: docType,
	        body: payload
	    }).then(function (resp) {
	        console.log(resp);
	        return res.json(resp)
	    }, function (err) {
	        console.log(err.message);
	        return res.json(err.message)
	    });
	},


	/*
	 *	[xxxxxxxxxxxxxxxxx=-----  DANGER AREA [RESTRICTED USE] -----=xxxxxxxxxxxxxxxxxxxxx]
	 */

	 // Delete a document from an index
	deleteDocument: function(req, res, index, _id, docType){
		elasticClient.delete({
		    index: index,
			type: docType,
			id: _id,
		}, function(err, resp) {
		    if (err) return res.json(err);
		    return res.json(resp);
		});
	},

	// Delete all
	deleteAll: function(req, res){
		elasticClient.indices.delete({
		    index: '_all'
		}, function(err, resp) {

		    if (err) {
		        console.error(err.message);
		    } else {
		        console.log('Indexes have been deleted!', resp);
		        return res.json(resp)
		    }
		});
	},
