from app.schema import (
    Document as DocumentSchema,
    DocumentMetadataKeysEnum,
    PaperDocumentMetadata,
)


def build_title_for_document(document: DocumentSchema) -> str:
    if DocumentMetadataKeysEnum.PAPER_DOCUMENT not in document.metadata_map:
        return "No Title Document"

    paper_metadata = PaperDocumentMetadata.parse_obj(
        document.metadata_map[DocumentMetadataKeysEnum.PAPER_DOCUMENT]
    )
    time_period = (
        f"{paper_metadata.year}"
        
    )
    return f"{paper_metadata.title} ({paper_metadata.authors_abrv}, {paper_metadata.year})"
