const helloWorldController = require('./helloWorldController')

test('getHome should return correct message', () => {
  const req = {}
  const res = { send: jest.fn() }

  helloWorldController.getHome(req, res)

  expect(res.send).toHaveBeenCalledWith('Hello World from Controller and Nik!')
})
