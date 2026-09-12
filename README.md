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
│   ├── blog.js         # 블로그 관리자 이메일과 컬렉션 이름
│   └── firebase.js     # Firebase 웹 프로젝트 설정
├── data/
│   ├── blogPosts.json  # 기본 블로그 글
│   ├── news.jsx        # 뉴스
│   ├── projects.js     # 프로젝트
│   └── publications.js # 논문
├── services/
│   ├── firebase.js     # Firebase 앱, Auth, Firestore 초기화
│   └── blogRepository.js # Firestore 블로그 읽기와 저장
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

블로그 글은 Firebase Cloud Firestore의 `blogPosts` 컬렉션에서 실시간으로 불러옵니다. Firestore가 아직 비어 있으면 `src/data/blogPosts.json`의 기본 글을 보여주며, 관리자가 처음 저장하는 순간 기본 글도 Firestore로 이전됩니다.

관리자 로그인에는 Firebase Authentication의 Email/Password 방식을 사용합니다. 관리자 이메일은 `src/config/blog.js`에서 변경할 수 있습니다. 비밀번호는 코드나 Git에 저장되지 않고 Firebase Authentication에서 관리됩니다.

Firebase Console에서 다음 설정을 완료해야 합니다.

1. Authentication에서 Email/Password 로그인 활성화
2. `jlee4330@kaist.ac.kr` 관리자 사용자 생성
3. Cloud Firestore 데이터베이스 생성
4. 프로젝트 루트의 `firestore.rules` 내용을 Firebase Console의 Firestore Rules에 배포

보안 규칙은 모든 방문자에게 글 읽기만 허용하고, 지정된 관리자 이메일로 로그인한 사용자에게만 작성·수정·삭제를 허용합니다.
