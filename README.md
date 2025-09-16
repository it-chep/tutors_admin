1) npm i

как запускать:
1) npm start - Запускает development-сервер

Сборка + запуск production-версии:
1) npm run build
2) npx serve -s build


env: 

REACT_APP_SERVER_URL_ADMIN
REACT_APP_SERVER_URL


### use auth
либо 'false', либо любое другое знач ('')
например, REACT_APP_USE_AUTH=false

### my role
"tutor" | "admin" | "super_admin"
например, REACT_APP_ROLE='super_admin'

### my id 
REACT_APP_ID=12