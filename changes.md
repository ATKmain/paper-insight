SEC_DOCUMENT => PAPER_DOCUMENT
sec_document => paper_document 
company_name => title
company_ticker => authors
paper_authors => authors
authors_abrv
full_title

period_of_report_date => del

sec_doc_metadata => paper_doc_metadata

company_name=title,
company_ticker=ref_abrv,
doc_type=doc_type,
year=year,
quarter= *delete*
accession_number=keywords,
cik=abstract,
period_of_report_date= *delete*
filed_as_of_date=filing.filed_as_of_date,
date_as_of_change=filing.date_as_of_change,


SEC_EDGAR_COMPANY_NAME delete
SEC_EDGAR_EMAIL

describe_financials  => describe_paper

BackendSecDocument => BackendPaperDocument

SecDocumentMetadata

class SecDocumentMetadata(BaseModel):
    """
    Metadata for a document that is a sec document
    """
    full_title: str
    title: str
    authors_abrv: str
    year: int
    keywords: Optional[str]
    abstract: Optional[str]
    filed_as_of_date: Optional[datetime]
    date_as_of_change: Optional[datetime]
