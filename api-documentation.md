# API DOCUMENTATION

## 1. **/**

### Method: `GET`

> ```
> /
> ```

### Response

```
API is running
```

## 2. **Login - Email**

### Method: `POST`

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
"employeeEmail": "your-email@email.com"
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
   "employeeId": "123456789"
}
```

### Response

{

}

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 4. Logout

### Response

{

}

### Method: POST

> ```
> {{local}}/user/logout
> ```

### Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Body (**raw**)

```json
{
   "employeeId": "123456789"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 5. Verify OTP

### Response

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
   "employeeId": "123456789",
   "otp": "197927"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 6. Verify Token

### Response

{

}

### Method: POST

> ```
> {{local}}/user/verify-token
> ```

### Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Body (**raw**)

```json
{
   "employeeId": "123456789"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 7. Get Profile

### Response

{

}

### Method: POST

> ```
> {{local}}/user/get-profile
> ```

### Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Body (**raw**)

```json
{
   "employeeId": "123456789"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 8. Attendance

### Response

{

}

### Method: POST

> ```
> {{local}}/user/attendance
> ```

### Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Body (**raw**)

```json
{
   "employeeId": "123456789",
   "longitude": "342423",
   "altitude": "1231445",
   "action": "Clock In",
   "latitude": "12345678",
   "locationName": "bendungan ",
   "notes": "izin wfh"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 9. Get Attendance Today

### Response

{

}

### Method: POST

> ```
> {{local}}/user/get-attendance-today
> ```

### Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Body (**raw**)

```json
{
   "employeeId": "123456789",
   "date": "2023-09-08"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 10. Get Attendance Clock

### Response

{

}

### Method: POST

> ```
> {{local}}/user/get-attendance-clock
> ```

### Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Body (**raw**)

```json
{
   "employeeId": "123456789",
   "date": "2023-08-31",
   "action": "Clock out"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 11. Get Attendance History

### Response

{

}

### Method: POST

> ```
> {{local}}/user/get-attendance-history
> ```

### Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Body (**raw**)

```json
{
   "employeeId": "123456789",
   "startDate": "2023-09-08",
   "endDate": "2023-09-08"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 12. Get Attendance Recent

### Response

{

}

### Method: POST

> ```
> {{local}}/user/get-attendance-recent
> ```

### Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Body (**raw**)

```json
{
   "employeeId": "123456789"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---
