import { Account } from '/Account.js'

document.getElementById('CREATEGOAL').addEventListener('click', function (event) {
	console.log('The Create button was clicked...')

	// 1. Retrieve user's inputs
	const Exertype = document.getElementById('ExerciseType').value
	const Exerdesc = document.getElementById('desc').value
	const Exerduration = document.getElementById('duration').value
	const Exerdate = document.getElementById('date').value

	// 2. Prepare and send REST request
	console.log('Sending REST request to save object ...')
	const xhr = new XMLHttpRequest()
	xhr.open('POST', 'http://localhost:3000/api/fitness')
	const stObj = new Account(ExerciseType, desc, duration, new Date(date))

	// Set the Content-Type 
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.responseType = 'json'
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
			window.location.href = 'http://localhost:4020/'
		}
	}
	// JSON encoding 
	const jsonStr = JSON.stringify(stObj)
	xhr.send(jsonStr)

})