const helloWorldController = require('./helloWorldController')

test('getHome should return correct message', () => {
  const req = {}
  const res = { send: jest.fn() }

  helloWorldController.getHome(req, res)

  expect(res.send).toHaveBeenCalledWith('Hello World from Controller and Nik!')
})

test('nameGreeting should return correct response with name starting with capital N', () => {
  const req = { query: { name: 'nik' } }
  const res = { json: jest.fn() }

  helloWorldController.nameGreeting(req, res)

  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: 'Hello Nik!',
      requestedName: 'nik',
      success: true,
      status: 200,
    })
  )
})

test('nameGreeting should return error for one character name', () => {
  const req = { query: { name: 'n' } }
  const res = { json: jest.fn() }

  helloWorldController.nameGreeting(req, res)

  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: expect.stringContaining('Name is too short'),
      requestedName: 'n',
      success: false,
      status: 400,
    })
  )
})

test('nameGreeting should return error for invalid characters', () => {
  const req = { query: { name: 'Nik><#' } }
  const res = { json: jest.fn() }

  helloWorldController.nameGreeting(req, res)

  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: expect.stringContaining('Name contains invalid characters'),
      requestedName: 'Nik><#',
      success: false,
      status: 400,
    })
  )
})

test('nameGreeting should allow names with spaces and hyphens', () => {
  const req = { query: { name: 'Mary-Jane Smith' } }
  const res = { json: jest.fn() }

  helloWorldController.nameGreeting(req, res)

  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: 'Hello Mary-Jane Smith!',
      requestedName: 'Mary-Jane Smith',
      success: true,
      status: 200,
    })
  )
})

test('nameGreeting should return error when no name is provided', () => {
  const req = { query: { name: '' } }
  const res = { json: jest.fn() }

  helloWorldController.nameGreeting(req, res)

  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: expect.stringContaining('unknown user'),
      requestedName: expect.stringContaining('provide a name'),
      success: false,
      status: 400,
    })
  )
})
