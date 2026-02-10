// AI Response System - Predefined responses for the chat interface

export const AI_PROFILE = {
    name: "DG",
    fullName: "동건의 AI 어시스턴트",
    avatar: "🤖"
};

export const INITIAL_MESSAGE = {
    type: 'ai',
    content: "안녕하세요! 저는 동건의 AI 어시스턴트입니다. 무엇이 궁금하신가요?",
    quickReplies: ['About', 'Research', 'Philosophy', 'Contact']
};

export const RESPONSES = {
    about: {
        content: `**이동건 (Donggun Lee)**은 KAIST 산업디자인학과에서 HCI를 연구하는 박사과정 학생입니다.

Design, HCI, AI의 교차점에서 혁신적인 해결책을 연구하며, AI를 단순한 도구가 아닌 **디자인 재료**로 다룹니다.

현재 AI Experience Lab에서 Human-AI Interaction 연구를 진행하고 있습니다.`,
        quickReplies: ['Research 보기', 'Contact', '처음으로']
    },

    research: {
        content: `**연구 분야**

🔬 **Human-AI Interaction**
사람과 AI가 효과적으로 협업하는 방법을 연구합니다.

🎨 **AI as Design Material**  
AI를 창의적 도구가 아닌 디자인 재료로 활용하는 방법론을 탐구합니다.

🌐 **Posthuman Design**
인간 중심을 넘어선 새로운 디자인 패러다임을 모색합니다.`,
        quickReplies: ['Philosophy 보기', 'About', '처음으로']
    },

    philosophy: {
        content: `**연구 철학**

💡 **Data as Pulse**
데이터는 현대의 맥박입니다. 데이터를 통해 사람을 이해하고 인사이트를 도출합니다.

🔗 **AI as Collaborator**
AI는 도구가 아닌 협업자입니다. AI와 함께 창작하고 문제를 해결합니다.

🌱 **Design for Emergence**
예측 불가능한 것을 위한 디자인. 복잡한 시스템에서 새로운 가능성을 발견합니다.`,
        quickReplies: ['Research 보기', 'Contact', '처음으로']
    },

    contact: {
        content: `**연락처**

📧 **Email**: donggun@kaist.ac.kr
🏫 **소속**: KAIST Industrial Design, AI Experience Lab
📍 **위치**: 대전, 대한민국

연구 협업이나 문의사항이 있으시면 이메일로 연락주세요!`,
        quickReplies: ['About', 'Research', '처음으로'],
        links: [
            { label: 'Email 보내기', url: 'mailto:donggun@kaist.ac.kr' }
        ]
    },

    default: {
        content: "죄송합니다, 잘 이해하지 못했어요. 아래 버튼을 눌러 탐색해보세요!",
        quickReplies: ['About', 'Research', 'Philosophy', 'Contact']
    },

    home: {
        content: "다시 돌아오셨군요! 무엇이 궁금하신가요?",
        quickReplies: ['About', 'Research', 'Philosophy', 'Contact']
    }
};

export function getResponse(input) {
    const normalizedInput = input.toLowerCase().trim();

    if (normalizedInput.includes('about') || normalizedInput.includes('소개')) {
        return RESPONSES.about;
    }
    if (normalizedInput.includes('research') || normalizedInput.includes('연구')) {
        return RESPONSES.research;
    }
    if (normalizedInput.includes('philosophy') || normalizedInput.includes('철학')) {
        return RESPONSES.philosophy;
    }
    if (normalizedInput.includes('contact') || normalizedInput.includes('연락')) {
        return RESPONSES.contact;
    }
    if (normalizedInput.includes('처음') || normalizedInput.includes('home') || normalizedInput.includes('시작')) {
        return RESPONSES.home;
    }

    return RESPONSES.default;
}
