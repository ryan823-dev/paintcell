export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      about_content: {
            Row: {
              id: string
              hero_title_en: string | null
              hero_subtitle_en: string | null
              hero_image_url: string | null
              mission_title_en: string | null
              mission_body_en: string | null
              story_title_en: string | null
              story_body_en: string | null
              story_image_url: string | null
              values_title_en: string | null
              meta_title_en: string | null
              meta_description_en: string | null
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              hero_title_en?: string | null
              hero_subtitle_en?: string | null
              hero_image_url?: string | null
              mission_title_en?: string | null
              mission_body_en?: string | null
              story_title_en?: string | null
              story_body_en?: string | null
              story_image_url?: string | null
              values_title_en?: string | null
              meta_title_en?: string | null
              meta_description_en?: string | null
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              hero_title_en?: string | null
              hero_subtitle_en?: string | null
              hero_image_url?: string | null
              mission_title_en?: string | null
              mission_body_en?: string | null
              story_title_en?: string | null
              story_body_en?: string | null
              story_image_url?: string | null
              values_title_en?: string | null
              meta_title_en?: string | null
              meta_description_en?: string | null
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      about_values: {
            Row: {
              id: string
              title_en: string
              description_en: string | null
              icon: string | null
              sort_order: number
              is_visible: boolean
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              title_en: string
              description_en?: string | null
              icon?: string | null
              sort_order?: number
              is_visible?: boolean
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              title_en?: string
              description_en?: string | null
              icon?: string | null
              sort_order?: number
              is_visible?: boolean
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      application_industries: {
            Row: {
              id: string
              name_en: string
              description_en: string | null
              image_url: string | null
              icon: string | null
              sort_order: number
              is_visible: boolean
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              name_en: string
              description_en?: string | null
              image_url?: string | null
              icon?: string | null
              sort_order?: number
              is_visible?: boolean
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              name_en?: string
              description_en?: string | null
              image_url?: string | null
              icon?: string | null
              sort_order?: number
              is_visible?: boolean
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      applications_content: {
            Row: {
              id: string
              hero_title_en: string | null
              hero_subtitle_en: string | null
              hero_image_url: string | null
              intro_title_en: string | null
              intro_body_en: string | null
              meta_title_en: string | null
              meta_description_en: string | null
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              hero_title_en?: string | null
              hero_subtitle_en?: string | null
              hero_image_url?: string | null
              intro_title_en?: string | null
              intro_body_en?: string | null
              meta_title_en?: string | null
              meta_description_en?: string | null
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              hero_title_en?: string | null
              hero_subtitle_en?: string | null
              hero_image_url?: string | null
              intro_title_en?: string | null
              intro_body_en?: string | null
              meta_title_en?: string | null
              meta_description_en?: string | null
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      case_studies: {
            Row: {
              id: string
              slug: string
              title: string
              summary: string | null
              industry: string | null
              part_type: string | null
              paint_type: string | null
              goals: string | null
              constraints: string[] | null
              solution_scope: string[] | null
              validation_acceptance: string[] | null
              images: string[] | null
              answer_box: string | null
              meta_title: string | null
              meta_description: string | null
              status: Database["public"]["Enums"]["content_status"]
              published_at: string | null
              last_ai_generation_at: string | null
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              slug: string
              title: string
              summary?: string | null
              industry?: string | null
              part_type?: string | null
              paint_type?: string | null
              goals?: string | null
              constraints?: string[] | null
              solution_scope?: string[] | null
              validation_acceptance?: string[] | null
              images?: string[] | null
              answer_box?: string | null
              meta_title?: string | null
              meta_description?: string | null
              status?: Database["public"]["Enums"]["content_status"]
              published_at?: string | null
              last_ai_generation_at?: string | null
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              slug?: string
              title?: string
              summary?: string | null
              industry?: string | null
              part_type?: string | null
              paint_type?: string | null
              goals?: string | null
              constraints?: string[] | null
              solution_scope?: string[] | null
              validation_acceptance?: string[] | null
              images?: string[] | null
              answer_box?: string | null
              meta_title?: string | null
              meta_description?: string | null
              status?: Database["public"]["Enums"]["content_status"]
              published_at?: string | null
              last_ai_generation_at?: string | null
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      chat_messages: {
            Row: {
              id: string
              conversation_id: string
              role: string
              content: string
              created_at: string
            }
            Insert: {
              id?: string
              conversation_id: string
              role: string
              content: string
              created_at?: string
            }
            Update: {
              id?: string
              conversation_id?: string
              role?: string
              content?: string
              created_at?: string
            }
      Relationships: [
            {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
            }
        ]
      },
      chat_sessions: {
            Row: {
              id: string
              source_page: string | null
              utm_source: string | null
              utm_medium: string | null
              utm_campaign: string | null
              last_seen_at: string
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              source_page?: string | null
              utm_source?: string | null
              utm_medium?: string | null
              utm_campaign?: string | null
              last_seen_at?: string
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              source_page?: string | null
              utm_source?: string | null
              utm_medium?: string | null
              utm_campaign?: string | null
              last_seen_at?: string
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      faq_pages: {
            Row: {
              id: string
              slug: string
              title: string
              summary: string | null
              faqs: Json | null
              meta_title: string | null
              meta_description: string | null
              status: Database["public"]["Enums"]["content_status"]
              published_at: string | null
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              slug: string
              title: string
              summary?: string | null
              faqs?: Json | null
              meta_title?: string | null
              meta_description?: string | null
              status?: Database["public"]["Enums"]["content_status"]
              published_at?: string | null
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              slug?: string
              title?: string
              summary?: string | null
              faqs?: Json | null
              meta_title?: string | null
              meta_description?: string | null
              status?: Database["public"]["Enums"]["content_status"]
              published_at?: string | null
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      home_banners: {
            Row: {
              id: string
              title_en: string | null
              subtitle_en: string | null
              image_url: string
              link_url: string | null
              link_text_en: string | null
              sort_order: number
              is_visible: boolean
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              title_en?: string | null
              subtitle_en?: string | null
              image_url: string
              link_url?: string | null
              link_text_en?: string | null
              sort_order?: number
              is_visible?: boolean
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              title_en?: string | null
              subtitle_en?: string | null
              image_url?: string
              link_url?: string | null
              link_text_en?: string | null
              sort_order?: number
              is_visible?: boolean
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      home_content: {
            Row: {
              id: string
              hero_title: string
              hero_subtitle: string
              hero_audience_line: string
              hero_image_url: string | null
              cta_configure_hint: string
              cta_consult_hint: string
              hero_cta_primary_text_en: string | null
              hero_cta_secondary_text_en: string | null
              meta_title_en: string | null
              meta_description_en: string | null
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              hero_title?: string
              hero_subtitle?: string
              hero_audience_line?: string
              hero_image_url?: string | null
              cta_configure_hint?: string
              cta_consult_hint?: string
              hero_cta_primary_text_en?: string | null
              hero_cta_secondary_text_en?: string | null
              meta_title_en?: string | null
              meta_description_en?: string | null
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              hero_title?: string
              hero_subtitle?: string
              hero_audience_line?: string
              hero_image_url?: string | null
              cta_configure_hint?: string
              cta_consult_hint?: string
              hero_cta_primary_text_en?: string | null
              hero_cta_secondary_text_en?: string | null
              meta_title_en?: string | null
              meta_description_en?: string | null
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      industry_pages: {
            Row: {
              id: string
              slug: string
              status: Database["public"]["Enums"]["content_status"]
              sort_order: number
              coming_soon: boolean
              industry_label: string
              meta_title: string | null
              meta_description: string | null
              hero_title: string | null
              hero_subtitle: string | null
              hero_image: string | null
              cta_text: string | null
              example_prompt: string | null
              ai_context: Json | null
              pain_points: Json | null
              system_modules: Json | null
              production_config: Json | null
              roi_metrics: Json | null
              case_references: Json | null
              faqs: Json | null
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              slug: string
              status?: Database["public"]["Enums"]["content_status"]
              sort_order?: number
              coming_soon?: boolean
              industry_label: string
              meta_title?: string | null
              meta_description?: string | null
              hero_title?: string | null
              hero_subtitle?: string | null
              hero_image?: string | null
              cta_text?: string | null
              example_prompt?: string | null
              ai_context?: Json | null
              pain_points?: Json | null
              system_modules?: Json | null
              production_config?: Json | null
              roi_metrics?: Json | null
              case_references?: Json | null
              faqs?: Json | null
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              slug?: string
              status?: Database["public"]["Enums"]["content_status"]
              sort_order?: number
              coming_soon?: boolean
              industry_label?: string
              meta_title?: string | null
              meta_description?: string | null
              hero_title?: string | null
              hero_subtitle?: string | null
              hero_image?: string | null
              cta_text?: string | null
              example_prompt?: string | null
              ai_context?: Json | null
              pain_points?: Json | null
              system_modules?: Json | null
              production_config?: Json | null
              roi_metrics?: Json | null
              case_references?: Json | null
              faqs?: Json | null
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      leads: {
            Row: {
              id: string
              name: string | null
              email: string | null
              phone: string | null
              company: string | null
              source: string
              status: string
              requirements_summary: string | null
              raw_payload: Json | null
              conversation_id: string | null
              last_emailed_at: string | null
              created_at: string
            }
            Insert: {
              id?: string
              name?: string | null
              email?: string | null
              phone?: string | null
              company?: string | null
              source: string
              status?: string
              requirements_summary?: string | null
              raw_payload?: Json | null
              conversation_id?: string | null
              last_emailed_at?: string | null
              created_at?: string
            }
            Update: {
              id?: string
              name?: string | null
              email?: string | null
              phone?: string | null
              company?: string | null
              source?: string
              status?: string
              requirements_summary?: string | null
              raw_payload?: Json | null
              conversation_id?: string | null
              last_emailed_at?: string | null
              created_at?: string
            }
      Relationships: [
            {
            foreignKeyName: "leads_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
            }
        ]
      },
      legal_pages: {
            Row: {
              id: string
              privacy_policy: string | null
              terms_of_use: string | null
              cookie_policy: string | null
              updated_at: string
            }
            Insert: {
              id?: string
              privacy_policy?: string | null
              terms_of_use?: string | null
              cookie_policy?: string | null
              updated_at?: string
            }
            Update: {
              id?: string
              privacy_policy?: string | null
              terms_of_use?: string | null
              cookie_policy?: string | null
              updated_at?: string
            }
      Relationships: []
      },
      paint_cells_content: {
            Row: {
              id: string
              hero_title_en: string | null
              hero_subtitle_en: string | null
              hero_image_url: string | null
              overview_title_en: string | null
              overview_body_en: string | null
              cta_title_en: string | null
              cta_button_text_en: string | null
              meta_title_en: string | null
              meta_description_en: string | null
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              hero_title_en?: string | null
              hero_subtitle_en?: string | null
              hero_image_url?: string | null
              overview_title_en?: string | null
              overview_body_en?: string | null
              cta_title_en?: string | null
              cta_button_text_en?: string | null
              meta_title_en?: string | null
              meta_description_en?: string | null
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              hero_title_en?: string | null
              hero_subtitle_en?: string | null
              hero_image_url?: string | null
              overview_title_en?: string | null
              overview_body_en?: string | null
              cta_title_en?: string | null
              cta_button_text_en?: string | null
              meta_title_en?: string | null
              meta_description_en?: string | null
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      paint_cells_features: {
            Row: {
              id: string
              title_en: string
              description_en: string | null
              icon: string | null
              image_url: string | null
              sort_order: number
              is_visible: boolean
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              title_en: string
              description_en?: string | null
              icon?: string | null
              image_url?: string | null
              sort_order?: number
              is_visible?: boolean
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              title_en?: string
              description_en?: string | null
              icon?: string | null
              image_url?: string | null
              sort_order?: number
              is_visible?: boolean
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      products_posts: {
            Row: {
              id: string
              title: string
              slug: string
              summary: string | null
              body: string | null
              category: Database["public"]["Enums"]["product_category"] | null
              subcategory: string | null
              featured_image_url: string | null
              gallery_images: string[] | null
              brands: string[] | null
              specifications: Json | null
              status: Database["public"]["Enums"]["content_status"] | null
              published_at: string | null
              meta_title: string | null
              meta_description: string | null
              sort_order: number | null
              is_visible: boolean | null
              created_at: string | null
              updated_at: string | null
            }
            Insert: {
              id?: string
              title: string
              slug: string
              summary?: string | null
              body?: string | null
              category?: Database["public"]["Enums"]["product_category"] | null
              subcategory?: string | null
              featured_image_url?: string | null
              gallery_images?: string[] | null
              brands?: string[] | null
              specifications?: Json | null
              status?: Database["public"]["Enums"]["content_status"] | null
              published_at?: string | null
              meta_title?: string | null
              meta_description?: string | null
              sort_order?: number | null
              is_visible?: boolean | null
              created_at?: string | null
              updated_at?: string | null
            }
            Update: {
              id?: string
              title?: string
              slug?: string
              summary?: string | null
              body?: string | null
              category?: Database["public"]["Enums"]["product_category"] | null
              subcategory?: string | null
              featured_image_url?: string | null
              gallery_images?: string[] | null
              brands?: string[] | null
              specifications?: Json | null
              status?: Database["public"]["Enums"]["content_status"] | null
              published_at?: string | null
              meta_title?: string | null
              meta_description?: string | null
              sort_order?: number | null
              is_visible?: boolean | null
              created_at?: string | null
              updated_at?: string | null
            }
      Relationships: []
      },
      quote_content: {
            Row: {
              id: string
              hero_title_en: string | null
              hero_subtitle_en: string | null
              form_intro_en: string | null
              submit_button_text_en: string | null
              success_title_en: string | null
              success_message_en: string | null
              meta_title_en: string | null
              meta_description_en: string | null
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              hero_title_en?: string | null
              hero_subtitle_en?: string | null
              form_intro_en?: string | null
              submit_button_text_en?: string | null
              success_title_en?: string | null
              success_message_en?: string | null
              meta_title_en?: string | null
              meta_description_en?: string | null
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              hero_title_en?: string | null
              hero_subtitle_en?: string | null
              form_intro_en?: string | null
              submit_button_text_en?: string | null
              success_title_en?: string | null
              success_message_en?: string | null
              meta_title_en?: string | null
              meta_description_en?: string | null
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      rate_limit_tracking: {
            Row: {
              id: string
              identifier: string
              endpoint: string
              request_count: number
              window_start: string
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              identifier: string
              endpoint: string
              request_count?: number
              window_start?: string
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              identifier?: string
              endpoint?: string
              request_count?: number
              window_start?: string
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      resources_posts: {
            Row: {
              id: string
              slug: string
              title: string
              summary: string | null
              body: string | null
              answer_box: string | null
              category: Database["public"]["Enums"]["resource_category"] | null
              featured_image_url: string | null
              meta_title: string | null
              meta_description: string | null
              status: Database["public"]["Enums"]["content_status"]
              published_at: string | null
              last_ai_generation_at: string | null
              vertax_asset_id: string | null
              created_at: string
              updated_at: string
              subcategory: string | null
            }
            Insert: {
              id?: string
              slug: string
              title: string
              summary?: string | null
              body?: string | null
              answer_box?: string | null
              category?: Database["public"]["Enums"]["resource_category"] | null
              featured_image_url?: string | null
              meta_title?: string | null
              meta_description?: string | null
              status?: Database["public"]["Enums"]["content_status"]
              published_at?: string | null
              last_ai_generation_at?: string | null
              vertax_asset_id?: string | null
              created_at?: string
              updated_at?: string
              subcategory?: string | null
            }
            Update: {
              id?: string
              slug?: string
              title?: string
              summary?: string | null
              body?: string | null
              answer_box?: string | null
              category?: Database["public"]["Enums"]["resource_category"] | null
              featured_image_url?: string | null
              meta_title?: string | null
              meta_description?: string | null
              status?: Database["public"]["Enums"]["content_status"]
              published_at?: string | null
              last_ai_generation_at?: string | null
              vertax_asset_id?: string | null
              created_at?: string
              updated_at?: string
              subcategory?: string | null
            }
      Relationships: []
      },
      site_settings: {
            Row: {
              id: string
              contact_email: string | null
              contact_phone: string | null
              contact_address_en: string | null
              linkedin_url: string | null
              wechat_id: string | null
              footer_tagline_en: string | null
              copyright_text_en: string | null
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              contact_email?: string | null
              contact_phone?: string | null
              contact_address_en?: string | null
              linkedin_url?: string | null
              wechat_id?: string | null
              footer_tagline_en?: string | null
              copyright_text_en?: string | null
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              contact_email?: string | null
              contact_phone?: string | null
              contact_address_en?: string | null
              linkedin_url?: string | null
              wechat_id?: string | null
              footer_tagline_en?: string | null
              copyright_text_en?: string | null
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      solution_pages: {
            Row: {
              id: string
              slug: string
              status: Database["public"]["Enums"]["content_status"]
              sort_order: number
              meta_title: string | null
              meta_description: string | null
              hero_title: string | null
              hero_subtitle: string | null
              definition: string | null
              definition_secondary: string | null
              why_title: string | null
              why_intro: string | null
              why_items: Json | null
              scope_intro: string | null
              scope_items: Json | null
              scope_sub_sections: Json | null
              components_intro: string | null
              component_items: Json | null
              process_steps: Json | null
              application_scope_intro: string | null
              application_scope: Json | null
              config_options: Json | null
              technical_parameters_intro: string | null
              technical_parameters: Json | null
              constraints: Json | null
              atex_intro: string | null
              atex_items: Json | null
              roi_methodology: string | null
              roi_metrics: Json | null
              deployment_note: string | null
              timeline: Json | null
              faqs: Json | null
              related_industries: Json | null
              related_knowledge: Json | null
              eeat: Json | null
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              slug: string
              status?: Database["public"]["Enums"]["content_status"]
              sort_order?: number
              meta_title?: string | null
              meta_description?: string | null
              hero_title?: string | null
              hero_subtitle?: string | null
              definition?: string | null
              definition_secondary?: string | null
              why_title?: string | null
              why_intro?: string | null
              why_items?: Json | null
              scope_intro?: string | null
              scope_items?: Json | null
              scope_sub_sections?: Json | null
              components_intro?: string | null
              component_items?: Json | null
              process_steps?: Json | null
              application_scope_intro?: string | null
              application_scope?: Json | null
              config_options?: Json | null
              technical_parameters_intro?: string | null
              technical_parameters?: Json | null
              constraints?: Json | null
              atex_intro?: string | null
              atex_items?: Json | null
              roi_methodology?: string | null
              roi_metrics?: Json | null
              deployment_note?: string | null
              timeline?: Json | null
              faqs?: Json | null
              related_industries?: Json | null
              related_knowledge?: Json | null
              eeat?: Json | null
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              slug?: string
              status?: Database["public"]["Enums"]["content_status"]
              sort_order?: number
              meta_title?: string | null
              meta_description?: string | null
              hero_title?: string | null
              hero_subtitle?: string | null
              definition?: string | null
              definition_secondary?: string | null
              why_title?: string | null
              why_intro?: string | null
              why_items?: Json | null
              scope_intro?: string | null
              scope_items?: Json | null
              scope_sub_sections?: Json | null
              components_intro?: string | null
              component_items?: Json | null
              process_steps?: Json | null
              application_scope_intro?: string | null
              application_scope?: Json | null
              config_options?: Json | null
              technical_parameters_intro?: string | null
              technical_parameters?: Json | null
              constraints?: Json | null
              atex_intro?: string | null
              atex_items?: Json | null
              roi_methodology?: string | null
              roi_metrics?: Json | null
              deployment_note?: string | null
              timeline?: Json | null
              faqs?: Json | null
              related_industries?: Json | null
              related_knowledge?: Json | null
              eeat?: Json | null
              created_at?: string
              updated_at?: string
            }
      Relationships: []
      },
      user_roles: {
            Row: {
              id: string
              user_id: string
              role: Database["public"]["Enums"]["app_role"]
              created_at: string
            }
            Insert: {
              id?: string
              user_id: string
              role: Database["public"]["Enums"]["app_role"]
              created_at?: string
            }
            Update: {
              id?: string
              user_id?: string
              role?: Database["public"]["Enums"]["app_role"]
              created_at?: string
            }
      Relationships: []
      },
      videos: {
            Row: {
              id: string
              video_id: string
              title: string
              slug: string
              description: string | null
              category: Database["public"]["Enums"]["video_category"] | null
              video_url: string
              thumbnail_url: string | null
              duration_seconds: number | null
              keywords: string[] | null
              status: Database["public"]["Enums"]["content_status"] | null
              published_at: string | null
              meta_title: string | null
              meta_description: string | null
              transcript: string | null
              sort_order: number | null
              is_visible: boolean | null
              created_at: string | null
              updated_at: string | null
            }
            Insert: {
              id?: string
              video_id: string
              title: string
              slug: string
              description?: string | null
              category?: Database["public"]["Enums"]["video_category"] | null
              video_url: string
              thumbnail_url?: string | null
              duration_seconds?: number | null
              keywords?: string[] | null
              status?: Database["public"]["Enums"]["content_status"] | null
              published_at?: string | null
              meta_title?: string | null
              meta_description?: string | null
              transcript?: string | null
              sort_order?: number | null
              is_visible?: boolean | null
              created_at?: string | null
              updated_at?: string | null
            }
            Update: {
              id?: string
              video_id?: string
              title?: string
              slug?: string
              description?: string | null
              category?: Database["public"]["Enums"]["video_category"] | null
              video_url?: string
              thumbnail_url?: string | null
              duration_seconds?: number | null
              keywords?: string[] | null
              status?: Database["public"]["Enums"]["content_status"] | null
              published_at?: string | null
              meta_title?: string | null
              meta_description?: string | null
              transcript?: string | null
              sort_order?: number | null
              is_visible?: boolean | null
              created_at?: string | null
              updated_at?: string | null
            }
      Relationships: []
      },
      why_cards: {
            Row: {
              id: string
              sort_order: number
              title: string
              card_gray_line: string
              modal_engineering_anchor: string | null
              modal_typical_use_case: string | null
              modal_key_constraints: string[] | null
              modal_what_we_need_to_assess: string[] | null
              is_visible: boolean
              created_at: string
              updated_at: string
            }
            Insert: {
              id?: string
              sort_order?: number
              title: string
              card_gray_line: string
              modal_engineering_anchor?: string | null
              modal_typical_use_case?: string | null
              modal_key_constraints?: string[] | null
              modal_what_we_need_to_assess?: string[] | null
              is_visible?: boolean
              created_at?: string
              updated_at?: string
            }
            Update: {
              id?: string
              sort_order?: number
              title?: string
              card_gray_line?: string
              modal_engineering_anchor?: string | null
              modal_typical_use_case?: string | null
              modal_key_constraints?: string[] | null
              modal_what_we_need_to_assess?: string[] | null
              is_visible?: boolean
              created_at?: string
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
      is_admin_or_editor: {
        Args: {
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
      content_status: "draft" | "review" | "published"
      product_category: "rotary-bells" | "spray-guns" | "paint-pumps" | "control-systems" | "color-change" | "cleaning-systems"
      resource_category: "engineering-library" | "standards-compliance" | "glossary" | "tools-templates"
      video_category: "cleaning" | "process" | "equipment" | "case-study" | "knowledge"
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
      product_category: ["rotary-bells", "spray-guns", "paint-pumps", "control-systems", "color-change", "cleaning-systems"],
      resource_category: ["engineering-library", "standards-compliance", "glossary", "tools-templates"],
      video_category: ["cleaning", "process", "equipment", "case-study", "knowledge"]
    },
  },
} as const
