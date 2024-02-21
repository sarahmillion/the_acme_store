const { 
    client, 
    createTables,
    createUser,
    createProduct,
    createUserProduct,
    fetchUsers,
    fetchProducts,
    fetchUserProducts,
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
  const users = await fetchUsers();
  console.log(users);
  
  const products = await fetchProducts();
  console.log(products);
  
  
   const userProducts = await Promise.all([
    createUserProduct({ user_id: jack.id, product_id: laptop.id}),
    createUserProduct({ user_id: jack.id, product_id: iphone.id}),
    createUserProduct({ user_id: sally.id, product_id: ipad.id}),
    createUserProduct({ user_id: bob.id, product_id: backpack.id}),
  ]);
  console.log(await fetchUserProducts(jack.id));
};

init();