# 🔗목차

[요구사항 분석](#-요구사항-분석)

[API 문서](#-api-문서)

[테스트 케이스](#-테스트-케이스)

[컨벤션](#-컨벤션)

[ERD](#-erd)

[폴더 구조](#-폴더-구조)

[패키지](#-패키지)

[기술 스택](#-기술-스택)

# 🚩  ShoppingMall Admin Page service

** 제품 쇼핑몰 관리자 페이지 서비스 API **

### ✔ 기능 설명

- 주문 생성, 조회, 전체조회, 수정, 삭제가 가능합니다.
  - 주문 생성 시 쿠폰 적용 및 원-달러 환율을 적용한 배송비 환산이 가능합니다.
  - 주문 전체 조회 시 주문자명 검색 및 주문상태와 기간 별 필터 기능을 제공합니다.
  - 주문 취소는 soft delete로 구현하였습니다.
- 쿠폰 생성, 조회, 전체 조회, 수정, 삭제, 사용 통계 보기가 가능합니다.
  - 쿠폰 생성 시 현재 3가지 타입으로 쿠폰을 생성할 수 있습니다.
  - couponTypes 테이블을 따로 두어 타입을 따로 관리하고, 타입을 원하는 만큼 늘릴 수 있습니다.
  - 사용한 쿠폰 타입별 사용횟수와 총 할인액을 조회할 수 있습니다.
  - 쿠폰 삭제는 soft delete로 구현하였습니다.

### ✔ 구현 과정(까다로웠던 기능 중심으로)

- 제공된 데이터 -> DB에 따로 추가하지는 않고 xlsx.js 사용해 엑셀 파일을 json으로 변환 후 데이터 추출
  1. 주문 데이터
  2. 국가별 배송비(원) 데이터
  3. 국가 코드 별 국가명 데이터
  
- 주문 생성 API
  
  1. 주문 생성 시 요청으로 들어온 국가코드로 3번 데이터에서 국가명을 알아낸 후 2번 데이터에서 배송비를 가져왔습니다.
  2. 배송지가 해외일 경우 배송비를 달러로 환산하기 위해 openAPI인 Exchange Rates API를 사용하였습니다.
  3. 미 사용된 쿠폰 코드가 요청에 포함된 경우 쿠폰의 타입별 할인을 적용한 가격으로 insert 합니다.
  4. 쿠폰을 적용한 주문은 쿠폰 테이블의 상태, 쿠폰의 할인가, 주문 id, 주문 번호를 업데이트 합니다.

- 주문 전체 조회 API

  - 전달된 쿼리 파라미터에 따라 다른 where 절을 return 하는 함수를 만들고 서비스단에서 호출한 후 레포지토리로 전달 해주는 방식으로 검색 및 필터 기능을 구현했습니다.

- 쿠폰 사용 통계 API
  - 쿠폰 테이블 데이터를 CouponTypeId로 group by 한 후 타입별 사용횟수와 총 할인액을 sequelize.fn과 sequelize.col 메소드를 활용해 구했습니다.
  
# 📑 API 문서

npm start 후 http://localhost:10000/api-docs 

[shoppingMall_swagger.pdf](https://github.com/developer-yechan/ShoppingMall-Admin-Page/files/9746655/shoppingMall_swagger.pdf)


# 📜 테스트 케이스

- 추가 예정

# 💡 컨벤션

### ✔ camelCase / PascalCase

- **파일, 생성자, 변수, 메서드명**은 **camelCase**를 사용합니다.
- **클래스명**은 **PascalCase**를 사용합니다.

### ✔ Lint 규칙

| 들여쓰기 2칸 | 탭 사용 x |
| --- | --- |
| double quote 사용. | commonJS 사용 |
| 마지막 콤마 사용 | 한줄 최대 글자수: 80 |
| var는 사용하지 않습니다. | 세미 콜론 사용을 허용합니다. |


### ✔ Git commit

![image](https://user-images.githubusercontent.com/80232260/188366205-84d8a796-3c51-4eb0-bb29-3a61c96bb047.png)

[깃 커밋 컨벤션 참고 사이트](https://overcome-the-limits.tistory.com/entry/협업-협업을-위한-기본적인-git-커밋컨벤션-설정하기)

# 🗝 ERD
![image](https://user-images.githubusercontent.com/99064214/194890405-9838cd22-e79a-4b9c-b5fa-9c74a64bdd81.png)

# 🗂 폴더 구조
![image](https://user-images.githubusercontent.com/99064214/194890537-12826152-ba31-4a52-b887-e4cf593346f7.png)


# ⚙ 패키지

```json
{
  "name": "shoppingmall-admin-page",
  "version": "1.0.0",
  "description": "제품 쇼핑몰 관리자 페이지 API",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/developer-yechan/ShoppingMall-Admin-Page.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/developer-yechan/ShoppingMall-Admin-Page/issues"
  },
  "homepage": "https://github.com/developer-yechan/ShoppingMall-Admin-Page#readme",
  "dependencies": {
    "axios": "^0.27.2",
    "bcrypt": "^5.0.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "cross-env": "^7.0.3",
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.29.4",
    "morgan": "^1.10.0",
    "mysql2": "^2.3.3",
    "sequelize": "^6.21.4",
    "uuid": "^8.3.2",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "@babel/eslint-parser": "^7.18.9",
    "dotenv": "^16.0.2",
    "eslint": "^8.23.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "mocha": "^10.0.0",
    "nodemon": "^2.0.19",
    "prettier": "^2.7.1",
    "sequelize-cli": "^6.4.1",
    "supertest": "^6.2.4",
    "swagger-jsdoc": "^6.2.5",
    "swagger-ui-express": "^4.5.0"
  }
}



```

# ⚡ 기술 스택
## Node.js, Express, Mysql, Git, Github, Sequelize, Swagger

