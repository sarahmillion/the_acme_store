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
const express = require('express');
const app = express();

app.get('/api/users/:id/favorites', async(req, res, next)=> {
  try {
    res.send(await fetchFavorites(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

   app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await fetchUsers());
  }
  catch(ex){
    next(ex);
  }
});

 app.get('/api/products', async(req, res, next)=> {
  try {
    res.send(await fetchProducts());
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/users/:id/userFavorites', async(req, res, next)=> {
  try {
    res.status(201).send(await createFavorite({ user_id: req.params.id, product_id: req.body.product_id}));
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/users/:userId/userFavorite/:id', async(req, res, next)=> {
  try {
    await destroyFavorite({ id: req.params.id, user_id: req.params.userId });
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});


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
  
  
   const userFavorites = await Promise.all([
    createFavorite({ user_id: jack.id, product_id: laptop.id}),
    createFavorite({ user_id: jack.id, product_id: iphone.id}),
    createFavorite({ user_id: sally.id, product_id: ipad.id}),
    createFavorite({ user_id: bob.id, product_id: backpack.id}),
  ]);
  console.log(await fetchFavorites(jack.id));
  await destroyFavorite(userFavorites[0].id);
  console.log(await fetchFavorites(jack.id));
  
  const port = process.env.PORT || 3000;
  app.listen(port, ()=> console.log('listening to port ${port}'));
  
  console.log(`curl localhost:3000/api/users/${jack.id}/products`);
 };

init();