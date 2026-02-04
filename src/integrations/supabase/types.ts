export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          created_at: string
          hero_image_url: string | null
          hero_subtitle_en: string | null
          hero_subtitle_zh: string | null
          hero_title_en: string | null
          hero_title_zh: string | null
          id: string
          meta_description_en: string | null
          meta_description_zh: string | null
          meta_title_en: string | null
          meta_title_zh: string | null
          mission_body_en: string | null
          mission_body_zh: string | null
          mission_title_en: string | null
          mission_title_zh: string | null
          story_body_en: string | null
          story_body_zh: string | null
          story_image_url: string | null
          story_title_en: string | null
          story_title_zh: string | null
          updated_at: string
          values_title_en: string | null
          values_title_zh: string | null
        }
        Insert: {
          created_at?: string
          hero_image_url?: string | null
          hero_subtitle_en?: string | null
          hero_subtitle_zh?: string | null
          hero_title_en?: string | null
          hero_title_zh?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_zh?: string | null
          meta_title_en?: string | null
          meta_title_zh?: string | null
          mission_body_en?: string | null
          mission_body_zh?: string | null
          mission_title_en?: string | null
          mission_title_zh?: string | null
          story_body_en?: string | null
          story_body_zh?: string | null
          story_image_url?: string | null
          story_title_en?: string | null
          story_title_zh?: string | null
          updated_at?: string
          values_title_en?: string | null
          values_title_zh?: string | null
        }
        Update: {
          created_at?: string
          hero_image_url?: string | null
          hero_subtitle_en?: string | null
          hero_subtitle_zh?: string | null
          hero_title_en?: string | null
          hero_title_zh?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_zh?: string | null
          meta_title_en?: string | null
          meta_title_zh?: string | null
          mission_body_en?: string | null
          mission_body_zh?: string | null
          mission_title_en?: string | null
          mission_title_zh?: string | null
          story_body_en?: string | null
          story_body_zh?: string | null
          story_image_url?: string | null
          story_title_en?: string | null
          story_title_zh?: string | null
          updated_at?: string
          values_title_en?: string | null
          values_title_zh?: string | null
        }
        Relationships: []
      }
      about_values: {
        Row: {
          created_at: string
          description_en: string | null
          description_zh: string | null
          icon: string | null
          id: string
          is_visible: boolean
          sort_order: number
          title_en: string
          title_zh: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          description_zh?: string | null
          icon?: string | null
          id?: string
          is_visible?: boolean
          sort_order?: number
          title_en: string
          title_zh?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string | null
          description_zh?: string | null
          icon?: string | null
          id?: string
          is_visible?: boolean
          sort_order?: number
          title_en?: string
          title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      application_industries: {
        Row: {
          created_at: string
          description_en: string | null
          description_zh: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_visible: boolean
          name_en: string
          name_zh: string | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          description_zh?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          name_en: string
          name_zh?: string | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string | null
          description_zh?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          name_en?: string
          name_zh?: string | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      applications_content: {
        Row: {
          created_at: string
          hero_image_url: string | null
          hero_subtitle_en: string | null
          hero_subtitle_zh: string | null
          hero_title_en: string | null
          hero_title_zh: string | null
          id: string
          intro_body_en: string | null
          intro_body_zh: string | null
          intro_title_en: string | null
          intro_title_zh: string | null
          meta_description_en: string | null
          meta_description_zh: string | null
          meta_title_en: string | null
          meta_title_zh: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          hero_image_url?: string | null
          hero_subtitle_en?: string | null
          hero_subtitle_zh?: string | null
          hero_title_en?: string | null
          hero_title_zh?: string | null
          id?: string
          intro_body_en?: string | null
          intro_body_zh?: string | null
          intro_title_en?: string | null
          intro_title_zh?: string | null
          meta_description_en?: string | null
          meta_description_zh?: string | null
          meta_title_en?: string | null
          meta_title_zh?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          hero_image_url?: string | null
          hero_subtitle_en?: string | null
          hero_subtitle_zh?: string | null
          hero_title_en?: string | null
          hero_title_zh?: string | null
          id?: string
          intro_body_en?: string | null
          intro_body_zh?: string | null
          intro_title_en?: string | null
          intro_title_zh?: string | null
          meta_description_en?: string | null
          meta_description_zh?: string | null
          meta_title_en?: string | null
          meta_title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          answer_box: string | null
          answer_box_zh: string | null
          constraints: string[] | null
          created_at: string
          goals: string | null
          goals_zh: string | null
          id: string
          images: string[] | null
          industry: string | null
          last_ai_generation_at: string | null
          meta_description: string | null
          meta_description_zh: string | null
          meta_title: string | null
          meta_title_zh: string | null
          paint_type: string | null
          part_type: string | null
          published_at: string | null
          slug: string
          solution_scope: string[] | null
          status: Database["public"]["Enums"]["content_status"]
          summary: string | null
          summary_zh: string | null
          title: string
          title_zh: string | null
          updated_at: string
          validation_acceptance: string[] | null
        }
        Insert: {
          answer_box?: string | null
          answer_box_zh?: string | null
          constraints?: string[] | null
          created_at?: string
          goals?: string | null
          goals_zh?: string | null
          id?: string
          images?: string[] | null
          industry?: string | null
          last_ai_generation_at?: string | null
          meta_description?: string | null
          meta_description_zh?: string | null
          meta_title?: string | null
          meta_title_zh?: string | null
          paint_type?: string | null
          part_type?: string | null
          published_at?: string | null
          slug: string
          solution_scope?: string[] | null
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          summary_zh?: string | null
          title: string
          title_zh?: string | null
          updated_at?: string
          validation_acceptance?: string[] | null
        }
        Update: {
          answer_box?: string | null
          answer_box_zh?: string | null
          constraints?: string[] | null
          created_at?: string
          goals?: string | null
          goals_zh?: string | null
          id?: string
          images?: string[] | null
          industry?: string | null
          last_ai_generation_at?: string | null
          meta_description?: string | null
          meta_description_zh?: string | null
          meta_title?: string | null
          meta_title_zh?: string | null
          paint_type?: string | null
          part_type?: string | null
          published_at?: string | null
          slug?: string
          solution_scope?: string[] | null
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          summary_zh?: string | null
          title?: string
          title_zh?: string | null
          updated_at?: string
          validation_acceptance?: string[] | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          last_seen_at: string
          source_page: string | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          last_seen_at?: string
          source_page?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          last_seen_at?: string
          source_page?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      home_banners: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_visible: boolean
          link_text_en: string | null
          link_text_zh: string | null
          link_url: string | null
          sort_order: number
          subtitle_en: string | null
          subtitle_zh: string | null
          title_en: string | null
          title_zh: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_visible?: boolean
          link_text_en?: string | null
          link_text_zh?: string | null
          link_url?: string | null
          sort_order?: number
          subtitle_en?: string | null
          subtitle_zh?: string | null
          title_en?: string | null
          title_zh?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_visible?: boolean
          link_text_en?: string | null
          link_text_zh?: string | null
          link_url?: string | null
          sort_order?: number
          subtitle_en?: string | null
          subtitle_zh?: string | null
          title_en?: string | null
          title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      home_content: {
        Row: {
          created_at: string
          cta_configure_hint: string
          cta_configure_hint_zh: string | null
          cta_consult_hint: string
          cta_consult_hint_zh: string | null
          hero_audience_line: string
          hero_audience_line_zh: string | null
          hero_cta_primary_text_en: string | null
          hero_cta_primary_text_zh: string | null
          hero_cta_secondary_text_en: string | null
          hero_cta_secondary_text_zh: string | null
          hero_image_url: string | null
          hero_subtitle: string
          hero_subtitle_zh: string | null
          hero_title: string
          hero_title_zh: string | null
          id: string
          meta_description_en: string | null
          meta_description_zh: string | null
          meta_title_en: string | null
          meta_title_zh: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_configure_hint?: string
          cta_configure_hint_zh?: string | null
          cta_consult_hint?: string
          cta_consult_hint_zh?: string | null
          hero_audience_line?: string
          hero_audience_line_zh?: string | null
          hero_cta_primary_text_en?: string | null
          hero_cta_primary_text_zh?: string | null
          hero_cta_secondary_text_en?: string | null
          hero_cta_secondary_text_zh?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string
          hero_subtitle_zh?: string | null
          hero_title?: string
          hero_title_zh?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_zh?: string | null
          meta_title_en?: string | null
          meta_title_zh?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_configure_hint?: string
          cta_configure_hint_zh?: string | null
          cta_consult_hint?: string
          cta_consult_hint_zh?: string | null
          hero_audience_line?: string
          hero_audience_line_zh?: string | null
          hero_cta_primary_text_en?: string | null
          hero_cta_primary_text_zh?: string | null
          hero_cta_secondary_text_en?: string | null
          hero_cta_secondary_text_zh?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string
          hero_subtitle_zh?: string | null
          hero_title?: string
          hero_title_zh?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_zh?: string | null
          meta_title_en?: string | null
          meta_title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          company: string | null
          conversation_id: string | null
          created_at: string
          email: string | null
          id: string
          last_emailed_at: string | null
          name: string | null
          phone: string | null
          raw_payload: Json | null
          requirements_summary: string | null
          source: string
          status: string
        }
        Insert: {
          company?: string | null
          conversation_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_emailed_at?: string | null
          name?: string | null
          phone?: string | null
          raw_payload?: Json | null
          requirements_summary?: string | null
          source: string
          status?: string
        }
        Update: {
          company?: string | null
          conversation_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_emailed_at?: string | null
          name?: string | null
          phone?: string | null
          raw_payload?: Json | null
          requirements_summary?: string | null
          source?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_pages: {
        Row: {
          cookie_policy: string | null
          id: string
          privacy_policy: string | null
          terms_of_use: string | null
          updated_at: string
        }
        Insert: {
          cookie_policy?: string | null
          id?: string
          privacy_policy?: string | null
          terms_of_use?: string | null
          updated_at?: string
        }
        Update: {
          cookie_policy?: string | null
          id?: string
          privacy_policy?: string | null
          terms_of_use?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      paint_cells_content: {
        Row: {
          created_at: string
          cta_button_text_en: string | null
          cta_button_text_zh: string | null
          cta_title_en: string | null
          cta_title_zh: string | null
          hero_image_url: string | null
          hero_subtitle_en: string | null
          hero_subtitle_zh: string | null
          hero_title_en: string | null
          hero_title_zh: string | null
          id: string
          meta_description_en: string | null
          meta_description_zh: string | null
          meta_title_en: string | null
          meta_title_zh: string | null
          overview_body_en: string | null
          overview_body_zh: string | null
          overview_title_en: string | null
          overview_title_zh: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_button_text_en?: string | null
          cta_button_text_zh?: string | null
          cta_title_en?: string | null
          cta_title_zh?: string | null
          hero_image_url?: string | null
          hero_subtitle_en?: string | null
          hero_subtitle_zh?: string | null
          hero_title_en?: string | null
          hero_title_zh?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_zh?: string | null
          meta_title_en?: string | null
          meta_title_zh?: string | null
          overview_body_en?: string | null
          overview_body_zh?: string | null
          overview_title_en?: string | null
          overview_title_zh?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_button_text_en?: string | null
          cta_button_text_zh?: string | null
          cta_title_en?: string | null
          cta_title_zh?: string | null
          hero_image_url?: string | null
          hero_subtitle_en?: string | null
          hero_subtitle_zh?: string | null
          hero_title_en?: string | null
          hero_title_zh?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_zh?: string | null
          meta_title_en?: string | null
          meta_title_zh?: string | null
          overview_body_en?: string | null
          overview_body_zh?: string | null
          overview_title_en?: string | null
          overview_title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      paint_cells_features: {
        Row: {
          created_at: string
          description_en: string | null
          description_zh: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_visible: boolean
          sort_order: number
          title_en: string
          title_zh: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string | null
          description_zh?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          sort_order?: number
          title_en: string
          title_zh?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string | null
          description_zh?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean
          sort_order?: number
          title_en?: string
          title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quote_content: {
        Row: {
          created_at: string
          form_intro_en: string | null
          form_intro_zh: string | null
          hero_subtitle_en: string | null
          hero_subtitle_zh: string | null
          hero_title_en: string | null
          hero_title_zh: string | null
          id: string
          meta_description_en: string | null
          meta_description_zh: string | null
          meta_title_en: string | null
          meta_title_zh: string | null
          submit_button_text_en: string | null
          submit_button_text_zh: string | null
          success_message_en: string | null
          success_message_zh: string | null
          success_title_en: string | null
          success_title_zh: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          form_intro_en?: string | null
          form_intro_zh?: string | null
          hero_subtitle_en?: string | null
          hero_subtitle_zh?: string | null
          hero_title_en?: string | null
          hero_title_zh?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_zh?: string | null
          meta_title_en?: string | null
          meta_title_zh?: string | null
          submit_button_text_en?: string | null
          submit_button_text_zh?: string | null
          success_message_en?: string | null
          success_message_zh?: string | null
          success_title_en?: string | null
          success_title_zh?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          form_intro_en?: string | null
          form_intro_zh?: string | null
          hero_subtitle_en?: string | null
          hero_subtitle_zh?: string | null
          hero_title_en?: string | null
          hero_title_zh?: string | null
          id?: string
          meta_description_en?: string | null
          meta_description_zh?: string | null
          meta_title_en?: string | null
          meta_title_zh?: string | null
          submit_button_text_en?: string | null
          submit_button_text_zh?: string | null
          success_message_en?: string | null
          success_message_zh?: string | null
          success_title_en?: string | null
          success_title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      rate_limit_tracking: {
        Row: {
          created_at: string
          endpoint: string
          id: string
          identifier: string
          request_count: number
          updated_at: string
          window_start: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: string
          identifier: string
          request_count?: number
          updated_at?: string
          window_start?: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: string
          identifier?: string
          request_count?: number
          updated_at?: string
          window_start?: string
        }
        Relationships: []
      }
      resources_posts: {
        Row: {
          answer_box: string | null
          answer_box_zh: string | null
          body: string | null
          body_zh: string | null
          category: Database["public"]["Enums"]["resource_category"] | null
          created_at: string
          id: string
          last_ai_generation_at: string | null
          meta_description: string | null
          meta_description_zh: string | null
          meta_title: string | null
          meta_title_zh: string | null
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          summary: string | null
          summary_zh: string | null
          title: string
          title_zh: string | null
          updated_at: string
        }
        Insert: {
          answer_box?: string | null
          answer_box_zh?: string | null
          body?: string | null
          body_zh?: string | null
          category?: Database["public"]["Enums"]["resource_category"] | null
          created_at?: string
          id?: string
          last_ai_generation_at?: string | null
          meta_description?: string | null
          meta_description_zh?: string | null
          meta_title?: string | null
          meta_title_zh?: string | null
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          summary_zh?: string | null
          title: string
          title_zh?: string | null
          updated_at?: string
        }
        Update: {
          answer_box?: string | null
          answer_box_zh?: string | null
          body?: string | null
          body_zh?: string | null
          category?: Database["public"]["Enums"]["resource_category"] | null
          created_at?: string
          id?: string
          last_ai_generation_at?: string | null
          meta_description?: string | null
          meta_description_zh?: string | null
          meta_title?: string | null
          meta_title_zh?: string | null
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          summary_zh?: string | null
          title?: string
          title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          contact_address_en: string | null
          contact_address_zh: string | null
          contact_email: string | null
          contact_phone: string | null
          copyright_text_en: string | null
          copyright_text_zh: string | null
          created_at: string
          footer_tagline_en: string | null
          footer_tagline_zh: string | null
          id: string
          linkedin_url: string | null
          updated_at: string
          wechat_id: string | null
        }
        Insert: {
          contact_address_en?: string | null
          contact_address_zh?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          copyright_text_en?: string | null
          copyright_text_zh?: string | null
          created_at?: string
          footer_tagline_en?: string | null
          footer_tagline_zh?: string | null
          id?: string
          linkedin_url?: string | null
          updated_at?: string
          wechat_id?: string | null
        }
        Update: {
          contact_address_en?: string | null
          contact_address_zh?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          copyright_text_en?: string | null
          copyright_text_zh?: string | null
          created_at?: string
          footer_tagline_en?: string | null
          footer_tagline_zh?: string | null
          id?: string
          linkedin_url?: string | null
          updated_at?: string
          wechat_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      why_cards: {
        Row: {
          card_gray_line: string
          card_gray_line_zh: string | null
          created_at: string
          id: string
          is_visible: boolean
          modal_engineering_anchor: string | null
          modal_engineering_anchor_zh: string | null
          modal_key_constraints: string[] | null
          modal_key_constraints_zh: string[] | null
          modal_typical_use_case: string | null
          modal_typical_use_case_zh: string | null
          modal_what_we_need_to_assess: string[] | null
          modal_what_we_need_to_assess_zh: string[] | null
          sort_order: number
          title: string
          title_zh: string | null
          updated_at: string
        }
        Insert: {
          card_gray_line: string
          card_gray_line_zh?: string | null
          created_at?: string
          id?: string
          is_visible?: boolean
          modal_engineering_anchor?: string | null
          modal_engineering_anchor_zh?: string | null
          modal_key_constraints?: string[] | null
          modal_key_constraints_zh?: string[] | null
          modal_typical_use_case?: string | null
          modal_typical_use_case_zh?: string | null
          modal_what_we_need_to_assess?: string[] | null
          modal_what_we_need_to_assess_zh?: string[] | null
          sort_order?: number
          title: string
          title_zh?: string | null
          updated_at?: string
        }
        Update: {
          card_gray_line?: string
          card_gray_line_zh?: string | null
          created_at?: string
          id?: string
          is_visible?: boolean
          modal_engineering_anchor?: string | null
          modal_engineering_anchor_zh?: string | null
          modal_key_constraints?: string[] | null
          modal_key_constraints_zh?: string[] | null
          modal_typical_use_case?: string | null
          modal_typical_use_case_zh?: string | null
          modal_what_we_need_to_assess?: string[] | null
          modal_what_we_need_to_assess_zh?: string[] | null
          sort_order?: number
          title?: string
          title_zh?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_editor: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor"
      content_status: "draft" | "review" | "published"
      resource_category: "learning-center" | "tools-templates" | "glossary"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
      content_status: ["draft", "review", "published"],
      resource_category: ["learning-center", "tools-templates", "glossary"],
    },
  },
} as const
