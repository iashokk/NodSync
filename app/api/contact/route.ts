import { NextRequest, NextResponse } from 'next/server';
import connect from '@/libs/mongodb';
import Contact from '../models/Contact';
import { appendContactData } from '@/libs/googleSheets';

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
    
    // Required fields: name, email, number, role, topic, subject, description
    const { name, email, number, role, topic, subject, description } = body;
    
    if (!name || !email || !number || !role || !topic || !subject || !description) {
      return NextResponse.json(
        { error: 'Name, email, phone number, role, topic, subject, and full description are required.' },
        { status: 400 }
      );
    }
    
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }
    
    if (!isValidPhoneNumber(number)) {
      return NextResponse.json({ error: 'Invalid phone number format.' }, { status: 400 });
    }
    
    // Append the contact data to Google Sheets
    await appendContactData(body);
    
    try{
      await connect();
      // Create and save the contact
      const contact = new Contact(body);
      await contact.save();
    }catch (error){
      console.error(error);
    }

    return NextResponse.json({ message: 'Message received successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error sending contact details: ' + body);
    console.error(error);
    return NextResponse.json({ error: 'Error saving contact form data' }, { status: 500 });
  }
}

const isValidEmail = (email: string) => {
  // Basic email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhoneNumber = (phone: string) => {
  // A simple phone number regex (adjust according to your needs)
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
};
