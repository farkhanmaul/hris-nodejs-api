# API Documentation

Creating RESTful APIs and deploying to Google Cloud Platform using Google Cloud Run for communication between Machine Learning Model and Mobile Development. Creating database in Google Cloud SQL.

## 1. End-point: Register User

### Method: POST

> ```
> /register
> ```

### Body Request (**raw**)

```json
{
   "name": "user",
   "email": "user@gmail.com",
   "password": "123456",
   "confPassword": "123456"
}
```

### Example Response

```json
{
   "message": "Register successed",
   "token": "<your_token>"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 2. End-point: Login User

### Method: POST

> ```
> /login
> ```

### Body Request(**raw**)

```json
{
   "email": "user@gmail.com",
   "password": "123456"
}
```

### Example Response

```json
{
   "accessToken": "<your_token>",
   "email": "user@gmail.com"
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 3. End-point: Get History From User

### Method: GET

> ```
> /gethistory
> ```

### Headers Request

| Content-Type  | Value                      |
| ------------- | -------------------------- |
| Authorization | Bearer <your_access_token> |

### Example Response

```json
{
   "status_code": 200,
   "message": "get history user",
   "payload": [
      {
         "id": 106,
         "userEmail": "user@gmail.com",
         "informationName": "Banana",
         "condition": "Fresh",
         "percentage": "100.0%",
         "urlImage": "https://storage.googleapis.com/freshcan-bucket/file_image.jpg",
         "createdDate": "6/16/2023, 21:02:41"
      }
   ]
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 4. End-point: Get Specify History

### Method: GET

> ```
> /getspecifichistory?id=<id_history>&InformationName=<information_name>
> ```

### Headers Request

| Content-Type  | Value                      |
| ------------- | -------------------------- |
| Authorization | Bearer <your_access_token> |

### Example Response

```json
{
   "status_code": 200,
   "message": "get specific history",
   "payload": {
      "queryHistory": [
         {
            "id": 106,
            "userEmail": "user@gmail.com",
            "informationName": "Banana",
            "condition": "Fresh",
            "percentage": "100.0%",
            "urlImage": "https://storage.googleapis.com/freshcan-bucket/file_image.jpg",
            "createdDate": "6/16/2023, 21:02:41"
         }
      ],
      "queryInformation": [
         {
            "id": 3,
            "name": "Banana",
            "botanical_name": "Musa paradisicum",
            "description": "Pisang adalah buah yang rasanya manis dengan sentuhan keasaman ringan. Bentuknya panjang dan silindris berwarna kuning saat matang dengan ukuran hingga 20 cm atau lebih. Dalam beberapa budaya, pisang memiliki makna simbolis seperti dalam kepercayaan Hindu di mana pisang dianggap sebagai simbol kesuburan dan kelimpahan.",
            "benefit": "Pisang mengandung triptofan (asam amino esensial) yang membantu produksi serotonin dalam tubuh sehingga dapat meningkatkan mood dan membantu mengatasi depresi ringan.",
            "funfact": "Pisang sebenarnya adalah buah beri. Meskipun ukurannya besar dan bentuknya berbeda dari buah beri tradisional, seperti blueberry atau strawberry, secara botani, pisang termasuk dalam keluarga buah beri.",
            "allergy": "Banana Allergy",
            "energy": "89/371",
            "water": 74.91,
            "protein": 1.09,
            "total_fat": 0.33,
            "carbohydrates": 22.84,
            "fiber": 2.6,
            "sugars": 12.23,
            "calsium": 5,
            "iron": 0.26
         }
      ]
   }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## 5. End-point: Upload Image to ML model and GCS

### Method: POST

> ```
> /upload/image
> ```

### Headers Request

| Content-Type  | Value                      |
| ------------- | -------------------------- |
| Authorization | Bearer <your_access_token> |

### Body Formdata

| Param | value          | Type |
| ----- | -------------- | ---- |
| file  | your_image.jpg | file |

### Example Response

```json
{
   "status_code": 200,
   "message": "Uploaded the file successfully: Bananass-large.jpg",
   "payload": {
      "id": 106,
      "informationName": "Banana"
   }
}
```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

---

```

```
