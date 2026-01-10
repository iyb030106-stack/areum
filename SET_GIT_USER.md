# Git 사용자 정보 설정 방법

## 오류 원인
Git이 커밋 작성자 정보를 알 수 없어서 발생한 오류입니다.

## 해결 방법

Git Bash에서 아래 명령어를 실행하세요:

### 방법 1: GitHub 계정 정보 사용 (권장)

```bash
# GitHub 이메일 주소로 설정
git config --global user.email "your-email@example.com"

# GitHub 사용자 이름으로 설정
git config --global user.name "Your Name"
```

**예시:**
- GitHub 이메일이 `dladu@gmail.com`이면:
  ```bash
  git config --global user.email "dladu@gmail.com"
  git config --global user.name "dladu"
  ```

### 방법 2: 현재 프로젝트에만 적용 (로컬 설정)

```bash
# --global 없이 실행 (이 프로젝트에만 적용)
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

## 설정 확인

```bash
# 설정 확인
git config user.email
git config user.name

# 또는 전체 설정 확인
git config --list
```

## 설정 완료 후 다시 푸시

```bash
git commit -m "배포 준비: 프로젝트 파일 업데이트"
git push origin main
```

## GitHub 이메일 찾는 방법

1. GitHub.com에 로그인
2. Settings → Emails
3. Primary email 주소 확인 (또는 GitHub noreply 이메일 사용 가능)
