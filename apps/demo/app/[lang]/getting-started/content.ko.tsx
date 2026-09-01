import Link from 'next/link'

export default function GettingStartedKo() {
  return (
    <div className="doc" lang="ko">
      <h1>시작하기</h1>
      <p className="lede">
        10분이면 첫 다이얼로그를 띄울 수 있어요. Protean은 아직 pre-alpha라서 npm에
        올라가 있지 않고, 저장소에서 직접 받아서 써요.
      </p>

      <h2>1. 설치하기</h2>
      <pre><code>{`git clone https://github.com/tjk1150/protean-ui

# 내 앱에서:
npm install ../protean-ui/packages/core ../protean-ui/packages/react @base-ui/react`}</code></pre>
      <p>Next.js를 쓴다면 설정 두 가지를 추가해 주세요.</p>
      <pre><code>{`// next.config.ts
const nextConfig = {
  // Protean은 지금 TypeScript 소스 그대로 배포돼요. 번들러가 컴파일하도록 알려줘요.
  transpilePackages: ["@protean-ui/react", "@protean-ui/core"],
  turbopack: {
    // Base UI가 내 앱의 React를 쓰도록 경로를 고정해요.
    resolveAlias: {
      "@base-ui/react": "./node_modules/@base-ui/react",
      "@base-ui/react/*": "./node_modules/@base-ui/react/*",
    },
  },
};`}</code></pre>
      <div className="callout">
        <strong>왜 이 설정이 필요한가요?</strong> 저장소를 직접 링크해서 쓰는 동안에만
        필요한 임시 설정이에요. React가 두 벌 로드되는 문제를 막아 줘요. npm에 정식
        배포되면 이 설정 없이 <code>npm install protean-ui</code> 한 줄로 끝나요.
      </div>

      <h2>2. 첫 다이얼로그 띄우기</h2>
      <p>설정할 것이 없어요. 불러와서 바로 쓰면 기본 규칙이 적용돼요.</p>
      <pre><code>{`import { Dialog } from "@protean-ui/react";

<Dialog.Root role="form">
  <Dialog.Trigger>배송지 수정</Dialog.Trigger>
  <Dialog.Content title="배송지 수정">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>버튼을 누르면 이런 일이 일어나요.</p>
      <ol>
        <li>여는 순간, 지금 환경(화면 크기 + 입력 수단)을 읽어요.</li>
        <li>규칙에 대입해요. &quot;입력 폼이고, 폰이면 전체 화면. 아니면 모달.&quot;</li>
        <li>정해진 모습으로 열어요. 포커스 이동, ESC 닫기, 접근성 연결까지 함께요.</li>
      </ol>
      <p>
        열려 있는 동안에는 창 크기가 바뀌어도 모습을 유지해요. 사용 중에 UI가 갑자기
        바뀌면 당황스러우니까요. 다음에 열 때 다시 판단해요.
      </p>

      <h2>3. 모양 입히기</h2>
      <p>
        Protean은 색이나 모양을 강요하지 않지만, 바로 쓸 수 있는 참고 스타일시트를
        함께 제공해요. 한 줄 불러오면 봐줄 만한 기본 모습이 나오고, 우리 팀 디자인이
        있으면 토큰만 덮어쓰거나 파일째 복사해서 고치면 돼요.
      </p>
      <pre><code>{`import "@protean-ui/react/reference.css";`}</code></pre>
      <pre><code>{`/* 우리 팀 색으로 바꾸기 - 토큰만 덮어쓰면 돼요 */
:root {
  --protean-surface: #ffffff;
  --protean-accent: #3182f6;
}

/* 모달 모서리만 바꾸기 - 값은 모습(presentation)에 붙어 있어요 */
[data-presentation="modal"] {
  --protean-shape: 20px;
}`}</code></pre>
      <p>
        이 파일의 원칙은 하나예요. <strong>값은 화면 폭이 아니라 모습을 따라가요.</strong>{' '}
        시트는 위쪽 모서리만 둥글고, 전체 화면은 모서리가 없고, 모달은 네 모서리가
        둥글어요. 화면이 좁아져서 radius가 줄어드는 게 아니라, 모습이 바뀌면 radius
        정책이 함께 바뀌는 거예요. 그리고 모든 스타일이 <code>@layer</code> 안에 있어서,
        여러분이 쓰는 CSS가 언제나 이겨요.
      </p>

      <h2>4. 규칙 바꾸기</h2>
      <p>
        기본 규칙이 우리 서비스와 안 맞을 수 있어요. 그럴 때는 규칙 파일을 프로젝트에
        만들어요. Tailwind 설정 파일처럼, 팀의 결정이 코드로 남아요.
      </p>
      <pre><code>{`// protean.config.ts
import { appFirst, definePolicy } from "@protean-ui/react";

export const policy = definePolicy({
  extends: appFirst, // 기본 규칙에서 시작해요
  overlay: ({ traits, role, defaults }) =>
    // 작은 화면의 입력 폼은 전체 화면 대신 바텀 시트로 열래요
    role === "form" && traits.size === "compact" ? "sheet" : defaults(),
});`}</code></pre>
      <pre><code>{`// 앱 최상단에서 한 번만 감싸 주세요
import { ProteanProvider } from "@protean-ui/react";
import { policy } from "./protean.config";

<ProteanProvider policy={policy}>{children}</ProteanProvider>`}</code></pre>

      <h2>5. 이 화면 하나만 다르게 하기</h2>
      <p>
        규칙 전체가 아니라 특정 화면 하나만 바꾸고 싶을 때도 있어요. 그때는 컴포넌트에
        직접 지정해요. 픽셀 값이 아니라 환경 이름으로 말하는 게 특징이에요.
      </p>
      <pre><code>{`// 항상 바텀 시트로 열래요
<Dialog.Root presentation="sheet" />

// 작은 화면에서만 전체 화면으로 열래요
<Dialog.Root presentation={{ compact: "fullscreen" }} />`}</code></pre>

      <h2>왜 이렇게 열렸는지 궁금할 때</h2>
      <p>
        모든 판단 결과는 DOM에 <code>data-presentation</code> 속성으로 남고, 개발
        모드에서는 콘솔에 이유가 찍혀요.
      </p>
      <pre><code>{`[protean] overlay(form) -> fullscreen [pack:app-first] size=compact input=touch
// "입력 폼 다이얼로그를 전체 화면으로 열었어요.
//  기본 규칙(app-first)이 정했고, 화면은 compact, 입력은 터치였어요."`}</code></pre>

      <p>
        다음: <Link href="/ko/concepts/traits-and-policy">판단 기준과 규칙</Link>에서
        Protean이 환경을 어떻게 읽는지 알아보세요.
      </p>
    </div>
  )
}
