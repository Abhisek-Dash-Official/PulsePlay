# Known Issues and Planned Solutions

This document details the known architectural limitations and system design challenges currently present in the PulsePlay project, along with their technical explanations and planned solutions.

### 1. Activity Logs: Dangling References on Deletion

- **Status:** Open
- **Description:** Activity logs display "Unknown" for the user or media name if the associated user or movie is removed from the system.
- **Technical Cause:** The `UserAction` collection relies on strict MongoDB ObjectIDs referencing the `users` and `medias` collections. When a referenced document is hard-deleted from the database, Mongoose's `populate()` method fails to find the associated data (returning `null`), which causes the frontend to fallback to "Unknown".
- **Planned Solution:**
  1. **Data Denormalization (Log Snapshots):** Instead of relying solely on `ObjectId` references, the `UserAction` schema will be updated to store static, immutable snapshot data at the exact time of the event. We will store the `action_name`, `email`, and `username` directly in the log (e.g., _"admin_xyz promoted user_abc"_). This ensures logs remain historically accurate and instantly readable without requiring complex database joins.
  2. **Implement Soft Deletes:** We will transition from hard deletions (`.findByIdAndDelete()`) to Soft Deletes by introducing an `isDeleted: boolean` flag in the User and Media schemas. This preserves database integrity, allows for easy data recovery if an admin makes a mistake, and prevents application crashes due to broken links.
