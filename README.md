# Старт проекта

```shell
make run 
```


env: 

REACT_APP_SERVER_URL_ADMIN
REACT_APP_SERVER_URL


### use auth
либо 'false', либо любое другое знач ('')
например, REACT_APP_USE_AUTH=false

### my role
"tutor" | "admin" | "super_admin" | "assistant"
например, REACT_APP_ROLE='super_admin'

### my id 
REACT_APP_ID=12

### paid_functions
REACT_APP_PAID_FUNCTIONS='finance_by_tgs,student_archive,assistant'
строка названий фичей, разделенных запятой без пробела 