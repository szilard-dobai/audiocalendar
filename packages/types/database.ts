export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      google_calendars: {
        Row: {
          id: string
          userId: string
        }
        Insert: {
          id: string
          userId: string
        }
        Update: {
          id?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "google_calendars_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      google_tokens: {
        Row: {
          accessToken: string | null
          expiresAt: number | null
          expiresIn: number | null
          lastUpdatedAt: string
          redirectUri: string | null
          refreshToken: string | null
          userId: string
        }
        Insert: {
          accessToken?: string | null
          expiresAt?: number | null
          expiresIn?: number | null
          lastUpdatedAt?: string
          redirectUri?: string | null
          refreshToken?: string | null
          userId: string
        }
        Update: {
          accessToken?: string | null
          expiresAt?: number | null
          expiresIn?: number | null
          lastUpdatedAt?: string
          redirectUri?: string | null
          refreshToken?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "google_tokens_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      history: {
        Row: {
          addedToCalendar: boolean
          album: string
          albumId: string
          albumImage: string
          albumUrl: string
          artist: string
          artistId: string
          artistUrl: string
          contextUrl: string | null
          id: string
          playedAt: string
          song: string
          songDuration: number
          songId: string
          songPreviewUrl: string | null
          songUrl: string
          userId: string
        }
        Insert: {
          addedToCalendar?: boolean
          album: string
          albumId: string
          albumImage: string
          albumUrl: string
          artist: string
          artistId: string
          artistUrl: string
          contextUrl?: string | null
          id?: string
          playedAt: string
          song: string
          songDuration: number
          songId: string
          songPreviewUrl?: string | null
          songUrl: string
          userId: string
        }
        Update: {
          addedToCalendar?: boolean
          album?: string
          albumId?: string
          albumImage?: string
          albumUrl?: string
          artist?: string
          artistId?: string
          artistUrl?: string
          contextUrl?: string | null
          id?: string
          playedAt?: string
          song?: string
          songDuration?: number
          songId?: string
          songPreviewUrl?: string | null
          songUrl?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "history_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          createdAt: string
          id: string
          message: string
          resolved: boolean
          type: Database["public"]["Enums"]["notification_type"]
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          message: string
          resolved?: boolean
          type?: Database["public"]["Enums"]["notification_type"]
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          message?: string
          resolved?: boolean
          type?: Database["public"]["Enums"]["notification_type"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      spotify_tokens: {
        Row: {
          accessToken: string | null
          expiresAt: number | null
          expiresIn: number | null
          lastUpdatedAt: string
          refreshToken: string | null
          userId: string
        }
        Insert: {
          accessToken?: string | null
          expiresAt?: number | null
          expiresIn?: number | null
          lastUpdatedAt?: string
          refreshToken?: string | null
          userId: string
        }
        Update: {
          accessToken?: string | null
          expiresAt?: number | null
          expiresIn?: number | null
          lastUpdatedAt?: string
          refreshToken?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "spotify_tokens_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_preferences: {
        Row: {
          emailNotifications: boolean
          id: string
        }
        Insert: {
          emailNotifications?: boolean
          id: string
        }
        Update: {
          emailNotifications?: boolean
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      latest_played_songs: {
        Row: {
          album: string | null
          albumId: string | null
          albumImage: string | null
          albumUrl: string | null
          artist: string | null
          artistId: string | null
          artistUrl: string | null
          contextUrl: string | null
          id: string | null
          playedAt: string | null
          song: string | null
          songDuration: number | null
          songId: string | null
          songPreviewUrl: string | null
          songUrl: string | null
          userId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "history_userId_fkey"
            columns: ["userId"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      notification_type:
        | "INVALID_SPOTIFY_REFRESH_TOKEN"
        | "INVALID_GOOGLE_REFRESH_TOKEN"
        | "OTHER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
