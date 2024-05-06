import { DocumentColorEnum } from "~/utils/colors";

export enum DocumentType {
  TenK = "Form 10K",
  TenQ = "Form 10Q",
}

export type Ticker = {
  ticker: string;
  fullName: string;
};

export interface PaperDocument extends Ticker {
  id: string;
  url: string;
  title: string;
  year: string;
  color: DocumentColorEnum;
}
