const mongoose = require('mongoose');

test('Database connection is established', async () => {
  expect(mongoose.connection.readyState).toBe(1); // 1 means connected
});
