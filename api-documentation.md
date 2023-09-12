# API DOCUMENTATION

## 1. **/**

### Method: `GET`

> ```
> /
> ```

### Response Success

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

### Response Success

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

### Response Success

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

### Response Success

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

### Response Success

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

### Response Success

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

### Response Success

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

### Response Success

```json
{
   "respCode": "00",
   "respMsg": "Employee presence recorded successfully",
   "data": {}
}
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

### Response Success

```json
{
    "respCode": "00",
    "respMsg": "Presence data retrieved successfully",
    "data": [
        {
            "employeeId": "123456789",
            "longitude": 1234567890,
            "altitude": 1234567890,
            "latitude": 1234567890,
            "datetime": "2023-12-28T24:60:60.000Z",
            "location_name": "Location Name",
            "action": "Clock In",
            "notes": "Izin WFH",
            "dayName": "Friday",
            "formattedDate": "September 8",
            "formattedTime": "09:38"
        },
        {
            "employeeId": "123456789",
            "longitude": 1234567890,
            "altitude": 1234567890,
            "latitude": 1234567890,
            "datetime": "2023-12-28T24:60:60.000Z",
            "location_name": "Location Name",
            "action": "Clock Break In",
            "notes": "izin wfh",
            "dayName": "Friday",
            "formattedDate": "September 8",
            "formattedTime": "11:19"
        }
        {
            "employeeId": "123456789",
            "longitude": 1234567890,
            "altitude": 1234567890,
            "latitude": 1234567890,
            "datetime": "2023-12-28T24:60:60.000Z",
            "location_name": "Location Name",
            "action": "Clock Out",
            "notes": "izin wfh",
            "dayName": "Friday",
            "formattedDate": "September 8",
            "formattedTime": "16:37"
        },
    ]
}
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
   "date": "2023-09-09",
   "action": "Clock In"
}
```

### Response Success

```json
{
   "respCode": "00",
   "respMsg": "Clock time retrieved successfully",
   "data": {
      "clockTime": "11:19",
      "clockDate": "9 September 2023",
      "action": "Clock In",
      "hasClockToday": true
   }
}
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

### Response Success

```json
{
   "respCode": "00",
   "respMsg": "Presence data retrieved successfully",
   "data": [
      {
         "day": "September 8",
         "dayName": "Friday",
         "clockIn": {
            "employeeId": "123456789",
            "longitude": 1234567890,
            "altitude": 1234567890,
            "latitude": 1234567890,
            "datetime": "2023-09-08T06:38:11.000Z",
            "location_name": "Menara Batavia",
            "action": "Clock In",
            "notes": "-",
            "dayName": "Friday",
            "date": "September 8",
            "time": "09:00"
         },
         "clockBreakIn": {
            "employeeId": "123456789",
            "longitude": 1234567890,
            "altitude": 1234567890,
            "latitude": 1234567890,
            "datetime": "2023-09-08T04:19:29.000Z",
            "location_name": "Menara Batavia",
            "action": "Clock Break In",
            "notes": "-",
            "dayName": "Friday",
            "date": "September 8",
            "time": "12:00"
         },
         "clockOut": {
            "employeeId": "123456789",
            "longitude": 1234567890,
            "altitude": 1234567890,
            "latitude": 1234567890,
            "datetime": "2023-09-08T06:37:51.000Z",
            "location_name": "Menara Batavia",
            "action": "Clock Out",
            "notes": "-",
            "dayName": "Friday",
            "date": "September 8",
            "time": "17:00"
         },
         "duration": "8h 0m"
      }
   ]
}
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

### Response Success

```json
{
   "respCode": "00",
   "respMsg": "Last attendance data retrieved successfully",
   "data": {
      "employeeId": "123456789",
      "longitude": 1234567890,
      "altitude": 1234567890,
      "latitude": 1234567890,
      "datetime": "2023-12-28T24:60:60.000Z",
      "location_name": "Location Name",
      "action": "Clock Out",
      "notes": "Izin WFH",
      "dayName": "Tuesday",
      "date": "September 12",
      "time": "17:46",
      "nextAction": "Clock In"
   }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---
