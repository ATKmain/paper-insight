import { useState, useEffect, useRef } from "react";
import { GroupBase } from "react-select";
import Select from "react-select/dist/declarations/src/Select";
import { PaperDocument, DocumentType, Ticker } from "~/types/document";
import type { SelectOption } from "~/types/selection";
import {
  findDocumentById,
  getAllTickers,
  sortDocuments,
  sortSelectOptions,
} from "~/utils/documents";
import {
  documentTypeOptions,
  getAvailableYears,
} from "~/utils/landing-page-selection";
import useLocalStorage from "./utils/useLocalStorage";
import { backendClient } from "~/api/backend";

export const MAX_NUMBER_OF_SELECTED_DOCUMENTS = 10;

export const useDocumentSelector = () => {
  const [availableDocuments, setAvailableDocuments] = useState<PaperDocument[]>(
    []
  );
  const [availableTickers, setAvailableTickers] = useState<Ticker[]>([]);
  const availableDocumentTypes = documentTypeOptions;
  const [availableYears, setAvailableYears] = useState<SelectOption[] | null>(
    null
  );

  const sortedAvailableYears = sortSelectOptions(availableYears);

  useEffect(() => {
    setAvailableTickers(getAllTickers(availableDocuments));
  }, [availableDocuments]);

  useEffect(() => {
    async function getDocuments() {
      const docs = await backendClient.fetchDocuments();
      setAvailableDocuments(docs);
    }
    getDocuments().catch(() => console.error("could not fetch documents"));
  }, []);

  const [selectedDocuments, setSelectedDocuments] = useLocalStorage<
    PaperDocument[]
  >("selectedDocuments", []);
  const sortedSelectedDocuments = sortDocuments(selectedDocuments);

  const [selectedTicker, setSelectedTicker] = useState<Ticker | null>(null);
  const [selectedDocumentType, setSelectedDocumentType] =
    useState<SelectOption | null>(null);
  const [selectedYear, setSelectedYear] = useState<SelectOption | null>(null);

  const handleAddDocument = () => {
    if (selectedTicker && selectedDocumentType && selectedYear) {
      setSelectedDocuments((prevDocs = []) => {
        if (prevDocs.find((doc) => doc.id === selectedYear.value)) {
          return prevDocs;
        }
        const newDoc = findDocumentById(selectedYear.value, availableDocuments);
        return newDoc ? [newDoc, ...prevDocs] : prevDocs;
      });
      setSelectedTicker(null);
      setSelectedDocumentType(null);
      setSelectedYear(null);
      setShouldFocusCompanySelect(true);
    }
  };

  const handleRemoveDocument = (documentIndex: number) => {
    setSelectedDocuments((prevDocs) =>
      prevDocs.filter((_, index) => index !== documentIndex)
    );
  };

  useEffect(() => {
    setSelectedDocumentType(null);
    setSelectedYear(null);
  }, [selectedTicker]);

  useEffect(() => {
    setSelectedYear(null);
  }, [selectedDocumentType]);

  useEffect(() => {
    if (selectedTicker && selectedDocumentType) {
      setAvailableYears(
        getAvailableYears(
          selectedTicker?.ticker,
          selectedDocumentType?.value as DocumentType,
          availableDocuments
        )
      );
    }
  }, [selectedTicker, selectedDocumentType, availableDocuments]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "Enter" && event.shiftKey) ||
        (event.key === "Enter" && event.metaKey)
      ) {
        handleAddDocument();
      }
      if (event.key === "k" && event.metaKey) {
        setShouldFocusCompanySelect(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleAddDocument]);

  const isDocumentSelectionEnabled =
    selectedDocuments.length < MAX_NUMBER_OF_SELECTED_DOCUMENTS;

  const isStartConversationButtonEnabled = selectedDocuments.length > 0;


  
  return {
    availableDocuments,
    availableTickers,
    availableDocumentTypes,
    availableYears,
    sortedAvailableYears,
    selectedDocuments,
    sortedSelectedDocuments,
    selectedTicker,
    selectedDocumentType,
    selectedYear,
    setSelectedYear,
    handleAddDocument,
    handleRemoveDocument,
    isDocumentSelectionEnabled,
    isStartConversationButtonEnabled,
    yearFocusRef,
    documentTypeFocusRef,
    selectTicker,
    selectDocumentType,
    shouldFocusCompanySelect,
    setShouldFocusCompanySelect,
  };
};
