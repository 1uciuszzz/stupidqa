# API Document

## User

1. 用户注册

- path: "**/api/v1/user**",
- method: "POST",
- data type: **form data**,
- needed fields:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- return:
  ```json
  {
    "status": 200,
    "payload": {
      "_id": "string",
      "username": "string",
      "avatar": "string"
    } | null,
    "msg": "string"
  }
  ```

2. 用户修改密码

- path: "**/api/v1/user/:id**",
- method: "PATCH",
- data type: **json**,
- needed fields:
  ```json
  {
    "origin_password": "string",
    "changed_password": "string"
  }
  ```
- return:
  ```json
  {
    "status": 200,
    "msg": "string"
  }
  ```

3. 获取用户详情

- path: "**/api/v1/user/:id**",
- method: "GET",
- return:
  ```json
  {
    "status": 200,
    "payload": {
      "user": {
        "_id": "string",
        "username": "string",
        "avatar": "string"
      },
      "received_questions": [
        {
          "_id": "string",
          "title": "string",
          "tags": [
            {
              "keyword": "string"
            }
          ],
          "created_by": {
            "_id": "string",
            "username": "string",
            "avatar": "string"
          },
          "created_for": {
            "_id": "string",
            "username": "string",
            "avatar": "string"
          },
          "created_time": "string",
          "updated_time": "string",
          "level": "string",
          "answer_count": 0
        }
      ]
    },
    "msg": "string"
  }
  ```

4. 查询用户

- path: "**/api/v1/user**"
- method: "GET",
- need token,
- data type: "**query**"
- fields:
  ```json
  {
    "username": "string"
  }
  ```
- return:
  ```json
  {
    "status": 200,
    "payload": {
      "users": [
        {
          "_id": "string",
          "username": "string",
          "avatar": "string"
        }
      ]
    },
    "msg": "string"
  }
  ```

## Auth

1. 用户登录

- path: "**/api/v1/auth**"
- method: "POST"
- data type: **form data**
- needed fields:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- return:
  ```json
  {
    "status": 200,
    "payload": {
      "token": "string",
      "user_id": "string"
    },
    "msg": "string"
  }
  ```

## Question

1. 给特定用户提问题

- path: "**/api/v1/question/user/:id**"
- method: "POST"
- data type: ["header/token","body/json","param/id"]
- need token
- fields:
  ```json
  {
    "title": "string",
    "tags": [
      {
        "keyword": "string"
      }
    ],
    "level": "string"
  }
  ```
- return:
  ```json
  {
    "status": 200,
    "payload": {
      "title": "string",
      "tags": [
        {
          "keyword": "string"
        }
      ],
      "created_by": {
        "_id": "string",
        "username": "string",
        "avatar": "string"
      },
      "created_time": "string",
      "updated_time": "string",
      "level": "string",
      "created_for": {
        "_id": "string",
        "username": "string",
        "avatar": "string"
      },
      "answer_count": "string"
    },
    "msg": "string"
  }
  ```

2. 获取问题详情

- path: "**/api/v1/question/:id**"
- method: "GET"
- data type: "path param"
- fields: "id"
- return:
  ```json
  {
    "status": 200,
    "payload": {
      "title": "string",
      "tags": [
        {
          "keyword": "string"
        }
      ],
      "created_by": {
        "_id": "string",
        "avatar": "string",
        "username": "string"
      },
      "created_time": "string",
      "updated_time": "string",
      "level": "string",
      "created_for": {
        "_id": "string",
        "avatar": "string",
        "username": "string"
      },
      "answer_count": 0
    },
    "msg": "string"
  }
  ```

3. 获取提给特定用户的所有问题

- path: "**/api/v1/question/user/:id**"
- method: "GET"
- data type: "path param" && ("query param" || null)
- fields: "id" && ("page","per_size")
- return:
  ```json
  {
    "status": 200,
    "payload": {
      "questions": [
        {
          "_id": "string",
          "title": "string",
          "tags": [
            {
              "keyword": "string",
              "_id": "string"
            }
          ],
          "created_by": {
            "_id": "string",
            "username": "string",
            "avatar": "string"
          },
          "created_for": {
            "_id": "string",
            "username": "string",
            "avatar": "string"
          },
          "created_time": "string",
          "updated_time": "string",
          "level": "string",
          "answer_count": 0
        }
      ],
      "total": 0
    },
    "msg": "string"
  }
  ```

4. 获取所有的问题，支持分页查询

- path: "**/api/v1/question**"
- method: "GET"
- data type: "query param"
- fields: option:{"page","per_size"}
- return:
  ```json
  {
    "status": 200,
    "payload": {
      "questions": [
        {
          "_id": "string",
          "title": "string",
          "tags": [
            {
              "keyword": "string",
              "_id": "string"
            }
          ],
          "created_by": {
            "_id": "string",
            "username": "string",
            "avatar": "string"
          },
          "created_for": {
            "_id": "string",
            "username": "string",
            "avatar": "string"
          },
          "created_time": "string",
          "updated_time": "string",
          "level": "string",
          "answer_count": 0
        }
      ],
      "total": 1
    },
    "msg": "string"
  }
  ```

## Answer

1. 在特定问题下面添加答案

- path: "**/api/v1/answer/question/:id**"
- method: "POST"
- data type: ["path param","body param","header"]
- need token
- fields:
  ```json
  {
    "content": "string"
  }
  ```
- return:
  ```json
  {
    "status": 200,
    "payload": {
      "answer": {
        "content": "string",
        "published_by": {
          "_id": "string",
          "username": "string",
          "avatar": "string"
        },
        "question_for": "string",
        "liked_by": [],
        "_id": "string"
      }
    },
    "msg": "publish answer success"
  }
  ```
