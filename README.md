# calendarBackend

# Calendar-fullstack


### BACKEND
# Endpoint
----------


| Method |Auth  | Descripción| Respuesta
|--|--|--| -----|
| POST | /api/auth/login | Crea una nueva sesión para el usuario, para esto se le debe mandar en el body  el `email y password` y se generara un **token**  |
| POST | /api/auth/me | Verifica si el usuario esta autentificado. En los header se le debe mandar Authorization: Bearer token |

----
|         Method       |  Usuarios | Descripción  | Respuesta  | 
|----------------|-------------------------------|-----------------------------|------
|GET        |api/users     |Devuelve todos los usuarios |  |
|POST       | api/users         | Crea un usuario nuevo, el usuario necesita un ` name, email(debe ser unico) y un password(como minimo 4 caracteres)`    |Devuelve 200(ok:true) si se creo correctamente. Caso contrario   devuelve un 400( y un mensaje indicando porque fallo).  
|PUT        |api/users/**:id**        |Actualiza un usuario, se debe contar con el **token** y mandarlo en los headers  ```Authorization: Bearer token ```   | 
|GET        |api/users/**:id**        |Devuelve un usuario específico |

----------


| Method |Eventos  | Descripción| Respuesta
|--|--|--| -----|
| GET | /api/users/**:user**/events | Devuelve  una lista de todos los eventos pertenecientes a un usuario `(es necesario contar con el token)` |
| POST | /api/users/**:user**/events | Crea un evento en especifico para un usuario `(es necesario contar con el token)`  |
| GET | /api/users/**:user**/events/**:id** | Devuelve un evento en especifico,  perteneciente a un usuario `(es necesario contar con el token)` |
| PUT | /api/users/**:user**/events/**:id** | Actualiza un evento perteneciente a un usuario `(es necesario contar con el token)` |
| DELETE | /api/users/**:user**/events/**:id** | Elimina un evento perteneciente a un usuario `(es necesario contar con el token)` |


### Librerias del Backend:

- node
- express
- typescript
- mongoose
- mongoDB
- moment