const express = require('express')
const cors = require('cors')
const app = express()
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

app.set('port', 3000)

app.use(express.json())
app.use(cors())

app.get('/api/fitness/:id', function (req, res) {
	console.log(`${req.params.id}`)
	MongoClient.connect(url, function (err, conn) {
		if (err) throw err;
		var dbo = conn.db("storage-01");
		const criteria = { _id: new mongo.ObjectID(req.params.id) }
		dbo.collection('fitness').find(criteria).toArray(function (err, result) {
			if (err) console.log(err)
			else {
				res.type('application/json')
				res.status(200)
				res.json(result)
			}
		})
	})
})

app.get('/api/fitness', function (req, res) {
	if (Object.keys(req.query).length == 0) {
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			const dbo = db.db("storage-01");
			dbo.collection("fitness").find({}).toArray(function (err, result) {
				if (err) throw err;
				db.close()
				res.type('application/json')
				res.status(200)
				res.send(result)
			});
		});
	}
})

app.post('/api/fitness', function (req, res) {
	console.log(req.body)
	MongoClient.connect(url, function (err, conn) {
		if (err) throw err;
		var dbo = conn.db("storage-01");
		const myObj = new Object()
		myObj.ExerciseType = req.body.ExerciseType
		myObj.desc = req.body.desc
		myObj.duration = req.body.duration
		const dt_fields = req.body.date.split('-')
		myObj.date = new Date(dt_fields[0], dt_fields[1] - 1, dt_fields[2])
		dbo.collection("fitness").insertOne(myObj, function (err, result) {
			if (err) console.log(err)
			else {
				res.type('application/json')
				res.status(200)
				res.json(result)
			}
		})
	})
})

app.put('/api/fitness/:id', function (req, res) {
	const id = req.params.id
	const criteria = { _id: new mongo.ObjectID(req.params.id) }
	const newValues = req.body
	MongoClient.connect(url, function (err, conn) {
		if (err) throw err;
		const dbo = conn.db("storage-01");
		dbo.collection('fitness').updateOne(criteria, { $set: newValues }, function (err, result) {
			if (err) console.log(err)
			else {
				res.type('application/json')
				res.status(200)
				res.json(result)
			}
		})
	})
})

app.listen(app.get('port'), function () {
	console.log('Express server started on http://localhost:' + app.get('port'));
	console.log(__dirname)
})
