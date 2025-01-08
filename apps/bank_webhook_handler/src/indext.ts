import express, { json, Request, Response } from "express";
const port = 3001;
const app = express();
app.use(json());

app.post("/webhook", (req: Request, res: Response) => {
  const { token, userIdentifier, amount } = req.body;
  const paymentInformation = {
    token: token,
    userId: userIdentifier,
    amount: amount,
  };
  return;
});

app.listen(port, () => console.log(`Server running on port ${port}`));
