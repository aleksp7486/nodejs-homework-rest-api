const { loginUserController } = require('../controllers/userController');
const service = require('../services/userService');
jest.mock('../services/userService', () => ({
  loginUser: jest.fn(),
}));

describe('loginUserController', () => {
  const mockReq = {
    body: {
      email: 'test@example.com',
      password: 'password123',
    },
  };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a 200 status code', async () => {
    service.loginUser.mockResolvedValue({
      token: 'abc123',
      user: {
        email: 'test@example.com',
        subscription: 'basic',
      },
    });

    await loginUserController(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it('should return a token in the response', async () => {
    service.loginUser.mockResolvedValue({
      token: 'abc123',
      user: {
        email: 'test@example.com',
        subscription: 'basic',
      },
    });

    await loginUserController(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });

  it('should return a user object with email and subscription fields of type string in the response', async () => {
    service.loginUser.mockResolvedValue({
      token: 'abc123',
      subscription: 'basic',
    });

    await loginUserController(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        user: {
          email: expect.any(String),
          subscription: expect.any(String),
        },
      }),
    );
  });
});
