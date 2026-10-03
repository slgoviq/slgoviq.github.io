# SLGovIQ — Sri Lanka Government Exam Practice Platform

[![Astro](https://img.shields.io/badge/Astro-4.16.18-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **Website:** [https://slgoviq.github.io](https://slgoviq.github.io)

**SLGovIQ** is an open-access, client-side exam practice platform tailored specifically for Sri Lankan public sector competitive examination candidates. It offers realistic exam hall simulations, strict countdown timers, and step-by-step **Short Methods (කෙටි ක්‍රම / குறுக்கு வழிகள்)** in **Sinhala (සිංහල)**, **English**, and **Tamil (தமிழ்)**.

---

## 🌟 Key Features

- ⏱️ **Real-Time Exam Engine:** Strict countdown timer with automatic submission and accidental reload protection (`sessionStorage`).
- ⚡ **Speed Solutions & Short Methods:** Instant step-by-step mental shortcuts and formulas to solve questions in under 45 seconds.
- 🌐 **Trilingual Support:** Instant language switching across Sinhala, English, and Tamil.
- 🎨 **Minimalist UI:** Clean, distraction-free interface with dark and light mode support.
- 🔒 **Privacy First:** 100% client-side execution with zero accounts, zero tracking, and instant results.

---

## 🎯 Target Examinations

- **SLAS (Sri Lanka Administrative Service)** — Open & Limited Competitive Exams
- **Banking Sector Exams** — Bank of Ceylon (BOC), People's Bank, National Savings Bank (NSB), Central Bank of Sri Lanka (CBSL)
- **Development Officers' Service (සංවර්ධන නිලධාරී විභාගය)**
- **Sri Lanka Teachers' Service (SLTS - ගුරු සේවා විභාගය)**
- **Public Management Assistant Service (PMAS - කළමනාකරණ සේවා නිලධාරී)**

---

## 📝 Adding New Exam Papers

Model papers are stored in `src/content/papers/` as Markdown (`.md`) files:

```yaml
---
title: "ශ්‍රී ලංකා පරිපාලන සේවය සහ බැංකු විභාග බුද්ධි පරීක්ෂණ ආදර්ශ පත්‍රය 03"
language: "si" # "si" | "en" | "ta"
durationMinutes: 60
description: "රාජ්‍ය සේවා තරඟ විභාග සඳහා කෙටි ක්‍රම සහිත බුද්ධි පරීක්ෂණ ප්‍රශ්නාවලිය."
category: "බුද්ධි පරීක්ෂණය සහ ගණිතමය තර්කනය"
questions:
  - id: 1
    question: "පහත සංඛ්‍යා රටාවේ මීළඟට එන සංඛ්‍යාව කුමක්ද? 4, 9, 25, 49, 121, 169, ?"
    options:
      - "196"
      - "225"
      - "289"
      - "361"
    correctIndex: 2
    shortMethod: "ප්‍රථමක සංඛ්‍යාවල වර්ග: 2², 3², 5², 7², 11², 13². 13 න් පසු මීළඟ ප්‍රථමකය 17 වේ. එබැවින් 17² = 289."
---
```

---

## 🛠️ Commands

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
