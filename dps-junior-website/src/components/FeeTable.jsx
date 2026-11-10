import React, { useState } from "react";
import { DownloadIcon, CheckIcon } from "./Icons";

export default function FeeTable() {
  const [downloaded, setDownloaded] = useState(false);

  const feeStructure = [
    {
      group: "Early Foundation",
      classes: "Playgroup, Nursery, LKG, UKG",
      admissionFee: "₹10,000",
      quarterlyTuition: "₹7,500",
      annualCharges: "₹4,000",
      features: ["Activity-based learning", "Storytelling & phonics kit", "Nutritious snack assistance", "Safety monitored playzone"]
    },
    {
      group: "Primary Wing",
      classes: "Class 1 to Class 5",
      admissionFee: "₹12,000",
      quarterlyTuition: "₹9,000",
      annualCharges: "₹5,000",
      features: ["CBSE foundational curriculum", "Smart board digital content", "Computer & coding lab", "Sports & performing arts"]
    },
    {
      group: "Middle Wing",
      classes: "Class 6 to Class 8",
      admissionFee: "₹15,000",
      quarterlyTuition: "₹11,000",
      annualCharges: "₹6,000",
      features: ["Advanced STEM & Science labs", "Leadership & debate clubs", "Remedial subject clinics", "Inter-school Olympiads"]
    }
  ];

  const handleDownloadPdf = () => {
    // Generate institutional print/download view
    const printContent = `
      <html>
        <head>
          <title>DPS JUNIOR PUBLIC SCHOOL - Fee Schedule 2026-27</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #264E52; }
            h1 { color: #264E52; border-bottom: 2px solid #264E52; padding-bottom: 10px; margin-bottom: 5px; }
            p.sub { color: #666; margin-top: 0; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; margin-top: 25px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #264E52; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .notes { margin-top: 30px; font-size: 12px; color: #555; line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>DPS JUNIOR PUBLIC SCHOOL, BAGHPAT</h1>
          <p class="sub">Affiliated under CBSE Standards | Playgroup to Class VIII | Academic Session 2026-27</p>
          <h3>Approved Fee Schedule & Schedule of Payments</h3>
          <table>
            <thead>
              <tr>
                <th>Wing / Group</th>
                <th>Grades Included</th>
                <th>One-time Registration</th>
                <th>Quarterly Tuition</th>
                <th>Annual Development</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Early Foundation</td>
                <td>Playgroup, Nursery, LKG, UKG</td>
                <td>₹10,000</td>
                <td>₹7,500</td>
                <td>₹4,000</td>
              </tr>
              <tr>
                <td>Primary Wing</td>
                <td>Class 1 to Class 5</td>
                <td>₹12,000</td>
                <td>₹9,000</td>
                <td>₹5,000</td>
              </tr>
              <tr>
                <td>Middle Wing</td>
                <td>Class 6 to Class 8</td>
                <td>₹15,000</td>
                <td>₹11,000</td>
                <td>₹6,000</td>
              </tr>
            </tbody>
          </table>
          <div class="notes">
            <strong>Payment Policies:</strong><br/>
            1. Tuition fees are payable quarterly by the 10th of April, July, October, and January.<br/>
            2. Transport charges are optional and calculated based on route distance (0–5 km, 5–10 km, 10+ km).<br/>
            3. Sibling discount of 10% applies on quarterly tuition for the second child.<br/>
            4. For fee queries, contact admissions: admissions@dpsjunior.edu.in | +91 98765 43210.
          </div>
        </body>
      </html>
    `;
    const win = window.open("", "_blank");
    win.document.write(printContent);
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
    }, 500);
    setDownloaded(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E6E2DD] shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-[#264E52] tracking-tight">Academic Fee Structure (2026-27)</h3>
          <p className="text-sm text-slate-500 mt-1">Transparent, all-inclusive pricing with zero hidden surcharges.</p>
        </div>
        <button
          onClick={handleDownloadPdf}
          className="inline-flex items-center gap-2 bg-[#264E52] text-white px-5 py-3 rounded-full font-semibold text-sm hover:bg-[#1f3f42] transition-colors shadow-sm cursor-pointer"
        >
          {downloaded ? <CheckIcon size={16} color="white" /> : <DownloadIcon size={16} color="white" />}
          <span>{downloaded ? "Document Opened / Printed" : "Download Official Fee PDF"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feeStructure.map((tier, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#264E52]/40 transition-all shadow-hover"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#264E52] bg-[#264E52]/10 px-3 py-1 rounded-full">
                {tier.group}
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-3">{tier.classes}</h4>

              <div className="my-6 space-y-2 border-y border-slate-200 py-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Quarterly Tuition:</span>
                  <span className="font-bold text-[#264E52]">{tier.quarterlyTuition}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">One-Time Admission:</span>
                  <span className="font-semibold text-slate-800">{tier.admissionFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Annual Development:</span>
                  <span className="font-semibold text-slate-800">{tier.annualCharges}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Wing Inclusions:</p>
                {tier.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2">
                    <span className="text-teal-700 font-bold">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href="#book-visit"
                className="block text-center text-xs font-bold text-[#264E52] hover:underline"
              >
                Inquire for {tier.group} →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs text-amber-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <p>
          💡 <strong>Sibling Concession:</strong> 10% concession on tuition fees for the younger sibling studying concurrently.
        </p>
        <span className="text-[11px] text-amber-800 font-semibold">Transport available across all major Baghpat zones</span>
      </div>
    </div>
  );
}

