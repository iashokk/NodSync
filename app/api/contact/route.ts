import { NextRequest, NextResponse } from 'next/server';
import connect from '@/libs/mongodb';
import Contact from '../models/Contact';

export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    const contact = new Contact(body);
    await contact.save();
    return NextResponse.json({ message: 'Message received successfully!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error saving contact form data' }, { status: 500 });
  }
}
