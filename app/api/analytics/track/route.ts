// app/api/analytics/track/route.ts
import { NextResponse } from 'next/server';
import connect from '@/libs/mongodb'; // your MongoDB connection function
import Analytics from '@/app/api/models/Analytics'; // adjust the path if needed

// Define pages to exclude for one of the totals
const EXCLUDED_PAGES = ['/privacy', '/terms']; // adjust as needed

export async function POST(request: Request) {
  try {
    // Parse the incoming request body for the current page path
    const { page } = await request.json();

    if (!page) {
      return NextResponse.json({ message: 'Page not provided' }, { status: 400 });
    }

    // Connect to MongoDB
    await connect();

    // Use the $inc operator to increment the page-specific count
    await Analytics.findOneAndUpdate(
      { page },
      { $inc: { views: 1 } },
      { upsert: true, new: true }
    );

    // Increment the overall total
    await Analytics.findOneAndUpdate(
      { page: 'all' },
      { $inc: { views: 1 } },
      { upsert: true, new: true }
    );

    // If the current page is NOT in the excluded list, update the "all_excluding" total
    if (!EXCLUDED_PAGES.includes(page)) {
      await Analytics.findOneAndUpdate(
        { page: 'all_excluding_current' },
        { $inc: { views: 1 } },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ message: 'View updated' });
  } catch (error) {
    console.error('Error updating analytics', error);
    return NextResponse.json({ message: 'Error updating view count' }, { status: 500 });
  }
}
