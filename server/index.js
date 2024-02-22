const { 
    client, 
    createTables,
    createUser,
    createProduct,
    createFavorite,
    fetchUsers,
    fetchProducts,
    fetchFavorites,
    destroyFavorite
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
  
  
   const userFavorite = await Promise.all([
    createFavorite({ user_id: jack.id, product_id: laptop.id}),
    createFavorite({ user_id: jack.id, product_id: iphone.id}),
    createFavorite({ user_id: sally.id, product_id: ipad.id}),
    createFavorite({ user_id: bob.id, product_id: backpack.id}),
  ]);
  console.log(await fetchFavorites(jack.id));
  await destroyFavorite(userFavorite[0].id);
};

init();