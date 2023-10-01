# Dependencies:

java 17
node 18

# To launch frontend:
    cd app
    npm start
navigate to http://localhost:3000/

# To launch backend:
    ./gradlew bootRun
navigate to http://localhost:8080/

# Database Setup:
1. Install PostgreSQL if not already installed.
2. From within the postgres shell, run `CREATE DATABASE hex;` to create the database.
3. Still in the database, create a user and password to associate with the app:
    `CREATE USER your_username WITH PASSWORD 'your_password';`

4. `GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_username;`
5. Add these lines to `src/main/resources/application.properties`:
    ```
    spring.datasource.url= jdbc:postgresql://localhost:5432/hex
    spring.datasource.username= your_username
    spring.datasource.password= your_password

    spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation= true
    spring.jpa.properties.hibernate.dialect= org.hibernate.dialect.PostgreSQLDialect
    # Hibernate ddl auto (create, create-drop, validate, update)
    spring.jpa.hibernate.ddl-auto= update
    ```

# Creating a grid:
    grid = new grid();
    grid.loadFromDimensions(2,3);
    grid.setScale(30);
    grid.draw("#hex");

# Adding click handlers
Note: redrawing removes all handlers
## Hexes turn blue when dragging:
    grid.setHexAction("drag", function(event) { var hex = event.data.hex; hex.addClass("blue"); });
## Removing a click handler:
    grid.setHexAction("drag", null);
## Delete hexes from grid on click:
    grid.setHexAction("click", function(event) { var grid = event.data.grid, hex = event.data.hex; grid.deleteHex(hex.r, hex.c); });



