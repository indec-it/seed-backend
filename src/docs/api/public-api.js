export default {
  '/public-api/login': {
    post: {
      summary: 'User login',
      description: 'Authenticate user with username and password',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  description: 'User username'
                },
                password: {
                  type: 'string',
                  description: 'User password'
                }
              },
              required: ['username', 'password']
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true
                  },
                  token: {
                    type: 'string',
                    description: 'Authentication token'
                  },
                  user: {
                    type: 'object',
                    description: 'User information'
                  }
                }
              }
            }
          }
        },
        401: {
          description: 'Invalid credentials'
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  },
  '/public-api/session': {
    post: {
      summary: 'Validate session token',
      description: 'Validate an authentication token and return user information',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  description: 'Authentication token to validate'
                }
              },
              required: ['token']
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Token validation result',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    description: 'Whether the token is valid'
                  },
                  user: {
                    type: 'object',
                    description: 'User information if token is valid'
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Invalid request'
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  }
};
