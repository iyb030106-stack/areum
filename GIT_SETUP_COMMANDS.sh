#!/bin/bash
# Git 사용자 정보 설정 및 푸시 스크립트

echo "=== Git 사용자 정보 설정 ==="

# Git 사용자 이메일 설정
git config --global user.email "iyb030106@gmail.com"

# Git 사용자 이름 설정 (GitHub 사용자 이름을 입력하세요)
# GitHub 저장소가 iyb030106-stack이므로 해당 이름 사용
git config --global user.name "iyb030106-stack"

# 설정 확인
echo ""
echo "설정된 정보 확인:"
git config user.email
git config user.name

# 커밋
echo ""
echo "=== 커밋 및 푸시 ==="
git commit -m "배포 준비: 프로젝트 파일 업데이트"

# 푸시
git push origin main

echo ""
echo "=== 완료 ==="
