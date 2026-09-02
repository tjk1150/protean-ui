import Link from 'next/link'

export default function ScopeKo() {
  return (
    <div className="doc" lang="ko">
      <h1>제공 범위와 비목표</h1>
      <p className="lede">
        Protean이 무엇을 맡고, 무엇을 일부러 맡지 않는지의 지도예요.{' '}
        <code>npm install @protean-ui/react</code> 한 줄로 Base UI까지 함께 오기
        때문에, 앱 하나를 만드는 데 다른 UI 라이브러리를 더 깔 필요는 없어요 -
        &quot;그럼 체크박스는? 탭은?&quot;의 답이 이 페이지예요.
      </p>

      <h2>지도: 필요한 것마다 어디서 오나</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>필요한 것</th><th>어디서</th><th>비고</th></tr></thead>
          <tbody>
            <tr><td>다이얼로그 · 셀렉트 · 메뉴 · 내비게이션 · 리스트-디테일 · 주 행동 · 툴팁</td><td><strong>Protean이 판단해요</strong></td><td>환경이 상호작용 방식 자체를 바꾸는 것들이에요. 컨테이너 기준 판정은 Boundary로요.</td></tr>
            <tr><td>UI 밀도 (compact · comfortable · touch)</td><td><strong>Protean이 판단해요</strong></td><td>포인터 기본값은 CSS가, 사용자 설정과 패턴 결합은 판단이 정해요. <Link href="/ko/concepts/density">밀도</Link> 참고.</td></tr>
            <tr><td>Screen · Actions · SupportingPane</td><td><strong>함께 제공 - CSS 중심 도우미</strong></td><td>판단 없이 구조를 주는 레이아웃 도우미예요. 반응은 참고 스타일시트의 CSS가 맡아요.</td></tr>
            <tr><td>폼 전부 - Input · Checkbox · Radio · Switch · Slider · NumberField · Field · Form 등</td><td><strong>Base UI 그대로</strong></td><td><code>import &#123; Checkbox &#125; from &apos;@base-ui/react/checkbox&apos;</code> - 이미 설치돼 있어요. 환경이 상호작용을 안 바꾸니 판단이 낄 이유가 없어요.</td></tr>
            <tr><td>Tabs · Accordion · Toast · Progress · Avatar · ScrollArea · Toolbar · ContextMenu 등</td><td><strong>Base UI 그대로</strong></td><td>같아요. 탭이 좁은 화면에서 스크롤되는 건 CSS이지 상호작용 변화가 아니에요.</td></tr>
            <tr><td>카드 · 뱃지 · 구획 배치 · <code>md:flex-row</code> 같은 레이아웃</td><td><strong>여러분의 CSS</strong></td><td>배치 적응은 CSS가 이미 푼 문제예요. &quot;노 브레이크포인트&quot;는 패턴 분기에만 해당해요.</td></tr>
            <tr><td>테이블</td><td><strong>HTML + CSS</strong></td><td>시맨틱 <code>&lt;table&gt;</code>에 반응 스타일. 카드 전환이 필요한 데이터라면 ListDetail이 답인 경우가 많아요.</td></tr>
            <tr><td>DatePicker · CommandPalette · 차트</td><td><strong>아직 · 아직 · 비목표</strong></td><td>DatePicker는 Base UI에 캘린더가 생기면, CommandPalette는 수요가 확인되면요. 차트는 전문 라이브러리 몫이에요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>비목표를 분명히 할게요</h2>
      <ul>
        <li>
          <strong>범용 반응형 엔진이 아니에요.</strong> CSS가 잘하는 렌더링, 부드러운
          보간, 단순한 대응(모양이 모습을 따르는 것 같은)은 계속 CSS의 몫이에요.
          Protean은 여러 신호를 조합해야 하는 판단만 맡아요.
        </li>
        <li>
          <strong>디자인 시스템이 아니에요.</strong> 시각 언어는 팀의 것이라 비워
          둬요. 참고 스타일시트는 갈아끼우라고 있는 기본값이에요.
        </li>
        <li>
          <strong>화면 크기로 값을 비례 계산하지 않아요.</strong> 크기가 줄었다고
          radius를 0.8배 하는 식의 자동 축소는 만들지 않기로 검증까지 마쳤어요.
        </li>
      </ul>

      <h2>섞어 쓰면 이런 모양이에요</h2>
      <pre><code>{`import { Dialog } from '@protean-ui/react'        // 판단: 환경이 모습을 정해요
import { Field } from '@base-ui/react/field'       // 그대로 가져다 써요
import { Input } from '@base-ui/react/input'
import { Checkbox } from '@base-ui/react/checkbox'

<Dialog.Root role="form">
  <Dialog.Trigger>배송지 수정</Dialog.Trigger>
  <Dialog.Content title="배송지 수정">
    <Field.Root>
      <Field.Label>주소</Field.Label>
      <Input />
    </Field.Root>
    <Checkbox.Root /> 기본 배송지로 저장
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        다이얼로그가 데스크톱에선 모달로, 폰에선 전체 화면으로 열리는 동안 안의 폼은
        아무것도 몰라요. 두 층은 원래 한 몸처럼 설계됐어요 - Protean의 뒷단이 바로
        Base UI거든요.
      </p>

      <h2>시각은 어디까지 주나요</h2>
      <p>
        참고 스타일시트는 팝업들을 바로 입혀 주고, 화면 골격 도우미들은{' '}
        <code>protean-defaults</code> 클래스 안에서 입혀져요. 나머지 컴포넌트의 시각은
        여러분 것이에요. 대신 어휘는 공유할 수 있어요 - 여러분의 체크박스 CSS에서
        같은 토큰을 소비하면 앱 전체의 밀도와 색이 한 몸이 돼요.
      </p>
      <pre><code>{`/* 여러분의 컴포넌트도 같은 어휘로 */
.my-checkbox {
  min-height: var(--protean-target);   /* 터치 타깃 규율 공유 */
}
.my-delete-button {
  color: var(--protean-danger);        /* 위험 색 공유 */
}`}</code></pre>

      <h2>들어오기 쉽고, 나가기 쉬워요</h2>
      <div className="callout">
        Protean은 Base UI와 경쟁하는 평행 생태계가 아니라 그 위의 한 층이에요.
        채택해도 의존성 그래프에 새 진영이 추가되지 않고, 떠날 때는 Protean 컴포넌트를
        같은 Base UI 부품으로 되돌리면 돼요 - 기반은 그대로 남아 있으니까요.
      </div>
    </div>
  )
}
