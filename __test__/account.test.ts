import request from 'supertest';
import app from '../src/app';

describe('Invalid Routes', () => {
  test('should return 404 for invalid routes', async () => {
    const res = await request(app).get('/api/v1/account/');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe('Cant find /api/v1/account/ on this server!');
  });
});

describe('Get Account Features', () => {
  test('should return 200 if the file is not created', async () => {
    const res = await request(app).get('/api/v1/accounts/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('success');
    // expect(res.body.data).toStrictEqual([]);
  });
  test('should return 200 if account have been created', async () => {
    const res = await request(app).get('/api/v1/accounts/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('success');
  });
  // test('should return 500 and friendly message if server error occurs', async () => {
  //   const res = await request(app).get('/api/v1/accounts/');
  //   expect(res.statusCode).toEqual(500);
  //   expect(res.body.message).toBe('An error occured');
  // });
});

describe('Create Account Features', () => {
  test('should return 400 for empty payload', async () => {
    const res = await request(app).post('/api/v1/accounts/').send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Please provide an account name');
    // expect(res.body.data).toStrictEqual([]);
  });
  test('should return 400 for empty account number', async () => {
    const res = await request(app).post('/api/v1/accounts/').send({
      account_name: '',
      phone: '07036789432',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Please provide an account name');
    // expect(res.body.data).toStrictEqual([]);
  });
  test('should return undefined for empty phone number', async () => {
    const res = await request(app).post('/api/v1/accounts/').send({
      account_name: 'Emmanuel Ajaero',
      phone: '',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Please provide an phone number');
  });
  test('should return 200 for created account', async () => {
    const res = await request(app).get('/api/v1/accounts/').send({
      account_name: 'Emmanuel Ajaero',
      phone: '07036789432',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('success');
  });
});

describe('Withdrawal Features', () => {
  /**************** WITHDRAWAL TEST CASES *********************/

  test('should return 400 for empty amount', async () => {
    const res = await request(app)
      .post('/api/v1/transactions/create/withdraw')
      .send({
        account_number: '3640135854',
        amount: 0,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Please provide an amount');
  });

  test('should return 400 for empty account number', async () => {
    const res = await request(app)
      .post('/api/v1/transactions/create/withdraw')
      .send({
        amount: 20000,
        account_number: ' ',
      });

    expect(res.statusCode).toEqual(400);
    // expect(res.body.meessage).toBe('Please provide an account number');
  });

  test('should return 400 for invalid amount type', async () => {
    const res = await request(app)
      .post('/api/v1/transactions/create/withdraw')
      .send({
        amount: '20000',
        account_number: 3640135854,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('account number must be a string');
  });

  test('should return 400 for invalid account number type', async () => {
    const res = await request(app)
      .post('/api/v1/transactions/create/withdraw')
      .send({
        amount: '20000',
        account_number: '364013585',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('account number must be 10 digits');
  });

  test('should return 200 for successful withdraw', async () => {
    const res = await request(app)
      .post('/api/v1/transactions/create/withdraw')
      .send({
        amount: 20000,
        account_number: '3640135854',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('success');
  });
});

describe('Deposit Features', () => {
  /* DEPOSIT TEST CASES */

  test('should return 400 for empty deposit payload', async () => {
    const res = await request(app)
      .post('/api/v1/transactions/deposit')
      .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Please provide an account number');
    // expect(res.body.data).toStrictEqual([]);
  });

  test('should return 400 for empty amount', async () => {
    const res = await request(app).post('/api/v1/transactions/deposit').send({
      account_number: '3640135854',
      amount: 0
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Please provide an amount');
  });

  test('should return 400 for empty account number', async () => {
    const res = await request(app).post('/api/v1/transactions/deposit').send({
      amount: 20000,
      account_number: '',
    });

    expect(res.statusCode).toEqual(400);
    // expect(res.body.meessage).toBe('Please provide an account number');
  });

  test('should return 404 for invalid account number type', async () => {
    const res = await request(app).post('/api/v1/transaction/deposit').send({
      amount: 20000,
      account_number: 3640135854,
    });
    expect(res.statusCode).toEqual(404);
  });

  test('should return 404 for invalid amount length', async () => {
    const res = await request(app).post('/api/v1/transaction/deposit').send({
      amount: 20000,
      account_number: "364013585",
    });
    expect(res.statusCode).toEqual(404);
  });

  test('should return 404 for invalid account number type', async () => {
    const res = await request(app).post('/api/v1/transaction/deposit').send({
      amount: '20000',
      account_number: '364013585',
    });
    expect(res.statusCode).toEqual(404);
  });

  test('should return 200 for successful deposit', async () => {
    const res = await request(app).post('/api/v1/transaction/deposit').send({
      amount: 20000,
      account_number: '3837445734',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('success');
  });

});

// export default
