// app/api/models/Contact.ts
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false },
    email: { type: String, required: true },
    number: { type: Number, required: true },
    role: { type: String, required: true },
    topic: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
