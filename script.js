// 取得 HTML 元素
const startPage = document.getElementById('start-page');
const questionPage = document.getElementById('question-page');
const resultPage = document.getElementById('result-page');
const startBtn = document.getElementById('start-btn');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const options = document.querySelectorAll('.option');
const nextBtn = document.getElementById('next-btn');
const mbtiType = document.getElementById('mbti-type');
const jobRecommendation = document.getElementById('job-recommendation');
const jobTitle = document.getElementById('job-title');
const jobDescription = document.getElementById('job-description');
const retryBtn = document.getElementById('retry-btn');
const jobLinkBtn = document.getElementById('job-link-btn');

// 題目資料
const questions = [
    {
        text: '你和朋友去參加密室逃脫，輪到你選擇主題時，你會選：',
        options: [
            '以破解程式密碼的邏輯性主題',
            '可享受心跳刺激感的恐怖主題',
            '需要團隊合作的解謎與角色扮演主題',
            '考驗組裝和線索連結能力，結構性概念強的密室逃脫主題'
        ],
        dimensions: ['T', 'F', 'F', 'T']
    },
    {
        text: '朋友邀請你參加週末野營活動，你有可能是的回應是：',
        options: [
            '好耶！大家一起去最有趣了！',
            '再看看天氣和活動安排，再決定好了',
            '很多人嗎？如果有人熟人OK！',
            '馬上問有幾台車？露營區怎麼去？我來規劃！'
        ],
        dimensions: ['E', 'I', 'I', 'E']
    },
    {
        text: '你參加一場大型比賽，主辦單位流程很混亂，你會：',
        options: [
            '自己找資訊解決問題，不想浪費時間',
            '幫忙其他人一起找到方向並安撫情緒',
            '嘗試聯絡工作人員並幫忙現場引導秩序',
            '先觀察其他人怎麼做，再決定要不要管'
        ],
        dimensions: ['T', 'F', 'J', 'P']
    },
    {
        text: '你收到兩項任務，一個是整理資料，一個是設計海報，你會：',
        options: [
            '先完成資料整理，循序漸進處理',
            '先做有趣的海報再看資料',
            '同時處理兩件事，邊做邊切換',
            '規劃時間分段處理，每件事都照流程走'
        ],
        dimensions: ['J', 'P', 'P', 'J']
    },
     {
        text: '朋友約你最近在忙什麼，你會：',
        options: [
            '詳細分享在做的事情進度和數據分析',
            '講自己遇到的趣事或與人互動經歷',
            '快速總結近況然後問對方',
            '開始分享自己所忙的事情具有何種發展潛力'
        ],
        dimensions: ['T', 'F', 'F', 'N']
    },
    {
        text: '你比較相信：',
        options: [
            '已掌握的資訊和證據',
            '自己的直覺和整體感覺',
            '他人過往的實際經驗與做法',
            '自己腦中的新構想'
        ],
        dimensions: ['S', 'N', 'S', 'N']
    },
    {
        text: '假如你要設計一款APP，你會：',
        options: [
            '思考功能架構、使用流程與技術邏輯',
            '著重使用者體驗與畫面美感',
            '以團隊討論為主，傾聽各方意見',
            '自己默默試做後再邀請他人測試'
        ],
        dimensions: ['T', 'F', 'F', 'T']
    },
    {
        text: '如果今天行程突然改變，你會怎麼反應？',
        options: [
            '有點不安，但會馬上擬定新計畫',
            '覺得開心，獲得可自由安排的空檔',
            '先觀望再決定要不要行動',
            '詢問原因並思考如何補回原訂影響的行程'
        ],
        dimensions: ['J', 'P', 'P', 'J']
    },
    {
        text: '在一個陌生的社交場合裡，你會：',
        options: [
            '主動認識新朋友，打開話題',
            '先找個安靜角落觀察',
            '跟熟人混在一起就好',
            '幫忙遞水或協助他人聯繫主辦單位'
        ],
        dimensions: ['E', 'I', 'I', 'E']
    },
    {
        text: '你喜歡的工作氛圍是：',
        options: [
            '程序清晰、分工精準的團隊',
            '自由變化、彈性高的工作節奏',
            '可常常與人互動的環境',
            '安靜、有獨立思考時間的空間'
        ],
        dimensions: ['J', 'P', 'E', 'I']
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

// 開始測驗
startBtn.addEventListener('click', () => {
    startPage.classList.add('hidden');
    questionPage.classList.remove('hidden');
    showQuestion();
});

// 顯示題目
function showQuestion() {
    questionNumber.textContent = `問題 ${currentQuestionIndex + 1} / 共 ${questions.length} 題`;
    questionText.textContent = questions[currentQuestionIndex].text;
    options.forEach((option, index) => {
        option.textContent = questions[currentQuestionIndex].options[index];
        option.addEventListener('click', () => selectAnswer(index));
    });
    nextBtn.classList.add('hidden');
}

// 選擇答案
function selectAnswer(selectedIndex) {
    userAnswers.push(questions[currentQuestionIndex].dimensions[selectedIndex]);
    options.forEach(option => option.classList.remove('selected'));
    options[selectedIndex].classList.add('selected');
    nextBtn.classList.remove('hidden');
}

// 下一題
nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
        nextBtn.classList.add('hidden');
        options.forEach(option => option.classList.remove('selected'));
    } else {
        showResult();
    }
});

// 顯示結果
function showResult() {
    questionPage.classList.add('hidden');
    resultPage.classList.remove('hidden');

    const calculatedMBTI = calculateMBTI();
    mbtiType.textContent = calculatedMBTI;

    recommendJob(calculatedMBTI);
}

// 計算 MBTI 類型
function calculateMBTI() {
    let counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    userAnswers.forEach(answer => {
        counts[answer]++;
    });

    let result = '';
    result += counts['E'] >= counts['I'] ? 'E' : 'I';
    result += counts['S'] >= counts['N'] ? 'S' : 'N';
    result += counts['T'] >= counts['F'] ? 'T' : 'F';
    result += counts['J'] >= counts['P'] ? 'J' : 'P';

    return result;
}

// 推薦職缺
function recommendJob(mbti) {
    let recommendedJob = {
        title: '未找到適合職缺',
        description: '根據您的測驗結果，目前沒有特別推薦的職缺。'
    };

    // 職缺資料庫 (你需要根據你的資料來修改)
    const jobDatabase = {
        'ESTJ': { title: '事務員', description: '你擅長組織、注重效率，能在有條理的環境中發揮所長。' },
        'ESFJ': { title: '事務員', description: '你擅長關心他人、處理人際溝通，具備良好的組織能力與現場應變能力。' },
        'ISFJ': { title: '事務員/輕軌司機員', description: '你重視細節、做事謹慎，喜歡有規範、有步驟的工作環境。' },
        'ISTJ': { title: '輕軌司機員/車電技術員/工務技術員', description: '你責任感強、專注力高、冷靜、守規範。' },
        'ISTP': { title: '輕軌司機員/工務技術員', description: '你講求效率與實作導向，喜歡有邏輯、有系統的操作環境。' },
        'INTJ': { title: '車電技術員', description: '你擁有敏銳的邏輯分析與系統規劃能力，擅長在複雜資訊中找出規律、創造解決方案。' },
        'INTP': { title: '車電技術員', description: '你具有獨立思考和解決問題的能力，擅長分析和理解複雜的系統。' },

        // 剩餘的 MBTI 類型，根據其特質分配職務
        'ESTP': { title: '事務員', description: '你充滿活力、適應力強，善於在快節奏的環境中工作。' },
        'ESFP': { title: '事務員', description: '你熱情開朗、享受與人互動，能在服務崗位上發光發熱。' },
        'ENFJ': { title: '事務員', description: '你善於激勵他人、具有領導才能，能在團隊中發揮影響力。' },
        'ENFP': { title: '事務員', description: '你充滿創意、善於溝通，能在多元化的工作內容中找到樂趣。' },
        'ISTJ': { title: '輕軌司機員', description: '你重視細節、做事謹慎，喜歡有規範、有步驟的工作環境。' },
        'ISFP': { title: '輕軌司機員', description: '你溫和體貼、注重實際，能在穩定且有條理的環境中貢獻。' },
        'ENTJ': { title: '車電技術員', description: '你具有策略性思維、善於分析，能在複雜的技術挑戰中展現才華。' },
        'ENTP': { title: '車電技術員', description: '你思維敏捷、善於創新，能在技術開發和問題解決中找到樂趣。' },
        'INFJ': { title: '事務員', description: '你具有洞察力、關心他人，能在需要同理心和理解的工作中發揮所長。' },
        'INFP': { title: '事務員', description: '你理想主義、善於表達，能在需要創意和溝通的環境中找到滿足感。' }

    };

    if (jobDatabase[mbti]) {
        recommendedJob = jobDatabase[mbti];
    }

    jobTitle.textContent = recommendedJob.title;
    jobDescription.textContent = recommendedJob.description;
}

// 再次測驗
retryBtn.addEventListener('click', () => {
    resultPage.classList.add('hidden');
    startPage.classList.remove('hidden');

    // 重置測驗相關變數
    currentQuestionIndex = 0;
    userAnswers = [];

    // 新增：移除所有選項按鈕的 selected 類別
    options.forEach(option => option.classList.remove('selected'));

    // 新增：重新顯示下一題按鈕 (如果之前被隱藏)
    nextBtn.classList.remove('hidden');
});

// 相關職缺 (需要根據你的實際情況修改)
jobLinkBtn.addEventListener('click', () => {
    alert('此處應連結到相關職缺頁面');
    // 你可以使用 window.open() 或 window.location.href 來導向到相關職缺頁面
    // 例如： window.location.href = '/career';
});