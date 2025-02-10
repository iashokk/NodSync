// app/api/sign-up/route.ts
import connect from '@/libs/mongodb';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  let userObject;
  try {
    // Parse the request body
    const { name, organization, email, password } = await req.json();

    // Connect to MongoDB
    await connect();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'Email already in use' }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    userObject = {
      name,
      organization,
      email,
      password: hashedPassword,
    };

    // Create a new user
    const newUser = new User(userObject);

    // Save the user to the database
    await newUser.save();

    return new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      { status: 201 }
    );
  } catch (error) {

    console.error("Error registering new user: " + userObject);
    console.error(error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return new Response(
      JSON.stringify({ message: errorMessage, error: errorMessage }),
      
      { status: 500 }, 
      
    );
  }
}
