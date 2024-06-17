



## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node Js, Express Js , Typescript

**Database:** Postgresql, Prisma(ORM)






## Demo

Insert gif or link to demo

![Screenshot 2024-06-17 175736](https://github.com/get-amigo/Amigo-Web/assets/125492105/1c884eb4-845b-4418-9921-3b7017e71bc9)

/formA

![Screenshot 2024-06-17 175938](https://github.com/get-amigo/Amigo-Web/assets/125492105/2286f43c-3046-4666-a0b0-244b3304bca2)


/formB
![Screenshot 2024-06-17 180102](https://github.com/get-amigo/Amigo-Web/assets/125492105/b4b8b851-8d5a-4d2b-9c76-5e21fa3b0567)


## API Reference


```http
  GET /formA 
```

```http
  POST /formA
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Name   ` | `string` | **Required**. Your Name    |
| `Country `| `string` | **Required**. Your Country |
| `phoneNumber      `| `string  `| **Required**. Phone Number|


```http
  GET /formB
```

```http
  POST /formB
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Name   ` | `string` | **Required**. Your Name    |
| `Country `| `string` | **Required**. Your Country |
| `phoneNumber      `| `string  `| **Required**. Phone Number|


## Installation

Run Application Locally

```bash
   git clone https://github.com/sruthin21/MedWander_full_stack.git
```

Backend Installation

```bash
   cd MedWander_full_stack
```
```bash
   cd Backend
```
```bash
   npm install
```

```bash
   tsc -b
```

```bash
   node /dist/index.js
```

Frontend Installation
```bash
   cd MedWander_full_stack
```
```bash
   cd Frontend
```

```bash
   npm install
```

```bash
   npm run dev
```

# Deployments

Backend Is Deployed to Ec2 Server

```bash
   http://ec2-3-25-93-77.ap-southeast-2.compute.amazonaws.com
```

Frontend Is Deployed To vercel 

```bash
     https://med-wander-full-stack.vercel.app/
```
(Since The Backend Is not Having Certificate Management it is showing the error
  https://med-wander-full-stack.vercel.app/FormA' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://ec2-3-25-93-77.ap-southeast-2.compute.amazonaws.com/formA'. This request has been blocked; the content must be served over HTTPS.)
  


