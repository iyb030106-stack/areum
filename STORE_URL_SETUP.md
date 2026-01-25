# Store URL 설정 가이드 (폐기)

## 🔴 안내

현재 Store는 폐기되었으며, Store 도메인으로 접속 시 랜딩페이지로 리다이렉트됩니다.

## ✅ 참고

Store 프로젝트에서 랜딩으로 이동 URL을 명시하려면 아래 환경 변수를 설정하세요:

- `VITE_LANDING_URL`: `https://areum-black.vercel.app`

### Store 프로젝트 배포 확인

Store 프로젝트가 배포되어 있는지 확인하세요(폐기 리다이렉트 버전):

1. Vercel 대시보드 확인
   - Store 프로젝트가 있는지 확인
   - 배포 상태가 "Ready"인지 확인
   - 배포 URL 확인 (예: `https://areum-store.vercel.app`)

2. Store 프로젝트가 없다면:
   - `VERCEL_SETUP_GUIDE.md` 파일 참고하여 Store 프로젝트 배포

### 임시 확인 (개발 환경)

로컬 개발 환경에서는 다음 포트를 사용합니다:
- 랜딩페이지: `http://localhost:3000`
- Store: `http://localhost:3001`

## 📝 체크리스트

- [ ] Store 프로젝트가 Vercel에 배포되어 있음(폐기 리다이렉트)
- [ ] Store 프로젝트에 `VITE_LANDING_URL` 환경 변수 설정(선택)

## 🆘 여전히 문제가 있나요?

1. **Store 프로젝트 배포 상태 확인**
   - Vercel 대시보드에서 Store 프로젝트 확인
   - 배포가 성공했는지 확인

2. **환경 변수 확인**
   - Vercel 프로젝트 Settings → Environment Variables
   - 변수가 올바르게 설정되었는지 확인
   - 변수 이름이 정확한지 확인 (`VITE_STORE_URL`, `VITE_LANDING_URL`)

3. **재배포 확인**
   - 환경 변수 설정 후 반드시 재배포해야 함
   - 자동 재배포가 안 되면 수동으로 Redeploy

4. **URL 형식 확인**
   - 환경 변수 값에 `http://` 또는 `https://` 포함
   - 예: `https://areum-store.vercel.app` (올바름)
   - 예: `areum-store.vercel.app` (잘못됨, 프로토콜 없음)



