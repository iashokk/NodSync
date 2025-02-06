import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true },
  views: { type: Number, default: 0 },
});

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
