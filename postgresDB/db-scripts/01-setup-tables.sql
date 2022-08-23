CREATE TABLE hello (
   message_id INTEGER GENERATED ALWAYS AS IDENTITY,
   messages VARCHAR(255) NOT NULL,
   PRIMARY KEY(message_id)
);

CREATE TABLE planet (
   planet_id INTEGER GENERATED ALWAYS AS IDENTITY,
   planet VARCHAR(255) NOT NULL,
   katysirles DECIMAL NOT NULL,
   mohdreza DECIMAL NOT NULL,
   earth DECIMAL NOT NULL,
   farnocchia DECIMAL NOT NULL,
   geographus DECIMAL NOT NULL,
   jacoblemaire DECIMAL NOT NULL,
   PRIMARY KEY(planet_id)
);

CREATE TABLE extra (
   extra_id INTEGER GENERATED ALWAYS AS IDENTITY,
   extra_name VARCHAR(255) NOT NULL,
   extra_price INTEGER NOT NULL,
   extra_shorthand VARCHAR(255) NOT NULL,
   PRIMARY KEY(extra_id)
);
