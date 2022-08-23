const createSql00_dropAll = `
    DROP TABLE IF EXISTS
        planet
            CASCADE;
    DROP TABLE IF EXISTS
        extra
            CASCADE;
    DROP TABLE IF EXISTS
        order_detail;
    `;
    
const createSql01_DestinationsTable = `
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
`
const createSql02_DestinationsData = `
INSERT INTO planet(planet, katysirles, mohdreza, earth, farnocchia, geographus, jacoblemaire) 
    VALUES ('katysirles', 0,0.3362299465240642,0.6129679144385026,1.1363636363636365,4.8161764705882355,9.171791443850267),
    ('mohdreza', 0.3362299465240642,0,0.2767379679144385,0.8001336898395722,4.479946524064171,8.835561497326204),
    ('earth', 0.6129679144385026,0.2767379679144385,0,0.5233957219251337,4.2032085561497325,8.558823529411764),
    ('farnocchia', 1.1363636363636365,0.8001336898395722,0.5233957219251337,0,3.679812834224599,8.03542780748663),
    ('geographus', 4.8161764705882355,4.479946524064171,4.2032085561497325,3.679812834224599,0,4.355614973262032),
    ('jacoblemaire', 9.171791443850267,8.835561497326204,8.558823529411764,8.03542780748663,4.355614973262032,0);

`

const createSql03_ExtraTable = `
CREATE TABLE extra (
    extra_id INTEGER GENERATED ALWAYS AS IDENTITY,
    extra_name VARCHAR(255) NOT NULL,
    extra_price INTEGER NOT NULL,
    extra_shorthand VARCHAR(255) NOT NULL,
    PRIMARY KEY(extra_id)
 );
`

const createSql04_ExtraData = `
INSERT INTO extra(extra_name, extra_price, extra_shorthand)
    VALUES ('Gold Space Suit', 50000, 'spacesuit'),
    ('Reel of your trip', 10000, 'reel'),
    ('Space rock souvenir', 5000, 'spacerock');
`

const createSql05_OrderTable = `
CREATE TABLE order_detail(
    id VARCHAR(255) NOT NULL,
    payment_details VARCHAR(255) NOT NULL,
    journey_price INTEGER NOT NULL,
    extras_price INTEGER NOT NULL,
    departure_planet VARCHAR(255) NOT NULL,
    arrival_planet VARCHAR(255) NOT NULL,
    departure_date VARCHAR(255) NOT NULL,
    return_date VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    passengers INTEGER NOT NULL,
    upgrades VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
 );
`


module.exports = {
    createSql00_dropAll,
    createSql01_DestinationsTable,
    createSql02_DestinationsData,
    createSql03_ExtraTable,
    createSql04_ExtraData,
    createSql05_OrderTable
}

