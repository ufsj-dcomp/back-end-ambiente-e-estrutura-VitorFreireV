CREATE TABLE Usuario(
    id int(8) AUTO_INCREMENT,
    first_name varchar(30),
    phone_number varchar(30),
    second_name varchar(40),
    email varchar(40),
    city varchar(40),
    data_creation date,
    score_sell int(8),
    score_exchange int(8),
    score_active int(8),
    senha varchar(30),
    PRIMARY KEY (id)
);


CREATE TABLE Produto(
    id int(8) AUTO_INCREMENT,
    state varchar(30),
    userID int(8),
    type_prod varchar(30),
    age_prod varchar(30),
    value float(8),
    city varchar(30),
    street varchar(30),
    number varchar(15),
    neighborhood varchar(15),
    data_creation date,
    PRIMARY KEY (id)
);

CREATE TABLE Comentario(
    id int(8) AUTO_INCREMENT,
    state varchar(30),
    userID int(8),
    prodID int(8),
    data_creation date,
    PRIMARY KEY (id)
);

CREATE TABLE EventosUsuario(
    id int(8) AUTO_INCREMENT, 
    event char(40),
    userID int(8),
    data_creation date,
    PRIMARY KEY (id)

);