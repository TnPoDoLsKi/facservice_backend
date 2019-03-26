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
          "content": "{\n  \"email\": \"test@gmail.com\",\n  \"password\": \"test1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n       \"firstName\": \"Wael\",\n       \"lastName\": \"Ben Taleb\",\n       \"major\": \"5c8265367e19d73dba8355a6\",\n       \"majorName\": \"FIA2-GL\",\n       \"token\": \"0fa1b8121408dd0266b61778650723338852a3b8de14f1005169b8637aef7707\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Not Authorized",
          "content": "HTTP/1.1 401 Not Authorized\nWrong password",
          "type": "json"
        },
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request\nWrong email address",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
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
    "url": "/auth/signout",
    "title": "Sign Out",
    "name": "Signout",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Not Authorized",
          "content": "HTTP/1.1 401 Not Authorized",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
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
    "title": "Signup",
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
            "description": "<p>User major (id)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"test@gmail\",\n  \"password\": \"test1234\",\n  \"firstName\": \"flen\",\n  \"lastName\": \"ben felten\",\n  \"major\": \"5c8269c447baab426f6cbcfc\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request\nemail already exist\nwrong major id",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
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
    "type": "get",
    "url": "/corrections/byDocument/:id",
    "title": "Get document's corrections",
    "group": "Corrections",
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
          "content": "   HTTP/1.1 200 OK\n [\n    {\n        \"status\": \"approved\",\n        \"verifiedByProf\": false,\n        \"score\": 0,\n        \"deleted\": false,\n        \"_id\": \"5c8826a5f9a4c66ce1eb1d5d\",\n        \"document\": \"5c87918f905e0b33f609b360\",\n        \"title\": \"corrigé de DS Physique 2014\",\n        \"user\": {\n            \"avatar\": \"https://igc.tn/img/portfolio/HC1-Prev.jpg\",\n            \"firstName\": \"Wael\",\n            \"lastName\": \"Ben Taleb\"\n        },\n        \"createdAt\": \"2019-03-12T21:37:41.572Z\",\n        \"updatedAt\": \"2019-03-12T22:40:30.601Z\",\n        \"__v\": 0\n    },\n    {\n        \"status\": \"approved\",\n        \"verifiedByProf\": false,\n        \"score\": 0,\n        \"deleted\": false,\n        \"_id\": \"5c88270ef9a4c66ce1eb1d5e\",\n        \"document\": \"5c87918f905e0b33f609b360\",\n        \"title\": \"corrigé de EX Analyse 2014 \",\n        \"user\": {\n            \"avatar\": \"https://igc.tn/img/portfolio/HC1-Prev.jpg\",\n            \"firstName\": \"Wael\",\n            \"lastName\": \"Ben Taleb\"\n        },\n        \"createdAt\": \"2019-03-12T21:39:26.070Z\",\n        \"updatedAt\": \"2019-03-12T22:26:16.867Z\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/correction/correctionController.js",
    "groupTitle": "Corrections",
    "name": "GetCorrectionsBydocumentId"
  },
  {
    "type": "post",
    "url": "/corrections",
    "title": "Create a correction",
    "group": "Corrections",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"filesStaging\": [\"https://igc.tn/img/portfolio/HC1-Prev.jpg\", \"https://igc.tn/img/portfolio/A2-Prev.jpg\"],\n  \"document\": \"5c41b2d82383c111b4ffad1a\",\n  \"description\": \"Correction Correction Correction Correction\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n     \"status\": \"pending\",\n     \"verifiedByProf\": false,\n     \"score\": 0,\n     \"_id\": \"5c88f1c4719c206b4524de83\",\n     \"deleted\": false,\n     \"document\": \"5c41b2d82383c111b4ffad1a\",\n     \"title\": \"corrigé de EX physique 2015\",\n     \"user\": \"5c8783b34a35cd28fa5bea3b\",\n     \"createdAt\": \"2019-03-13T12:04:20.911Z\",\n     \"updatedAt\": \"2019-03-13T12:04:20.911Z\",\n     \"__v\": 0\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Not Authorized",
          "content": "HTTP/1.1 401 Not Authorized",
          "type": "json"
        },
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request\nstatus must be 'pending', 'approved' or 'rejected'",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
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
    "type": "get",
    "url": "/documents/bySubject/:subjectId/byType/:type",
    "title": "Get documents by subject and type",
    "group": "Documents",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "subjectId",
            "description": "<p>Subject id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Document type (DS, EX, C, TP, TD)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n    {\n      \"type\": \"DS\",\n      \"status\": \"approved\",\n      \"NBDowloads\": 215,\n      \"session\": \"Rattrapage\",\n      \"hasCorrection\": true,\n      \"deleted\": false,\n      \"_id\": \"5c87918f905e0b33f609b360\",\n      \"filePath\": \"https://igc.tn/documents/file.pdf\",\n      \"subject\": \"5c8269c447baab426f6cbcfc\",\n      \"year\": 2014,\n      \"user\": {\n          \"avatar\": \"https://igc.tn/img/portfolio/HC1-Prev.jpg\",\n          \"firstName\": \"Wael\",\n          \"lastName\": \"Ben Taleb\"\n      },\n      \"title\": \"DS Francais 2014\",\n      \"createdAt\": \"2019-03-12T11:01:35.921Z\",\n      \"updatedAt\": \"2019-03-12T22:56:21.614Z\",\n      \"__v\": 0,\n      \"description\": \"DS Francais 2014 description\"\n    },\n    {\n      \"type\": \"DS\",\n      \"status\": \"approved\",\n      \"NBDowloads\": 215,\n      \"session\": \"Rattrapage\",\n      \"hasCorrection\": true,\n      \"deleted\": false,\n      \"_id\": \"5c87918f905e0b33f609b361\",\n      \"filePath\": \"https://igc.tn/documents/file.pdf\",\n      \"subject\": \"5c8269c447baab426f6cbcfc\",\n      \"year\": 2014,\n      \"user\": {\n          \"avatar\": \"https://igc.tn/img/portfolio/HC1-Prev.jpg\",\n          \"firstName\": \"Wael\",\n          \"lastName\": \"Ben Taleb\"\n      },\n      \"title\": \"DS Anglais 2014\",\n      \"createdAt\": \"2019-03-12T11:01:35.921Z\",\n      \"updatedAt\": \"2019-03-12T22:56:21.614Z\",\n      \"__v\": 0,\n      \"description\": \"DS Anglais 2014 description\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request\ndocument type must be in 'DS', 'EX', 'C', 'TD', 'TP'\nwrong subject id",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/document/documentController.js",
    "groupTitle": "Documents",
    "name": "GetDocumentsBysubjectSubjectidBytypeType"
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
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n    \"type\": \"DS\",\n    \"status\": \"approved\",\n    \"NBDowloads\": 215,\n    \"session\": \"Rattrapage\",\n    \"hasCorrection\": true,\n    \"deleted\": false,\n    \"_id\": \"5c87918f905e0b33f609b360\",\n    \"filePath\": \"https://igc.tn/documents/file.pdf\",\n    \"subject\": \"5c8269c447baab426f6cbcfc\",\n    \"year\": 2014,\n    \"user\": {\n        \"avatar\": \"https://igc.tn/img/portfolio/HC1-Prev.jpg\",\n        \"firstName\": \"Wael\",\n        \"lastName\": \"Ben Taleb\"\n    },\n    \"title\": \"DS Francais 2014\",\n    \"createdAt\": \"2019-03-12T11:01:35.921Z\",\n    \"updatedAt\": \"2019-03-12T22:56:21.614Z\",\n    \"__v\": 0,\n    \"description\": \"DS Francais 2014 description\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
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
    "type": "get",
    "url": "/documents/search/:query",
    "title": "Search all documents",
    "group": "Documents",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>search query (query param)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>document type must be in 'DS', 'EX', 'C', 'TD', 'TP' (query param)</p>"
          },
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "majorID",
            "description": "<p>major id (query param)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 201 OK\n[\n    {\n      \"type\": \"DS\",\n      \"status\": \"approved\",\n      \"NBDowloads\": 215,\n      \"session\": \"Rattrapage\",\n      \"hasCorrection\": true,\n      \"deleted\": false,\n      \"_id\": \"5c87918f905e0b33f609b360\",\n      \"filePath\": \"https://igc.tn/documents/file.pdf\",\n      \"subject\": \"5c8269c447baab426f6cbcfc\",\n      \"year\": 2014,\n      \"user\": {\n          \"avatar\": \"https://igc.tn/img/portfolio/HC1-Prev.jpg\",\n          \"firstName\": \"Wael\",\n          \"lastName\": \"Ben Taleb\"\n      },\n      \"majors\": [\n        {\n          \"_id\": \"5c8269c447baab426f6cbcfa\",\n          \"name\": \"FIA2-GL\"\n        },\n        {\n          \"_id\": \"5c8269c447baab426f6cbcfa\",\n          \"name\": \"FIA2-II\"\n        }\n      ],\n      \"title\": \"DS Francais 2014\",\n      \"createdAt\": \"2019-03-12T11:01:35.921Z\",\n      \"updatedAt\": \"2019-03-12T22:56:21.614Z\",\n      \"__v\": 0,\n      \"description\": \"DS Francais 2014 description\"\n    },\n    {\n      \"type\": \"DS\",\n      \"status\": \"approved\",\n      \"NBDowloads\": 215,\n      \"session\": \"Rattrapage\",\n      \"hasCorrection\": true,\n      \"deleted\": false,\n      \"_id\": \"5c87918f905e0b33f609b361\",\n      \"filePath\": \"https://igc.tn/documents/file.pdf\",\n      \"subject\": \"5c8269c447baab426f6cbcfc\",\n      \"year\": 2014,\n      \"user\": {\n          \"avatar\": \"https://igc.tn/img/portfolio/HC1-Prev.jpg\",\n          \"firstName\": \"Wael\",\n          \"lastName\": \"Ben Taleb\"\n      },\n      \"majors\": [{\n        \"_id\": \"5c8269c447baab426f6cbcfa\",\n        \"name\": \"FIA1\"\n      }],\n      \"title\": \"DS Anglais 2014\",\n      \"createdAt\": \"2019-03-12T11:01:35.921Z\",\n      \"updatedAt\": \"2019-03-12T22:56:21.614Z\",\n      \"__v\": 0,\n      \"description\": \"DS Anglais 2014 description\"\n    }\n]",
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
    "filename": "src/components/document/documentController.js",
    "groupTitle": "Documents",
    "name": "GetDocumentsSearchQuery"
  },
  {
    "type": "post",
    "url": "/documents",
    "title": "Create a document",
    "group": "Documents",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"type\": \"DS\", // document type must be in 'DS', 'EX', 'C', 'TD', 'TP'\n  \"session\": \"Rattrapage\" // document session must be in 'Principale', 'Rattrapage',\n  \"subject\": \"5c41b2d82383c111b4ffad1a\",\n  \"year\": \"2017\",\n  \"filesStaging\": [\"https://igc.tn/img/portfolio/HC1-Prev.jpg\", \"https://igc.tn/img/portfolio/A2-Prev.jpg\"],\n  \"description\": \"Good\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n    \"type\": \"DS\",  \n    \"status\": \"pending\",\n    \"NBDowloads\": 0,\n    \"session\": \"Rattrapage\",\n    \"hasCorrection\": false,\n    \"_id\": \"5c88f050737cb969e1f1cbda\",\n    \"deleted\": false,\n    \"subject\": \"5c41b2d82383c111b4ffad1a\",\n    \"year\": 2017,\n    \"user\": \"5c8783b34a35cd28fa5bea3b\",\n    \"title\": \"DS physique 2015\",\n    \"description\": \"Good\",\n    \"createdAt\": \"2019-03-13T11:58:08.713Z\",\n    \"updatedAt\": \"2019-03-13T11:58:08.713Z\",\n    \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Not Authorized",
          "content": "HTTP/1.1 401 Not Authorized",
          "type": "json"
        },
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request\ndocument type must be in 'DS', 'EX', 'C', 'TD', 'TP'\nwrong subject id\ndocument session must be in 'Principale', 'Rattrapage'",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
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
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Uploaded",
          "content": "   HTTP/1.1 200 OK\n[ \"http://igc.tn:3005/api/uploads/upload_5cbbe9e1efb762ef40c52a9c9610e5b0.jpg\", \"http://igc.tn:3005/api/uploads/upload_5cbbe9e1efb762ef40c52a9c9610e5b0.jpg\" ]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Not Authorized",
          "content": "HTTP/1.1 401 Not Authorized",
          "type": "json"
        },
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/services/uploadService.js",
    "groupTitle": "Documents"
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
          "content": "   HTTP/1.1 200 OK\n[\n    {\n        \"deleted\": false,\n        \"_id\": \"5c825dee263bbd33636897f4\",\n        \"name\": \"master\",\n        \"createdAt\": \"2019-03-08T12:19:58.723Z\",\n        \"updatedAt\": \"2019-03-08T12:29:24.168Z\",\n        \"__v\": 0\n    },\n    {\n        \"deleted\": false,\n        \"_id\": \"5c8263677c8e2f4013c6986f\",\n        \"name\": \"prepa\",\n        \"createdAt\": \"2019-03-08T12:19:58.723Z\",\n        \"updatedAt\": \"2019-03-08T12:29:24.168Z\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Internal Server Error",
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
    "url": "/levels/byFormation/:formation",
    "title": "Get levels by formation",
    "group": "Levels",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "formation",
            "description": "<p>formation id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200 OK\n[\n  {\n      \"deleted\": false,\n      \"_id\": \"5c826194157314398aa8c05e\",\n      \"description\": \"level description\",\n      \"name\": \"2er\",\n      \"formation\": \"5c8263677c8e2f4013c6986f\",\n      \"createdAt\": \"2019-03-08T12:35:32.637Z\",\n      \"updatedAt\": \"2019-03-08T12:44:37.914Z\",\n      \"__v\": 0\n  },\n  {\n      \"deleted\": false,\n      \"_id\": \"5c8267d27c8e2f4013c69a27\",\n      \"description\": \"level description\",\n      \"name\": \"1er\",\n      \"formation\": \"5c8263677c8e2f4013c6986f\",\n      \"createdAt\": \"2019-03-08T12:35:32.637Z\",\n      \"updatedAt\": \"2019-03-08T12:44:37.914Z\",\n      \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request\nwrong formation id",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/level/levelController.js",
    "groupTitle": "Levels",
    "name": "GetLevelsByformationFormation"
  },
  {
    "type": "get",
    "url": "/majors/",
    "title": "Get all majors",
    "group": "Majors",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n [\n    {\n        \"deleted\": false,\n        \"_id\": \"5c82650d1227833d35ac2a29\",\n        \"description\": \"major description\",\n        \"name\": \"LFSI 1\",\n        \"level\": \"5c8267d27c8e2f4013c69a27\",\n        \"__v\": 0\n    },\n    {\n        \"deleted\": false,\n        \"_id\": \"5c8265367e19d73dba8355a6\",\n        \"name\": \"Prepa 2\",\n        \"description\": \"major description\",\n        \"level\": \"5c826194157314398aa8c05e\",\n        \"__v\": 0\n    }\n]",
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
          "title": "Internal Server Error",
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
    "url": "/majors/byLevel/:level",
    "title": "Get majors by level",
    "group": "Majors",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "level",
            "description": "<p>level id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n [\n    {\n        \"deleted\": false,\n        \"_id\": \"5c82650d1227833d35ac2a29\",\n        \"description\": \"major description\",\n        \"name\": \"LFSI 1\",\n        \"level\": \"5c8267d27c8e2f4013c69a27\",\n        \"__v\": 0\n    },\n    {\n        \"deleted\": false,\n        \"_id\": \"5c8265367e19d73dba8355a6\",\n        \"name\": \"Prepa 2\",\n        \"description\": \"major description\",\n        \"level\": \"5c826194157314398aa8c05e\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Name param cannot be empty",
          "content": "HTTP/1.1 400 Bad Request\nwrong level id",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/major/majorController.js",
    "groupTitle": "Majors",
    "name": "GetMajorsBylevelLevel"
  },
  {
    "type": "get",
    "url": "/subjects/byMajor/:major",
    "title": "Get subjects by major",
    "group": "Subjects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "major",
            "description": "<p>major id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n    {\n        \"documentsCount\": {\n            \"DS\": 3,\n            \"EX\": 2,\n            \"C\": 0,\n            \"TD\": 2,\n            \"TP\": 0\n        },\n        \"semestre\": 2,\n        \"deleted\": false,\n        \"_id\": \"5c8269c447baab426f6cbcfc\",\n        \"name\": \"physique\",\n        \"createdAt\": \"2019-03-08T13:10:28.761Z\",\n        \"updatedAt\": \"2019-03-12T22:56:21.620Z\",\n        \"__v\": 1,\n        \"description\": \"Subject description\"\n    },\n    {\n        \"documentsCount\": {\n            \"DS\": 0,\n            \"EX\": 9,\n            \"C\": 0,\n            \"TD\": 2,\n            \"TP\": 2\n        },\n        \"semestre\": 1,\n        \"deleted\": false,\n        \"_id\": \"5c826a05a3bddb42a13118e7\",\n        \"name\": \"physique\",\n        \"description\": \"Subject description\",\n        \"createdAt\": \"2019-03-08T13:11:33.708Z\",\n        \"updatedAt\": \"2019-03-08T13:11:33.708Z\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/subject/subjectController.js",
    "groupTitle": "Subjects",
    "name": "GetSubjectsBymajorMajor"
  },
  {
    "type": "put",
    "url": "/subjects/GetByMajors/",
    "title": "Get subjects by majors",
    "group": "Subjects",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"majors\": [\"5c41b2d82383c111b4ffad1a\", \"5c41b2d82383c111b4ffad1c\"],\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n[\n    {\n        \"documentsCount\": {\n            \"DS\": 3,\n            \"EX\": 2,\n            \"C\": 0,\n            \"TD\": 2,\n            \"TP\": 0\n        },\n        \"semestre\": 2,\n        \"deleted\": false,\n        \"_id\": \"5c8269c447baab426f6cbcfc\",\n        \"name\": \"physique\",\n        \"createdAt\": \"2019-03-08T13:10:28.761Z\",\n        \"updatedAt\": \"2019-03-12T22:56:21.620Z\",\n        \"__v\": 1,\n        \"description\": \"Subject description\"\n    },\n    {\n        \"documentsCount\": {\n            \"DS\": 0,\n            \"EX\": 9,\n            \"C\": 0,\n            \"TD\": 2,\n            \"TP\": 2\n        },\n        \"semestre\": 1,\n        \"deleted\": false,\n        \"_id\": \"5c826a05a3bddb42a13118e7\",\n        \"name\": \"physique\",\n        \"description\": \"Subject description\",\n        \"createdAt\": \"2019-03-08T13:11:33.708Z\",\n        \"updatedAt\": \"2019-03-08T13:11:33.708Z\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/subject/subjectController.js",
    "groupTitle": "Subjects",
    "name": "PutSubjectsGetbymajors"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Get current user",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n       \"firstName\": \"Wael\",\n       \"lastName\": \"Ben Taleb\",\n       \"email\": \"waelben7@gmail.com\",\n       \"major\": \"5c8265367e19d73dba8355a6\",\n       \"_id\": \"5c8783b34a35cd28fa5bea3b\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Not Authorized",
          "content": "HTTP/1.1 401 Not Authorized",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/user/userController.js",
    "groupTitle": "Users",
    "name": "GetUser"
  },
  {
    "type": "put",
    "url": "/users",
    "title": "Update profile",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"waelben7@gmail.com\",\n  \"firstName\": \"Wael\",\n  \"lastName\": \"Ben Taleb\",\n  \"major\": \"5c8265367e19d73dba8355a6\",\n  \"oldPassword\": \"12345678\",\n  \"password\": \"87654321\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Not Authorized",
          "content": "HTTP/1.1 401 Not Authorized",
          "type": "json"
        },
        {
          "title": "Bad Request",
          "content": "HTTP/1.1 400 Bad Request\nemail already exist\nold password is required\nWrong old password",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/user/userController.js",
    "groupTitle": "Users",
    "name": "PutUsers"
  },
  {
    "type": "get",
    "url": "/version/:clientVersion",
    "title": "Get version update",
    "group": "Versions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "clientVersion",
            "description": "<p>Client Version</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n {\n    \"newUpdate\": true,\n    \"version\": {\n        \"forceUpdate\": true,\n        \"description\": \"fix security issues \\noptimize perfermance \\n\",\n        \"version\": \"0.1.2\",\n        \"title\": \"beta 2\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Name param cannot be empty",
          "content": "HTTP/1.1 400 Bad Request\nwrong client version",
          "type": "json"
        },
        {
          "title": "Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/version/versionController.js",
    "groupTitle": "Versions",
    "name": "GetVersionClientversion"
  },
  {
    "type": "get",
    "url": "/versions",
    "title": "Get all versions",
    "group": "Versions",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": " [\n    {\n        \"forceUpdate\": false,\n        \"deleted\": false,\n        \"_id\": \"5c9968198e2b6e302844a578\",\n        \"version\": \"0.1.2\",\n        \"title\": \"beta 2\",\n        \"description\": \"optimize perfermance \"\n    },\n    {\n        \"forceUpdate\": true,\n        \"deleted\": false,\n        \"_id\": \"5c9968058e2b6e302844a577\",\n        \"version\": \"0.1.1\",\n        \"title\": \"beta\",\n        \"description\": \"fix security issues \"\n    },\n    {\n        \"forceUpdate\": false,\n        \"deleted\": false,\n        \"_id\": \"5c9967c68e2b6e302844a576\",\n        \"version\": \"0.1\",\n        \"title\": \"alpha\",\n        \"description\": \"init version\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Internal Server Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/components/version/versionController.js",
    "groupTitle": "Versions",
    "name": "GetVersions"
  }
] });
