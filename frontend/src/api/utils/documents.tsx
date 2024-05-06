import { MAX_NUMBER_OF_SELECTED_DOCUMENTS } from "~/hooks/useDocumentSelector";
import { BackendDocument, BackendDocumentType } from "~/types/backend/document";
import { PaperDocument, DocumentType } from "~/types/document";
import { documentColors } from "~/utils/colors";
import _ from "lodash";

export const fromBackendDocumentToFrontend = (
  backendDocuments: BackendDocument[]
) => {
  // sort by created_at so that de-dupe filter later keeps oldest duplicate docs
  backendDocuments = _.sortBy(backendDocuments, 'created_at');
  let frontendDocs: PaperDocument[] = backendDocuments
  .filter((backendDoc) => 'paper_document' in backendDoc.metadata_map)
  .map((backendDoc, index) => {    

    // we have 10 colors for 10 documents
    const colorIndex = index < 10 ? index : 0;
    return {
      id: backendDoc.id,
      url: backendDoc.url,
      ref_abrv: backendDoc.metadata_map.paper_document.ref_abrv,
      fullName: backendDoc.metadata_map.paper_document.full_name,
      year: String(backendDoc.metadata_map.paper_document.year),
      color: documentColors[colorIndex],
    } as PaperDocument;
  });
  // de-dupe hotfix
  const getDocDeDupeKey = (doc: PaperDocument) => `${doc.ticker}-${doc.year}-${doc.quarter || ''}`;
  frontendDocs = _.chain(frontendDocs).sortBy(getDocDeDupeKey).sortedUniqBy(getDocDeDupeKey).value();

  return frontendDocs;
};
