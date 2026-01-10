# 기존 Vercel 프로젝트 업데이트 가이드

이미 Vercel에 배포된 프로젝트가 있다면, 다음 방법으로 업데이트할 수 있습니다.

## 방법 1: 자동 재배포 (GitHub 연동 시)

GitHub에 푸시하면 **자동으로 재배포**가 트리거됩니다!

1. **Vercel 대시보드 확인**
   - https://vercel.com 접속
   - 프로젝트 목록에서 `areum-landing`과 `areum-store` 확인
   - 최근 배포 상태 확인 (자동 재배포가 진행 중일 수 있음)

2. **자동 재배포 확인**
   - 프로젝트 페이지에서 "Deployments" 탭 확인
   - 최신 배포가 `main` 브랜치의 최신 커밋을 가리키는지 확인

## 방법 2: 수동 재배포

자동 재배포가 되지 않았다면 수동으로 재배포:

### 랜딩페이지 재배포

1. Vercel 대시보드 → `areum-landing` 프로젝트 선택
2. **"Deployments"** 탭 클릭
3. **최신 배포 옆 "..." 메뉴** → **"Redeploy"** 클릭
4. 또는 **"Deploy" 버튼** → **"Redeploy"** 선택

### Store 재배포

1. Vercel 대시보드 → `areum-store` 프로젝트 선택
2. **"Deployments"** 탭 클릭
3. **"Redeploy"** 버튼 클릭

## 방법 3: 설정 확인 및 업데이트

기존 프로젝트의 빌드 설정이 올바른지 확인:

### 랜딩페이지 설정 확인

1. Vercel 대시보드 → `areum-landing` 프로젝트
2. **"Settings"** 탭 → **"General"** 메뉴
3. 다음 설정 확인:
   ```
   Build Command: npm run build:landing  ⬅️ 확인!
   Output Directory: dist-landing  ⬅️ 확인!
   Install Command: npm install
   ```
4. 설정이 다르다면 **"Override"** 버튼을 눌러 수정

### Store 설정 확인

1. Vercel 대시보드 → `areum-store` 프로젝트
2. **"Settings"** 탭 → **"General"** 메뉴
3. 다음 설정 확인:
   ```
   Build Command: npm run build:store  ⬅️ 확인!
   Output Directory: dist-store  ⬅️ 확인!
   Install Command: npm install
   ```
4. 설정이 다르다면 수정 후 재배포

## ⚠️ 중요: 설정이 잘못된 경우

기존 프로젝트의 Build Command나 Output Directory가 잘못 설정되어 있다면:

### 옵션 1: 설정 수정 후 재배포 (권장)

1. Settings → General에서 설정 수정
2. "Override" 버튼으로 변경사항 저장
3. "Redeploy" 버튼 클릭

### 옵션 2: 프로젝트 삭제 후 재생성

설정을 변경할 수 없다면:

1. 기존 프로젝트 Settings → **"Delete Project"** 클릭
2. 새로 프로젝트 생성 (QUICK_DEPLOY.md 참고)
3. 올바른 설정으로 배포

## ✅ 확인 사항

배포 후 확인:

1. **랜딩페이지 URL 확인**
   - 예: `https://areum-landing.vercel.app`
   - 또는 연결된 도메인: `https://areum.com`

2. **Store URL 확인**
   - 예: `https://areum-store.vercel.app`
   - 또는 연결된 도메인: `https://store.areum.com`

3. **최신 변경사항이 반영되었는지 확인**
   - 배포된 사이트에 새로 추가한 파일들이 보이는지 확인
   - (GIT_PUSH_SIMPLE.md, QUICK_DEPLOY.md 등이 배포에 포함되지 않아도 됨)

## 🔍 문제 해결

### 재배포가 실패하는 경우

1. **빌드 로그 확인**
   - Deployments → 실패한 배포 클릭 → "Build Logs" 확인
   - 오류 메시지 확인

2. **로컬에서 빌드 테스트**
   ```bash
   npm run build:landing  # 랜딩페이지 빌드 테스트
   npm run build:store    # Store 빌드 테스트
   ```

3. **package.json 확인**
   - `build:landing`과 `build:store` 스크립트가 있는지 확인

### 자동 배포가 트리거되지 않는 경우

1. **Git 연결 확인**
   - Settings → Git → GitHub 저장소 연결 상태 확인

2. **브랜치 설정 확인**
   - Settings → Git → Production Branch가 `main`인지 확인

3. **수동으로 재배포**
   - "Redeploy" 버튼 사용
