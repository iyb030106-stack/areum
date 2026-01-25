# 도메인 분리 가이드

이 프로젝트는 **랜딩페이지**와 **Store**를 별도의 도메인으로 배포할 수 있도록 구성되어 있습니다.

## 📁 프로젝트 구조

```
├── AppLanding.tsx          # 랜딩페이지 전용 앱
├── AppStore.tsx            # Store 전용 앱
├── index-landing.tsx       # 랜딩페이지 진입점
├── index-store.tsx         # Store 진입점
├── components/             # 공통 컴포넌트
│   ├── Hero.tsx
│   ├── Service.tsx
│   ├── Shop.tsx
│   └── ...
└── vite.config.ts          # 빌드 설정
```

## 🚀 개발 서버 실행

### 랜딩페이지 개발 서버 (포트 3000)
```bash
npm run dev:landing
```

### Store 개발 서버 (포트 3001)
```bash
npm run dev:store
```

## 🏗️ 빌드

### 랜딩페이지만 빌드
```bash
npm run build:landing
```
→ `dist-landing` 폴더에 빌드 결과물 생성

### Store만 빌드
```bash
npm run build:store
```
→ `dist-store` 폴더에 빌드 결과물 생성

### 둘 다 빌드
```bash
npm run build:all
```

## 🌐 배포

### 방법 1: Vercel로 각각 배포

#### 랜딩페이지 배포
1. Vercel에서 새 프로젝트 생성
2. GitHub 저장소 연결
3. 설정에서:
   - Build Command: `npm run build:landing`
   - Output Directory: `dist-landing`
4. 도메인 설정: `areum.com` 또는 원하는 도메인

#### Store 배포
1. Vercel에서 새 프로젝트 생성
2. 같은 GitHub 저장소 연결
3. 설정에서:
   - Build Command: `npm run build:store`
   - Output Directory: `dist-store`
4. 도메인 설정: `store.areum.com` 또는 원하는 도메인

### 방법 2: Netlify로 각각 배포

#### 랜딩페이지 배포
1. Netlify에서 새 사이트 생성
2. GitHub 저장소 연결
3. 빌드 설정:
   - Build command: `npm run build:landing`
   - Publish directory: `dist-landing`
4. 도메인 설정: `areum.com`

#### Store 배포
1. Netlify에서 새 사이트 생성
2. 같은 GitHub 저장소 연결
3. 빌드 설정:
   - Build command: `npm run build:store`
   - Publish directory: `dist-store`
4. 도메인 설정: `store.areum.com`

## 🔗 도메인 연결 설정

Store는 폐기되었으며(Store 도메인 접속 시 랜딩으로 리다이렉트), 랜딩에서 Store로 이동하는 설정은 더 이상 사용하지 않습니다.

Store 프로젝트에서 랜딩으로 이동 URL을 명시하려면 아래 환경 변수를 설정하세요:

### Store 프로젝트 (.env)
```
VITE_LANDING_URL=https://areum-black.vercel.app
```

## 📝 참고사항

- 랜딩페이지와 Store는 완전히 독립적으로 배포됩니다
- 공통 컴포넌트는 `components/` 폴더에 있습니다
- 각 프로젝트는 서로 다른 포트에서 실행됩니다:
  - 랜딩페이지: 3000번 포트
  - Store: 3001번 포트
- 빌드 결과물은 별도의 폴더에 생성됩니다:
  - 랜딩페이지: `dist-landing/`
  - Store: `dist-store/`



