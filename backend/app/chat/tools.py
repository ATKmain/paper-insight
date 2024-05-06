from typing import List, Iterator, cast
import logging


from app.schema import (
    Document as DocumentSchema,
    DocumentMetadataKeysEnum,
    PaperDocumentMetadata,
)
from llama_index.tools import FunctionTool, ToolMetadata, QueryEngineTool
from llama_index.indices.service_context import ServiceContext
from llama_index.agent import OpenAIAgent
from app.core.config import settings
from app.chat.utils import build_title_for_document


logger = logging.getLogger(__name__)


from typing import List


#TODO
def describe_paper(paper) -> str:
    sentences: List[str] = []

    title = ""
    keywords = ""
    abstract = ""

    sentences.append(
        f"For {title} with keywords '{keywords}' and abstract : {abstract}:"
    )
   
    return " ".join(sentences)


def get_tool_metadata_for_document(doc: DocumentSchema) -> ToolMetadata:
    doc_title = build_title_for_document(doc)
    name = f"extract_json_from_paper_document[{doc_title}]"
    description = f"Returns basic financial data extracted from the paper {doc_title}"
    return ToolMetadata(
        name=name,
        description=description,
    )


def get_api_query_engine_tool(
    document: DocumentSchema, service_context: ServiceContext
) -> QueryEngineTool:
    polygon_io_tool = get_polygon_io_sec_tool(document)
    tool_metadata = get_tool_metadata_for_document(document)
    doc_title = build_title_for_document(document)
    agent = OpenAIAgent.from_tools(
        [polygon_io_tool],
        llm=service_context.llm,
        callback_manager=service_context.callback_manager,
        system_prompt=f"You are an agent that is asked quantitative questions about a paper named {doc_title} and you answer them by using your tools.",
    )
    return QueryEngineTool.from_defaults(
        query_engine=agent,
        name=tool_metadata.name,
        description=tool_metadata.description,
    )
