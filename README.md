# Donggun Lee Portfolio

React와 Vite로 만든 개인 포트폴리오입니다. 화면 내용과 UI 컴포넌트를 분리해, 자주 바꾸는 텍스트·링크·이미지를 한곳에서 수정할 수 있도록 구성했습니다.

## 실행 방법

```bash
npm install
npm run dev
```

배포용 빌드와 코드 검사는 다음 명령으로 확인합니다.

```bash
npm run build
npm run lint
```

## 폴더 구조

```text
src/
├── components/
│   ├── about/          # 소개와 뉴스
│   ├── blog/           # 블로그 목록, 상세 화면, 편집기
│   ├── layout/         # 헤더, 내비게이션, 푸터
│   ├── projects/       # 프로젝트 화면
│   ├── publications/   # 논문 화면
│   └── BlogSection.jsx # 블로그 상태와 저장 로직
├── config/
│   ├── site.js         # 이름, 메인 이미지, 연락처, CV, 외부 링크
│   └── blog.js         # 블로그 저장 설정
├── data/
│   ├── blogPosts.json  # 기본 블로그 글
│   ├── news.jsx        # 뉴스
│   ├── projects.js     # 프로젝트
│   └── publications.js # 논문
├── App.jsx             # 페이지 조립과 탭 전환
├── index.css           # 공통 디자인과 반응형 스타일
└── main.jsx            # 앱 시작점

public/
├── images/             # 앞으로 추가할 이미지 권장 위치
├── website.png         # 메인 소개 이미지
├── donggunlee.png      # 프로필 이미지
└── ...                 # 기존 논문 이미지와 PDF
```

## 자주 수정하는 곳

| 바꾸려는 내용 | 파일 |
| --- | --- |
| 이름, 메인 이미지와 문구, 프로필, 연락처, CV, 소셜 링크 | `src/config/site.js` |
| 상단 메뉴 이름, 순서, 표시 여부 | `src/config/site.js`의 `NAV_ITEMS` |
| News 항목 | `src/data/news.jsx` |
| Publications 항목 | `src/data/publications.js` |
| Past Projects 항목 | `src/data/projects.js` |
| 기본 블로그 글 | `src/data/blogPosts.json` |
| 색상, 여백, 글꼴, 반응형 디자인 | `src/index.css` |

목록 데이터는 위에서부터 화면에 표시됩니다. 새 뉴스, 논문, 프로젝트는 배열의 맨 위에 추가하면 됩니다.

`NAV_ITEMS`에서 `visible: false`인 메뉴는 화면에서만 숨겨지고 해당 컴포넌트와 데이터는 유지됩니다. Publications의 `First Author` 탭에 논문을 포함하려면 해당 항목에 `firstAuthor: true`를 지정하세요. 공동 1저자도 여기에 포함할 수 있습니다.

## 사진과 PDF 넣기

새 파일은 `public/images/`에 넣는 것을 권장합니다. 예를 들어 다음 위치에 사진을 넣었다면:

```text
public/images/new-project.jpg
```

코드에서는 `public`을 생략하고 아래처럼 사용합니다.

```js
image: '/images/new-project.jpg'
```

프로젝트 데이터에서는 다음처럼 지정할 수 있습니다.

```js
media: {
  type: 'image',
  src: '/images/new-project.jpg',
  alt: '화면을 설명하는 짧은 문장',
}
```

PDF도 같은 방식으로 `public` 아래에 넣고 `/파일명.pdf` 또는 `/documents/파일명.pdf`로 연결할 수 있습니다. 파일명은 영문 소문자와 하이픈을 사용하면 경로 오류를 줄일 수 있습니다.

기존 이미지와 PDF는 현재 링크가 깨지지 않도록 원래 위치에 유지했습니다. 나중에 파일을 이동할 때는 `src/config`와 `src/data`에 적힌 경로도 함께 바꿔야 합니다.

## 블로그 수정 시 주의사항

관리자 화면에서 저장한 글은 브라우저의 로컬 저장소에도 남습니다. 따라서 `src/data/blogPosts.json`을 직접 바꿨는데 이전 글이 계속 보이면 해당 사이트의 `dg_blog_posts` 로컬 저장소를 삭제한 뒤 새로고침하세요.

개발 서버에서 관리자 편집 기능을 사용하려면 프로젝트 루트에 `.env.local` 파일을 만들고 아래처럼 로컬 비밀번호를 지정하세요. 이 파일은 Git에 포함되지 않습니다.

```text
BLOG_ADMIN_PASSWORD=원하는-로컬-비밀번호
```

로그인 성공 시 비밀번호 대신 HTTP 전용 세션 쿠키가 사용되며, 브라우저 코드나 Git 저장소에는 비밀번호가 포함되지 않습니다. 이 저장 기능은 개인 로컬 관리를 위한 개발용 방식입니다. 공개 서버에서 편집 기능을 운영하려면 별도의 서버 인증과 데이터베이스를 연결해야 합니다.
