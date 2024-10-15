import { NextResponse } from 'next/server';
import braintree from 'braintree';

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export async function GET() {
  try {
    const response = await gateway.clientToken.generate({});
    return NextResponse.json({ clientToken: response.clientToken });
  } catch (error) {
    console.error('Braintree error:', error);
    return NextResponse.json({ error: 'Error generating client token' }, { status: 500 });
  }
}