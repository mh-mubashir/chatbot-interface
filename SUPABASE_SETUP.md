# Supabase Setup Instructions

This guide will help you set up Supabase as the central database for your chatbot interface.

## Prerequisites

- A Supabase account (sign up at https://supabase.com if you don't have one)
- Access to your Supabase project dashboard

---

## Step 1: Create Database Tables

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the SQL schema below
5. Click **Run** to execute the SQL

### SQL Schema

```sql
-- ============================================
-- Table: chatbot_nodes
-- Stores all chatbot flow nodes
-- ============================================
CREATE TABLE chatbot_nodes (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  options JSONB,
  flow_type TEXT NOT NULL CHECK (flow_type IN ('undergraduate', 'graduate', 'shared')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries by flow_type
CREATE INDEX idx_chatbot_nodes_flow_type ON chatbot_nodes(flow_type);

-- Add index for faster queries by type
CREATE INDEX idx_chatbot_nodes_type ON chatbot_nodes(type);

-- ============================================
-- Table: chatbot_nodes_history
-- Stores version history of all node changes
-- ============================================
CREATE TABLE chatbot_nodes_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  node_id TEXT NOT NULL,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  options JSONB,
  flow_type TEXT NOT NULL,
  changed_by TEXT,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries by node_id
CREATE INDEX idx_chatbot_nodes_history_node_id ON chatbot_nodes_history(node_id);

-- Add index for faster queries by changed_at
CREATE INDEX idx_chatbot_nodes_history_changed_at ON chatbot_nodes_history(changed_at DESC);

-- ============================================
-- Function: Update updated_at timestamp
-- Automatically updates the updated_at field
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_chatbot_nodes_updated_at
  BEFORE UPDATE ON chatbot_nodes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Row Level Security (RLS) Policies
-- Allows public read/write access (adjust as needed)
-- ============================================

-- Enable RLS
ALTER TABLE chatbot_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_nodes_history ENABLE ROW LEVEL SECURITY;

-- Allow anonymous/authenticated users to read all nodes
CREATE POLICY "Allow public read access to chatbot_nodes"
  ON chatbot_nodes
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anonymous/authenticated users to insert nodes
CREATE POLICY "Allow public insert access to chatbot_nodes"
  ON chatbot_nodes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anonymous/authenticated users to update nodes
CREATE POLICY "Allow public update access to chatbot_nodes"
  ON chatbot_nodes
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anonymous/authenticated users to delete nodes
CREATE POLICY "Allow public delete access to chatbot_nodes"
  ON chatbot_nodes
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Allow anonymous/authenticated users to read history
CREATE POLICY "Allow public read access to chatbot_nodes_history"
  ON chatbot_nodes_history
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anonymous/authenticated users to insert history
CREATE POLICY "Allow public insert access to chatbot_nodes_history"
  ON chatbot_nodes_history
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Add helpful comments
COMMENT ON TABLE chatbot_nodes IS 'Stores all chatbot conversation flow nodes';
COMMENT ON TABLE chatbot_nodes_history IS 'Stores version history of chatbot node changes';
COMMENT ON COLUMN chatbot_nodes.id IS 'Unique identifier for the node (e.g., entry, undergrad_main)';
COMMENT ON COLUMN chatbot_nodes.type IS 'Type of node: entry, category, sub_option, response, satisfaction, end';
COMMENT ON COLUMN chatbot_nodes.message IS 'The message displayed to users';
COMMENT ON COLUMN chatbot_nodes.options IS 'Array of options with label and next node ID';
COMMENT ON COLUMN chatbot_nodes.flow_type IS 'Flow classification: undergraduate, graduate, or shared';
```

---

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, click on **Settings** (gear icon) in the left sidebar
2. Click on **API** under Project Settings
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon public** key (a long string starting with `eyJ...`)

---

## Step 3: Configure Environment Variables

1. In your project root, create a file named `.env.local` (if it doesn't exist)
2. Add the following lines, replacing the placeholders with your actual values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Example:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Save the file

⚠️ **Important:** Never commit `.env.local` to version control! It should be in your `.gitignore` file.

---

## Step 4: Run the Migration Script

Now that your database is set up and configured, populate it with your existing chatbot flows:

```bash
npm run migrate
```

Or manually:

```bash
npx tsx scripts/migrate-to-supabase.ts
```

This script will:
- Read all nodes from your `flows.ts` file
- Upload them to Supabase
- Show you a progress report

**Expected output:**
```
🚀 Starting migration to Supabase...

📊 Found 150+ nodes to migrate

📝 Migrating node: entry (shared)
   ✅ Successfully migrated: entry
📝 Migrating node: undergrad_main (undergraduate)
   ✅ Successfully migrated: undergrad_main
...

============================================================
📊 Migration Summary:
   ✅ Successful: 150
   ❌ Failed: 0
   📈 Total: 150
============================================================

🎉 Migration completed successfully!
👉 You can now use the admin panel to manage your chatbot flows.
```

---

## Step 5: Verify the Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Check the Console Logs:**
   - Open your browser's Developer Tools (F12)
   - Go to the Console tab
   - You should see: `✅ Chatbot data loaded from SUPABASE`

3. **Test the Admin Panel:**
   - Navigate to `http://localhost:3000/admin`
   - You should see: `✅ Connected to SUPABASE - All changes are saved to database`
   - Try editing a node and saving it

4. **Test the Chatbot:**
   - Navigate to `http://localhost:3000`
   - Open the chatbot widget
   - Verify that it displays the correct messages

---

## Step 6: Add Migration Script to package.json (Optional)

Add this to your `package.json` scripts section for easier migration:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "migrate": "ts-node scripts/migrate-to-supabase.ts"
  }
}
```

---

## Troubleshooting

### Issue: "Supabase not configured" message

**Solution:** 
- Check that `.env.local` exists and has the correct values
- Restart your development server after adding environment variables
- Verify that variable names start with `NEXT_PUBLIC_`

### Issue: Migration script fails with 401 Unauthorized

**Solution:**
- Verify your `SUPABASE_ANON_KEY` is correct
- Check that RLS policies are set up correctly (see Step 1)

### Issue: "Failed to migrate" errors during migration

**Solution:**
- Check that the SQL schema was executed successfully
- Verify table names match exactly: `chatbot_nodes` and `chatbot_nodes_history`
- Check Supabase logs in the dashboard under **Logs** → **Postgres Logs**

### Issue: Changes in admin panel don't appear in chatbot

**Solution:**
- Refresh the chatbot page (the data loads on mount)
- Check browser console for error messages
- Verify the API routes are accessible at `/api/chatbot/nodes`

---

## Data Flow Architecture

```
┌─────────────────┐
│  Admin Panel    │
│  (/admin)       │
└────────┬────────┘
         │
         │ PUT /api/chatbot/nodes/{id}
         │ POST /api/chatbot/nodes
         │ DELETE /api/chatbot/nodes/{id}
         │
         ▼
┌─────────────────────────┐
│  Next.js API Routes     │
│  (src/app/api/chatbot/) │
└────────┬────────────────┘
         │
         │ Supabase Client
         │
         ▼
┌─────────────────────────┐
│  Supabase Database      │
│  - chatbot_nodes        │
│  - chatbot_nodes_history│
└────────┬────────────────┘
         │
         │ GET /api/chatbot/nodes
         │
         ▼
┌─────────────────┐
│  Chatbot Widget │
│  (Frontend)     │
└─────────────────┘
```

---

## Security Considerations

### Current Setup (Development)

The current RLS policies allow **public read/write access** to all nodes. This is fine for:
- Development environments
- Internal tools
- Trusted user bases

### Production Recommendations

For production, consider:

1. **Add Authentication to Admin Panel:**
   ```sql
   -- Example: Only allow authenticated users to modify nodes
   DROP POLICY "Allow public update access to chatbot_nodes" ON chatbot_nodes;
   
   CREATE POLICY "Allow authenticated update access to chatbot_nodes"
     ON chatbot_nodes
     FOR UPDATE
     TO authenticated
     USING (true)
     WITH CHECK (true);
   ```

2. **Track Who Made Changes:**
   - Implement user authentication (NextAuth.js, Supabase Auth, etc.)
   - Pass user ID to the `changed_by` field in history

3. **Read-Only Public Access:**
   ```sql
   -- Allow public to read, but only authenticated users to write
   CREATE POLICY "Allow public read-only access to chatbot_nodes"
     ON chatbot_nodes
     FOR SELECT
     TO anon
     USING (true);
   ```

---

## Version History Features

Every time you update a node through the admin panel, the previous version is automatically saved to `chatbot_nodes_history`.

### View History (Future Enhancement)

You can add a history viewer in the admin panel by querying:

```typescript
const response = await fetch(`/api/chatbot/history/${nodeId}`);
const { data } = await response.json();
// data contains all previous versions of the node
```

---

## Next Steps

✅ Database tables created  
✅ Environment variables configured  
✅ Migration completed  
✅ Admin panel connected to Supabase  
✅ Chatbot reading from Supabase  

**You're all set!** 🎉

Now you can:
- Edit chatbot flows through the admin panel at `/admin`
- Changes are immediately available after page refresh
- All changes are tracked in version history
- No need to redeploy to update chatbot content

---

## Support

If you encounter issues:
1. Check the console logs (browser and server)
2. Review the Supabase dashboard logs
3. Verify your environment variables
4. Ensure the migration completed successfully

**Happy chatbot building!** 🤖

