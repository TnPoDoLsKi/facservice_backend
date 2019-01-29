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
    "url": "/correction",
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
    "name": "DeleteCorrection"
  },
  {
    "type": "get",
    "url": "/correction/:id",
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
    "name": "GetCorrectionId"
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
    "type": "post",
    "url": "/correction",
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
    "name": "PostCorrection"
  },
  {
    "type": "put",
    "url": "/correction",
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
    "name": "PutCorrection"
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
    "title": "Upload a document or a correction",
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
    "filename": "src/components/document/documentController.js",
    "groupTitle": "Documents"
  },
  {
    "type": "post",
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
    "name": "PostSearch"
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
