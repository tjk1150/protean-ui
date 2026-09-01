import Link from 'next/link'
import { TraitsChip } from '../traits-chip'

export default function OverviewKo() {
  return (
    <div className="doc" lang="ko">
      <h1>무엇인지 선언하면, 어떻게 보여줄지는 Protean이 정해요</h1>
      <p className="lede">
        Protean UI는 React 라이브러리예요. &quot;이건 입력 폼 다이얼로그예요&quot;처럼
        UI의 의미만 알려주면, 지금 사용자의 화면 크기와 입력 수단에 어울리는 모습을
        Protean이 골라서 보여줘요. 폰에서는 바텀 시트로, 데스크톱에서는 모달로요.
      </p>

      <p>
        지금 이 문서를 보고 있는 환경: <TraitsChip /> 창 크기를 줄여 보세요. 왼쪽 메뉴가
        사이드바에서 서랍(드로어)으로 바뀌어요. 이 문서 사이트도 Protean으로 만들었거든요.
      </p>

      <h2>이런 코드, 익숙하지 않나요?</h2>
      <pre><code>{`const isDesktop = useMediaQuery("(min-width: 768px)");

return isDesktop
  ? <Dialog>...</Dialog>   // 데스크톱: 가운데 모달
  : <Drawer>...</Drawer>;  // 모바일: 바텀 시트`}</code></pre>
      <p>
        모바일과 데스크톱에서 UI 모양이 달라야 할 때마다 이렇게 직접 분기해요. 오버레이
        하나에 컴포넌트 트리를 두 벌씩 만들고, 두 벌을 계속 같은 내용으로 맞춰 줘야
        하고, 이 분기가 사용하는 곳마다 반복돼요. 저희가 만든 비교용 구현에서는 이
        코드가 55줄이었어요.
      </p>

      <h2>Protean에서는 이렇게 써요</h2>
      <pre><code>{`<Dialog.Root role="form">
  <Dialog.Trigger>배송지 수정</Dialog.Trigger>
  <Dialog.Content title="배송지 수정">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        <code>role=&quot;form&quot;</code>은 &quot;이 다이얼로그는 입력 폼&quot;이라는
        뜻이에요. 이 선언 하나로 폰에서는 전체 화면으로, 데스크톱에서는 가운데 모달로
        열려요. 분기 코드는 한 줄도 없고, 전부 15줄이에요. 두 방식을 나란히 놓은{' '}
        <Link href="/delete-demo">삭제 데모</Link>에서 직접 비교해 보세요.
      </p>

      <h2>어떻게 정하나요?</h2>
      <ol>
        <li>
          <strong>환경을 읽어요.</strong> 화면 크기 등급(compact / medium / expanded)과
          입력 수단(터치 / 마우스)을 함께 봐요.
        </li>
        <li>
          <strong>규칙에 대입해요.</strong> 기본 규칙은 iOS와 안드로이드 앱들이 이미
          쓰고 있는 관습을 그대로 옮긴 거예요. 마음에 안 들면 규칙 파일을 프로젝트에
          두고 고칠 수 있어요.
        </li>
        <li>
          <strong>알맞은 모습으로 보여줘요.</strong> 모달, 바텀 시트, 전체 화면,
          사이드바 같은 실제 UI 패턴 중 하나로요.
        </li>
      </ol>
      <div className="callout">
        <strong>왜 화면 폭만 보지 않나요?</strong> 데스크톱 창을 좁게 줄인 사용자는 폰
        사용자가 아니에요. 마우스를 쓰고 있으니 엄지용 바텀 시트보다 작은 모달이
        자연스러워요. Protean은 화면 크기와 입력 수단을 함께 보기 때문에 이 둘을 구분할
        수 있어요.
      </div>

      <h2>정말 잘 동작하나요?</h2>
      <ul>
        <li>같은 기능 기준으로 앱 코드가 55줄에서 15줄로 줄었어요 (73% 감소).</li>
        <li>
          내비게이션은 DOM 트리 하나가 하단 탭 바, 서랍, 레일, 사이드바 네 가지 모습으로
          바뀌어요. 화면이 밀리는 현상(CLS)은 실측 0이고, JavaScript를 꺼도 올바르게
          보여요.
        </li>
        <li>
          화면 24개, 테스트 699개짜리 실제 앱에 적용해 봤어요. 수제 바텀 시트 5개가
          컴포넌트 하나로 줄었고, 모바일 전용이던 앱이 사이드바 있는 데스크톱
          레이아웃까지 얻었는데, 테스트는 전부 통과 상태 그대로였어요.
        </li>
      </ul>

      <p>
        <Link href="/ko/getting-started">시작하기</Link>에서 직접 만들어 보거나, 관심
        있는 컴포넌트로 바로 가세요: <Link href="/ko/components/dialog">Dialog</Link>,{' '}
        <Link href="/ko/components/select">Select</Link>,{' '}
        <Link href="/ko/components/navigation">Navigation</Link>,{' '}
        <Link href="/ko/components/screen">Screen</Link>,{' '}
        <Link href="/ko/components/primary-action">PrimaryAction</Link>.
      </p>
    </div>
  )
}
