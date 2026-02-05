
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { ReceiptData, Assignment, ChatMessage, CalculatedSummary, ReceiptItem } from './types';
import { parseReceiptImage, processAssignmentChat } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        const data = await parseReceiptImage(base64String);
        setReceipt(data);
        // Initialize empty assignments
        setAssignments(data.items.map(item => ({ itemId: item.id, people: [] })));
        setChatHistory([{
          role: 'assistant',
          content: "I've parsed your receipt! Now, tell me who had what. For example: 'Alice had the coffee' or 'Bob and Charlie shared the sandwich'.",
          timestamp: Date.now()
        }]);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error parsing receipt:", error);
      alert("Failed to parse receipt. Please try a clearer photo.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userInput.trim() || !receipt) return;

    const currentInput = userInput;
    setUserInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: currentInput, timestamp: Date.now() }]);
    setLoading(true);

    try {
      const { text, newAssignments } = await processAssignmentChat(currentInput, receipt, assignments);
      setAssignments(newAssignments);
      setChatHistory(prev => [...prev, { role: 'assistant', content: text, timestamp: Date.now() }]);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error) {
      console.error("Chat error:", error);
      setChatHistory(prev => [...prev, { role: 'assistant', content: "Sorry, I had trouble processing that. Can you try again?", timestamp: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const summaryData = useMemo(() => {
    if (!receipt) return [];
    const personMap: Record<string, CalculatedSummary> = {};
    const totalSubtotal = receipt.items.reduce((sum, item) => sum + item.price, 0);

    assignments.forEach(assign => {
      const item = receipt.items.find(i => i.id === assign.itemId);
      if (!item || assign.people.length === 0) return;

      const perPersonShare = item.price / assign.people.length;
      assign.people.forEach(person => {
        const p = person.trim();
        if (!personMap[p]) {
          personMap[p] = { personName: p, subtotal: 0, tax: 0, tip: 0, total: 0, items: [] };
        }
        personMap[p].subtotal += perPersonShare;
        personMap[p].items.push({ itemName: item.name, share: perPersonShare });
      });
    });

    // Distribute tax and tip proportionally
    const people = Object.values(personMap);
    const assignedSubtotal = people.reduce((sum, p) => sum + p.subtotal, 0);

    if (assignedSubtotal > 0) {
      people.forEach(p => {
        const ratio = p.subtotal / assignedSubtotal;
        p.tax = receipt.tax * ratio;
        p.tip = receipt.tip * ratio;
        p.total = p.subtotal + p.tax + p.tip;
      });
    }

    return people;
  }, [receipt, assignments]);

  const unassignedItems = useMemo(() => {
    if (!receipt) return [];
    return receipt.items.filter(item => {
      const assign = assignments.find(a => a.itemId === item.id);
      return !assign || assign.people.length === 0;
    });
  }, [receipt, assignments]);

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-receipt text-emerald-400 text-2xl"></i>
          <h1 className="text-xl font-bold tracking-tight">SplitSmart AI</h1>
        </div>
        {!receipt ? (
          <label className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg cursor-pointer transition-colors text-sm font-semibold">
            Upload Receipt
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        ) : (
          <button onClick={() => { setReceipt(null); setAssignments([]); setChatHistory([]); }} className="text-slate-400 hover:text-white text-sm transition-colors">
            Reset
          </button>
        )}
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Pane: Receipt Data */}
        <div className="w-full md:w-1/2 border-r border-slate-200 overflow-y-auto p-4 bg-slate-50">
          {!receipt ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-cloud-arrow-up text-2xl"></i>
              </div>
              <p className="text-center">Upload a receipt photo to get started.<br/>Our AI will extract items and prices automatically.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-list-ul text-emerald-500"></i>
                  Receipt Items
                </h2>
                <div className="divide-y divide-slate-100">
                  {receipt.items.map((item) => {
                    const assign = assignments.find(a => a.itemId === item.id);
                    return (
                      <div key={item.id} className="py-3 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-slate-700">{item.name}</span>
                          <span className="font-semibold">{receipt.currency}{item.price.toFixed(2)}</span>
                        </div>
                        {assign && assign.people.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {assign.people.map((p, i) => (
                              <span key={i} className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
                                {p}
                              </span>
                            ))}
                          </div>
                        )}
                        {(!assign || assign.people.length === 0) && (
                          <span className="text-xs text-rose-400 italic">Unassigned</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Tax</span>
                    <span>{receipt.currency}{receipt.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Tip</span>
                    <span>{receipt.currency}{receipt.tip.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-slate-900 pt-2">
                    <span>Total</span>
                    <span>{receipt.currency}{receipt.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {summaryData.length > 0 && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-calculator text-blue-500"></i>
                    Who Owes What
                  </h2>
                  <div className="space-y-4">
                    {summaryData.map((person, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-slate-800">{person.personName}</span>
                          <span className="text-lg font-black text-emerald-600">{receipt.currency}{person.total.toFixed(2)}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 grid grid-cols-2 gap-x-2">
                          <span>Subtotal: {receipt.currency}{person.subtotal.toFixed(2)}</span>
                          <span>Tax share: {receipt.currency}{person.tax.toFixed(2)}</span>
                          <span>Tip share: {receipt.currency}{person.tip.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Pane: Smart Chat */}
        <div className="w-full md:w-1/2 flex flex-col bg-white overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.length === 0 && !loading && (
              <div className="h-full flex items-center justify-center text-slate-400">
                <p>Upload a receipt to start the conversation.</p>
              </div>
            )}
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-br-none' 
                  : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-500 rounded-2xl rounded-bl-none px-4 py-2 text-sm border border-slate-200 animate-pulse">
                  AI is thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
              <input
                disabled={!receipt || loading}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={receipt ? "e.g. 'Dhruv had the nachos'..." : "Upload a receipt first"}
                className="w-full pl-4 pr-12 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all disabled:opacity-50 text-sm shadow-inner"
              />
              <button
                type="submit"
                disabled={!receipt || loading || !userInput.trim()}
                className="absolute right-3 text-emerald-500 hover:text-emerald-600 disabled:text-slate-300 transition-colors"
              >
                <i className="fa-solid fa-paper-plane text-lg"></i>
              </button>
            </form>
            <p className="text-[10px] text-slate-400 mt-2 px-1">
              Tip: You can say things like "Split the appetizers between everyone" or "Sue had the salad and a tea".
            </p>
          </div>
        </div>
      </main>

      {/* Loading Overlay for Receipt Processing */}
      {loading && !receipt && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white p-8">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-bold mb-2">Analyzing Receipt...</h2>
          <p className="text-slate-400 text-center animate-pulse">Our AI is extracting items, quantities, and prices for you.</p>
        </div>
      )}
    </div>
  );
};

export default App;
