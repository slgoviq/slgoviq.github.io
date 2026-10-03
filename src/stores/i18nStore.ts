import { atom } from 'nanostores';

export type Language = 'en' | 'si' | 'ta';

export interface FaqItem {
  q: string;
  a: string;
}

export interface Translations {
  appName: string;
  appBadge: string;
  tagline: string;
  papersNav: string;
  allPapers: string;
  filterByLang: string;
  allLanguages: string;
  durationMinutes: string;
  questionsCount: string;
  startExam: string;
  retakeExam: string;
  backToPapers: string;
  timeRemaining: string;
  timerWarning: string;
  question: string;
  of: string;
  previous: string;
  next: string;
  clearSelection: string;
  flagQuestion: string;
  unflagQuestion: string;
  submitExam: string;
  confirmSubmitTitle: string;
  confirmSubmitMessage: string;
  confirmSubmitButton: string;
  cancel: string;
  answeredCount: string;
  unansweredCount: string;
  flaggedCount: string;
  resultsTitle: string;
  yourScore: string;
  accuracy: string;
  timeTaken: string;
  statusDistinction: string;
  statusMerit: string;
  statusPass: string;
  statusPractice: string;
  filterAll: string;
  filterCorrect: string;
  filterIncorrect: string;
  filterUnanswered: string;
  shortMethodTitle: string;
  yourAnswer: string;
  correctAnswer: string;
  unanswered: string;
  timeExpired: string;
  leaveWarning: string;
  selectLanguage: string;
  // Landing Page Hero & Metrics
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  metricTimer: string;
  metricMethods: string;
  metricLangs: string;
  metricFree: string;
  // Papers Section
  papersHeading: string;
  papersSubheading: string;
  searchPlaceholder: string;
  noPapersFound: string;
  // Feature Cards
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  // FAQ Section
  faqHeading: string;
  faqSubheading: string;
  faqList: FaqItem[];
  // Footer
  footerPlatform: string;
  footerRights: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'SLGovIQ',
    appBadge: 'Sri Lanka Gov Exam Prep',
    tagline: 'Master Government Competitive Exams with Speed Techniques & Real-time Practice',
    papersNav: 'Exam Papers',
    allPapers: 'Available Examination Papers',
    filterByLang: 'Filter by Medium',
    allLanguages: 'All Languages',
    durationMinutes: 'mins',
    questionsCount: 'Questions',
    startExam: 'Start Exam',
    retakeExam: 'Retake Exam',
    backToPapers: 'Back to All Papers',
    timeRemaining: 'Time Remaining',
    timerWarning: 'Warning: Under 5 minutes remaining!',
    question: 'Question',
    of: 'of',
    previous: 'Previous',
    next: 'Next',
    clearSelection: 'Clear Selection',
    flagQuestion: 'Flag for Review',
    unflagQuestion: 'Remove Flag',
    submitExam: 'Submit Exam',
    confirmSubmitTitle: 'Ready to Submit?',
    confirmSubmitMessage: 'You have answered {answered} of {total} questions. Are you sure you want to finish?',
    confirmSubmitButton: 'Yes, Submit Now',
    cancel: 'Return to Exam',
    answeredCount: 'Answered',
    unansweredCount: 'Unanswered',
    flaggedCount: 'Flagged',
    resultsTitle: 'Examination Results',
    yourScore: 'Your Score',
    accuracy: 'Accuracy',
    timeTaken: 'Time Taken',
    statusDistinction: 'Distinction (Excellent speed & precision)',
    statusMerit: 'Merit (Good performance, review speed methods)',
    statusPass: 'Passed (Needs more timed practice)',
    statusPractice: 'Needs Practice (Review short methods below)',
    filterAll: 'All Questions',
    filterCorrect: 'Correct Only',
    filterIncorrect: 'Incorrect Only',
    filterUnanswered: 'Unanswered Only',
    shortMethodTitle: 'Speed Solution / Short Method',
    yourAnswer: 'Your Choice',
    correctAnswer: 'Correct Answer',
    unanswered: 'Unanswered',
    timeExpired: 'Time has expired! Automatically submitting your answers...',
    leaveWarning: 'An exam is currently in progress. If you leave or reload now, your unsaved answers and timer progress will be lost. Are you sure?',
    selectLanguage: 'Language',
    // Landing Page
    heroBadge: '2025/2026 Competitive Exam Syllabus',
    heroTitle: 'Master Sri Lanka Gov Exams with',
    heroTitleHighlight: 'Speed Techniques',
    heroSubtitle: 'Timed practice exam papers with strict countdowns, step-by-step short methods, and instant score analysis. Specially crafted for SLAS, Banking, and Sri Lanka Public Service exams.',
    metricTimer: 'Strict Exam Timers',
    metricMethods: 'Speed & Short Methods',
    metricLangs: 'English • සිංහල • தமிழ்',
    metricFree: '100% Free & Open Access',
    papersHeading: 'Available Examination Papers',
    papersSubheading: 'Select a paper below to begin the timed practice engine.',
    searchPlaceholder: 'Search papers by keyword, exam type (SLAS, Banking)...',
    noPapersFound: 'No examination papers match your filter criteria.',
    feature1Title: 'Real Exam Hall Conditioning',
    feature1Desc: 'Strict timer enforcement mimics competitive government exam hall conditions to build your time-management reflexes.',
    feature2Title: 'High-Yield Short Methods',
    feature2Desc: 'Every question features tested mental arithmetic tricks and speed heuristics to solve complex questions in under 45 seconds.',
    feature3Title: 'Trilingual Accessibility',
    feature3Desc: 'Full high-readability support for English, Sinhala, and Tamil typography, tailored for all Sri Lankan state candidates.',
    faqHeading: 'Frequently Asked Questions (FAQ)',
    faqSubheading: 'Essential insights on preparing for Sri Lanka government competitive exams.',
    faqList: [
      {
        q: 'How do these Sinhala IQ model papers prepare me for government exams?',
        a: 'These papers cover official syllabus patterns from SLAS (Sri Lanka Administrative Service), Banking competitive exams, and Development Officers service. Each question includes a short method to help you master time management under real exam pressure.',
      },
      {
        q: 'Are these IQ model papers completely free with answers?',
        a: 'Yes, 100% free with zero ads. You can take timed tests as many times as you like, get instant scores, and review detailed step-by-step explanations.',
      },
      {
        q: 'Which Sri Lankan competitive exams require IQ (General Intelligence)?',
        a: "SLAS (Civil Service), Central Bank & State Bank (BOC, People's Bank, NSB), Sri Lanka Teachers' Service (SLTS), Management Service Officers (PMAS), and Customs/Excise Inspector exams.",
      },
      {
        q: 'Why are short methods crucial for Sri Lanka IQ exams?',
        a: 'Candidates must typically solve 50 multiple-choice questions within 60 minutes (approximately 72 seconds per question). Mastering mental shortcuts, pattern recognition, and elimination techniques ensures you finish on time.',
      },
    ],
    footerPlatform: 'Sri Lanka Government Exam Practice Platform',
    footerRights: 'Open Exam Practice Platform',
  },
  si: {
    appName: 'SLGovIQ',
    appBadge: 'රාජ්‍ය සේවා විභාග අත්වැල',
    tagline: 'කෙටි ක්‍රම සහ වේගවත් විසඳුම් සමඟ රාජ්‍ය සේවා තරඟ විභාග ජයගන්න',
    papersNav: 'ප්‍රශ්න පත්‍ර',
    allPapers: 'පවතින ආදර්ශ ප්‍රශ්න පත්‍ර',
    filterByLang: 'භාෂා මාධ්‍යය',
    allLanguages: 'සියලුම මාධ්‍ය',
    durationMinutes: 'මිනිත්තු',
    questionsCount: 'ප්‍රශ්න',
    startExam: 'විභාගය ආරම්භ කරන්න',
    retakeExam: 'නැවත උත්සාහ කරන්න',
    backToPapers: 'සියලුම පත්‍ර වෙත',
    timeRemaining: 'ඉතිරි කාලය',
    timerWarning: 'අවවාදයයි: මිනිත්තු 5කට වඩා අඩු කාලයක් ඉතිරිව ඇත!',
    question: 'ප්‍රශ්නය',
    of: '/',
    previous: 'පෙර ප්‍රශ්නය',
    next: 'ඊළඟ ප්‍රශ්නය',
    clearSelection: 'තේරීම ඉවත් කරන්න',
    flagQuestion: 'පසුව බැලීමට සලකුණු කරන්න',
    unflagQuestion: 'සලකුණ ඉවත් කරන්න',
    submitExam: 'විභාගය අවසන් කරන්න',
    confirmSubmitTitle: 'විභාගය අවසන් කිරීමට සූදානම්ද?',
    confirmSubmitMessage: 'ඔබ ප්‍රශ්න {total} න් {answered} කට පිළිතුරු සපයා ඇත. ඔබට පිළිතුරු ඉදිරිපත් කිරීමට අවශ්‍යද?',
    confirmSubmitButton: 'ඔව්, ඉදිරිපත් කරන්න',
    cancel: 'නැවත ප්‍රශ්න පත්‍රයට',
    answeredCount: 'පිළිතුරු සැපයූ',
    unansweredCount: 'පිළිතුරු නොදුන්',
    flaggedCount: 'සලකුණු කළ',
    resultsTitle: 'විභාග ප්‍රතිඵල සාරාංශය',
    yourScore: 'ඔබේ ලකුණු',
    accuracy: 'නිරවද්‍යතාවය',
    timeTaken: 'ගතවූ කාලය',
    statusDistinction: 'විශිෂ්ට සාමාර්ථයක් (ඉහළ නිරවද්‍යතාවයක්)',
    statusMerit: 'සම්මාන සාමාර්ථයක් (හොඳ මට්ටමක්)',
    statusPass: 'සාමාන්‍ය සාමාර්ථයක් (තව පුහුණුව අවශ්‍යයි)',
    statusPractice: 'වැඩිදුර පුහුණුව අවශ්‍යයි (කෙටි ක්‍රම අධ්‍යයනය කරන්න)',
    filterAll: 'සියලු ප්‍රශ්න',
    filterCorrect: 'නිවැරදි පිළිතුරු',
    filterIncorrect: 'වැරදි පිළිතුරු',
    filterUnanswered: 'පිළිතුරු නොදුන්',
    shortMethodTitle: 'කෙටි ක්‍රමය සහ වේගවත් විසඳුම',
    yourAnswer: 'ඔබේ තේරීම',
    correctAnswer: 'නිවැරදි පිළිතුර',
    unanswered: 'පිළිතුරු දී නැත',
    timeExpired: 'කාලය අවසන් විය! පිළිතුරු ස්වයංක්‍රීයව ඉදිරිපත් කෙරේ...',
    leaveWarning: 'විභාගය තවමත් ක්‍රියාත්මකයි. ඔබ පිටවුවහොත් හෝ නැවත පූරණය කළහොත් ප්‍රගතිය අහිමි විය හැක. ඔබට පිටවීමට අවශ්‍යද?',
    selectLanguage: 'භාෂාව',
    // Landing Page
    heroBadge: '2025/2026 රජයේ තරඟ විභාග විෂය නිර්දේශය',
    heroTitle: 'කෙටි ක්‍රම සහ වේගවත් විසඳුම් සමඟ',
    heroTitleHighlight: 'රාජ්‍ය විභාග ජයගන්න',
    heroSubtitle: 'නියමිත කාල සීමාව, පියවරෙන් පියවර කෙටි විසඳුම් ක්‍රම සහ ක්ෂණික ලකුණු විශ්ලේෂණය සහිත නොමිලේ විභාග පුහුණු වේදිකාව. SLAS, බැංකු, සංවර්ධන නිලධාරී සහ ගුරු විභාග සඳහා විශේෂයි.',
    metricTimer: 'නියමිත විභාග ටයිමරය',
    metricMethods: 'කෙටි ක්‍රම සහ ශිල්පක්‍රම',
    metricLangs: 'සිංහල • English • தமிழ்',
    metricFree: '100% නොමිලේ සහ විවෘතයි',
    papersHeading: 'පවතින ආදර්ශ ප්‍රශ්න පත්‍ර',
    papersSubheading: 'කාල ගණනය සමඟ පුහුණුව ආරම්භ කිරීමට පහතින් ප්‍රශ්න පත්‍රයක් තෝරන්න.',
    searchPlaceholder: 'ප්‍රශ්න පත්‍ර මාතෘකාව හෝ විභාග වර්ගය (SLAS, බැංකු) අනුව සොයන්න...',
    noPapersFound: 'ඔබේ සෙවුමට ගැලපෙන ප්‍රශ්න පත්‍ර කිසිවක් හමු නොවීය.',
    feature1Title: 'සැබෑ විභාග ශාලා අත්දැකීම',
    feature1Desc: 'නියමිත කාල සීමාවන් තුළ ප්‍රශ්න විසඳීම මඟින් රජයේ විභාග ශාලාවේ ඇතිවන පීඩනයට සාර්ථකව මුහුණ දීමටත්, කාල කළමනාකරණයටත් මනා පුහුණුවක් ලැබේ.',
    feature2Title: 'සුවිශේෂී කෙටි ක්‍රම සහ කෙටි විසඳුම්',
    feature2Desc: 'සෑම ප්‍රශ්නයකටම තත්පර 45කට අඩු කාලයකින් විසඳුම කරා ළඟා විය හැකි ගණිතමය කෙටි ක්‍රම සහ තාර්කික කෙටි විසඳුම් ලබා දී ඇත.',
    feature3Title: 'භාෂා ත්‍රිත්වයෙන්ම ප්‍රවේශය',
    feature3Desc: 'සිංහල, ඉංග්‍රීසි සහ දෙමළ භාෂා ත්‍රිත්වයෙන්ම සකස් කළ පැහැදිලි අකුරු සහ කියවීමේ පහසුව සහිත පූර්ණ ශ්‍රී ලාංකීය විභාග වේදිකාව.',
    faqHeading: 'නිතර අසන ප්‍රශ්න (FAQ)',
    faqSubheading: 'ශ්‍රී ලංකා රජයේ තරඟ විභාග ජයගැනීම සඳහා වැදගත් උපදෙස්.',
    faqList: [
      {
        q: 'මෙම සිංහල IQ ප්‍රශ්න පත්‍ර රජයේ විභාග සඳහා ප්‍රයෝජනවත් වන්නේ කෙසේද?',
        a: 'ශ්‍රී ලංකා පරිපාලන සේවය (SLAS), රාජ්‍ය බැංකු (BOC, People\'s Bank), සංවර්ධන නිලධාරී සහ ගුරු විභාග වල නවතම ප්‍රශ්න රටාවන්ට අනුව මෙම ප්‍රශ්න පත්‍ර සකස් කර ඇත. එක් එක් ප්‍රශ්නයට කෙටි ක්‍රම සපයා ඇති බැවින් අඩු කාලයකින් නිවැරදි පිළිතුර ලබාගත හැක.',
      },
      {
        q: 'මෙම ආදර්ශ ප්‍රශ්න පත්‍ර සහ පිළිතුරු නොමිලේ පුහුණු විය හැකිද?',
        a: 'ඔව්, 100% ක් නොමිලේ කිසිදු ගාස්තුවකින් තොරව ඕනෑම වාර ගණනක් පුහුණු විය හැකිය. විභාගය අවසන් වූ වහාම ඔබේ ලකුණු සහ සම්පූර්ණ විවරණය බලාගත හැක.',
      },
      {
        q: 'බුද්ධි පරීක්ෂණය (IQ) අනිවාර්ය වන ශ්‍රී ලංකාවේ ප්‍රධාන රජයේ විභාග මොනවාද?',
        a: 'ශ්‍රී ලංකා පරිපාලන සේවා විභාගය (SLAS), මහ බැංකු සහ රාජ්‍ය බැංකු තරඟ විභාග, සංවර්ධන නිලධාරී සේවා විභාගය, ශ්‍රී ලංකා ගුරු සේවය (SLTS) සහ කළමනාකරණ සේවා නිලධාරී විභාගය (PMAS).',
      },
      {
        q: 'රජයේ IQ විභාග සඳහා කෙටි ක්‍රම (Short Methods) මෙතරම් වැදගත් වන්නේ ඇයි?',
        a: 'සාමාන්‍යයෙන් විනාඩි 60ක් තුළ බහුවරණ ප්‍රශ්න 50කට පිළිතුරු සැපයිය යුතුය (එක් ප්‍රශ්නයකට තත්පර 72ක් පමණි). එබැවින් දීර්ඝ ගණනය කිරීම් වෙනුවට කෙටි ක්‍රම සහ උපක්‍රම භාවිතය සාර්ථකත්වයට අත්‍යවශ්‍ය වේ.',
      },
    ],
    footerPlatform: 'ශ්‍රී ලංකා රාජ්‍ය විභාග පෙරහුරු වේදිකාව',
    footerRights: 'විවෘත විභාග පෙරහුරු වේදිකාව',
  },
  ta: {
    appName: 'SLGovIQ',
    appBadge: 'அரச போட்டிப் பரீட்சை வழிகாட்டி',
    tagline: 'குறுக்கு வழி முறைகளுடன் அரச போட்டிப் பரீட்சைகளுக்கான நிகழ்நேர பயிற்சி தளம்',
    papersNav: 'வினாத்தாள்கள்',
    allPapers: 'கிடைக்கக்கூடிய மாதிரி வினாத்தாள்கள்',
    filterByLang: 'மொழி வாரியாக',
    allLanguages: 'அனைத்து மொழிகள்',
    durationMinutes: 'நிமிடங்கள்',
    questionsCount: 'வினாக்கள்',
    startExam: 'பரீட்சையைத் தொடங்குக',
    retakeExam: 'மீண்டும் முயற்சிக்கவும்',
    backToPapers: 'அனைத்து தாள்களுக்கும் செல்க',
    timeRemaining: 'மீதமுள்ள நேரம்',
    timerWarning: 'எச்சரிக்கை: 5 நிமிடங்களுக்கும் குறைவான நேரமே உள்ளது!',
    question: 'வினா',
    of: '/',
    previous: 'முந்தையது',
    next: 'அடுத்தது',
    clearSelection: 'தேர்வை நீக்குக',
    flagQuestion: 'மறுஆய்வுக்குக் குறிக்க',
    unflagQuestion: 'குறியை நீக்குக',
    submitExam: 'பரீட்சையைச் சமர்ப்பிக்கவும்',
    confirmSubmitTitle: 'சமர்ப்பிக்கத் தயாரா?',
    confirmSubmitMessage: 'நீங்கள் {total} வினாக்களில் {answered} வினாக்களுக்கு விடையளித்துள்ளீர்கள். சமர்ப்பிக்க விரும்புகிறீர்களா?',
    confirmSubmitButton: 'ஆம், சமர்ப்பிக்கவும்',
    cancel: 'பரீட்சைக்குத் திரும்புக',
    answeredCount: 'விடையளித்தவை',
    unansweredCount: 'விடையளிக்காதவை',
    flaggedCount: 'குறிக்கப்பட்டவை',
    resultsTitle: 'பரீட்சை முடிவுகள்',
    yourScore: 'உங்கள் புள்ளி',
    accuracy: 'துல்லியம்',
    timeTaken: 'எடுத்துக்கொண்ட நேரம்',
    statusDistinction: 'சிறப்புத் தேர்ச்சி (அதிவேகம் மற்றும் துல்லியம்)',
    statusMerit: 'தகுதித் தேர்ச்சி (சிறந்த செயல்திறன்)',
    statusPass: 'தேர்ச்சி (கூடுதல் பயிற்சி தேவை)',
    statusPractice: 'பயிற்சி தேவை (கீழுள்ள குறுக்கு வழி முறைகளை கற்கவும்)',
    filterAll: 'அனைத்து வினாக்கள்',
    filterCorrect: 'சரியானவை மட்டும்',
    filterIncorrect: 'தவறானவை மட்டும்',
    filterUnanswered: 'விடையளிக்காதவை',
    shortMethodTitle: 'குறுக்கு வழி முறை மற்றும் தீர்வு',
    yourAnswer: 'உங்கள் தேர்வு',
    correctAnswer: 'சரியான விடை',
    unanswered: 'விடையளிக்கப்படவில்லை',
    timeExpired: 'நேரம் முடிவடைந்தது! உங்கள் விடைகள் தானாகச் சமர்ப்பிக்கப்படுகின்றன...',
    leaveWarning: 'பரீட்சை நடந்து கொண்டிருக்கிறது. நீங்கள் இப்போது வெளியேறினால் விடைகளும் நேரமும் இழக்கப்படும். வெளியேறவா?',
    selectLanguage: 'மொழி',
    // Landing Page
    heroBadge: '2025/2026 போட்டிப் பரீட்சை பாடத்திட்டம்',
    heroTitle: 'குறுக்கு வழி நுட்பங்களுடன்',
    heroTitleHighlight: 'அரச தேர்வுகளில் வெல்லுங்கள்',
    heroSubtitle: 'கண்டிப்பான நேரக் கணிப்பு, படிப்படியான குறுக்கு வழி முறைகள் மற்றும் உடனடி புள்ளிப் பகுப்பாய்வுடன் கூடிய இலவச பயிற்சி தளம். SLAS மற்றும் வங்கிப் பரீட்சைகளுக்காக விசேடமாக வடிவமைக்கப்பட்டது.',
    metricTimer: 'கண்டிப்பான பரீட்சை நேரம்',
    metricMethods: 'குறுக்கு வழி முறைகள்',
    metricLangs: 'தமிழ் • සිංහල • English',
    metricFree: '100% இலவசம் & விளம்பரமற்றது',
    papersHeading: 'கிடைக்கக்கூடிய மாதிரி வினாத்தாள்கள்',
    papersSubheading: 'நேரப் பயிற்சியைத் தொடங்க கீழே உள்ள வினாத்தாளைத் தேர்ந்தெடுக்கவும்.',
    searchPlaceholder: 'வினாத்தாள் அல்லது பரீட்சை வகை (SLAS, வங்கி) மூலம் தேடுங்கள்...',
    noPapersFound: 'பொருத்தமான வினாத்தாள்கள் எதுவும் கிடைக்கவில்லை.',
    feature1Title: 'உண்மையான பரீட்சை சூழல்',
    feature1Desc: 'கண்டிப்பான நேரக் கட்டுப்பாடு உண்மையான பரீட்சை மண்டபப் பதற்றத்தைக் கையாண்டு நேர முகாமைத்துவத்தைப் பழக்கப்படுத்துகிறது.',
    feature2Title: 'பயனுள்ள குறுக்கு வழி முறைகள்',
    feature2Desc: 'ஒவ்வொரு வினாவிற்கும் 45 வினாடிகளுக்குள் விடையளிக்கக்கூடிய நிரூபிக்கப்பட்ட கணித குறுக்கு வழிகள் மற்றும் தர்க்க முறைகள் உள்ளடக்கப்பட்டுள்ளன.',
    feature3Title: 'மும்மொழி அணுகல்',
    feature3Desc: 'சிங்களம், ஆங்கிலம் மற்றும் தமிழ் மொழிகளில் அனைத்து இலங்கை போட்டிப் பரீட்சை மாணவர்களுக்கும் ஏற்றவாறு வாசிப்பு இலகுவாக வடிவமைக்கப்பட்டுள்ளது.',
    faqHeading: 'அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQ)',
    faqSubheading: 'இலங்கை அரச போட்டிப் பரீட்சைகளுக்கான முக்கிய தகவல்கள்.',
    faqList: [
      {
        q: 'இலங்கை அரச பரீட்சைகளுக்கு இந்த மாதிரி வினாத்தாள்கள் எவ்வாறு உதவுகின்றன?',
        a: 'இலங்கை நிர்வாக சேவை (SLAS), வங்கிப் பரீட்சைகள் ஆகியவற்றின் புதிய வினா அமைப்புகளின்படி இவை தயாரிக்கப்பட்டுள்ளன. ஒவ்வொரு வினாவிற்கும் குறுக்கு வழிகள் வழங்கப்பட்டுள்ளன.',
      },
      {
        q: 'இந்த வினாத்தாள்கள் முற்றிலும் இலவசமானவையா?',
        a: 'ஆம், எந்தவொரு கட்டணமும் இன்றி 100% இலவசமாகப் பயிற்சி செய்யலாம். உடனடியாகப் புள்ளிகளையும் விளக்கங்களையும் பெறலாம்.',
      },
      {
        q: 'நுண்ணறிவுப் பரீட்சை (IQ) கட்டாயமான அரச தேர்வுகள் எவை?',
        a: 'SLAS, மத்திய வங்கி, மக்கள் வங்கி, இலங்கை வங்கி, ஆசிரியர் சேவை மற்றும் முகாமைத்துவ சேவை உத்தியோகத்தர் பரீட்சைகள்.',
      },
      {
        q: 'IQ பரீட்சைக்குக் குறுக்கு வழி முறைகள் ஏன் அவசியம்?',
        a: '60 நிமிடங்களில் 50 வினாக்களுக்கு விடையளிக்க வேண்டும் (ஒரு வினாவிற்கு சுமார் 72 வினாடிகள் மட்டுமே). எனவே நேரத்தைச் சேமிக்கக் குறுக்கு வழிகள் மிகவும் அவசியம்.',
      },
    ],
    footerPlatform: 'இலங்கை அரச போட்டிப் பரீட்சை பயிற்சி தளம்',
    footerRights: 'திறந்த பரீட்சை பயிற்சி தளம்',
  },
};

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'si';
  const saved = localStorage.getItem('slgoviq_lang') as Language | null;
  if (saved === 'en' || saved === 'si' || saved === 'ta') return saved;
  return 'si';
};

export const currentLanguageStore = atom<Language>(getInitialLanguage());

export const initLanguage = () => {
  if (typeof window === 'undefined') return;
  const initial = getInitialLanguage();
  currentLanguageStore.set(initial);
};

export const setLanguage = (lang: Language) => {
  currentLanguageStore.set(lang);
  if (typeof window !== 'undefined') {
    localStorage.setItem('slgoviq_lang', lang);
  }
};
