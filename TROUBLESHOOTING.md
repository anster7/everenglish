# 로컬 개발 서버 문제 해결 가이드

## 개발 서버 실행 방법

터미널에서 다음 명령어를 실행하세요:

```bash
npm run dev
```

서버가 시작되면 다음과 같은 메시지가 표시됩니다:
```
  ▲ Next.js 15.1.0
  - Local:        http://localhost:3000
  - ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

## 브라우저에서 접속

개발 서버가 실행되면 브라우저에서 다음 주소로 접속하세요:

**http://localhost:3000**

## 화면이 보이지 않을 때 해결 방법

### 1. 포트가 이미 사용 중인 경우

**증상**: `Port 3000 is already in use` 에러 메시지

**해결 방법**:
```bash
# 방법 1: 다른 포트로 실행
npm run dev -- -p 3001

# 방법 2: 3000 포트를 사용하는 프로세스 종료 (Windows)
netstat -ano | findstr :3000
taskkill /PID [프로세스ID] /F

# 방법 3: .next 폴더 삭제 후 재시작
rm -rf .next
npm run dev
```

### 2. 빌드 에러가 있는 경우

**증상**: 터미널에 빌드 에러 메시지 표시

**해결 방법**:
```bash
# .next 폴더와 node_modules 삭제 후 재설치
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

### 3. 브라우저 캐시 문제

**증상**: 이전 버전의 페이지가 표시됨

**해결 방법**:
- 브라우저에서 `Ctrl + Shift + R` (강력 새로고침)
- 또는 개발자 도구(F12) → Network 탭 → "Disable cache" 체크

### 4. TypeScript/ESLint 에러

**증상**: 타입 에러나 린트 에러로 인해 페이지가 로드되지 않음

**해결 방법**:
```bash
# 린트 에러 무시하고 실행 (이미 설정되어 있음)
npm run dev

# 또는 타입 체크만 실행
npx tsc --noEmit
```

### 5. 이미지가 표시되지 않는 경우

**확인 사항**:
- `public/프로필.png` 파일이 존재하는지 확인
- `public/당근 포스터.png` 파일이 존재하는지 확인
- 이미지 경로가 `/프로필.png` 형식인지 확인 (앞에 `/` 포함)

### 6. 완전히 초기화하고 재시작

**모든 문제를 해결하는 최종 방법**:

```bash
# 1. 개발 서버 중지 (Ctrl + C)

# 2. 캐시 및 빌드 파일 삭제
rm -rf .next
rm -rf node_modules
rm -rf package-lock.json

# 3. 의존성 재설치
npm install

# 4. 개발 서버 재시작
npm run dev
```

## 개발 서버가 정상 작동하는지 확인

1. **터미널 확인**:
   - 에러 메시지가 없는지 확인
   - `ready started server` 메시지가 보이는지 확인

2. **브라우저 콘솔 확인**:
   - F12 → Console 탭에서 에러 확인
   - Network 탭에서 리소스 로딩 상태 확인

3. **페이지 소스 확인**:
   - 브라우저에서 `Ctrl + U`로 소스 보기
   - HTML이 정상적으로 로드되는지 확인

## 자주 발생하는 에러와 해결책

### 에러: `Module not found`
```bash
npm install
```

### 에러: `Port 3000 is already in use`
```bash
# 다른 포트 사용
npm run dev -- -p 3001
```

### 에러: `Cannot find module`
```bash
rm -rf node_modules
npm install
```

### 에러: `SyntaxError` 또는 `TypeError`
- 코드에 문법 오류가 있을 수 있음
- 터미널의 에러 메시지를 확인하고 해당 파일 수정

## 추가 도움말

문제가 계속되면:
1. 터미널의 전체 에러 메시지를 확인
2. 브라우저 개발자 도구(F12)의 Console 탭 확인
3. `npm run build` 명령어로 빌드 테스트
