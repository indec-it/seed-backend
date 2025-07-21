export default {
  '/api/examples': {
    get: {
      summary: 'Get all examples',
      description: 'Retrieve a list of all examples',
      tags: ['Examples'],
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {type: 'string'},
                    name: {type: 'string'},
                    description: {type: 'string'}
                  }
                }
              }
            }
          }
        }
      }
    },
    post: {
      summary: 'Create a new example',
      description: 'Create a new example entry',
      tags: ['Examples'],
      security: [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {type: 'string'},
                description: {type: 'string'}
              },
              required: ['name']
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Example created successfully'
        }
      }
    }
  },
  '/api/examples/{id}': {
    get: {
      summary: 'Get example by ID',
      description: 'Retrieve a specific example by its ID',
      tags: ['Examples'],
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {type: 'string'}
        }
      ],
      responses: {
        200: {
          description: 'Successful response'
        },
        404: {
          description: 'Example not found'
        }
      }
    },
    put: {
      summary: 'Update example',
      description: 'Update an existing example',
      tags: ['Examples'],
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {type: 'string'}
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {type: 'string'},
                description: {type: 'string'}
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Example updated successfully'
        },
        404: {
          description: 'Example not found'
        }
      }
    },
    delete: {
      summary: 'Delete example',
      description: 'Delete an example by ID',
      tags: ['Examples'],
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {type: 'string'}
        }
      ],
      responses: {
        204: {
          description: 'Example deleted successfully'
        },
        404: {
          description: 'Example not found'
        }
      }
    }
  }
};
