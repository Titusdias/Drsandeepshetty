import { revalidatePath, revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { webhookRevalidationMap } from '@/sanity/schemaTypes/webhookMap';

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

    const { isValidSignature, body } = await parseBody(
      req,
      secret,
      true
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

    const docType = body._type as string;
    const targets = webhookRevalidationMap[docType] ?? [docType];

    const revalidatedTags: string[] = [];
    const revalidatedPaths: string[] = [];

    for (const target of targets) {
      if (target.startsWith('/')) {
        revalidatePath(target);
        revalidatedPaths.push(target);
      } else {
        revalidateTag(target, { expire: 0 });
        revalidatedTags.push(target);
      }
    }

    console.log(
      `Revalidated ${docType}: tags=[${revalidatedTags.join(', ')}] paths=[${revalidatedPaths.join(', ')}]`
    );

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
      revalidatedTags,
      revalidatedPaths,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    console.error('Revalidation error:', message);
    return NextResponse.json({ message }, { status: 500 });
  }
}
