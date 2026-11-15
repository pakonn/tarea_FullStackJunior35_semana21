import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://esrybgzmmmtfkmazwxjs.supabase.co";
export const supabaseKey = "sb_publishable_JKD37MGAS0ueqmfy0OYwqQ_H1tBKEoD";

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Favorito = {
  id?: number;
  created_at?: string;
  character_id: number;
  name: string;
  image: string;
  status: string;
  species: string;
};