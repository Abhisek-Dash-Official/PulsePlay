import connectToDatabase from '@/lib/mongodb';
import { Media } from '@/models/Media';
import { User } from '@/models/User';
import { UserAction } from '@/models/UserAction';
import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose';
import { MAX_WATCHLIST_SIZE, MAX_FAVOURITES_SIZE } from '@/lib/server-config';
import mongoose from 'mongoose';

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

  return { data: finalData, count: finalData.length, hasNext };
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
    role: user.role,
    watchlist: user.watchlist,
    favorites: user.favorites
  };
  return { success: true, userData };
}

// Function to get UserID from token
export async function getUserIdFromToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return payload.userId;
}

// Function to get user data form token
export async function getUserDataFromToken(token) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return { "userId": payload.userId, "role": payload.role };
}

// Function for generic updates (Watchlist, Favorites)
export async function updateUserArray(userId, field, mediaId) {
  await connectToDatabase();

  const user = await User.findById(userId).select(field);

  const limit = (field === 'watchlist') ? MAX_WATCHLIST_SIZE : MAX_FAVOURITES_SIZE;

  if (user[field].includes(mediaId)) {
    throw new Error('ALREADY_EXISTS');
  }

  if (user[field].length >= limit) {
    throw new Error('LIMIT_EXCEEDED');
  }

  return await User.findByIdAndUpdate(
    userId,
    { $addToSet: { [field]: mediaId } },
    { returnDocument: 'after', runValidators: true }
  );
}

// Function to get paginated user lists (Watchlist, Favorites)
export async function getUserList(userId, field, page = 1, limit = 10) {
  await connectToDatabase();
  const skip = (page - 1) * limit;

  // field will be 'watchlist' or 'favorites'
  const user = await User.findById(userId)
    .populate({
      path: field,
      options: { limit: limit + 1, skip: skip }
    })
    .lean();

  const items = user[field] || [];
  const hasNext = items.length > limit;
  const data = hasNext ? items.slice(0, limit) : items;

  return { data, count: data.length, hasNext };
}

// Get User Profile by ID
export async function getUserProfile(userId) {
  await connectToDatabase();
  return await User.findById(userId).select('-password_hash').lean();
}

// Delete a movie by ID
export async function deleteMovie(id) {
  await connectToDatabase();
  return await Media.findByIdAndDelete(id);
}

// Edit a movie by ID
export async function updateMovie(id, updateData) {
  await connectToDatabase();

  const updated = await Media.findByIdAndUpdate(
    id,
    { $set: updateData },
    { returnDocument: 'after', runValidators: true }
  );

  return updated;
}

// Create a new movie
export async function createMovie(movieData) {
  await connectToDatabase();
  const newMovie = new Media(movieData);
  return await newMovie.save();
}

// Function for robust ObjectId conversion
const toObjectId = (id) => {
  if (!id) return null;

  if (id instanceof mongoose.Types.ObjectId) return id;

  if (id.buffer && id.buffer instanceof Object) {
    const hexString = Object.values(id.buffer).map(b => b.toString(16).padStart(2, '0')).join('');
    return new mongoose.Types.ObjectId(hexString);
  }

  return new mongoose.Types.ObjectId(id);
};

// Log user/admin actions
export async function logUserAction({ user_id, media_id, action_type, role }) {
  try {
    await connectToDatabase();

    const newAction = await UserAction.create({
      user_id: toObjectId(user_id),
      media_id: toObjectId(media_id),
      action_type,
      role: role || 'user',
      timestamp: new Date()
    });

    return { success: true, data: newAction };
  } catch (error) {
    console.error("Failed to log action:", error);
    return { success: false, error: error.message };
  }
}

// Update User Role
export async function updateUserRole(userId, newRole) {
  await connectToDatabase();
  return await User.findByIdAndUpdate(
    userId,
    { role: newRole },
    { returnDocument: 'after' }
  );
}

// Delete User
export async function deleteUser(userId) {
  await connectToDatabase();
  return await User.findByIdAndDelete(userId);
}

// Get User Actions
export async function getUserAuditLogs(userId) {
  await connectToDatabase();
  return await UserAction.find({ user_id: userId })
    .populate('media_id', 'title poster_url media_type')
    .sort({ timestamp: -1 })
    .lean();
}

// Create new user
export async function createUser({ username, email, password, role, avatar_id = "default" }) {
  await connectToDatabase();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password_hash: hashedPassword,
    role,
    avatar_id
  });
  return newUser;
}