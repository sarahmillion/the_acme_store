const { 
    client, 
    createTables,
    createUser,
    createProduct
} = require('./db');

const init = async()=> {
  await client.connect();
  console.log('connecting to database');
  console.log('connected to database');
  await createTables();
  console.log('tables created');
    const [jack, sally, bob, laptop, iphone, ipad, backpack] = await Promise.all([
    createUser({ username: 'jack', password: 'hello' }),
    createUser({ username: 'sally', password: 'hi' }),
    createUser({ username: 'bob', password: 'shhh' }),
     createProduct({ name: 'laptop'}),
    createProduct({ name: 'iphone'}),
    createProduct({ name: 'ipad'}),
    createProduct({ name: 'backpack'}),
    ]);
    console.log(jack.id);
    console.log(laptop.id);
};

init();