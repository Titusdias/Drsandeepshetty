import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Ensure this environment variable is set in your .env.local
const secret = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(req: NextRequest) {
  try {
    if (!secret) {
      console.error('SANITY_REVALIDATE_SECRET is not set');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // `parseBody` verifies the signature and parses the body.
    // It requires the raw text of the request.
    const { isValidSignature, body } = await parseBody(
      req,
      secret,
      true // Indicates we want to read the request body as text
    );

    if (!isValidSignature) {
      const message = 'Invalid signature';
      console.warn(message);
      return NextResponse.json({ message, isValidSignature }, { status: 401 });
    }

    if (!body?._type) {
      const message = 'Bad Request: Missing _type in payload';
      console.warn(message);
      return NextResponse.json({ message }, { status: 400 });
    }

    // Revalidate a specific tag related to the document type
    // e.g. if _type is 'post', it clears 'post' tag cache
    revalidateTag(body._type as string, { expire: 0 });

    // Optionally revalidate a generic tag
    // revalidateTag('sanity', { expire: 0 });

    console.log(`Successfully revalidated tag: ${body._type}`);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: any) {
    console.error('Revalidation error:', err.message);
    return NextResponse.json(
      { message: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
