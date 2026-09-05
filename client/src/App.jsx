import React, { useState } from 'react';

const mockCampaigns = [
  {
    id: "CAMP-001",
    title: "Flood Relief Ration Kits 2026",
    ngoName: "Goonj Foundation",
    category: "Disaster Relief",
    target: 500000,
    raised: 375000,
    milestones: [
      { name: "Vendor Procurement", status: "completed" },
      { name: "Field Dispatch", status: "in-progress" },
      { name: "Independent Audit", status: "pending" }
    ]
  },
  {
    id: "CAMP-002",
    title: "Rural Girl Child Education Kits",
    ngoName: "Nanhi Kali Trust",
    category: "Education",
    target: 200000,
    raised: 120000,
    milestones: [
      { name: "Vendor Quotation", status: "completed" },
      { name: "Material Distributed", status: "completed" },
      { name: "Audit Verified", status: "completed" }
    ]
  }
];

const mockDonationTrace = {
  traceId: "DD-TXN-2026-X88",
  campaign: "Flood Relief Ration Kits 2026",
  amount: 2500,
  date: "05 Sep 2026, 11:30 AM",
  txHash: "0x71C...B29e (Polygon PoS)",
  timeline: [
    {
      id: 1,
      title: "Funds Pledged & Escrow Locked",
      desc: "₹2,500 safely locked in smart contract. Milestone conditions active.",
      status: "completed",
      date: "05 Sep, 11:30 AM",
      evidence: null
    },
    {
      id: 2,
      title: "Vendor Quotation Approved (Tranche 1)",
      desc: "Advance payout ₹1,250 released directly to local grain supplier.",
      status: "completed",
      date: "05 Sep, 01:15 PM",
      evidence: {
        type: "invoice",
        label: "View GST Bill (Grain Merchant)",
        amount: "₹1,250.00",
        gstin: "07AABCG1234F1Z5"
      }
    },
    {
      id: 3,
      title: "Field Distribution Proof Uploaded",
      desc: "Beneficiary kit delivery captured via live camera with geo-coordinates.",
      status: "in-progress",
      date: "In Transit",
      evidence: {
        type: "geo",
        label: "Geo-tagged Dispatch Tag",
        location: "Lat: 26.8467° N, Long: 80.9462° E"
      }
    },
    {
      id: 4,
      title: "Independent Ground Audit",
      desc: "Third-party verifier physical spot-check and biometric audit acknowledgment.",
      status: "pending",
      date: "Pending Dispatch Completion",
      evidence: null
    }
  ]
};

export default function App() {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [activeModal, setActiveModal] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' ya 'trace'
  const [proofDetail, setProofDetail] = useState(null);

  const handleSimulatedPayment = () => {
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div 
          onClick={() => setActiveTab('feed')}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-sm">
            D
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-slate-800">दान दृष्टि</span>
            <span className="text-xs block text-emerald-600 font-semibold">100% Traceable Giving</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('feed')}
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${
              activeTab === 'feed' ? 'bg-slate-100 text-slate-800' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Causes
          </button>
          <button 
            onClick={() => setActiveTab('trace')}
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${
              activeTab === 'trace' ? 'bg-slate-900 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            Live Tracking
          </button>
        </div>
      </header>

      {activeTab === 'feed' ? (
        <>
          {/* Hero Header */}
          <section className="max-w-5xl mx-auto px-6 pt-12 pb-8 text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-4">
              ✓ Zero Leakage Architecture
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Track Every Rupee from <br />
              <span className="text-emerald-600">Escrow to Verified Delivery</span>
            </h1>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base sm:text-lg">
              Donations stay locked in a smart contract escrow and release to verified vendors only after physical audit proof.
            </p>
          </section>

          {/* Causes List */}
          <main className="max-w-5xl mx-auto px-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Active Verified Causes</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockCampaigns.map((camp) => {
                const progress = Math.round((camp.raised / camp.target) * 100);
                return (
                  <div key={camp.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
                        <span className="uppercase tracking-wider px-2 py-0.5 bg-slate-100 rounded font-semibold text-slate-700">
                          {camp.category}
                        </span>
                        <span>{camp.ngoName}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{camp.title}</h3>

                      <div className="mt-4">
                        <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                          <span>₹{camp.raised.toLocaleString()} raised</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="text-right text-[11px] text-slate-400 mt-1">Goal: ₹{camp.target.toLocaleString()}</div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100">
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Milestone Escrow Stages:
                        </div>
                        <div className="flex items-center gap-2">
                          {camp.milestones.map((m, idx) => (
                            <div key={idx} className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                              <span className={`inline-block w-2 h-2 rounded-full mb-1 ${m.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
                              <p className="text-[10px] font-medium text-slate-700 truncate">{m.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button 
                        onClick={() => { setActiveModal(camp); setIsSuccess(false); }}
                        className="w-full bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl hover:bg-emerald-700 transition text-sm shadow-sm"
                      >
                        Donate with Trace →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </>
      ) : (
        /* Live Tracking View */
        <main className="max-w-3xl mx-auto px-6 pt-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Escrow Active
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">{mockDonationTrace.campaign}</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Trace ID: <span className="font-mono font-bold text-slate-800">{mockDonationTrace.traceId}</span> • {mockDonationTrace.date}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-2xl font-black text-slate-900">₹{mockDonationTrace.amount}</div>
                <div className="text-xs font-mono text-slate-400 mt-0.5">On-chain: {mockDonationTrace.txHash}</div>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="mt-8 relative pl-6 border-l-2 border-slate-200 space-y-8">
              {mockDonationTrace.timeline.map((step) => (
                <div key={step.id} className="relative group">
                  {/* Step Marker */}
                  <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white ${
                    step.status === 'completed' 
                      ? 'border-emerald-500 bg-emerald-500 ring-4 ring-emerald-50' 
                      : step.status === 'in-progress'
                      ? 'border-amber-500 bg-amber-500 ring-4 ring-amber-50'
                      : 'border-slate-300'
                  }`} />

                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                      <span className="text-xs font-medium text-slate-400">{step.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{step.desc}</p>

                    {/* Proof Attachment Badge */}
                    {step.evidence && (
                      <button 
                        onClick={() => setProofDetail(step.evidence)}
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition"
                      >
                        📄 {step.evidence.label}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Donation Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100">
            {!isSuccess ? (
              <>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Pledge Traceable Funds</h3>
                <p className="text-xs text-slate-500 mb-6">{activeModal.title}</p>

                <div className="mb-6">
                  <label className="text-xs font-semibold text-slate-700 block mb-2">Select Donation Amount</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[500, 1000, 2500].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setSelectedAmount(amt)}
                        className={`py-2.5 text-sm font-bold rounded-xl border transition ${
                          selectedAmount === amt 
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-6 text-xs text-slate-600 space-y-1.5">
                  <div className="flex justify-between">
                    <span>Payment Mode:</span>
                    <span className="font-semibold text-slate-800">Simulated Sandbox UPI</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Initial Lock:</span>
                    <span className="font-semibold text-emerald-600">Smart Contract Escrow</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSimulatedPayment}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition"
                  >
                    Confirm ₹{selectedAmount}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-slate-900">₹{selectedAmount} Locked in Escrow</h3>
                <p className="text-xs text-slate-500 mt-2">
                  Trace ID: <span className="bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-slate-800">DD-TXN-2026-X88</span>
                </p>
                <div className="mt-5 p-3.5 bg-emerald-50 rounded-xl text-left border border-emerald-100 text-xs text-emerald-800">
                  Fund will unlock in tranches once vendor receipts are uploaded and on-ground verification passes.
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => { setActiveModal(null); setActiveTab('trace'); }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700"
                  >
                    Open Live Tracker →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Proof Viewer Drawer / Modal */}
      {proofDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Audit Proof Verification</h3>
            <p className="text-xs text-slate-500 mb-4">Cryptographically linked evidence record</p>

            {proofDetail.type === 'invoice' ? (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Document:</span>
                  <span className="font-semibold text-slate-800">GST Tax Invoice</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">GSTIN:</span>
                  <span className="font-mono font-semibold text-slate-800">{proofDetail.gstin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tranche Payout:</span>
                  <span className="font-bold text-emerald-600">{proofDetail.amount}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-emerald-700 font-medium">
                  ✓ Verified against Govt GST Portal
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Proof Type:</span>
                  <span className="font-semibold text-slate-800">In-App Live Photo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">GPS Fence:</span>
                  <span className="font-mono text-slate-800">{proofDetail.location}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-emerald-700 font-medium">
                  ✓ Metadata & EXIF tamper check passed
                </div>
              </div>
            )}

            <button
              onClick={() => setProofDetail(null)}
              className="mt-5 w-full py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800"
            >
              Close Proof
            </button>
          </div>
        </div>
      )}
    </div>
  );
}