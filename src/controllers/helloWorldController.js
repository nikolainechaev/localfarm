exports.getHome = (req, res) => {
  res.send('Hello World from Controller and Nik!')
}

exports.nameGreeting = (request, response) => {
  try {
    const userName = request.params.name
    if (userName) {
      if (userName.length === 1) {
        throw new Error('Name is too short')
      }
      const firstLetter = userName.charAt(0).toLocaleUpperCase()
      const restOfName = userName.slice(1)
      response.send(`Hello ${firstLetter}${restOfName}!`)
    } else {
      response.send('Hello unknown user :)')
    }
  } catch (error) {
    response.status(500).send('User name is not valid')
    console.error(error)
  }
}
