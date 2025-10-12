exports.getHome = (req, res) => {
  res.send('Hello World from Controller and Nik!')
}

exports.nameGreeting = (request, response) => {
  const timeStamp = new Date().toISOString()
  try {
    const userName = (request.query.name || '').trim()
    if (userName) {
      if (userName.length === 1) {
        return response.json({
          message:
            'Name is too short, please provide name with at least two characters.',
          timestamp: timeStamp,
          requestedName: userName,
          success: false,
          status: 400,
        })
      }
      if (!/^[a-zA-Z- ]+$/.test(userName)) {
        return response.json({
          message: 'Name contains invalid characters, please check your name.',
          timestamp: timeStamp,
          requestedName: userName,
          success: false,
          status: 400,
        })
      }
      const firstLetter = userName.charAt(0).toLocaleUpperCase()
      const restOfName = userName.slice(1)

      return response.json({
        message: `Hello ${firstLetter}${restOfName}!`,
        timestamp: timeStamp,
        requestedName: userName,
        success: true,
        status: 200,
      })
    } else {
      return response.json({
        message: 'Hello unknown user :)',
        timestamp: timeStamp,
        requestedName: "User name hasn't been provided, please provide a name.",
        success: false,
        status: 400,
      })
    }
  } catch (error) {
    return response.json({
      message: 'User name is not valid',
      timestamp: timeStamp,
      success: false,
      status: 500,
    })
    console.error(error)
  }
}
