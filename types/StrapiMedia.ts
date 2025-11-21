export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null; // null for non-image media like PDFs
  height: number | null; // null for non-image media like PDFs
  url: string;
  formats?: any;
  mime?: string; // e.g., 'application/pdf', 'image/jpeg'
  ext?: string; // e.g., '.pdf', '.jpg'
  size?: number; // file size in KB
}
