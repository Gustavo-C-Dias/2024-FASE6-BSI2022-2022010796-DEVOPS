import { Client } from 'pg';

const client1 = new Client({
  host: 'postgres',
  port: 5432,
  user: 'user1_pg',
  password: 'password1_pg',
  database: 'db_pg',
});

const client2 = new Client({
  host: 'postgres',
  port: 5433,
  user: 'user2_pg',
  password: 'password2_pg',
  database: 'db_pg',
});

const client3 = new Client({
  host: 'postgres',
  port: 5434,
  user: 'user3_pg',
  password: 'password3_pg',
  database: 'db_pg',
});

void async function() {
  await client1.connect();
  await client2.connect();
  await client3.connect();

  const [res1, res2, res3] = await Promise.all([
    client1.query('SELECT $1::text as message', ['Hello world!']),
    client2.query('SELECT $1::text as message', ['Olá Mundo!']),
    client3.query('SELECT $1::text as message', ['Bonjour le monde']),
  ]);

  console.log(res1.rows[0].message);
  console.log(res2.rows[0].message);
  console.log(res3.rows[0].message);

  await client1.end();
  await client2.end();
  await client3.end();
}();