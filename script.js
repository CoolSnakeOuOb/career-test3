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
const jobList = document.getElementById('job-list');
const retryBtn = document.getElementById('retry-btn');
const jobLinkBtn = document.getElementById('job-link-btn');

// 題目資料（根據測驗題目new與控制員資訊.xlsx）
const questions = [
    {
        text: '放假在家，你最可能會',
        options: ['揪朋友出門逛街玩樂', '窩在家看書或追劇', '試著規劃接下來的行程', '隨心所欲，想到再說'],
        dimensions: ['E', 'I', 'J', 'P']
    },
    {
        text: '面對一個全新任務，你會先：',
        options: ['想像整體畫面與可能結果', '找人討論做法再開始', '照SOP一步步執行', '做中學，邊試邊調整'],
        dimensions: ['N', 'E', 'S', 'P']
    },
    {
        text: '朋友遲到 30 分鐘，你：',
        options: ['已經傳訊問情況了', '還在滑手機，沒太在意', '想是不是出什麼意外了', '把這次當作以後調整安排的參考'],
        dimensions: ['J', 'P', 'F', 'T']
    },
    {
        text: '買東西時你偏好：',
        options: ['快速決定，信直覺', '做功課比價選最實用的', '照口碑推薦買', '自己分析優缺點選擇'],
        dimensions: ['N', 'S', 'F', 'T']
    },
    {
        text: '聚會結束後，你通常：',
        options: ['滿滿能量，想續攤！', '累到只想快點回家安靜一下', '回想當天細節慢慢咀嚼', '忽然靈感爆發想寫個心得'],
        dimensions: ['E', 'I', 'S', 'N']
    },
    {
        text: '要跟陌生人合作，你會：',
        options: ['主動破冰建立關係', '等對方先開口再說', '關心對方感受，先拉近距離', '聚焦任務內容，效率第一'],
        dimensions: ['E', 'I', 'F', 'T']
    },
    {
        text: '朋友最常說你：',
        options: ['想很多、喜歡提問', '很細心、注意細節', '組織力強、很有規劃', '隨和靈活、能變通'],
        dimensions: ['N', 'S', 'J', 'P']
    },
    {
        text: '面對一堆選擇時你會：',
        options: ['立刻鎖定幾個選項評估', '很難決定，拖到最後一刻', '很難決定，拖到最後一刻', '分析利弊條列比較'],
        dimensions: ['J', 'P', 'P', 'T']
    },
    {
        text: '你在團體中通常是：',
        options: ['氣氛推手、帶動大家', '安靜觀察、適時補位', '提出點子讓大家發散思考', '把天馬行空的點子拉回現實'],
        dimensions: ['E', 'I', 'N', 'S']
    },
    {
        text: '最貼近你的描述是：',
        options: ['計劃派，愛掌控節奏', '自然派，愛自由變動', '情感派，重視人際感受', '邏輯派，重視效率與準確'],
        dimensions: ['J', 'P', 'F', 'T']
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

startBtn.addEventListener('click', () => {
    startPage.classList.add('hidden');
    questionPage.classList.remove('hidden');
    showQuestion();
});

function updateProgressBar() {
    const percent = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById('progress-fill').style.width = `${percent}%`;
}

function showQuestion() {
    questionNumber.textContent = `問題 ${currentQuestionIndex + 1} / 共 ${questions.length} 題`;
    questionText.textContent = questions[currentQuestionIndex].text;
    updateOptions();
    nextBtn.classList.add('hidden');
    nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? '看結果' : '下一題';
    updateProgressBar();
}

function updateOptions() {
    options.forEach((option, index) => {
        option.textContent = questions[currentQuestionIndex].options[index];
        option.onclick = () => selectAnswer(index);
        option.classList.remove('selected');
    });
}

function selectAnswer(selectedIndex) {
    userAnswers.push(questions[currentQuestionIndex].dimensions[selectedIndex]);
    options.forEach(option => option.classList.remove('selected'));
    options[selectedIndex].classList.add('selected');
    nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionPage.classList.add('hidden');
    resultPage.classList.remove('hidden');
    const calculatedMBTI = calculateMBTI();
    mbtiType.innerHTML = `<span class="badge">${calculatedMBTI}</span>`;
    recommendJob(calculatedMBTI);
    document.getElementById('progress-fill').style.width = '100%';
}

function calculateMBTI() {
    let counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    userAnswers.forEach(answer => counts[answer]++);
    return (
        (counts.E >= counts.I ? 'E' : 'I') +
        (counts.S >= counts.N ? 'S' : 'N') +
        (counts.T >= counts.F ? 'T' : 'F') +
        (counts.J >= counts.P ? 'J' : 'P')
    );
}

// 推薦職缺
function recommendJob(mbti) {
    const jobDatabase = {
        'ISTJ': {
            jobs: [
                {
                    title: '輕軌司機員',
                    type: '謹慎穩健型',
                    description: '你重視細節、做事謹慎，喜歡有規範、有步驟的工作環境。在面對突發事件時也能保持冷靜，照程序處理。<br><br>👉 推薦職缺：輕軌司機員。你適合執行標準化流程並維護列車安全，是乘客信賴的穩定力量。',
                    icon: 'images/train.jpg'
                },
                {
                    title: '車電類技術員',
                    type: '系統解構型',
                    description: '你擁有敏銳的邏輯分析與系統規劃能力，擅長在複雜資訊中找出規律、創造解決方案。<br><br>👉 推薦職缺：車電類技術員。你能熟練掌握中央監控、通訊與維修流程，是高科技系統中最可靠的腦袋與雙手。',
                    icon: 'images/circuit.jpg'
                },
                {
                    title: '工務類技術員',
                    type: '實作效率型',
                    description: '你講求效率與實作導向，喜歡有邏輯、有系統的操作環境。面對實體設備與故障狀況特別有解決能力。<br><br>👉 推薦職缺：工務類技術員。你會在路線與建設的世界裡發光發熱，適合動手修繕、維修結構，維持城市的運轉節奏。',
                    icon: 'images/tools.jpg'
                }
            ]
        },
        'ISFJ': {
            jobs: [
                {
                    title: '控制員',
                    type: '服務協調型',
                    description: '你擅長關心他人、處理人際溝通，具備良好的組織能力與現場應變能力，對於維持現場秩序有天賦。<br><br>👉 推薦職缺：控制員。你的溫暖與細心，是系統運作順暢的關鍵推手。',
                    icon: 'images/controller.jpg'
                },
                {
                    title: '事務員',
                    type: '服務協調型',
                    description: '你擅長關心他人、處理人際溝通，具備良好的組織能力與現場應變能力，對於維持現場秩序有天賦。<br><br>👉 推薦職缺：事務員。你的溫暖與細心，是旅客安心的關鍵推手，能讓車站營運順暢又人性化。',
                    icon: 'images/service.jpg'
                }
            ]
        },
        'ESTJ': {
            jobs: [
                {
                    title: '控制員',
                    type: '實作效率型',
                    description: '你講求效率與實作導向，喜歡有邏輯、有系統的操作環境。<br><br>👉 推薦職缺：控制員。你會在系統監控的世界裡發光發熱，維持運轉節奏。',
                    icon: 'images/controller.jpg'
                },
                {
                    title: '工務類技術員',
                    type: '實作效率型',
                    description: '你講求效率與實作導向，喜歡有邏輯、有系統的操作環境。面對實體設備與故障狀況特別有解決能力。<br><br>👉 推薦職缺：工務類技術員。你會在路線與建設的世界裡發光發熱，適合動手修繕、維修結構，維持城市的運轉節奏。',
                    icon: 'images/tools.jpg'
                }
            ]
        },
        'ESFJ': {
            jobs: [
                {
                    title: '控制員',
                    type: '服務協調型',
                    description: '你擅長關心他人、處理人際溝通，具備良好的組織能力與現場應變能力，對於維持現場秩序有天賦。<br><br>👉 推薦職缺：控制員。你的溫暖與細心，是系統運作順暢的關鍵推手。',
                    icon: 'images/controller.jpg'
                },
                {
                    title: '事務員',
                    type: '服務協調型',
                    description: '你擅長關心他人、處理人際溝通，具備良好的組織能力與現場應變能力，對於維持現場秩序有天賦。<br><br>👉 推薦職缺：事務員。你的溫暖與細心，是旅客安心的關鍵推手，能讓車站營運順暢又人性化。',
                    icon: 'images/service.jpg'
                }
            ]
        },
        'ISTP': {
            jobs: [
                {
                    title: '控制員',
                    type: '實作效率型',
                    description: '你講求效率與實作導向，喜歡有邏輯、有系統的操作環境。<br><br>👉 推薦職缺：控制員。你會在系統監控的世界裡發光發熱，維持運轉節奏。',
                    icon: 'images/controller.jpg'
                },
                {
                    title: '工務類技術員',
                    type: '實作效率型',
                    description: '你講求效率與實作導向，喜歡有邏輯、有系統的操作環境。面對實體設備與故障狀況特別有解決能力。<br><br>👉 推薦職缺：工務類技術員。你會在路線與建設的世界裡發光發熱，適合動手修繕、維修結構，維持城市的運轉節奏。',
                    icon: 'images/tools.jpg'
                }
            ]
        },
        'INTJ': {
            jobs: [
                {
                    title: '控制員',
                    type: '系統解構型',
                    description: '你擁有敏銳的邏輯分析與系統規劃能力，擅長在複雜資訊中找出規律、創造解決方案。<br><br>👉 推薦職缺：控制員。你能熟練掌握中央監控、通訊與維修流程，是高科技系統中最可靠的腦袋與雙手。',
                    icon: 'images/controller.jpg'
                },
                {
                    title: '車電類技術員',
                    type: '系統解構型',
                    description: '你擁有敏銳的邏輯分析與系統規劃能力，擅長在複雜資訊中找出規律、創造解決方案。<br><br>👉 推薦職缺：車電類技術員。你能熟練掌握中央監控、通訊與維修流程，是高科技系統中最可靠的腦袋與雙手。',
                    icon: 'images/circuit.jpg'
                }
            ]
        },
        'ENTJ': {
            jobs: [
                {
                    title: '控制員',
                    type: '系統解構型',
                    description: '你擁有敏銳的邏輯分析與系統規劃能力，擅長在複雜資訊中找出規律、創造解決方案。<br><br>👉 推薦職缺：控制員。你能熟練掌握中央監控、通訊與維修流程，是高科技系統中最可靠的腦袋與雙手。',
                    icon: 'images/controller.jpg'
                },
                {
                    title: '車電類技術員',
                    type: '系統解構型',
                    description: '你擁有敏銳的邏輯分析與系統規劃能力，擅長在複雜資訊中找出規律、創造解決方案。<br><br>👉 推薦職缺：車電類技術員。你能熟練掌握中央監控、通訊與維修流程，是高科技系統中最可靠的腦袋與雙手。',
                    icon: 'images/circuit.jpg'
                }
            ]
        },
        'INTP': {
            jobs: [
                {
                    title: '車電類技術員',
                    type: '系統解構型',
                    description: '你擁有敏銳的邏輯分析與系統規劃能力，擅長在複雜資訊中找出規律、創造解決方案。<br><br>👉 推薦職缺：車電類技術員。你能熟練掌握中央監控、通訊與維修流程，是高科技系統中最可靠的腦袋與雙手。',
                    icon: 'images/circuit.jpg'
                }
            ]
        },
        'ESFP': {
            jobs: [
                {
                    title: '事務員',
                    type: '服務協調型',
                    description: '你擅長關心他人、處理人際溝通，具備良好的組織能力與現場應變能力，對於維持現場秩序有天賦。<br><br>👉 推薦職缺：事務員。你的溫暖與細心，是旅客安心的關鍵推手，能讓車站營運順暢又人性化。',
                    icon: 'images/service.jpg'
                }
            ]
        },
        'ENFJ': {
            jobs: [
                {
                    title: '事務員',
                    type: '服務協調型',
                    description: '你擅長關心他人、處理人際溝通，具備良好的組織能力與現場應變能力，對於維持現場秩序有天賦。<br><br>👉 推薦職缺：事務員。你的溫暖與細心，是旅客安心的關鍵推手，能讓車站營運順暢又人性化。',
                    icon: 'images/service.jpg'
                }
            ]
        },
        'ENFP': {
            jobs: [
                {
                    title: '事務員',
                    type: '服務協調型',
                    description: '你擅長關心他人、處理人際溝通，具備良好的組織能力與現場應變能力，對於維持現場秩序有天賦。<br><br>👉 推薦職缺：事務員。你的溫暖與細心，是旅客安心的關鍵推手，能讓車站營運順暢又人性化。',
                    icon: 'images/service.jpg'
                }
            ]
        },
        'INFP': {
            jobs: [
                {
                    title: '事務員',
                    type: '服務協調型',
                    description: '你擅長關心他人、處理人際溝通，具備良好的組織能力與現場應變能力，對於維持現場秩序有天賦。<br><br>👉 推薦職缺：事務員。你的溫暖與細心，是旅客安心的關鍵推手，能讓車站營運順暢又人性化。',
                    icon: 'images/service.jpg'
                }
            ]
        },
        'ISFP': {
            jobs: [
                {
                    title: '輕軌司機員',
                    type: '謹慎穩健型',
                    description: '你重視細節、做事謹慎，喜歡有規範、有步驟的工作環境。在面對突發事件時也能保持冷靜，照程序處理。<br><br>👉 推薦職缺：輕軌司機員。你適合執行標準化流程並維護列車安全，是乘客信賴的穩定力量。',
                    icon: 'images/train.jpg'
                }
            ]
        },
        'INFJ': {
            jobs: [
                {
                    title: '事務員',
                    type: '服務協調型',
                    description: '你擅長關心他人、處理人際溝通，具備良好的組織能力與現場應變能力，對於維持現場秩序有天賦。<br><br>👉 推薦職缺：事務員。你的溫暖與細心，是旅客安心的關鍵推手，能讓車站營運順暢又人性化。',
                    icon: 'images/service.jpg'
                }
            ]
        },
        'ENTP': {
            jobs: [
                {
                    title: '車電類技術員',
                    type: '系統解構型',
                    description: '你擁有敏銳的邏輯分析與系統規劃能力，擅長在複雜資訊中找出規律、創造解決方案。<br><br>👉推薦職缺：車電技術員。你能熟練掌握中央監控、通訊與維修流程，是高科技系統中最可靠的腦袋與雙手。',
                    icon: 'images/circuit.jpg'
                }
            ]
        }
    };

    const recommendedJobs = jobDatabase[mbti].jobs;
    jobList.innerHTML = '';
    // 根據職缺數調整 class
    jobList.className = 'job-list';
    jobList.classList.add(`columns-${recommendedJobs.length}`);
    recommendedJobs.forEach((job, index) => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        jobCard.innerHTML = `
            <img src="${job.icon}" alt="${job.title}">
            <h4>${job.title}</h4>
            <p><strong>${job.type}</strong></p>
            <p>${job.description}</p>
        `;
        jobList.appendChild(jobCard);
        setTimeout(() => jobCard.classList.add('show'), index * 100);
    });
}

// 再次測驗
retryBtn.addEventListener('click', () => {
    resultPage.classList.add('hidden');
    startPage.classList.remove('hidden');
    document.getElementById('progress-fill').style.width = '0%';
    questionNumber.textContent = '';
    questionText.textContent = '';
    currentQuestionIndex = 0;
    userAnswers = [];
    nextBtn.classList.remove('hidden');
});

// 職缺連結
jobLinkBtn.addEventListener('click', () => {
    alert('請前往公司官方網站查看控制員、事務員、輕軌司機員、車電技術員、工務技術員或技術顧問的詳細資訊！');
});

// 標題換行處理
function wrapTitle(titleElement, maxWidth) {
    if (window.innerWidth <= maxWidth) {
        let titleText = titleElement.textContent;
        let words = titleText.split(' ');
        if (words.length > 2) {
            let middle = Math.floor(words.length / 2);
            let newTitle = words.slice(0, middle).join(' ') + '<br>' + words.slice(middle).join(' ');
            titleElement.innerHTML = newTitle;
        }
    } else {
        titleElement.innerHTML = titleElement.textContent;
    }
}

let title = document.querySelector('header h1');
wrapTitle(title, 600);
window.addEventListener('resize', () => wrapTitle(title, 600));