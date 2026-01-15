# Ever English 랜딩페이지 배포 가이드

## 배포 옵션

### 1. Vercel (추천) - 가장 간단하고 빠름

Vercel은 Next.js를 만든 회사에서 제공하는 플랫폼으로, Next.js 프로젝트에 최적화되어 있습니다.

#### 배포 단계:

1. **GitHub 저장소 만들기**
   
   먼저 GitHub에 새 저장소를 만들어야 합니다:
   
   - [github.com](https://github.com) 접속
   - 로그인 후 우측 상단의 **"+"** 버튼 클릭 → **"New repository"** 선택
   - 저장소 이름 입력 (예: `ever-english`)
   - **Public** 또는 **Private** 선택
   - **"Create repository"** 클릭
   - 생성된 페이지에서 **저장소 URL 확인** (예: `https://github.com/사용자명/ever-english.git`)
   
   ⚠️ **중요**: 저장소를 만들 때 "Add a README file", "Add .gitignore", "Choose a license"는 체크하지 마세요!
   (이미 프로젝트에 파일이 있기 때문입니다)

2. **GitHub에 코드 업로드**
   
   터미널에서 다음 명령어를 실행하세요:
   
   ```bash
   # 1. Git 저장소 초기화
   git init
   
   # 2. 모든 파일 추가
   git add .
   
   # 3. 첫 커밋 생성
   git commit -m "Initial commit: Ever English landing page"
   
   # 4. 메인 브랜치 이름 설정
   git branch -M main
   
   # 5. GitHub 저장소 연결 (여기에 위에서 확인한 URL을 넣으세요)
   git remote add origin https://github.com/사용자명/ever-english.git
   
   # 6. 코드 업로드
   git push -u origin main
   ```
   
   **예시:**
   - 저장소 URL이 `https://github.com/john/ever-english.git` 이라면:
   ```bash
   git remote add origin https://github.com/john/ever-english.git
   ```

2. **Vercel 배포**
   - [vercel.com](https://vercel.com) 접속
   - GitHub 계정으로 로그인
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - 프로젝트 설정:
     - Framework Preset: Next.js (자동 감지)
     - Root Directory: `./` (기본값)
     - Build Command: `npm run build` (자동)
     - Output Directory: `.next` (자동)
   - "Deploy" 클릭

3. **환경 변수 설정 (필요시)**
   - Vercel 대시보드 → Project Settings → Environment Variables
   - 필요한 환경 변수 추가

4. **도메인 설정 (선택)**
   - Vercel 대시보드 → Settings → Domains
   - 커스텀 도메인 추가 가능

#### 장점:
- ✅ 무료 플랜 제공
- ✅ 자동 HTTPS
- ✅ 자동 배포 (Git push 시)
- ✅ Next.js 최적화
- ✅ 글로벌 CDN
- ✅ 빠른 배포 속도

---

### 2. Netlify

#### 배포 단계:

1. **GitHub에 코드 업로드** (위와 동일)

2. **Netlify 배포**
   - [netlify.com](https://netlify.com) 접속
   - GitHub 계정으로 로그인
   - "Add new site" → "Import an existing project"
   - GitHub 저장소 선택
   - 빌드 설정:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - "Deploy site" 클릭

#### 장점:
- ✅ 무료 플랜 제공
- ✅ 자동 HTTPS
- ✅ 자동 배포
- ✅ 폼 처리 기능 내장

---

### 3. 자체 서버 배포

#### 배포 단계:

1. **프로덕션 빌드 생성**
   ```bash
   npm run build
   ```

2. **서버에서 실행**
   ```bash
   npm start
   ```

3. **PM2로 프로세스 관리 (선택)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "ever-english" -- start
   pm2 save
   pm2 startup
   ```

---

## 배포 전 체크리스트

### 필수 확인 사항:

- [ ] **환경 변수 확인**
  - Formspree 엔드포인트가 올바른지 확인
  - API 키가 필요한 경우 환경 변수 설정

- [ ] **이미지 경로 확인**
  - `/public/프로필.png` 경로 확인
  - `/public/당근 포스터.png` 경로 확인
  - 모든 이미지가 `public` 폴더에 있는지 확인

- [ ] **빌드 테스트**
  ```bash
   npm run build
   ```
  - 빌드 에러가 없는지 확인
  - 모든 페이지가 정상적으로 빌드되는지 확인

- [ ] **로컬 프로덕션 테스트**
  ```bash
   npm run build
   npm start
   ```
  - `http://localhost:3000`에서 모든 기능이 정상 작동하는지 확인

- [ ] **Formspree 설정 확인**
  - Formspree 대시보드에서 폼이 활성화되어 있는지 확인
  - 이메일 알림이 설정되어 있는지 확인

---

## 배포 후 확인 사항

1. **모든 페이지 접근 가능한지 확인**
   - 메인 페이지: `/`
   - 상담 신청 페이지: `/consultation`

2. **폼 제출 테스트**
   - 실제 데이터로 폼 제출 테스트
   - Formspree에서 데이터 수신 확인

3. **이미지 로딩 확인**
   - 프로필 이미지 표시 확인
   - 당근 포스터 이미지 표시 확인

4. **반응형 디자인 확인**
   - 모바일, 태블릿, 데스크톱에서 확인

5. **성능 확인**
   - 페이지 로딩 속도
   - 이미지 최적화

---

## 문제 해결

### 빌드 에러 발생 시:
```bash
# .next 폴더 삭제 후 재빌드
rm -rf .next
npm run build
```

### 이미지가 표시되지 않을 때:
- 이미지 파일이 `public` 폴더에 있는지 확인
- 이미지 경로가 올바른지 확인 (`/프로필.png` 형식)

### Formspree 데이터가 수집되지 않을 때:
- Formspree 엔드포인트 URL 확인
- 브라우저 콘솔에서 네트워크 에러 확인
- Formspree 대시보드에서 폼 상태 확인

---

## 추천 배포 플랫폼 비교

| 플랫폼 | 난이도 | 무료 플랜 | Next.js 최적화 | 추천도 |
|--------|--------|-----------|----------------|--------|
| Vercel | ⭐ 매우 쉬움 | ✅ 있음 | ✅ 최적화됨 | ⭐⭐⭐⭐⭐ |
| Netlify | ⭐⭐ 쉬움 | ✅ 있음 | ✅ 좋음 | ⭐⭐⭐⭐ |
| 자체 서버 | ⭐⭐⭐⭐ 어려움 | - | ⚠️ 설정 필요 | ⭐⭐ |

**결론: Vercel을 강력히 추천합니다!**
