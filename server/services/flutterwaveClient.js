import Flutterwave from 'flutterwave-node-v3';
import dotenv from 'dotenv';

dotenv.config();

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

/**
 * Verify a Flutterwave transaction by its transaction_id.
 * Returns the raw Flutterwave response data.
 */
export async function verifyTransaction(transactionId) {
  const response = await flw.Transaction.verify({ id: transactionId });
  return response;
}

export default flw;
