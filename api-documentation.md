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

### Request Body (**raw**)

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

### Request Body (**raw**)

```json
{
   "employeeId": "123456789"
}
```

### Response

```json

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 4. Logout

### Method: POST

> ```
> {{local}}/user/logout
> ```

### Request Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Request Body (**raw**)

```json
{
   "employeeId": "123456789"
}
```

### Response

```json
{
   "respCode": "00",
   "respMsg": "Logout successful",
   "data": {}
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 5. Verify OTP

### Method: POST

> ```
> {{local}}/user/verify-otp
> ```

### Request Body (**raw**)

```json
{
   "employeeId": "123456789",
   "otp": "123456"
}
```

### Response

```json
{
   "respCode": "00",
   "respMsg": "OTP verified",
   "data": {
      "token": "yourtoken",
      "expirationDate": "YYYY-MM-DDT24:60:60.354Z"
   }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 6. Verify Token

### Method: POST

> ```
> {{local}}/user/verify-token
> ```

### Request Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Request Body (**raw**)

```json
{
   "employeeId": "123456789"
}
```

### Response

```json
{
   "respCode": "00",
   "respMsg": "Success",
   "data": {}
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 7. Get Profile

### Method: POST

> ```
> {{local}}/user/get-profile
> ```

### Request Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Request Body (**raw**)

```json
{
   "employeeId": "123456789"
}
```

### Response

```json
{
   "respCode": "00",
   "respMsg": "Profile retrieved successfully",
   "data": {
      "EmployeeId": "123456789",
      "EmployeeFullName": "your name",
      "PrimaryEmail": "youremail@email.com",
      "BirthDate": "1 September 1990 07.00.00",
      "JoinCompany": "1 April 2022 07.00.00",
      "Position": "-",
      "Level": "-",
      "Work": "-"
   }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 8. Attendance

### Method: POST

> ```
> {{local}}/user/attendance
> ```

### Request Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Request Body (**raw**)

```json
{
   "employeeId": "123456789",
   "longitude": "123456789",
   "altitude": "123456789",
   "action": "Clock In",
   "latitude": "123456789",
   "locationName": "Nama Lokasi",
   "notes": "Mohon Izin wfh"
}
```

### Response

```json

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 9. Get Attendance Today

### Method: POST

> ```
> {{local}}/user/get-attendance-today
> ```

### Request Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Request Body (**raw**)

```json
{
   "employeeId": "123456789",
   "date": "2023-09-08"
}
```

### Response

```json

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 10. Get Attendance Clock

### Method: POST

> ```
> {{local}}/user/get-attendance-clock
> ```

### Request Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Request Body (**raw**)

```json
{
   "employeeId": "123456789",
   "date": "2023-08-31",
   "action": "Clock out"
}
```

### Response

```json

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 11. Get Attendance History

### Method: POST

> ```
> {{local}}/user/get-attendance-history
> ```

### Request Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Request Body (**raw**)

```json
{
   "employeeId": "123456789",
   "startDate": "2023-09-08",
   "endDate": "2023-09-08"
}
```

### Response

```json

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 12. Get Attendance Recent

### Method: POST

> ```
> {{local}}/user/get-attendance-recent
> ```

### Request Headers

| Content-Type | Value      |
| ------------ | ---------- |
| x-api-key    | your-token |

### Request Body (**raw**)

```json
{
   "employeeId": "123456789"
}
```

### Response

```json

```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---
