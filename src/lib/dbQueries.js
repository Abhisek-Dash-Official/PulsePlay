import connectToDatabase from '@/lib/mongodb';
import { Media } from '@/models/Media';
import { User } from '@/models/User';
import { UserAction } from '@/models/UserAction';
import bcrypt from 'bcryptjs';

const models = {
  "medias": Media,
  "users": User,
  "user_actions": UserAction
};

// Fetch data from a specific collection with optional query and options
export async function fetchData(collectionName, query = {}, options = {}) {
  await connectToDatabase();

  const Model = models[collectionName];
  if (!Model) throw new Error(`Model ${collectionName} not found`);

  const { sort = {}, limit = 0, skip = 0 } = options;

  const data = await Model.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit + 1) // Fetch one extra to check if there's a next page;
    .lean();
  const hasNext = data.length > limit;
  const finalData = hasNext ? data.slice(0, limit) : data;

  return { data: finalData, count: data.length, hasNext };
}

// Check if a user exists by email
export async function isUserExists(email) {
  await connectToDatabase();

  const exists = await User.exists({ email });

  return !!exists;
}

// Verify user credentials and return user data if valid
export async function verifyUserCredentials(email, plainPassword) {
  await connectToDatabase();

  const user = await User.findOne({ email }).select('+password_hash').lean();

  if (!user) return { success: false, error: "User not found" };

  const isMatch = await bcrypt.compare(plainPassword, user.password_hash);

  if (!isMatch) return { success: false, error: "Invalid password" };

  const userData = {
    id: user._id,
    username: user.username,
    email: user.email,
    avatar_id: user.avatar_id,
    role: user.role
  };
  return { success: true, userData };
}