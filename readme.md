# Guia de comandos #

Crear network para contenedores.

> `docker network create steplix`

Buildear contenedor backend.

> `docker build -t stepchallenge/backend ./Backend/`

Buildear contenedor mysql.

> `docker build -t stepchallenge/mysql ./mysql/`

Correr los contenedores en la misma red, en el orden especificado.

> `docker run --name stepchallenge_backend -p 80:3000 -d --network steplix stepchallenge/backend`

> `docker run --name stepchallenge_mysql -p 3306:3306 -d --network steplix stepchallenge/mysql`

