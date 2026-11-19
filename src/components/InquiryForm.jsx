import React, { useState } from "react";
import { ArrowRight, CheckIcon } from "./Icons";
import { sendFormEmail } from "../data/school";

export default function InquiryForm({ defaultGrade = "Class 1" }) {
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    childName: "",
    grade: defaultGrade,
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const schoolWhatsAppNumber = "919359159934"; // Admissions desk WhatsApp

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) {
      alert("Please enter parent name and contact number.");
      return;
    }

    setLoading(true);

    // Format WhatsApp message
    const text = encodeURIComponent(
      `*New Admission Inquiry - DPS Junior Public School*\n\n` +
      `👤 *Parent Name:* ${formData.parentName}\n` +
      `📞 *Phone Number:* ${formData.phone}\n` +
      `📧 *Email:* ${formData.email || "Not provided"}\n` +
      `👶 *Child Name:* ${formData.childName || "Not provided"}\n` +
      `🏫 *Grade Interested:* ${formData.grade}\n` +
      `💬 *Message:* ${formData.message || "I would like to inquire about admissions."}`
    );

    const waUrl = `https://wa.me/${schoolWhatsAppNumber}?text=${text}`;

    // Dispatches email to school inbox simultaneously
    sendFormEmail(`Direct WhatsApp Inquiry - ${formData.parentName} (${formData.grade})`, {
      "Parent Name": formData.parentName,
      "Phone": formData.phone,
      "Email": formData.email || "Not provided",
      "Child Name": formData.childName || "Not provided",
      "Grade Interested": formData.grade,
      "Message": formData.message || "I would like to inquire about admissions."
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(waUrl, "_blank");
    }, 400);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E6E2DD] shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#264E52]">Admissions & Visit Inquiry</h3>
        <p className="text-xs text-slate-500 mt-1">
          Submit below to connect with our Admissions Coordinator via WhatsApp.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckIcon size={24} color="white" />
          </div>
          <h4 className="text-lg font-bold text-emerald-900">Inquiry Dispatched!</h4>
          <p className="text-sm text-emerald-700 mt-2">
            Your inquiry has been opened on WhatsApp. Our admissions desk will respond shortly.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-semibold text-emerald-800 underline"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Parent / Guardian Name *</label>
              <input
                type="text"
                name="parentName"
                required
                value={formData.parentName}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#264E52] focus:ring-1 focus:ring-[#264E52]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Contact Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#264E52] focus:ring-1 focus:ring-[#264E52]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Child's Name (Optional)</label>
              <input
                type="text"
                name="childName"
                value={formData.childName}
                onChange={handleChange}
                placeholder="Child's full name"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#264E52] focus:ring-1 focus:ring-[#264E52]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Grade / Class of Interest *</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#264E52] focus:ring-1 focus:ring-[#264E52] bg-white"
              >
                <option value="Playgroup">Playgroup (Age 2+)</option>
                <option value="Nursery">Nursery (Age 3+)</option>
                <option value="LKG">LKG (Age 4+)</option>
                <option value="UKG">UKG (Age 5+)</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Any Questions or Requirements</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Inquire about transportation, timing, fee schedule, or book a campus tour..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#264E52] focus:ring-1 focus:ring-[#264E52]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-6 rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              <span>{loading ? "Preparing WhatsApp..." : "Send Inquiry on WhatsApp"}</span>
              <ArrowRight size={16} color="white" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

