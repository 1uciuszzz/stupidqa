# API Document

## User

1. 用户注册

- path: "**/api/v1/user**",
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
    "status": number,
    "payload": object | null,
    "msg": "string"
  }
  ```

## Auth

1. 用户登录

- path: "**/api/v1/auth**"
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
    "status": number,
    "payload": object | null,
    "msg": "string"
  }
  ```
