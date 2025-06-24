/*
  # Initial Schema for MERN Buddy Learning Tracker

  1. New Tables
    - `topics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `category` (text, enum: mongodb, express, react, nodejs)
      - `status` (text, enum: not-started, learning, completed)
      - `progress` (integer, 0-100)
      - `notes` (text)
      - `code_snippet` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `target_date` (date)
      - `completed` (boolean)
      - `priority` (text, enum: low, medium, high)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `goal_topics`
      - `goal_id` (uuid, references goals)
      - `topic_id` (uuid, references topics)
      - Junction table for many-to-many relationship

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Users can only access their own topics and goals
</sql>

-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('mongodb', 'express', 'react', 'nodejs')),
  status text NOT NULL DEFAULT 'not-started' CHECK (status IN ('not-started', 'learning', 'completed')),
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  notes text DEFAULT '',
  code_snippet text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create goals table
CREATE TABLE IF NOT EXISTS goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  target_date date NOT NULL,
  completed boolean DEFAULT false,
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create junction table for goals and topics
CREATE TABLE IF NOT EXISTS goal_topics (
  goal_id uuid REFERENCES goals(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  PRIMARY KEY (goal_id, topic_id)
);

-- Enable Row Level Security
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_topics ENABLE ROW LEVEL SECURITY;

-- Create policies for topics
CREATE POLICY "Users can view own topics"
  ON topics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own topics"
  ON topics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own topics"
  ON topics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own topics"
  ON topics
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for goals
CREATE POLICY "Users can view own goals"
  ON goals
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals"
  ON goals
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
  ON goals
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals"
  ON goals
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for goal_topics junction table
CREATE POLICY "Users can view own goal_topics"
  ON goal_topics
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM goals 
      WHERE goals.id = goal_topics.goal_id 
      AND goals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own goal_topics"
  ON goal_topics
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM goals 
      WHERE goals.id = goal_topics.goal_id 
      AND goals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own goal_topics"
  ON goal_topics
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM goals 
      WHERE goals.id = goal_topics.goal_id 
      AND goals.user_id = auth.uid()
    )
  );

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_topics_updated_at
  BEFORE UPDATE ON topics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goals_updated_at
  BEFORE UPDATE ON goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();