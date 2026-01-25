# Vercel 배포 가이드

## 🚀 랜딩페이지 배포 (메인 도메인)

### 1단계: Vercel에서 프로젝트 생성
1. https://vercel.com 접속 → 로그인
2. "Add New..." → "Project" 클릭
3. GitHub 저장소 `iyb030106-stack/areum.` 선택 → "Import" 클릭

### 2단계: 빌드 설정
**프로젝트 설정에서:**
- **Framework Preset**: Vite
- **Root Directory**: `./` (기본값)
- **Build Command**: `npm run build:landing`
- **Output Directory**: `dist-landing`
- **Install Command**: `npm install`

### 3단계: 환경 변수 (선택사항)
**Settings → Environment Variables:**
- (현재 Store는 폐기되어 랜딩에서 Store로 이동하지 않습니다)

### 4단계: 배포
- "Deploy" 버튼 클릭
- 배포 완료 후 도메인 설정에서 원하는 도메인 연결 (예: `areum.com`)

---

## 🛍️ Store 배포 (서브도메인)

### 1단계: Vercel에서 새 프로젝트 생성
1. Vercel 대시보드에서 "Add New..." → "Project" 클릭
2. **같은 GitHub 저장소** `iyb030106-stack/areum.` 선택 → "Import" 클릭

### 2단계: 빌드 설정
**프로젝트 설정에서:**
- **Framework Preset**: Vite
- **Root Directory**: `./` (기본값)
- **Build Command**: `npm run build:store`
- **Output Directory**: `dist-store`
- **Install Command**: `npm install`

### 3단계: 환경 변수 (선택사항)
**Settings → Environment Variables:**
- `VITE_LANDING_URL`: `https://areum-black.vercel.app` (랜딩페이지 도메인)

### 4단계: 배포
- "Deploy" 버튼 클릭
- 배포 완료 후 도메인 설정에서 서브도메인 연결 (예: `store.areum.com`)

---

## 📝 중요 사항

### 각 프로젝트는 독립적으로 배포됩니다
- 랜딩페이지와 Store는 **별도의 Vercel 프로젝트**로 생성해야 합니다
- 각 프로젝트는 **다른 빌드 명령어**와 **다른 출력 디렉토리**를 사용합니다

### 자동 배포
- GitHub에 푸시할 때마다 자동으로 배포됩니다
- 각 프로젝트는 독립적으로 배포되므로, 랜딩페이지 변경은 랜딩페이지만 재배포됩니다

### 도메인 연결
- 각 프로젝트의 Settings → Domains에서 원하는 도메인을 연결할 수 있습니다
- 예시:
  - 랜딩페이지: `areum.com`, `www.areum.com`
  - Store: (폐기) 접속 시 랜딩으로 리다이렉트

---

## 🔄 빠른 배포 체크리스트

### 랜딩페이지
- [ ] Vercel에서 새 프로젝트 생성
- [ ] 저장소: `iyb030106-stack/areum.`
- [ ] Build Command: `npm run build:landing`
- [ ] Output Directory: `dist-landing`
- [ ] 환경 변수 설정 (선택)
- [ ] 도메인 연결

### Store
- [ ] Vercel에서 새 프로젝트 생성
- [ ] 저장소: `iyb030106-stack/areum.`
- [ ] Build Command: `npm run build:store`
- [ ] Output Directory: `dist-store`
- [ ] 환경 변수 설정 (선택)
- [ ] 도메인 연결

---

## 🆘 문제 해결

### 빌드 실패 시
- Vercel 빌드 로그 확인
- 로컬에서 `npm run build:landing` 또는 `npm run build:store` 테스트

### 도메인 연결 안 됨
- DNS 설정 확인
- Vercel에서 제공하는 DNS 레코드 확인



