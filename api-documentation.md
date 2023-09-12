# API DOCUMENTATION

## 1. **/**

### Method: `GET`

```
/
```

### Response

```
API is running
```

## 2. **Login - Email**

### Method: POST

> ```
> /user/login-email
> ```

### Body (**raw**)

```json
{
   "employeeId": "123456789"
}
```

### Response

```json
{
"respCode": "00",
"respMsg": "Employee Found, OTP Sent to Email",
"data": {
"employeeEmail": "farkhanmaul@gmail.com"
}
```

## 3. Login - WA

### Method: POST

> ```
> {{local}}/user/login-wa
> ```

### Headers

| Content-Type  | Value     |
| ------------- | --------- |
| Authorization | 123456789 |

### Body (**raw**)

```json
{
   "employeeId": "202204263"
}
```

### Response

{

}

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Logout

Response

{

}

### Method: POST

> ```
> {{local}}/user/logout
> ```

### Headers

| Content-Type | Value                          |
| ------------ | ------------------------------ |
| x-api-key    | qZ7je2HXeR7BcKkWfbADO3rrE1TmAy |

### Body (**raw**)

```json
{
   "employeeId": "232323232"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Verify OTP

Response

{

}

### Method: POST

> ```
> {{local}}/user/verify-otp
> ```

### Headers

| Content-Type  | Value            |
| ------------- | ---------------- |
| Authorization | Bearer 123456789 |

### Body (**raw**)

```json
{
   "employeeId": "232323232",
   "otp": "197927"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Verify Token

Response

{

}

### Method: POST

> ```
> {{local}}/user/verify-token
> ```

### Headers

| Content-Type | Value                          |
| ------------ | ------------------------------ |
| x-api-key    | GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4 |

### Body (**raw**)

```json
{
   "employeeId": "232323232"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Profile

Response

{

}

### Method: POST

> ```
> {{local}}/user/get-profile
> ```

### Headers

| Content-Type | Value                          |
| ------------ | ------------------------------ |
| x-api-key    | GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4 |

### Body (**raw**)

```json
{
   "employeeId": "232323232"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Attendance

Response

{

}

### Method: POST

> ```
> {{local}}/user/attendance
> ```

### Headers

| Content-Type | Value                          |
| ------------ | ------------------------------ |
| x-api-key    | GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4 |

### Body (**raw**)

```json
{
   "employeeId": "232323232",
   "longitude": "342423",
   "altitude": "1231445",
   "action": "Clock In",
   "latitude": "12345678",
   "locationName": "bendungan ",
   "notes": "izin wfh"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Attendance Today

Response

{

}

### Method: POST

> ```
> {{local}}/user/get-attendance-today
> ```

### Headers

| Content-Type | Value                          |
| ------------ | ------------------------------ |
| x-api-key    | GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4 |

### Body (**raw**)

```json
{
   "employeeId": "232323232",
   "date": "2023-09-08"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Attendance Clock

Response

{

}

### Method: POST

> ```
> {{local}}/user/get-attendance-clock
> ```

### Headers

| Content-Type | Value                          |
| ------------ | ------------------------------ |
| x-api-key    | GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4 |

### Body (**raw**)

```json
{
   "employeeId": "232323232",
   "date": "2023-08-31",
   "action": "Clock out"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Attendance History

Response

{

}

### Method: POST

> ```
> {{local}}/user/get-attendance-history
> ```

### Headers

| Content-Type | Value                          |
| ------------ | ------------------------------ |
| x-api-key    | GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4 |

### Body (**raw**)

```json
{
   "employeeId": "232323232",
   "startDate": "2023-09-08",
   "endDate": "2023-09-08"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Attendance Recent

Response

{

}

### Method: POST

> ```
> {{local}}/user/get-attendance-recent
> ```

### Headers

| Content-Type | Value                          |
| ------------ | ------------------------------ |
| x-api-key    | GyBFyxY6MyzPbBeLp26Gc1ou7BZWB4 |

### Body (**raw**)

```json
{
   "employeeId": "232323232"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
