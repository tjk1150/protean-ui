# Protean UI: 앱 코드에서 브레이크포인트를 지웠습니다

제가 본 거의 모든 React 코드베이스에는 이 컴포넌트의 변형이 하나씩 있습니다:

```tsx
const isDesktop = useMediaQuery("(min-width: 768px)");
return isDesktop ? (
  <Dialog>...</Dialog>   // 중앙 모달
) : (
  <Drawer>...</Drawer>   // 바텀 시트
);
```

shadcn 공식 문서가 레시피로 가르치고, Credenza가 패키징한 바로 그 패턴입니다. 모든 팀이
오버레이마다 컴포넌트 트리 두 벌을 만들고, 폭 체크로 묶고, 사용처마다 반복합니다. 손으로
쓴 레시피 기준 55줄입니다. Protean 버전은 15줄입니다:

```tsx
<Dialog.Root role="form">
  <Dialog.Trigger>배송지 수정</Dialog.Trigger>
  <Dialog.Content title="배송지 수정">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>
```

아래 깔린 프리미티브는 같습니다. 다른 것은 "누가 결정을 소유하는가"입니다.

공정하게 말하면, 줄 수만 줄이는 게 목표라면 Credenza 같은 래퍼로도 사용처는 비슷하게
짧아집니다. 차이는 줄 수가 아니라 판단의 품질과 범위입니다. 폭 768px 하나로 정하는
래퍼는 "마우스 달린 좁은 창"과 "폰"을 구분하지 못하고, SSR 첫 페인트 문제를 그대로
두고, 다이얼로그 하나만 다룹니다. Protean은 크기 x 입력 2축으로 판단하고, SSR이
구조적으로 틀릴 수 없게 설계했고, 오버레이 - 셀렉트 - 내비게이션 - 화면 뼈대 - 주 행동
다섯 역할을 같은 정책으로 다룹니다. (참고로 Credenza는 2025년 11월 이후 멈춰 있고 npm에
배포된 적이 없습니다.)

## 비어 있던 자리

웹은 배치 적응(layout adaptation)을 오래전에 해결했습니다 - 미디어 쿼리, 플렉스박스,
컨테이너 쿼리. 끝내 해결하지 못한 것은 패턴 적응(pattern adaptation)입니다. Popover가
바텀 시트가 되고, 사이드바가 하단 탭 바가 되고, 인라인 버튼이 고정 액션 바가 되는 것.
이 전환은 DOM과 이벤트 모델, 포커스 관리, ARIA 배선까지 전부 바꿉니다. CSS로는 표현할
수 없어서, 모든 앱이 손으로 표현해 왔습니다.

그래서 "노 브레이크포인트"의 범위도 정확히 여기까지입니다: Protean이 지우는 것은 패턴을
고르는 분기(`isMobile ? <A/> : <B/>`)입니다. `md:flex-row` 같은 배치 조정은 CSS가 이미
잘하는 일이라, 계속 CSS의 몫입니다.

이걸 내부적으로 해결한 디자인 시스템들은 해법을 자사 브랜드에 용접해 버렸습니다. React
Spectrum은 모바일에서 Popover를 Tray로 바꾸지만 트리거는 하드코딩된
`window.screen.width <= 700`이고, 후속인 Spectrum 2는 이 기능을 미구현인 채 출시됐습니다.
SAP UI5는 UA 스니핑입니다. unstyled 진영(Radix, Base UI, React Aria Components)은 결정을
의도적으로 사용자에게 넘깁니다. 코드를 쓰기 전에 생태계를 실사했을 때, "자동 적응 x
스타일 독립 x 오픈소스"는 빈 교집합이었습니다.

## 안드로이드가 이미 증명한 것

안드로이드 앱이 평범한 개발자 손에서도 전부 봐줄 만하게 나오는 이유는 감각이 아니라
구조입니다. `WindowSizeClass`가 화면을 분류하고, `NavigationSuiteScaffold`가 하단 바 -
레일 - 서랍을 알아서 오가고, 패턴이 컴포넌트로 존재합니다. 결정을 플랫폼이 소유합니다.

이걸 웹에 통째로 이식하려던 시도들 - 디자인 시스템 번들 - 은 브랜드 결박 때문에
반복해서 실패했습니다. 남은 길은 언번들입니다. 행동(포커스, ARIA)은 headless 진영이
이미 해결했고, 시각 언어는 각 팀의 것으로 남겨야 하고, 그 사이에서 아직 비어 있는
패턴 결정 층만 공공재로 만드는 것. Protean이 그 층입니다. (전체 논증:
https://protean-ui-jintaes-projects.vercel.app/ko/why)

## Protean은 무엇인가

headless 적응 정책 런타임입니다. Radix와 Base UI가 패턴을 주고, Protean은 어떤 패턴일지를
결정합니다.

- 개발자는 의미를 선언합니다: `<Dialog.Root role="form">`, `<Navigation.Root>`,
  `<PrimaryAction.Root>`.
- 순수 정책 함수가 환경 트레이트(size class x input)를 프레젠테이션으로 사상합니다. 폭은
  대리 변수일 뿐입니다 - 마우스가 달린 좁은 데스크톱 창은 폰이 아니므로, 엄지용 시트가
  아니라 작은 모달을 받습니다.
- 정책은 여러분의 저장소에 삽니다(`protean.config.ts`) - Tailwind 설정이 그렇듯이.
  오버라이드는 픽셀이 아니라 트레이트 언어로만 말합니다
  (`presentation={{ compact: "fullscreen" }}`). 모든 결정은 DOM에 `data-presentation`으로
  찍히고 설명 가능합니다: `explain()`은
  `overlay(form) -> fullscreen [pack:app-first] size=compact input=touch`를 출력합니다.
- 판정의 기준은 뷰포트만이 아닙니다. `ProteanBoundary`로 감싼 영역 안에서는 그 패널의
  폭으로 판정하고, 시트도 패널 자체의 바닥에서 올라옵니다 - 1440px 모니터의 420px
  사이드 패널 안 다이얼로그는 compact로 동작합니다. 웹의 다른 적응 시스템에는 없는
  축입니다.

## SSR은 구조적으로 틀릴 수 없다

아키텍처 규칙 하나가 전부를 지배합니다: 서버가 틀릴 수 있는 결정은 CSS로 표현 가능해야
하고, 그럴 수 없으면 상호작용 시점으로 미뤄야 한다.

- 오버레이는 열리는 순간 결정합니다. 서버가 보낸 HTML에는 트리거만 있고 오버레이
  마크업이 0바이트입니다. 플래시할 것도, 어긋날 것도, 밀릴 것도 없습니다. 반대
  트레이드가 필요하면 `continuity="live"`로 열림 중 재판정을 켤 수 있는데, 이때도
  콘텐츠 DOM과 입력 상태, 포커스가 보존된 채 모습만 바뀝니다.
- 내비게이션 크롬은 하나의 `nav > ul` 트리이고, 하단 바 - 드로어 - 레일 - 사이드바는 그
  트리의 미디어 쿼리 CSS 상태 4개입니다. 모두에게 같은 DOM이 서빙되고, 실측 CLS는 0이며,
  JavaScript를 꺼도 올바르게 배치됩니다.

## 실측 영수증

전망치가 아니라 저장소에서 잰 숫자들입니다:

- 오버레이 사용처 기준 앱 코드 73% 감소 (55줄 -> 15줄; 래퍼 라이브러리가 아니라 손으로
  쓴 레시피 대비입니다).
- 번들: 일곱 역할 전부 합쳐 react 5.7KB gzip, core 1.1KB (Base UI 제외). 역할 하나만
  쓰면 서브패스(`@protean-ui/react/dialog`)로 2.8KB이고, 이 트리셰이킹은 릴리스
  게이트가 계약으로 지킵니다.
- 테스트 157개. 기본 정책은 45셀 결정 테이블로 전수 검증되고, 경계값·상태 전이·예외
  스위트와 함께 릴리스 게이트(`pnpm gate`)가 매 발행을 막아섭니다 - 결정 셀 하나가
  틀리면 통계가 아니라 릴리스 차단입니다.
- axe: 내비게이션과 풀스크린 상태 위반 0. 열린 모달에서는 교체 대상이었던 수동 레시피보다
  플래그 노드가 오히려 1개 적음 (남은 것은 양쪽 모두에 존재하는 공유 백엔드의 포커스 가드
  센티널).
- 그리고 진짜 시험. 토스의 게이미피케이션 미니앱을 클론한 프로덕션급 코드베이스를
  이관했습니다: 24개 화면, 테스트 699개, 수제 바텀 시트 5개, 의도적으로 모바일 전용.
  다섯 오버레이가 시맨틱 컴포넌트 하나로 수렴했고(앱 코드 순감 -152줄), 약 50줄짜리 셸
  컴포넌트 하나가 모바일 전용 앱에 데스크톱 레이아웃을 부여했습니다 - 상시 사이드바,
  뷰포트 중앙 모달, 창 리사이즈 시 라이브 셸 전환. 699개 테스트는 전부 그린을 유지했고,
  모바일 경험은 원본 그대로입니다.

## 정직한 경계선

- 프리알파입니다. 오늘 존재하는 역할은 다섯: Dialog, Select, Navigation, Screen,
  PrimaryAction. React 18+, Next.js App Router와 Vite 모두 1급 타깃.
- 행동은 Base UI에 위임합니다 - 포커스 트랩, 리스트박스 시맨틱, 드로어 제스처. Protean은
  풀린 문제를 다시 풀지 않습니다. 소유하는 것은 결정, 배선, 그리고 프레젠테이션 전환의
  연속성뿐입니다.
- 기본 정책은 취향이 아닙니다. 문서화된 플랫폼 관습(Material window size class, HIG
  오버레이 패턴)의 인코딩이고, 모든 기본값에는 3단 탈출구(인스턴스 - 트레이트 - 정책)가
  있습니다.
- 스타일은 강요하지 않되 방치하지도 않습니다: 값이 뷰포트가 아니라 presentation에 붙는
  참고 스타일시트를 동봉하고(`@protean-ui/css`), 어휘만 필요한 팀은 `tokens.css`만
  가져가면 됩니다. 시트는 위쪽 모서리만 둥글고 풀스크린은 모서리가 없는 이유가 media
  query가 아니라 역할 전환입니다. 전부 `@layer`라 여러분의 CSS가 항상 이깁니다.
- 알려진 공백, 숨기지 않습니다: 기본 정책은 입력 축을 compact에서만 따집니다 - 실기기
  검증 없는 추측 규칙을 기본값에 넣지 않는다는 원칙이라, 태블릿 분화는 사용 데이터
  확보 후입니다(가상 키보드도 트레이트로 수집만 하고 아직 규칙에 쓰지 않습니다).
  컨테이너 안의 크롬(내비게이션 등)은 CSS 컨테이너 쿼리의 몫으로 남습니다. 시트 모드
  Select는 업스트림에 비앵커 옵션이 생길 때까지 CSS로 포지셔너를 고정합니다. 태블릿
  레일과 바 오버플로는 jsdom과 iOS 시뮬레이터(실제 WebKit - iPhone 16 Pro, iPad
  Pro)에서 검증했고, 물리 기기 검증은 남아 있습니다.

이름에 대해: protean - 자유자재로 형태를 바꾸는. 학술 계보는 UI plasticity(Thevenin &
Coutaz, 1999)입니다. 이 프로젝트를 통과시킨 킬 크라이테리아 판정문은 데이터와 함께
저장소에 있습니다.

- 설치: `npm install protean-ui` (프리알파)
- 저장소: https://github.com/tjk1150/protean-ui
- 문서와 라이브 데모: https://protean-ui-jintaes-projects.vercel.app
- 왜 만들었나: https://protean-ui-jintaes-projects.vercel.app/ko/why · 설계 원리: https://protean-ui-jintaes-projects.vercel.app/ko/concepts/design-principles
- Phase 0 판정: https://github.com/tjk1150/protean-ui/blob/main/docs/phase-0-verdict.md
