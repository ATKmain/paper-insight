export enum BackendDocumentType {
  TenK = "10-K",
  TenQ = "10-Q",
}

export interface BackendDocument {
  created_at: string;
  id: string;
  updated_at: string;
  metadata_map: BackendMetadataMap;
  url: string;
}

export interface BackendMetadataMap {
  paper_document: BackendPaperDocument;
}

export interface BackendPaperDocument {
  full_name: string;
}
