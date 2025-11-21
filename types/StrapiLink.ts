export interface StrapiLink {
  id: number;
  url: string | null;
  textToDisplay: string;
  type: string; // "Primary Link" | "Secondary Link" | "Tertiary Link" | "Button Link"
}
