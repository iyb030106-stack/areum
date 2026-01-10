# Vercel 재배포 확인 및 완료 가이드

설정이 올바르게 되어 있으니, 이제 재배포만 확인하면 됩니다!

## ✅ 설정 확인 완료

- **랜딩페이지**: `npm run build:landing` → `dist-landing` ✓
- **Store**: `npm run build:store` → `dist-store` ✓

## 🚀 재배포 확인 및 실행

### 방법 1: 자동 재배포 확인 (가장 쉬움)

GitHub에 푸시했으므로 **자동으로 재배포**가 시작되었을 수 있습니다:

1. **Vercel 대시보드 접속**
   - https://vercel.com 접속
   - 로그인

2. **랜딩페이지 프로젝트 확인**
   - `areum-landing` 프로젝트 클릭
   - **"Deployments"** 탭 확인
   - 최신 배포가 **"Building"** 또는 **"Ready"** 상태인지 확인
   - 최신 커밋 메시지가 **"배포 준비: 프로젝트 파일 업데이트"**인지 확인

3. **Store 프로젝트 확인**
   - `areum-store` 프로젝트 클릭
   - **"Deployments"** 탭 확인
   - 동일하게 최신 배포 상태 확인

### 방법 2: 수동 재배포 (자동 배포가 안 된 경우)

자동 배포가 트리거되지 않았다면 수동으로 재배포:

#### 랜딩페이지 재배포

1. Vercel 대시보드 → `areum-landing` 프로젝트
2. **"Deployments"** 탭 클릭
3. 최신 배포 옆 **"..."** 메뉴 클릭
4. **"Redeploy"** 선택
5. 또는 상단의 **"Deploy"** 버튼 → **"Redeploy"** 선택

#### Store 재배포

1. Vercel 대시보드 → `areum-store` 프로젝트
2. **"Deployments"** 탭 클릭
3. **"Redeploy"** 버튼 클릭

## ⏱️ 배포 소요 시간

- 빌드 시간: 약 1-3분
- 배포 완료 후 URL에서 확인 가능

## ✅ 배포 완료 확인

### 랜딩페이지 확인

1. 배포 완료 후 제공되는 URL 확인
   - 예: `https://areum-landing.vercel.app`
   - 또는 연결된 도메인: `https://areum.com`

2. 브라우저에서 접속하여 정상 작동 확인

### Store 확인

1. 배포 완료 후 제공되는 URL 확인
   - 예: `https://areum-store.vercel.app`
   - 또는 연결된 도메인: `https://store.areum.com`

2. 브라우저에서 접속하여 정상 작동 확인

## 🔍 문제 해결

### 배포가 실패하는 경우

1. **빌드 로그 확인**
   - 실패한 배포 클릭 → **"Build Logs"** 확인
   - 오류 메시지 확인

2. **로컬 빌드 테스트**
   ```bash
   npm run build:landing  # 랜딩페이지 빌드 테스트
   npm run build:store    # Store 빌드 테스트
   ```

3. **package.json 확인**
   - `build:landing`과 `build:store` 스크립트가 있는지 확인

### 자동 배포가 트리거되지 않는 경우

1. **Git 연결 확인**
   - Settings → Git → GitHub 저장소 연결 확인

2. **브랜치 설정 확인**
   - Settings → Git → Production Branch가 `main`인지 확인

3. **수동 재배포**
   - "Redeploy" 버튼 사용

## 🎉 완료!

배포가 완료되면:
- ✅ 랜딩페이지와 Store가 최신 코드로 업데이트됨
- ✅ GitHub 푸시 시 자동 재배포 설정 완료
- ✅ 두 프로젝트가 독립적으로 배포됨
