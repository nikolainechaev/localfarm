const helloWorldController = require('./helloWorldController')

test('getHome should return correct message', () => {
  const req = {}
  const res = { send: jest.fn() }

  helloWorldController.getHome(req, res)

  expect(res.send).toHaveBeenCalledWith('Hello World from Controller and Nik!')
})

test('nameGreeting should return correct response with name starting with capital N', () => {
  const req = { params: { name: 'nik' } }
  const res = { send: jest.fn() }

  helloWorldController.nameGreeting(req, res)

  expect(res.send).toHaveBeenCalledWith('Hello Nik!')
})

test('nameGreeting should return correct response when name has only one character', () => {
  const req = { params: { name: 'n' } }
  const res = {
    send: jest.fn(),
    status: jest.fn().mockReturnThis(),
  }

  helloWorldController.nameGreeting(req, res)

  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.send).toHaveBeenCalledWith('User name is not valid')
})

test('nameGreeting should return correct response when no parameter is provided', () => {
  const req = { params: { name: '' } }
  const res = {
    send: jest.fn(),
    status: jest.fn(),
  }

  helloWorldController.nameGreeting(req, res)

  expect(res.send).toHaveBeenCalledWith('Hello unknown user :)')
})
