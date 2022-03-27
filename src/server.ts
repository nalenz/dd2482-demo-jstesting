import express from 'express';

const app = express();
const port = 3000;

app.get('/user', (req, res) => {
  res.status(200).json({ name: 'john' });
});

if (require.main === module) {
  // only actually run the server when this file is executed via the command line,
  // but not when testing the server via Jest
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export default app;
