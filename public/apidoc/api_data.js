define({ "api": [
  {
    "type": "post",
    "url": "/auth/signin",
    "title": "Sign In",
    "name": "Signin",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"test@gmail.com\",\n  \"password\": \"test123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Signin token</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n      \"firstName\": \"admin\",\n      \"lastName\": \"admin\",\n      \"email\": \"test@gmail.com\",\n      \"type\": \"admin\"\n  },\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJhZG1pbiIsImxhc3ROYW1lIjoiYWRtaW4iLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwidHlwZSI6InN0dWRlbnQiLCJpYXQiOjE1NDgyNTA3OTUsImV4cCI6MTU0ODg1NTU5NX0.kHn_wwhlgNyR7-CI0S57GDElALmJ9YWxnkRUZ1pga0s\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "User specified doesn't exist",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/auth/authController.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/signout",
    "title": "Sign Out",
    "name": "Signout",
    "group": "Auth",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/auth/authController.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth/signup",
    "title": "Create User",
    "name": "Signup",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>User type [admin, student, prof]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "major",
            "description": "<p>User major</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"test@gmail\",\n  \"password\": \"test123\",\n  \"type\": \"admin\",\n  \"firstName\": \"admin\",\n  \"lastName\": \"admin\",\n  \"major\": \"Prepa-A1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 Created",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "User already exists",
          "content": "HTTP/1.1 208 Already Reported",
          "type": "json"
        },
        {
          "title": "Major specified doesn't exist",
          "content": "HTTP/1.1 406 Not Acceptable",
          "type": "json"
        },
        {
          "title": "User info cannot be empty",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/auth/authController.js",
    "groupTitle": "Auth"
  },
  {
    "type": "delete",
    "url": "/corrections/:id",
    "title": "Delete Correction",
    "group": "Corrections",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Correction id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Deleted (No Content)",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Correction id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/correction/correctionController.js",
    "groupTitle": "Corrections",
    "name": "DeleteCorrectionsId"
  },
  {
    "type": "get",
    "url": "/corrections",
    "title": "Get all corrections",
    "group": "Corrections",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Correction id</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "approved",
            "description": "<p>Whether the correction document is approved by the admin</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Correction score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Correction title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "filePath",
            "description": "<p>Correction file path</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Correction Owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "document",
            "description": "<p>Correction document</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Update's date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_at",
            "description": "<p>Register's date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n    {\n        \"approved\": false,\n        \"score\": 0,\n        \"_id\": \"5c41e6b8f6417937d0a24ace\",\n        \"title\": \"correction ex 2016\",\n        \"filePath\": \"/uploads/jdhgfhd.jpg\",\n        \"user\": {\n            \"type\": \"student\",\n            \"_id\": \"5c2426542a7e2f361896f812\",\n            \"email\": \"mohamed@test.com\",\n            \"hashedPassword\": \"$2b$10$7iOFilgwRN/qoXNA5KJuVuyiofVXvjmVEcn0MVivS4F7ne.vI9MWq\",\n            \"firstName\": \"mohamed\",\n            \"lastName\": \"mohamed\",\n            \"major\": \"5c1fb346e28363333004f02c\",\n        },\n        \"document\": {\n            \"type\": \"EX\",\n            \"semestre\": 1,\n            \"approved\": false,\n            \"NBDowloads\": 0,\n            \"session\": \"Principale\",\n            \"corrections\": [\n                \"5c41ccd20dbd0934ccc59a0e\",\n                \"5c41cd34dfe31425c014f85e\"\n            ],\n            \"_id\": \"5c41df5e0000d416fc5158fd\",\n            \"title\": \"EXAlgo\",\n            \"filePath\": \"/uploads/hjkhdfkjl.pdf\",\n            \"major\": \"5c3f8bee091f3c3290ac10b2\",\n            \"subject\": \"5c3f8bed091f3c3290ac1083\",\n            \"year\": 2016,\n            \"user\": \"5c2426542a7e2f361896f812\",\n            \"profName\": \"Sami Ashour\"\n        },\n        \"createdAt\": \"2019-01-18T14:46:16.612Z\",\n        \"updatedAt\": \"2019-01-18T14:46:16.612Z\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/correction/correctionController.js",
    "groupTitle": "Corrections",
    "name": "GetCorrections"
  },
  {
    "type": "get",
    "url": "/corrections/:id",
    "title": "Get one correction",
    "group": "Corrections",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Correction id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Correction id</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "approved",
            "description": "<p>Whether the correction document is approved by the admin</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>Correction score</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Correction title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "filePath",
            "description": "<p>Correction file path</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Correction Owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "document",
            "description": "<p>Correction document</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n   {\n    \"approved\": false,\n    \"score\": 0,\n    \"_id\": \"5c41e6cdf6417937d0a24acf\",\n    \"title\": \"correction ds 2018\",\n    \"filePath\": \"/uploads/jdhgfhd.jpg\",\n    \"user\": {\n        \"type\": \"student\",\n        \"_id\": \"5c2426542a7e2f361896f812\",\n        \"email\": \"mohamed@test.com\",\n        \"firstName\": \"mohamed\",\n        \"lastName\": \"mohamed\"\n    },\n    \"document\": {\n        \"type\": \"EX\",\n        \"semestre\": 1,\n        \"NBDowloads\": 0,\n        \"session\": \"Principale\",\n        \"corrections\": [\n            \"5c41ccd20dbd0934ccc59a0e\",\n            \"5c41cd34dfe31425c014f85e\"\n        ],\n        \"_id\": \"5c41df5e0000d416fc5158fd\",\n        \"title\": \"EXAlgo\",\n        \"filePath\": \"/uploads/hjkhdfkjl.pdf\",\n        \"major\": \"5c3f8bee091f3c3290ac10b2\",\n        \"subject\": \"5c3f8bed091f3c3290ac1083\",\n        \"year\": 2016,\n        \"user\": \"5c2426542a7e2f361896f812\",\n        \"profName\": \"Sami Ashour\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Correction id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/correction/correctionController.js",
    "groupTitle": "Corrections",
    "name": "GetCorrectionsId"
  },
  {
    "type": "post",
    "url": "/corrections",
    "title": "Create Correction",
    "group": "Corrections",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Correction title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filePath",
            "description": "<p>Correction document file url</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Correction owner (id)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "document",
            "description": "<p>Correction document (id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"title\": \"correction ds analyse 2018\",\n  \"filePath\": \"/uploads/jdhgfhd.jpg\",\n  \"user\": \"5c2426542a7e2f361896f812\",\n  \"document\": \"5c41df5e0000d416fc5158fd\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 Created",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Correction already exists",
          "content": "HTTP/1.1 208 Already Reported",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/correction/correctionController.js",
    "groupTitle": "Corrections",
    "name": "PostCorrections"
  },
  {
    "type": "put",
    "url": "/corrections/:id",
    "title": "Update Correction",
    "group": "Corrections",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Correction id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Correction title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filePath",
            "description": "<p>Correction document file url</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Correction owner (id)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "document",
            "description": "<p>Correction document (id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": \"5c41e6cdf6417937d0a24acf\",\n  \"title\": \"correction ds analyse 2018\",\n  \"filePath\": \"/uploads/jdhgfhd.jpg\",\n  \"user\": \"5c2426542a7e2f361896f812\",\n  \"document\": \"5c41df5e0000d416fc5158fd\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 Updated",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Correction id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/correction/correctionController.js",
    "groupTitle": "Corrections",
    "name": "PutCorrectionsId"
  },
  {
    "type": "delete",
    "url": "/documents",
    "title": "Delete a document",
    "group": "Documents",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>documents id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Deleted (No Content)",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Document id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/document/documentController.js",
    "groupTitle": "Documents",
    "name": "DeleteDocuments"
  },
  {
    "type": "get",
    "url": "/documents",
    "title": "Get all documents",
    "group": "Documents",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Document id</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "approved",
            "description": "<p>Whether the document is approved by the admin</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Document type (DS, Ex, ...)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "semestre",
            "description": "<p>Document semester (1 or 2)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Document title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>Document session (Principale, Controle)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "filePath",
            "description": "<p>Document file path</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Document Owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "corrections",
            "description": "<p>Document corrections (a table of objects)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "major",
            "description": "<p>Document major</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "subject",
            "description": "<p>Document subject</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>Document year</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Update's date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_at",
            "description": "<p>Register's date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n     {\n        \"type\": \"DS\",\n        \"semestre\": 1,\n        \"approved\": false,\n        \"session\": \"Principale\",\n        \"corrections\": [],\n        \"_id\": \"5c41ae2c6c942e059c10737d\",\n        \"title\": \"dsAlgo\",\n        \"filePath\": \"/uploads/hjkhdfkjl.pdf\",\n        \"major\": {\n            \"_id\": \"5c3f8bee091f3c3290ac10b2\",\n            \"name\": \"FIA1\",\n            \"description\": \"1ere année Formation d'Ingénieur\"\n        },\n        \"subject\": {\n            \"semestre\": 1,\n            \"documents\": [],\n            \"_id\": \"5c41b2d82383c111b4ffad1d\",\n            \"name\": \"Algorithmique et structures de données\",\n            \"createdAt\": \"2019-01-18T11:04:56.121Z\",\n            \"updatedAt\": \"2019-01-18T11:04:56.121Z\",\n            \"__v\": 0\n        },\n        \"year\": 2016,\n        \"user\": {\n            \"type\": \"student\",\n            \"deleted\": false,\n            \"_id\": \"5c2426542a7e2f361896f812\",\n            \"email\": \"mohamed@test.com\",\n            \"firstName\": \"mohamed\",\n            \"lastName\": \"mohamed\",\n            \"__v\": 0\n        },\n        \"createdAt\": \"2019-01-18T10:45:00.529Z\",\n        \"updatedAt\": \"2019-01-18T10:45:00.529Z\"\n    }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/document/documentController.js",
    "groupTitle": "Documents",
    "name": "GetDocuments"
  },
  {
    "type": "get",
    "url": "/documents/corrections/:id",
    "title": "Get document's corrections",
    "group": "Documents",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Document id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n    {\n        \"approved\": false,\n        \"verifiedByProf\": false,\n        \"score\": 0,\n        \"_id\": \"5c619b28afaefd38f005ae77\",\n        \"title\": \"correction ds analyse 2018\",\n        \"filePath\": \"/uploads/jdhgfhd.jpg\",\n        \"user\": \"5c6199dff134a742549ed42c\",\n        \"createdAt\": \"2019-02-11T15:56:24.786Z\",\n        \"updatedAt\": \"2019-02-11T15:56:24.786Z\"\n    },\n    {\n        \"approved\": false,\n        \"verifiedByProf\": false,\n        \"score\": 0,\n        \"_id\": \"5c619b28afaefd38f005ae76\",\n        \"title\": \"correction ds algo 2015\",\n        \"filePath\": \"/uploads/jdhgfhd.jpg\",\n        \"user\": \"5c6199dff134a742549ed42c\",\n        \"createdAt\": \"2019-02-11T15:56:24.786Z\",\n        \"updatedAt\": \"2019-02-11T15:56:24.786Z\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Document id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/document/documentController.js",
    "groupTitle": "Documents",
    "name": "GetDocumentsCorrectionsId"
  },
  {
    "type": "get",
    "url": "/documents/:id",
    "title": "Get one document",
    "group": "Documents",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Document id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>Document id</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "approved",
            "description": "<p>Whether the document is approved by the admin</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Document type (DS, Ex, ...)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "semestre",
            "description": "<p>Document semester (1 or 2)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Document title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>Document session (Principale, Controle)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "filePath",
            "description": "<p>Document file path</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Document Owner</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "corrections",
            "description": "<p>Document corrections (a table of objects)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "major",
            "description": "<p>Document major</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "subject",
            "description": "<p>Document subject</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>Document year</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Update's date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created_at",
            "description": "<p>Register's date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n    \"type\": \"DS\",\n    \"semestre\": 1,\n    \"approved\": false,\n    \"session\": \"Principale\",\n    \"corrections\": [],\n    \"_id\": \"5c41ae2c6c942e059c10737d\",\n    \"title\": \"dsAlgo\",\n    \"filePath\": \"/uploads/hjkhdfkjl.pdf\",\n    \"major\": {\n        \"_id\": \"5c3f8bee091f3c3290ac10b2\",\n        \"name\": \"FIA1\",\n        \"description\": \"1ere année Formation d'Ingénieur\"\n    },\n    \"subject\": {\n        \"semestre\": 1,\n        \"documents\": [],\n        \"_id\": \"5c41b2d82383c111b4ffad1d\",\n        \"name\": \"Algorithmique et structures de données\",\n        \"createdAt\": \"2019-01-18T11:04:56.121Z\",\n        \"updatedAt\": \"2019-01-18T11:04:56.121Z\"\n    },\n    \"year\": 2016,\n    \"user\": {\n        \"type\": \"student\",\n        \"deleted\": false,\n        \"_id\": \"5c2426542a7e2f361896f812\",\n        \"email\": \"mohamed@test.com\",\n        \"firstName\": \"mohamed\",\n        \"lastName\": \"mohamed\"\n    },\n    \"createdAt\": \"2019-01-18T10:45:00.529Z\",\n    \"updatedAt\": \"2019-01-18T10:45:00.529Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Document id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/document/documentController.js",
    "groupTitle": "Documents",
    "name": "GetDocumentsId"
  },
  {
    "type": "post",
    "url": "/documents",
    "title": "Create a document",
    "group": "Documents",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Document title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filePath",
            "description": "<p>Document document file url</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Document owner (id)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "year",
            "description": "<p>Document year</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Document type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "semestre",
            "description": "<p>Document semestre</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "major",
            "description": "<p>Document major (id)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Document subject (id)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>Document session</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profName",
            "description": "<p>Document professor</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "corrections",
            "description": "<p>Document corrections</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"title\": \"ds analyse 2018\",\n  \"type\": \"DS\",\n  \"filePath\": \"/uploads/jdhgfhd.jpg\",\n  \"user\": \"5c2426542a7e2f361896f812\",\n  \"major\": \"5c41df5e0000d416fc5158fd\",\n  \"subject\": \"5c41b2d82383c111b4ffad1a\",\n  \"year\": \"2017\",\n  \"semestre\": \"1\",\n  \"profName\": \"profX\",\n  \"session\": \"Controle\",\n  \"corrections\": [\"5c41ccd20dbd0934ccc59a0e\",\"5c41cd34dfe31425c014f85e\"]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n    \"type\": \"DS\",\n    \"semestre\": 1,\n    \"approved\": false,\n    \"session\": \"Controle\",\n    \"corrections\": [],\n    \"_id\": \"5c4f8ce1fcf8b220f82633dd\",\n    \"title\": \"ds analyse 2018\",\n    \"filePath\": \"/uploads/jdhgfhd.jpg\",\n    \"major\": \"5c41df5e0000d416fc5158fd\",\n    \"subject\": \"5c41b2d82383c111b4ffad1a\",\n    \"year\": 2017,\n    \"user\": \"5c2426542a7e2f361896f812\",\n    \"profName\": \"profX\",\n    \"corrections\" : [ \n        ObjectId(\"5c41ccd20dbd0934ccc59a0e\"), \n        ObjectId(\"5c41cd34dfe31425c014f85e\")\n    ],\n    \"createdAt\": \"2019-01-28T23:14:41.584Z\",\n    \"updatedAt\": \"2019-01-28T23:14:41.584Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Document already exists",
          "content": "HTTP/1.1 208 Already Reported",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/document/documentController.js",
    "groupTitle": "Documents",
    "name": "PostDocuments"
  },
  {
    "type": "post",
    "url": "/documents/:id/corrections",
    "title": "Add corrections to a document",
    "group": "Documents",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "corrections",
            "description": "<p>Document corrections</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"corrections\": [\"5c41ccd20dbd0934ccc59a0e\",\"5c41cd34dfe31425c014f85e\"]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Document id or Corrections cannot be empty",
          "content": "HTTP/1.1 400 Already Reported",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/document/documentController.js",
    "groupTitle": "Documents",
    "name": "PostDocumentsIdCorrections"
  },
  {
    "type": "put",
    "url": "/documents",
    "title": "Update a document",
    "group": "Documents",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>documents id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Document title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "filePath",
            "description": "<p>Document document file url</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Document owner (id)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "year",
            "description": "<p>Document year</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Document type</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "semestre",
            "description": "<p>Document semestre</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "major",
            "description": "<p>Document major (id)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Document subject (id)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "session",
            "description": "<p>Document session</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profName",
            "description": "<p>Document professor</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "corrections",
            "description": "<p>Document corrections</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n        \"id\": \"5c4f8da2fcf8b220f82633de\",\n     \"title\": \"ds analyse 2018\",\n     \"type\": \"DS\",\n     \"filePath\": \"/uploads/jdhgfhd.jpg\",\n     \"user\": \"5c2426542a7e2f361896f812\",\n     \"major\": \"5c41df5e0000d416fc5158fd\",\n     \"subject\": \"5c41b2d82383c111b4ffad1a\",\n     \"year\": \"2017\",\n     \"semestre\": \"1\",\n     \"profName\": \"profX\",\n     \"session\": \"Controle\",\n     \"corrections\": [\"5c41ccd20dbd0934ccc59a0e\",\"5c41cd34dfe31425c014f85e\"]\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Updated",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Document id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/document/documentController.js",
    "groupTitle": "Documents",
    "name": "PutDocuments"
  },
  {
    "type": "post",
    "url": "/documents/upload",
    "title": "Upload a file",
    "group": "Documents",
    "name": "Upload",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "files",
            "description": "<p>File to upload</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Uploaded",
          "content": "   HTTP/1.1 200 OK\n[ \"http://igc.tn:3005/api/uploads/upload_5cbbe9e1efb762ef40c52a9c9610e5b0.jpg\" ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Find Error",
          "content": "HTTP/1.1 444 Request canceled",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/uploadService.js",
    "groupTitle": "Documents"
  },
  {
    "type": "delete",
    "url": "/formations",
    "title": "Delete a formation",
    "group": "Formations",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>formation id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Deleted (No Content)",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Formation id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/formation/formationController.js",
    "groupTitle": "Formations",
    "name": "DeleteFormations"
  },
  {
    "type": "get",
    "url": "/formations",
    "title": "Get all formations",
    "group": "Formations",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"5c5080a2bb95dc104b9934ae\",\n        \"name\": \"LaGm\",\n        \"description\": \"Licence Appliquée en Génie Mécanique\",\n        \"createdAt\": \"2019-01-29T16:34:42.202Z\",\n        \"updatedAt\": \"2019-01-29T16:34:42.202Z\"\n    },\n    {\n        \"_id\": \"5c5080a2bb95dc104b9934b3\",\n        \"name\": \"LFSI\",\n        \"description\": \"Licence Fondamentale en Sciences de l'informatique\",\n        \"createdAt\": \"2019-01-29T16:34:42.203Z\",\n        \"updatedAt\": \"2019-01-29T16:34:42.203Z\"\n    },\n    {\n        \"_id\": \"5c5080a2bb95dc104b9934b2\",\n        \"name\": \"LaEm\",\n        \"description\": \"Licence Appliquée en Electromécanique\",\n        \"createdAt\": \"2019-01-29T16:34:42.203Z\",\n        \"updatedAt\": \"2019-01-29T16:34:42.203Z\"\n    }\n  ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/formation/formationController.js",
    "groupTitle": "Formations",
    "name": "GetFormations"
  },
  {
    "type": "get",
    "url": "/formations/:id",
    "title": "Get one formation",
    "group": "Formations",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n    \"_id\": \"5c5080a2bb95dc104b9934ac\",\n    \"name\": \"Prepa\",\n    \"description\": \"Préparatoire\",\n    \"createdAt\": \"2019-01-29T16:34:42.202Z\",\n    \"updatedAt\": \"2019-01-29T16:34:42.202Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Formation id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/formation/formationController.js",
    "groupTitle": "Formations",
    "name": "GetFormationsId"
  },
  {
    "type": "post",
    "url": "/formations",
    "title": "Create a formation",
    "group": "Formations",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Formation name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Formation description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"LFSI\",\n  \"description\": \"Licence Fondamentale en Sciences de l'informatique\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n        \"_id\": \"5c5080a2bb95dc104b9934b3\",\n        \"name\": \"LFSI\",\n        \"description\": \"Licence Fondamentale en Sciences de l'informatique\",\n        \"createdAt\": \"2019-01-29T16:34:42.203Z\",\n        \"updatedAt\": \"2019-01-29T16:34:42.203Z\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Formation already exists",
          "content": "HTTP/1.1 208 Already Reported",
          "type": "json"
        },
        {
          "title": "Name and Description are required",
          "content": "HTTP/1.1 400 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/formation/formationController.js",
    "groupTitle": "Formations",
    "name": "PostFormations"
  },
  {
    "type": "put",
    "url": "/formations",
    "title": "Update a formation",
    "group": "Formations",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>formation id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Formation name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Formation description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\": \"LFSI\",\n     \"description\": \"Licence Fondamentale en Sciences de l'informatique\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Updated",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Name and Description are required",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Formation not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/formation/formationController.js",
    "groupTitle": "Formations",
    "name": "PutFormations"
  },
  {
    "type": "delete",
    "url": "/levels",
    "title": "Delete a level",
    "group": "Levels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>level id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Deleted (No Content)",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Level id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/level/levelController.js",
    "groupTitle": "Levels",
    "name": "DeleteLevels"
  },
  {
    "type": "get",
    "url": "/levels",
    "title": "Get all levels",
    "group": "Levels",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"5c3e21856891a52950272390\",\n        \"name\": \"A2\",\n        \"description\": \"2eme année\",\n        \"createdAt\": \"2019-01-15T18:08:05.242Z\",\n        \"updatedAt\": \"2019-01-15T18:08:05.242Z\"\n    },\n    {\n        \"_id\": \"5c3e21856891a5295027238f\",\n        \"name\": \"A1\",\n        \"description\": \"1ere année\",\n        \"createdAt\": \"2019-01-15T18:08:05.241Z\",\n        \"updatedAt\": \"2019-01-15T18:08:05.241Z\"\n    },\n    {\n        \"_id\": \"5c3e21856891a52950272391\",\n        \"name\": \"A3\",\n        \"description\": \"3eme année\",\n        \"createdAt\": \"2019-01-15T18:08:05.242Z\",\n        \"updatedAt\": \"2019-01-15T18:08:05.242Z\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/level/levelController.js",
    "groupTitle": "Levels",
    "name": "GetLevels"
  },
  {
    "type": "get",
    "url": "/levels/:id",
    "title": "Get one level",
    "group": "Levels",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n    \"_id\": \"5c3e21856891a52950272390\",\n    \"name\": \"A2\",\n    \"description\": \"2eme année\",\n    \"createdAt\": \"2019-01-15T18:08:05.242Z\",\n    \"updatedAt\": \"2019-01-15T18:08:05.242Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Level id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/level/levelController.js",
    "groupTitle": "Levels",
    "name": "GetLevelsId"
  },
  {
    "type": "post",
    "url": "/levels",
    "title": "Create a level",
    "group": "Levels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Level name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Level description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"A1\",\n  \"description\": \"1ere année\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n        \"_id\": \"5c5080a2bb95dc104b9934b3\",\n        \"name\": \"A1\",\n        \"description\": \"1ere année\",\n        \"createdAt\": \"2019-01-29T16:34:42.203Z\",\n        \"updatedAt\": \"2019-01-29T16:34:42.203Z\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Level already exists",
          "content": "HTTP/1.1 208 Already Reported",
          "type": "json"
        },
        {
          "title": "Name and Description are required",
          "content": "HTTP/1.1 400 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/level/levelController.js",
    "groupTitle": "Levels",
    "name": "PostLevels"
  },
  {
    "type": "put",
    "url": "/levels",
    "title": "Update a level",
    "group": "Levels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Level id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Level name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Level description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\": \"A2\",\n        \"description\": \"2eme année\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Updated",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Name and Description are required",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Level not found",
          "content": "HTTP/1.1 401 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/level/levelController.js",
    "groupTitle": "Levels",
    "name": "PutLevels"
  },
  {
    "type": "delete",
    "url": "/majors/:id",
    "title": "Delete a major",
    "group": "Majors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Major id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Deleted (No Content)",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Major id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/major/majorController.js",
    "groupTitle": "Majors",
    "name": "DeleteMajorsId"
  },
  {
    "type": "get",
    "url": "/major",
    "title": "Get one major by name",
    "group": "Majors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Major name</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n    \"_id\": \"5c6199dff134a742549ed42a\",\n    \"name\": \"FIA2-II\",\n    \"description\": \"2eme année Formation d'Ingénieur: Informatique Industrielle\",\n    \"subjects\": [\n        {\n            \"semestre\": 1,\n            \"documents\": [],\n            \"_id\": \"5c6199dff134a742549ed40d\",\n            \"name\": \"Sécurité des réseaux\",\n            \"createdAt\": \"2019-02-11T15:50:55.588Z\",\n            \"updatedAt\": \"2019-02-11T15:50:55.588Z\",\n        }\n    ],\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Major name cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/major/majorController.js",
    "groupTitle": "Majors",
    "name": "GetMajor"
  },
  {
    "type": "get",
    "url": "/majors",
    "title": "Get all majors",
    "group": "Majors",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n    {\n        \"subjects\": [\n            {\n                \"semestre\": 1,\n                \"documents\": [],\n                \"_id\": \"5c3e3542077225388404c0df\",\n                \"name\": \"Fondements des systèmes d'exploitation\",\n                \"createdAt\": \"2019-01-15T19:32:18.964Z\",\n                \"updatedAt\": \"2019-01-15T19:32:18.964Z\"\n            },\n            {\n                \"semestre\": 1,\n                \"documents\": [],\n                \"_id\": \"5c3e3542077225388404c0e0\",\n                \"name\": \"Création d'entreprises et innovation\",\n                \"createdAt\": \"2019-01-15T19:32:18.964Z\",\n                \"updatedAt\": \"2019-01-15T19:32:18.964Z\"\n            }\n        ],\n        \"_id\": \"5c50a4d00712811970128921\",\n        \"name\": \"FIA1\",\n        \"description\": \"1ere année Formation d'Ingénieur\",\n        \"formation\": {\n            \"_id\": \"5c3e21d118e59b3ce40c808b\",\n            \"name\": \"FI\",\n            \"description\": \"Fomation d'Ingénieur\",\n            \"createdAt\": \"2019-01-15T18:09:21.969Z\",\n            \"updatedAt\": \"2019-01-15T18:09:21.969Z\"\n        },\n        \"level\": {\n            \"_id\": \"5c3e21856891a52950272390\",\n            \"name\": \"A2\",\n            \"description\": \"2eme année\",\n            \"createdAt\": \"2019-01-15T18:08:05.242Z\",\n            \"updatedAt\": \"2019-01-15T18:08:05.242Z\"\n        }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/major/majorController.js",
    "groupTitle": "Majors",
    "name": "GetMajors"
  },
  {
    "type": "get",
    "url": "/majors/:id",
    "title": "Get one major",
    "group": "Majors",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n    \"subjects\": [\n        {\n            \"semestre\": 1,\n            \"documents\": [],\n            \"_id\": \"5c3e3542077225388404c0ed\",\n            \"name\": \"Programmation Web\",\n            \"createdAt\": \"2019-01-15T19:32:18.964Z\",\n            \"updatedAt\": \"2019-01-15T19:32:18.964Z\"\n        }\n    ],\n    \"_id\": \"5c50a4d00712811970128922\",\n    \"name\": \"FIA2-II\",\n    \"description\": \"2eme année Formation d'Ingénieur: Informatique Industrielle\",\n    \"formation\": {\n        \"_id\": \"5c3e21d118e59b3ce40c808b\",\n        \"name\": \"FI\",\n        \"description\": \"Fomation d'Ingénieur\",\n        \"createdAt\": \"2019-01-15T18:09:21.969Z\",\n        \"updatedAt\": \"2019-01-15T18:09:21.969Z\"\n    },\n    \"level\": {\n        \"_id\": \"5c3e21856891a5295027238f\",\n        \"name\": \"A1\",\n        \"description\": \"1ere année\",\n        \"createdAt\": \"2019-01-15T18:08:05.241Z\",\n        \"updatedAt\": \"2019-01-15T18:08:05.241Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Major id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/major/majorController.js",
    "groupTitle": "Majors",
    "name": "GetMajorsId"
  },
  {
    "type": "post",
    "url": "/majors",
    "title": "Create a major",
    "group": "Majors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Major name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Major description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "formation",
            "description": "<p>Major formation(id)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "level",
            "description": "<p>Major level(id)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "section",
            "description": "<p>Major section(id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"FIA1\",\n  \"description\": \"1ere années formation d'ingénieur\",\n  \"formation\": \"5c3e21d118e59b3ce40c808b\",\n  \"level\": \"5c3e21856891a52950272390\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n     \"name\": \"FIA1\",\n     \"description\": \"1ere années formation d'ingénieur\",\n     \"formation\": \"5c3e21d118e59b3ce40c808b\",\n     \"level\": \"5c3e21856891a52950272390\",\n     \"createdAt\": \"2019-01-29T16:34:42.203Z\",\n        \"updatedAt\": \"2019-01-29T16:34:42.203Z\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Major already exists",
          "content": "HTTP/1.1 208 Already Reported",
          "type": "json"
        },
        {
          "title": "Name, Description, Formation, Level and Section are required",
          "content": "HTTP/1.1 400 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/major/majorController.js",
    "groupTitle": "Majors",
    "name": "PostMajors"
  },
  {
    "type": "post",
    "url": "/majors/:id/subjects",
    "title": "Add subjects to a major",
    "group": "Majors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Major subject(id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"subject\" : \"5c3e3542077225388404c0d8\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 Added",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Major or Subject not found",
          "content": "HTTP/1.1 400 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/major/majorController.js",
    "groupTitle": "Majors",
    "name": "PostMajorsIdSubjects"
  },
  {
    "type": "put",
    "url": "/majors/:id",
    "title": "Update a major",
    "group": "Majors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Major id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Major name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Major description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "formation",
            "description": "<p>Major formation</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "level",
            "description": "<p>Major description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "section",
            "description": "<p>Major description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\": \"FIA1\",\n     \"description\": \"1ere années formation d'ingénieur\",\n     \"formation\": \"5c3e21d118e59b3ce40c808b\",\n     \"level\": \"5c3e21856891a52950272390\"\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Updated",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Name and Description are required",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Major not found",
          "content": "HTTP/1.1 401 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/major/majorController.js",
    "groupTitle": "Majors",
    "name": "PutMajorsId"
  },
  {
    "type": "get",
    "url": "/search",
    "title": "Search all documents",
    "group": "Search",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Search query</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"algo\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 201 OK\n[\n     {\n        \"type\": \"DS\",\n        \"semestre\": 1,\n        \"approved\": false,\n        \"session\": \"Principale\",\n        \"corrections\": [],\n        \"_id\": \"5c41ae2c6c942e059c10737d\",\n        \"title\": \"dsAlgo\",\n        \"filePath\": \"/uploads/hjkhdfkjl.pdf\",\n        \"major\": \"5c3f8bee091f3c3290ac10b2\",\n        \"subject\": \"5c41b2d82383c111b4ffad1d\",\n        \"year\": 2016,\n        \"user\": \"5c2426542a7e2f361896f812\",\n        \"createdAt\": \"2019-01-18T10:45:00.529Z\",\n        \"updatedAt\": \"2019-01-18T10:45:00.529Z\"\n    },\n    {\n        \"type\": \"EX\",\n        \"semestre\": 1,\n        \"approved\": false,\n        \"session\": \"Principale\",\n        \"corrections\": [\n            \"5c41ccd20dbd0934ccc59a0e\",\n            \"5c41cd34dfe31425c014f85e\"\n        ],\n        \"_id\": \"5c41df5e0000d416fc5158fd\",\n        \"title\": \"EXAlgo\",\n        \"filePath\": \"/uploads/hjkhdfkjl.pdf\",\n        \"major\": \"5c3f8bee091f3c3290ac10b2\",\n        \"subject\": \"5c3f8bed091f3c3290ac1083\",\n        \"year\": 2016,\n        \"user\": \"5c2426542a7e2f361896f812\",\n        \"profName\": \"Sami Ashour\",\n        \"createdAt\": \"2019-01-18T14:14:54.344Z\",\n        \"updatedAt\": \"2019-01-18T14:14:54.344Z\"\n    }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Name param cannot be empty",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/search/searchController.js",
    "groupTitle": "Search",
    "name": "GetSearch"
  },
  {
    "type": "delete",
    "url": "/sections",
    "title": "Delete a section",
    "group": "Sections",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Section id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Deleted (No Content)",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Section id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/section/sectionController.js",
    "groupTitle": "Sections",
    "name": "DeleteSections"
  },
  {
    "type": "get",
    "url": "/section/:id",
    "title": "Get one Section",
    "group": "Sections",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n    \"_id\": \"5c3e21bf08b93b3754f05779\",\n    \"name\": \"II\",\n    \"description\": \"Informatique Industrielle\",\n    \"createdAt\": \"2019-01-15T18:09:03.601Z\",\n    \"updatedAt\": \"2019-01-15T18:09:03.601Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Section id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/section/sectionController.js",
    "groupTitle": "Sections",
    "name": "GetSectionId"
  },
  {
    "type": "get",
    "url": "/sections",
    "title": "Get all sections",
    "group": "Sections",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"5c3e21bf08b93b3754f05779\",\n        \"name\": \"II\",\n        \"description\": \"Informatique Industrielle\",\n        \"createdAt\": \"2019-01-15T18:09:03.601Z\",\n        \"updatedAt\": \"2019-01-15T18:09:03.601Z\"\n    },\n    {\n        \"_id\": \"5c3e21bf08b93b3754f05778\",\n        \"name\": \"GL\",\n        \"description\": \"Génie Logicielle\",\n        \"createdAt\": \"2019-01-15T18:09:03.600Z\",\n        \"updatedAt\": \"2019-01-15T18:09:03.600Z\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/section/sectionController.js",
    "groupTitle": "Sections",
    "name": "GetSections"
  },
  {
    "type": "post",
    "url": "/sections",
    "title": "Create a section",
    "group": "Sections",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Section name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Section description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\" : \"II\",\n     \"description\" : \"Informatique Industrielle\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n        \"_id\": \"5c5080a2bb95dc104b9934b3\",\n        \"name\" : \"II\",\n        \"description\" : \"Informatique Industrielle\",\n        \"createdAt\": \"2019-01-29T16:34:42.203Z\",\n        \"updatedAt\": \"2019-01-29T16:34:42.203Z\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Section already exists",
          "content": "HTTP/1.1 208 Already Reported",
          "type": "json"
        },
        {
          "title": "Name and Description are required",
          "content": "HTTP/1.1 400 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/section/sectionController.js",
    "groupTitle": "Sections",
    "name": "PostSections"
  },
  {
    "type": "put",
    "url": "/sections",
    "title": "Update a Section",
    "group": "Sections",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Section id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Section name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Section description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\": \"II\",\n        \"description\": \"Informatique Industrielle\",\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Updated",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Name and Description are required",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Section not found",
          "content": "HTTP/1.1 401 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/section/sectionController.js",
    "groupTitle": "Sections",
    "name": "PutSections"
  },
  {
    "type": "delete",
    "url": "/subjects",
    "title": "Delete a subject",
    "group": "Subjects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Subject id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Deleted (No Content)",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Ssubject id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/subject/subjectController.js",
    "groupTitle": "Subjects",
    "name": "DeleteSubjects"
  },
  {
    "type": "get",
    "url": "/subjects",
    "title": "Get all subjects",
    "group": "Subjects",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n    {\n        \"semestre\": 1,\n        \"documents\": [],\n        \"_id\": \"5c3e3542077225388404c0d8\",\n        \"name\": \"Mathématiques discrètes\",\n        \"createdAt\": \"2019-01-15T19:32:18.963Z\",\n        \"updatedAt\": \"2019-01-15T19:32:18.963Z\"\n    },\n    {\n        \"semestre\": 1,\n        \"documents\": [],\n        \"_id\": \"5c3e3542077225388404c0d9\",\n        \"name\": \"Probabilité et Statistiques\",\n        \"createdAt\": \"2019-01-15T19:32:18.963Z\",\n        \"updatedAt\": \"2019-01-15T19:32:18.963Z\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/subject/subjectController.js",
    "groupTitle": "Subjects",
    "name": "GetSubjects"
  },
  {
    "type": "get",
    "url": "/subjects/:id",
    "title": "Get one Subject",
    "group": "Subjects",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n    \"semestre\": 1,\n    \"documents\": [],\n    \"_id\": \"5c3e3542077225388404c0d8\",\n    \"name\": \"Mathématiques discrètes\",\n    \"createdAt\": \"2019-01-15T19:32:18.963Z\",\n    \"updatedAt\": \"2019-01-15T19:32:18.963Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Subject id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/subject/subjectController.js",
    "groupTitle": "Subjects",
    "name": "GetSubjectsId"
  },
  {
    "type": "post",
    "url": "/subjects",
    "title": "Create a subject",
    "group": "Subjects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Subject name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "semestre",
            "description": "<p>Subject semestre(1 or 2)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "major",
            "description": "<p>Subject major(id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"semestre\": 1,\n     \"name\": \"Mathématiques discrètes\",\n     \"major\": \"5c50a4d00712811970128921\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n        \"_id\": \"5c5080a2bb95dc104b9934b3\",\n        \"semestre\": 1,\n        \"name\": \"Mathématiques discrètes\",\n        \"major\": \"5c50a4d00712811970128921\"\n        \"createdAt\": \"2019-01-29T16:34:42.203Z\",\n        \"updatedAt\": \"2019-01-29T16:34:42.203Z\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Subject already exists",
          "content": "HTTP/1.1 208 Already Reported",
          "type": "json"
        },
        {
          "title": "Name, Description and Major are required",
          "content": "HTTP/1.1 400 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/subject/subjectController.js",
    "groupTitle": "Subjects",
    "name": "PostSubjects"
  },
  {
    "type": "put",
    "url": "/subjects",
    "title": "Update a Subject",
    "group": "Subjects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>Subject id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Subject name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Subject description</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\": \"II\",\n        \"description\": \"Informatique Industrielle\",\n   }",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Updated",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Name and Description are required",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Subject not found",
          "content": "HTTP/1.1 401 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/subject/subjectController.js",
    "groupTitle": "Subjects",
    "name": "PutSubjects"
  },
  {
    "type": "delete",
    "url": "/user",
    "title": "Delete User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 Deleted (No Content)",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "User id cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/user/userController.js",
    "groupTitle": "Users",
    "name": "DeleteUser"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get all users",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n    {\n        \"type\": \"student\",\n        \"deleted\": false,\n        \"_id\": \"5c2426542a7e2f361896f812\",\n        \"email\": \"mohamed@test.com\",\n        \"firstName\": \"mohamed\",\n        \"lastName\": \"mohamed\",\n        \"major\": null\n    },\n    {\n        \"type\": \"admin\",\n        \"deleted\": false,\n        \"_id\": \"5c2426692a7e2f361896f813\",\n        \"email\": \"ghada@test.com\",\n        \"firstName\": \"ghada\",\n        \"lastName\": \"ghada\",\n        \"major\": null\n    },\n    {\n        \"type\": \"student\",\n        \"deleted\": false,\n        \"_id\": \"5c43b2e3ab4ef507440f942c\",\n        \"email\": \"test@gmail.com\",\n        \"firstName\": \"admin\",\n        \"lastName\": \"admin\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/user/userController.js",
    "groupTitle": "Users",
    "name": "GetUsers"
  },
  {
    "type": "get",
    "url": "/users/:type",
    "title": "Get all users by type",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>User type (student or prof)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n [\n    {\n        \"type\": \"student\",\n        \"deleted\": false,\n        \"_id\": \"5c2426542a7e2f361896f812\",\n        \"email\": \"mohamed@test.com\",\n        \"firstName\": \"mohamed\",\n        \"lastName\": \"mohamed\",\n        \"major\": null\n    },\n    {\n        \"type\": \"student\",\n        \"deleted\": false,\n        \"_id\": \"5c43b2e3ab4ef507440f942c\",\n        \"email\": \"test@gmail.com\",\n        \"firstName\": \"admin\",\n        \"lastName\": \"admin\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Type param cannot be empty",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/user/userController.js",
    "groupTitle": "Users",
    "name": "GetUsersType"
  },
  {
    "type": "put",
    "url": "/users",
    "title": "Update user info",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>User type(prof, student)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>User profile picture file path</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "major",
            "description": "<p>User major (id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"test@test.com\",\n  \"password\": \"test123\",\n  \"type\": \"student\",\n  \"firstName\": \"foulen\",\n  \"lastName\": \"Ben foulen\",\n  \"avatar\": \"/uploads/5c41df5e0000d416fc5158fd.jpg\",\n  \"major\": \"5c3f8bee091f3c3290ac10b3\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          },
          {
            "group": "Header",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/x-www-form-urlencoded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 Updated",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Find error",
          "content": "HTTP/1.1 400 Not Found",
          "type": "json"
        },
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/user/userController.js",
    "groupTitle": "Users",
    "name": "PutUsers"
  }
] });
