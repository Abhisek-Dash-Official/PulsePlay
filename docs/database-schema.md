# PulsePlay Database Schema (NoSQL - MongoDB)

This document outlines the NoSQL collections and data structures used in the PulsePlay backend to power the media catalog, advanced text-search index, and the algorithmic recommendation engine.

---

## Collections

### 1. media Collection

Stores metadata for all movies and web series, including nested arrays for multiple download links to avoid complex SQL JOINs.

{
"\_id": "ObjectId",
"title": "String",
"plot": "String (Detailed summary for content matching)",
"origin": "String ('bollywood' | 'hollywood')",
"media_type": "String ('movie' | 'series')",
"is_featured": "Bool (true | false)",
"priority": "Number ( 10 is the highest, 0 is default )",
"poster_url": "String (URL for the main vertical movie poster/thumbnail)",
"backdrop_url": "String (Optional: URL for the wide background banner)",
"rating": "Number (Float)",
"release_date": "ISODate",
"watch_link": "String (Embedded streaming URL)",
"download_links": [
{
"resolution_label": "String (e.g., '1080p Web-DL')",
"file_size": "String (e.g., '1.5 GB' or '800 MB')"
"external_url": "String",
}
],
"genres": ["String"],
"cast": ["String"],
"director": "String",
"tags": ["String (Keywords for recommendation algorithms)"],
"created_at": "ISODate"
}

### 2. users Collection

Manages user profiles, tracking explicit intent markers for data analysis.

{
"\_id": "ObjectId",
"username": "String",
"email": "String",
"password_hash": "String (Encrypted)",
"role": "String (e.g., 'user', 'admin')",
"avatar_id": "String (simply '1')",
"watchlist": ["ObjectId (References media._id)"],
"favorites": ["ObjectId (References media._id)"],
"created_at": "ISODate"
}

### 3. user_actions Collection

An immutable log tracking user engagement ('watch' or 'download') to feed the Collaborative Filtering recommendation engine.

{
"\_id": "ObjectId",
"user_id": "ObjectId (References users.\_id)",
"media_id": "ObjectId (References media.\_id)",
"action_type": "String ('watch' | 'download')",
"timestamp": "ISODate"
}

---

## Database Optimization

To enable advanced search and typo tolerance across titles, summaries, and tags simultaneously, the following Full-Text index is applied to the database:

db.media.createIndex({ title: "text", plot: "text", tags: "text" })
