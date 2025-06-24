export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      topics: {
        Row: {
          id: string
          user_id: string
          name: string
          category: 'mongodb' | 'express' | 'react' | 'nodejs'
          status: 'not-started' | 'learning' | 'completed'
          progress: number
          notes: string
          code_snippet: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          category: 'mongodb' | 'express' | 'react' | 'nodejs'
          status?: 'not-started' | 'learning' | 'completed'
          progress?: number
          notes?: string
          code_snippet?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          category?: 'mongodb' | 'express' | 'react' | 'nodejs'
          status?: 'not-started' | 'learning' | 'completed'
          progress?: number
          notes?: string
          code_snippet?: string
          created_at?: string
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          target_date: string
          completed: boolean
          priority: 'low' | 'medium' | 'high'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string
          target_date: string
          completed?: boolean
          priority?: 'low' | 'medium' | 'high'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          target_date?: string
          completed?: boolean
          priority?: 'low' | 'medium' | 'high'
          created_at?: string
          updated_at?: string
        }
      }
      goal_topics: {
        Row: {
          goal_id: string
          topic_id: string
        }
        Insert: {
          goal_id: string
          topic_id: string
        }
        Update: {
          goal_id?: string
          topic_id?: string
        }
      }
    }
  }
}