# qspace
> **함께 생각하고, 만드는 공간**   
Think, make together. IT community & coding quiz site made with MySql and Node.js   
MySql과 Node.js를 활용해서 만든 IT 커뮤니티, 코딩 배움터 입니다.   

## To-do List
- [x] Sign in
- [x] Sign up
- [x] Users Management(ex) ban users)
- [ ] Password recovery
- [x] Questions List
- [x] Write Question
- [x] View Question
- [x] Edit&Delete Question
- [ ] Comment on Question
- [ ] Like Question
- [x] Quizs List
- [ ] Quizs Compiler
- [ ] Manage Solvers
- [ ] Write Guideline
- [x] Designing
- [x] Deploy Manual

## Setup
### Required Modules
```express, mysql, crypto```
```bash
npm install express
npm install mysql
npm install crypto
```

### Sql Tables
1. Users 
example table
| id | name | email | password | phone | reg_date |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 11 | 홍은표 | hackg179@gmail.com | abc123 | 01099727439 | 2020-06-15 12:11:57 |

insert command
```sql
CREATE TABLE users (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name varchar(16) NOT NULL,
    email longtext NOT NULL,
    password longtext NOT NULL,
    phone varchar(11),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
* Password will be encoded by Crypto module.

2. Questions 
example table
| id | title | content | category | writer | comments | likes | reg_date |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 11 | 아이폰에 바이러스가 걸렸어요. | 제가 인터넷을 보던 중에 아이폰에 4가지 바이러스가 걸렸다고 뜨는데 어떻게 해결하나요? | 아이폰 | potato179 | {"jung.hyun": "그거 광고입니다 ㅋㅋㅋ", "potato2": "속지마세요 ㅎㅎ"} | ["potato179", "jung.hyun", "potato2"] | 2020-06-15 12:11:57 |

insert command
```sql
CREATE TABLE questions (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title varchar(256) NOT NULL,
    content longtext NOT NULL,
    category varchar(50) NOT NULL,
    writer varchar(16) NOT NULL,
    comments longtext NOT NULL,
    likes longtext,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

3. Quiz
example table
| id | title | cagtegory | difficulty | des | inputdes | outputdes | otherdes | input1 | input2 | input3 | output1 | output2 | output3 | language | solvers | reg_date |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 11 | A + B | 사칙연산 | 2 | 두 정수 A와 B를 입력받아 그 수를 더한 값을 출력하시오. | 두 수 A, B를 입력받는다. | A와 B를 더한 값을 출력한다. | 힌트 따위는 없다. | 1 1 | 4 8 | 12312314512 1231231238 | 2 | 12 | 13543545750 | ["C", "C++", "Java", "Python", "C#", "node.js"] | ["potato179", "jung.hyun"] | 2020-06-15 12:11:57 |

insert command
```sql
CREATE TABLE quiz (
    id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title text NOT NULL,
    cagtegory longtext NOT NULL,
    difficulty int(20) NOT NULL,
    des longtext,
    inputdes longtext,
    outputdes longtext,
    otherdes longtext,
    input1 longtext,
    output1 longtext,
    input2 longtext,
    output2 longtext,
    input3 longtext,
    output3 longtext,
    language longtext,
    solvers longtext,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```