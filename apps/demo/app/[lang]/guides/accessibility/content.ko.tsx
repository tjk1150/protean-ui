import Link from 'next/link'

export default function AccessibilityKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Popover가 Sheet로 바뀌면 접근성 구조도 달라질까요?</h1>
      <p className="lede">
        환경에 따라 UI의 모양이 달라지면 키보드와 스크린 리더에서는 어떻게
        동작해야 할까요? 서로 다른 컴포넌트를 두 벌 만들면 포커스 · 닫기 · 키보드
        조작 · 접근성 이름 · 현재 상태를 각각 맞춰야 해요. Protean은{' '}
        <strong>기능의 의미와 환경에 맞는 표현을 연결하고, 선택된 패턴에 맞는
        상호작용 primitive를 사용해요.</strong>
      </p>

      <h2>중요한 건 모양보다 의미예요</h2>
      <p>
        <code>role=&quot;confirmation&quot;</code>이라고 알려주면 Protean은 이를
        환경에 따라 모달이나 시트로 표현할 수 있어요. 하지만 단순히 CSS로 박스
        위치만 옮기는 것과는 달라요. 현재 선택된 패턴에 필요한 포커스 처리 · 닫힘
        동작 · 키보드 상호작용 · 접근성 의미는 해당 UI primitive가 담당해요.
      </p>
      <p>
        다만 Protean이 의미 자체를 추측하는 건 아니에요.{' '}
        <code>role=&quot;form&quot;</code>, <code>current</code>,{' '}
        <code>aria-label=&quot;공유&quot;</code>,{' '}
        <code>paneLabel=&quot;검색 필터&quot;</code> 같은 중요한 의미는 여전히
        앱이 알려줘야 해요.
      </p>

      <h2>패턴이 바뀌어도 사용 흐름을 잃지 않게 해요</h2>
      <p>
        접근성에서 중요한 건 ARIA 속성 하나만 맞는 게 아니에요. 사용자가 작업
        중에 어디에 있었는지, 무엇을 조작하고 있었는지도 중요해요. 대표 사례
        네 가지로 볼게요.
      </p>

      <h3>Dialog - 열고 닫을 때 포커스를 관리해요</h3>
      <p>
        Dialog는 <code>initialFocus</code> · <code>finalFocus</code>로 포커스
        위치를 조정할 수 있고, <code>alert</code>를 켜면{' '}
        <code>alertdialog</code>로 더 강한 경고 의미에 연결돼요.{' '}
        <code>continuity=&quot;live&quot;</code>로 열린 상태에서 형태가 바뀔 때도
        콘텐츠 DOM · 입력값 · React 상태를 유지하고 포커스를 Overlay 안에 유지하는
        계약이 테스트로 보장돼요 - 환경이 바뀌었다고 사용자가 작성하던 폼을 새
        트리로 갈아끼우지 않아요.
      </p>

      <h3>ListDetail - 작은 화면에서 상세로 이동했음을 알려줘요</h3>
      <p>
        작은 화면의 <code>stack</code>에서 상세가 새로 활성화되면 상세 영역으로
        포커스를 이동해, 키보드와 스크린 리더 사용자가 화면 전환을 자연스럽게
        이어서 인식할 수 있어요. <code>panes</code>에서는 두 영역이 모두 보이므로
        기존 포커스를 빼앗지 않아요. 테스트로 고정된 계약이에요.
      </p>

      <h3>Tooltip - 도움말 때문에 포커스를 빼앗지 않아요</h3>
      <p>
        호버할 수 없는 환경에서 눌러 여는 popover가 되어도 의미는 여전히 짧은
        도움말이에요. popover에서도 <code>role=&quot;tooltip&quot;</code>을
        유지하고, 열릴 때 팝업 안으로 포커스를 강제로 이동시키지 않아요 - 터치
        환경이라고 Tooltip을 작은 Dialog처럼 바꾸지 않아요.
      </p>
      <div className="callout">
        <strong>중요한 정보는 Tooltip에만 넣지 마세요.</strong> Tooltip은 mount
        이후 연결되는 보조 설명이라, JavaScript가 준비되기 전에는 내용 자체가
        존재하지 않을 수 있어요. 아이콘 버튼에는 <code>aria-label</code>로 이름을
        제공하고, 반드시 알아야 하는 정보는 기본 DOM에도 두세요.
      </div>

      <h3>Navigation - 현재 위치를 앱이 알려줘요</h3>
      <p>
        Navigation은 실제 <code>&lt;nav&gt;</code> 구조를 사용하고,{' '}
        <code>current</code>는 <code>aria-current=&quot;page&quot;</code>로
        연결돼요. 어떤 모습(바 · 드로어 · 레일 · 사이드바)이든 같은 구조와 같은
        의미예요. 현재 URL을 Protean이 추측하지 않으니, 라우터가 판단하고 앱이{' '}
        <code>current</code>를 전달하세요.
      </p>

      <h2>같은 모양이라도 의미는 다를 수 있어요</h2>
      <p>
        화면 아래에서 올라오는 UI라도 의미가 달라요. Dialog의 시트는{' '}
        <strong>현재 작업을 잠시 멈추고 별도 상호작용에 집중</strong>하는
        Overlay이고, SupportingPane의 시트는{' '}
        <strong>원래 화면의 보조 영역을 좁은 공간에서 다시 배치</strong>한
        것이에요. 그래서 SupportingPane의 Pane은 계속{' '}
        <code>&lt;aside&gt;</code>를 유지하고, Dialog처럼 focus trap ·
        autofocus · <code>role=&quot;dialog&quot;</code>를 갖지 않아요.{' '}
        <strong>시각적 형태 이름보다 UI의 역할이 먼저예요</strong> - Protean은
        모양을 보고 semantics를 정하는 라이브러리가 아니에요.
      </p>

      <h2>Native HTML을 가능한 한 유지해요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>컴포넌트</th><th>기본 의미</th></tr></thead>
          <tbody>
            <tr><td><code>Navigation.Root</code></td><td><code>&lt;nav&gt;</code></td></tr>
            <tr><td><code>Navigation.Item</code></td><td><code>href</code>가 있으면 <code>&lt;a&gt;</code>, 없으면 <code>&lt;button&gt;</code></td></tr>
            <tr><td><code>Screen.Content</code></td><td><code>&lt;main&gt;</code> (기본값, <code>as=&quot;div&quot;</code> 가능)</td></tr>
            <tr><td><code>PrimaryAction.Root</code>의 행동 요소</td><td><code>&lt;button&gt;</code> (wrapper는 div)</td></tr>
            <tr><td><code>Actions.Item</code></td><td><code>&lt;button&gt;</code></td></tr>
            <tr><td><code>Tooltip.Trigger</code></td><td><code>&lt;button&gt;</code></td></tr>
            <tr><td><code>SupportingPane.Pane</code></td><td><code>&lt;aside&gt;</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <code>Screen.Content</code>를 쓸 때는 한 페이지에{' '}
        <code>&lt;main&gt;</code> landmark가 중복되지 않게 주의하세요 - Protean이
        페이지 전체 landmark 구조를 자동으로 완성해 주는 건 아니에요.
      </p>

      <h2>키보드 사용은 어떻게 되나요?</h2>
      <p>
        Dialog · Select · Menu 같은 복잡한 Overlay의 기본 키보드 동작(포커스
        관리와 닫기, 메뉴 탐색, 선택 UI 조작)은 기반 primitive가 담당해요.
        Protean이 이 상호작용을 환경별 구현으로 다시 작성하지 않아요. 입력 수단에
        따라 패턴과 밀도가 달라져도 할 수 있는 일은 같아요 - 태블릿에 키보드를
        연결한 사용자도 있으니까요.
      </p>
      <p>
        하지만 모든 키보드 동작을 Protean이 추가하는 건 아니에요. Actions는{' '}
        <code>role=&quot;toolbar&quot;</code>와 열림 상태의{' '}
        <code>aria-expanded</code>를 제공하지만 화살표 키 roving focus까지
        구현하지 않고, SupportingPane도 시트처럼 보인다고 focus trap을 추가하지
        않아요. 문서 어디에서도 &quot;Protean이 접근성을 모두 자동으로
        보장해요&quot;라고 말하지 않아요.
      </p>

      <h2>패턴을 직접 지정해도 의미를 확인하세요</h2>
      <p>
        <code>presentation</code>으로 기본 규칙과 다른 형태를 지정할 수 있지만,
        API가 허용한다고 모든 조합이 콘텐츠 의미에 적절하다는 뜻은 아니에요.
        입력량이 매우 많은 폼이나 긴 경고 내용을 작은 popover에 강제로 넣으면
        기술적으로 렌더링돼도 사용 흐름이 나빠질 수 있어요.{' '}
        <code>presentation</code>은 접근성 판단까지 없애주는 escape hatch가
        아니에요.
      </p>
      <p>
        <code>ProteanProvider components</code>로 Dialog 구현 자체를 교체할
        때도 마찬가지예요. Custom 구현은 Protean이 전달하는 열림 상태 · 포커스 ·
        접근성 이름 · Portal · 연속성 계약을 올바르게 사용해야 해요. 단순히{' '}
        <code>&lt;div&gt;&#123;children&#125;&lt;/div&gt;</code>로 바꾸면 기존
        접근성 동작을 잃어요 - Protean이 custom 구현의 접근성을 자동으로 검증해
        주지 않아요.
      </p>

      <h2>버튼을 중복하지 마세요</h2>
      <p>
        한 버튼이 도움말과 Dialog를 모두 가져야 할 때{' '}
        <code>render</code> 합성을 쓰는 중요한 이유 중 하나가{' '}
        <strong>중첩된 interactive element를 만들지 않는 것</strong>이에요.{' '}
        <code>&lt;button&gt;&lt;button&gt;</code> 구조는 보조 기술에 잘못된
        구조로 읽혀요. 지원되는 합성 API는{' '}
        <Link href="/ko/guides/composition">함께 쓰기</Link>에 있어요. 비활성
        상태도 <code>pointer-events: none</code> 같은 CSS만으로 흉내 내지 말고
        native <code>disabled</code>를 사용해 실제 의미를 함께 전달하세요.
      </p>

      <h2>밀도가 커진다고 접근성이 자동 완성되는 건 아니에요</h2>
      <p>
        Protean은 터치 환경에서 더 넉넉한 target과 row 크기를 사용할 수 있지만,
        touch profile 사용이 접근성 기준 만족을 의미하지는 않아요. 텍스트 크기,
        색상 대비, focus indicator, 오류 메시지, label, 콘텐츠 순서는 서비스가
        함께 확인해야 해요. 밀도는 접근성을 도와주는 하나의 표현 요소이지 인증이나
        보증이 아니에요.
      </p>

      <h2>동작 줄이기 설정을 존중해요</h2>
      <p>
        Protean은 <code>reducedMotion</code> 환경 정보를 수집하고, 참고
        애니메이션은 <code>@media (prefers-reduced-motion: no-preference)</code>{' '}
        안에서만 실행돼요. 사용자가 운영체제에서 동작 줄이기를 선택했다면 시트나
        SupportingPane의 기본 애니메이션이 적용되지 않아요. 프로젝트가 별도의
        애니메이션을 추가한다면 같은 사용자 선호를 직접 고려해 주세요.
      </p>

      <h2>CSS를 바꿀 때 접근성도 같이 확인하세요</h2>
      <p>
        프로젝트의 unlayered CSS는 참고 스타일보다 우선하기 때문에, 다음을 깨뜨릴
        수도 있어요.
      </p>
      <ul>
        <li>
          <strong>Focus indicator</strong> - <code>outline: none</code>만
          적용하고 대체 focus 표시를 제공하지 않는 패턴은 피해주세요.
        </li>
        <li>
          <strong>숨김 상태</strong> - 상태에 따라 숨겨지는 요소에{' '}
          <code>display</code>를 무조건 덮어쓰면 숨겨져야 할 요소가 다시 나타날
          수 있어요.
        </li>
        <li>
          <strong>색상 대비</strong> - token을 바꾸면 텍스트 · 배경 · 경계선의
          대비도 프로젝트가 다시 확인해야 해요.
        </li>
      </ul>

      <h2>앱이 직접 책임져야 하는 것</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>앱이 알려줘야 하는 것</th><th>예</th></tr></thead>
          <tbody>
            <tr><td>버튼의 이름</td><td><code>aria-label=&quot;공유&quot;</code></td></tr>
            <tr><td>Dialog의 목적</td><td><code>role=&quot;form&quot;</code></td></tr>
            <tr><td>현재 페이지</td><td><code>current</code></td></tr>
            <tr><td>Pane의 이름</td><td><code>paneLabel=&quot;필터&quot;</code></td></tr>
            <tr><td>중요한 경고 내용</td><td>화면에 직접 표시</td></tr>
            <tr><td>Form label / error</td><td>앱의 form markup</td></tr>
            <tr><td>이미지 대체 텍스트</td><td><code>alt</code></td></tr>
            <tr><td>색상 대비 · heading 구조</td><td>프로젝트 CSS와 콘텐츠</td></tr>
          </tbody>
        </table>
      </div>
      <pre><code>{`Protean / 기반 primitive
→ 선택된 패턴의 interaction · focus · keyboard · 필요한 상태 연결

앱
→ 콘텐츠의 실제 의미 · 접근성 이름 · 현재 상태 · 중요한 안내 · 디자인 대비`}</code></pre>

      <h2>직접 확인해야 할 것</h2>
      <p>접근성은 타입 검사만으로 끝나지 않아요. 최소한 다음 흐름을 확인해 주세요.</p>
      <ul>
        <li>
          <strong>키보드만 사용하기</strong> - Tab · Shift+Tab · Enter · 화살표 ·
          Escape로 주요 작업을 완료할 수 있는지.
        </li>
        <li>
          <strong>포커스 위치</strong> - Dialog 열고 닫기, ListDetail 상세 활성화,
          Menu · Select 열고 닫기에서 포커스가 예상하지 못한 곳으로 튀지 않는지.
        </li>
        <li>
          <strong>접근성 이름</strong> - 아이콘 버튼이 &quot;버튼&quot;이 아니라
          &quot;공유 버튼&quot;처럼 목적이 읽히는지.
        </li>
        <li>
          <strong>여러 환경</strong> - Protean의 특징은 형태가 바뀐다는 점이라,
          실제 서비스에서 나올 수 있는 형태(모달 · 시트 · 전체 화면 · 팝오버)
          경로를 각각 확인하세요.
        </li>
        <li>
          <strong>동작 줄이기</strong> - reduced-motion 설정을 켰을 때 프로젝트가
          추가한 애니메이션까지 적절히 줄어드는지.
        </li>
      </ul>

      <h2>Protean이 접근성 인증을 의미하나요?</h2>
      <p>
        아니에요. Protean은 접근성을 고려한 HTML 의미와 기반 primitive의
        상호작용 계약을 사용하지만, &quot;Protean을 사용하면 서비스가 자동으로
        WCAG를 준수한다&quot;고 말할 수는 없어요. 실제 접근성은 콘텐츠, 프로젝트
        CSS, 페이지 구조, 사용하는 조합까지 합쳐진 결과예요. Protean이 하는 건{' '}
        <strong>환경별 UI를 두 벌 구현하면서 접근성 동작까지 중복 관리해야 하는
        부담을 줄이는 것</strong>이에요. 현재 실제 검증 수준은{' '}
        <Link href="/ko/about/status">품질과 지원</Link>에서 확인할 수 있어요.
      </p>

      <h2>정리하면</h2>
      <p>
        <strong>Protean은 환경에 따라 표현을 바꾸지만, 기능의 의미까지 임의로
        바꾸지는 않아요.</strong> 그리고{' '}
        <strong>접근성은 라이브러리와 앱이 함께 만드는 결과예요.</strong>
      </p>
      <pre><code>{`presentation              → 환경에 맞게 바뀔 수 있음
기능의 의미               → 앱이 유지
focus / keyboard / 의미   → 선택된 패턴의 계약에 맞게 연결`}</code></pre>
      <p>
        다음은 <Link href="/ko/about/scope">Protean이 하는 일과 하지 않는
        일</Link>이에요.
      </p>
    </div>
  )
}
