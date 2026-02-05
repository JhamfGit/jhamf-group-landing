
export interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ReceiptData {
  items: ReceiptItem[];
  tax: number;
  tip: number;
  total: number;
  currency: string;
}

export interface Assignment {
  itemId: string;
  people: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface CalculatedSummary {
  personName: string;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  items: { itemName: string; share: number }[];
}
