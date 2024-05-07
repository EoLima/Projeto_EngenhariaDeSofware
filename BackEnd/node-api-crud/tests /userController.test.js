const { createUser } = require('../src/controllers/userController');

describe('User Controller', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      // Mock dos dados da solicitação
      const req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '123456789',
          password: 'Password123'
        }
      };

      // Mock da resposta
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Chama a função createUser
      await createUser(req, res);

      // Verifica se o status da resposta foi definido como 201 (Created)
      expect(res.status).toHaveBeenCalledWith(201);

      // Verifica se a função json foi chamada com o novo usuário criado
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        id: expect.any(Number),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123456789',
      }));
    });
  });
});
