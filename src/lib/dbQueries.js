import connectToDatabase from '@/lib/mongodb';
import { Media } from '@/models/Media';
import { User } from '@/models/User';
import { UserAction } from '@/models/UserAction';

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
