import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connect from '@/libs/mongodb';
import User from '../models/User';
export async function POST(req: Request) {
  try {
    // Parse the request body
    const { email, password } = await req.json();

    // Check if both fields are provided
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Connect to MongoDB
    await connect();

    // Find user by email
    const user = await User.findOne({ email });

    // If no user is found, return an error
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 400 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      // Add JWT_SECRET_KEY in your environment variables
    process.env.JWT_SECRET_KEY!,
      { expiresIn: '1h' }
    );

    // Send the token to the client
    return NextResponse.json({ message: 'Login successful', token });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
