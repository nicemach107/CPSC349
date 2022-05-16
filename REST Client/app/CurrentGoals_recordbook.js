const xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:3000/api/sfitness')
xhr.responseType = 'json'
xhr.onreadystatechange = function () {
	if (this.readyState == 4 && this.status == 200) {
		console.log(this.response)
		const body = document.getElementsByTagName('body')[0]
		for (const s of this.response) {
			body.appendChild(document.createElement('br'))
			let c = document.createElement('label')
			let txt = document.createTextNode(s.ExerciseType)
			c.appendChild(txt)
			body.appendChild(c)
			c = document.createElement('a')
			c.href = '#'
			c.text = s.desc
			body.appendChild(c)
			c = document.createElement('a')
			c.href = '#'
			c.text = s.duration
			body.appendChild(c)
			c = document.createElement('a')
			c.href = '#'
			c.text = s.date
			body.appendChild(c)
		}
	}
}
xhr.send()
