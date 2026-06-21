import connectToDatabase from '@/lib/mongodb';
import { Media } from '@/models/Media';
import { User } from '@/models/User';
import { UserAction } from '@/models/UserAction';

// Map models to their names so we can fetch dynamically
const models = {
  "medias": Media,
  "users": User,
  "user_actions": UserAction
};

export async function fetchData(collectionName, query = {}, options = {}) {
  await connectToDatabase();

  const Model = models[collectionName];
  if (!Model) throw new Error(`Model ${collectionName} not found`);

  const { sort = {}, limit = 0, skip = 0 } = options;

  return await Model.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);
}