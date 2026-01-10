# 관리자 기능 추가 - Git 푸시 가이드

관리자 대시보드 기능이 추가되었습니다. GitHub에 푸시하려면:

## Git Bash에서 실행할 명령어

```bash
# 1. 프로젝트 디렉토리로 이동
cd /c/Users/dladu/OneDrive/바탕\ 화면/IM/areum

# 2. 변경사항 확인
git status

# 3. 모든 변경사항 추가
git add .

# 4. 커밋
git commit -m "관리자 대시보드 기능 추가: 접속 기록, 상품 관리, 주문 관리, CS 관리, 회원 관리, 통계 분석"

# 5. 푸시
git push origin main
```

## 변경된 파일

- `components/Shop.tsx` - 관리자 대시보드 및 관련 기능 추가

## 추가된 기능

1. 관리자 로그인 (areum1004@gmail.com / areum1004!)
2. 관리자 대시보드 (6개 탭)
3. 접속 기록 추적 및 표시
4. 상품 관리 (등록/수정/삭제)
5. 주문 관리 및 상태 변경
6. 고객 상담(CS) 관리
7. 회원 데이터 조회
8. 통계 분석 및 시각화
9. 상품 클릭 통계
