# Email & WhatsApp Trigger Integration Guide

This guide explains how to enable **Email notifications** and **WhatsApp triggers** for:
1. **Book a Visit Reservation** (`src/pages/AboutPage.jsx` #book-visit)
2. **Admission & Contact Inquiry Form** (`src/components/InquiryForm.jsx` & `src/pages/ContactPage.jsx`)

---

## 1. How WhatsApp Trigger Works (Instant & Free)

When parents submit their inquiry, the website formats the child and parent details and opens WhatsApp directly to the school admissions phone using WhatsApp's official URL scheme:
`https://wa.me/91XXXXXXXXXX?text=...`

### To update the school's WhatsApp phone number:
Open `src/components/InquiryForm.jsx` and `src/pages/AboutPage.jsx`:
```javascript
// Replace with the school's 10-digit phone number with '91' country code:
const schoolWhatsAppNumber = "919876543210"; 
```

---

## 2. How Email Trigger Works (Zero Backend)

To receive an email directly in `admissions@dpsjunior.edu.in` or `dpsjuniorbaghpat@gmail.com`:

### Recommended Free Service: Web3Forms (Takes 2 minutes)
1. Go to **[https://web3forms.com](https://web3forms.com)**.
2. Enter your school email address to receive your free **Access Key**.
3. In `src/components/InquiryForm.jsx`, add the fetch call inside `handleWhatsAppSubmit`:

```javascript
// Send email in the background
fetch("https://api.web3forms.com/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    access_key: "YOUR_ACCESS_KEY_HERE",
    subject: `New Admission Inquiry - ${formData.parentName} (${formData.grade})`,
    ...formData
  })
}).catch(err => console.log(err));
```

---

## 3. Dual-Action (Email + WhatsApp Together)
When a parent clicks **"Submit"**:
1. An **Email** is immediately dispatched to the school admin inbox with the full inquiry.
2. **WhatsApp** opens on the parent's phone with the message pre-filled so they can chat directly with admissions.

