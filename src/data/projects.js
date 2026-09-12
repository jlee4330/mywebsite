// Project media can be an image from /public or an embeddable YouTube URL.
export const PROJECTS = [
  {
    title: 'Retro DJ Player',
    subtitle: 'A Web-Based DJ Mixing Experience',
    authors: ['Donggun Lee'],
    description: 'A web-based DJ player that lets users mix music at home without physical DJ equipment, combining dual-deck controls, audio effects, and a retro inspired interface.',
    links: [{ label: 'Website', url: 'https://retro-dj.vercel.app/' }],
    media: {
      type: 'image',
      src: '/retrodjplayer.png',
      alt: 'Retro DJ Player',
      link: 'https://retro-dj.vercel.app/',
    },
  },
  {
    title: 'Yakgook',
    subtitle: 'A Metaverse Community for Shared Medication Care',
    authors: ['Seowon Shin*', 'Yeongeun An*', 'Donggun Lee*', 'Suhyeon Park*', 'Yejun Chung*', 'Hansam Lee*', 'Jooyoung Lee*'],
    description: 'A working Unity + React metaverse platform that supports medication adherence through loose solidarity among chronic patients. (Social Impact Award, Kakao!mpact × KAIST)',
    links: [
      { label: 'GitHub', url: 'https://github.com/jlee4330/medMax' },
      { label: 'Video', url: 'https://youtu.be/RTVi_pHaPeI' },
    ],
    media: { type: 'youtube', src: 'https://www.youtube.com/embed/RTVi_pHaPeI', title: 'Yakgook Demo' },
  },
  {
    title: 'Hey Mirror',
    subtitle: 'Designing an Emotional Interaction Mirror Based on Large Language Models',
    authors: ['Donggun Lee'],
    description: "A working LLM-powered smart mirror for real-time conversational emotional support, inspired by Snow White's magic mirror. (Exhibited in SHINSEGAE NEXPERIUM)",
    links: [],
    media: { type: 'image', src: '/heymirror.jpeg', alt: 'Hey Mirror' },
  },
  {
    title: 'SEAhab',
    subtitle: 'Welcoming Virtual Rehab Community for Drug Users',
    authors: ['Jaeryung Chung*', 'Donggun Lee*', 'Sohwi Son*', 'Maida Aizaz*', 'Yujin Kwon*', 'Tak Yeon Lee'],
    description: 'Designing rehabilitation systems that support accessibility and personalization through community participation and real-time intervention.',
    links: [
      { label: 'Video', url: 'https://youtu.be/rwfZhoy7vXc' },
      { label: 'PDF', url: '/SEAhab.pdf' },
    ],
    media: { type: 'youtube', src: 'https://www.youtube.com/embed/rwfZhoy7vXc', title: 'SEAhab Demo' },
  },
  {
    title: 'Thoughtless Consumption',
    authors: ['Donggun Lee*', 'Yujin Kwon*', 'Wooryung Jeong*'],
    description: 'An interactive installation that reveals how sensory stimulation, social pressure, and system design shape unconscious consumer behavior.',
    links: [{ label: 'Video', url: 'https://youtu.be/DSIze1NkLrc' }],
    media: { type: 'youtube', src: 'https://www.youtube.com/embed/DSIze1NkLrc', title: 'Thoughtless Consumption Demo' },
  },
];
