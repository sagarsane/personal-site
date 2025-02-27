import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Verify the webhook secret if you've set one
    const secret = request.headers.get('x-webhook-secret');
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Get the changed document's _type from the body
    const { _type } = body;

    // Define paths to revalidate based on the document type
    const paths = [];
    
    // Add paths based on document type
    switch (_type) {
      case 'post':
        paths.push('/blog');
        paths.push('/blog/[slug]');
        break;
      case 'project':
        paths.push('/projects');
        paths.push('/projects/[slug]');
        break;
      // Add more cases as needed
      default:
        // Revalidate homepage by default
        paths.push('/');
    }

    // Revalidate all affected paths
    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({
      message: `Revalidated paths: ${paths.join(', ')}`,
      revalidated: true,
      now: Date.now()
    });
  } catch (err: any) {
    console.error('Error revalidating:', err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
} 