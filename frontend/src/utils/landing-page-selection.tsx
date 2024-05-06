import { DocumentType } from "~/types/document";
import type { PaperDocument } from "~/types/document";

import type { SelectOption } from "~/types/selection";
import { filterByTickerAndType } from "./documents";

export const documentTypeOptions = [
  { value: DocumentType.TenK, label: DocumentType.TenK },
  { value: DocumentType.TenQ, label: DocumentType.TenQ },
] as SelectOption[];

function documentToYearOption(document: PaperDocument): SelectOption {
  if (document.quarter) {
    return {
      value: document.id,
      label: document.year + " Q" + document.quarter,
    };
  }
  return {
    value: document.id,
    label: document.year,
  };
}

export function getAvailableYears(
  ticker: string,
  type: DocumentType,
  documents: PaperDocument[]
): SelectOption[] {
  const docs = filterByTickerAndType(ticker, type, documents);
  const yearOptions: SelectOption[] = docs.map(documentToYearOption);
  return yearOptions;
}
