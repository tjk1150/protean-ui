import { SupportingPaneDemo } from './supporting-pane-demo'

export default function SupportingPaneKo() {
  return (
    <div className="doc" lang="ko">
      <h1>SupportingPane</h1>
      <p className="lede">
        본문 옆의 보조 내용이에요 - 문서의 메타데이터, 상품의 요약 카드, 글의 목차
        같은 것들요. 자리가 있으면 본문 옆에 나란히 있고, 작은 화면에서는 버튼 뒤로
        접혔다가 아래에서 시트로 올라와요. Material의 캐노니컬 레이아웃 세 번째
        조각이에요(리스트-디테일, 피드와 함께요 - 피드는 CSS 그리드 몫이라 여기 없어요).
      </p>

      <div className="callout">
        이 컴포넌트는 <strong>CSS 중심 레이아웃 도우미</strong>예요. 상황 판단 없이
        구조와 마크업을 제공하고, 반응은 참고 스타일시트(또는 여러분의 CSS)가 맡아요.
        기본 모습은 <code>protean-defaults</code> 클래스를 붙인 요소 안에서 적용돼요.
      </div>

      <div className="example">
        <span className="exampleLabel">직접 해 보세요 - 창을 600px보다 좁혀 보세요</span>
        <SupportingPaneDemo
          paneLabel="문서 정보"
          body="계약서 본문이 여기 흐른다고 상상해 보세요. 넓은 화면에서는 오른쪽에 문서 정보가 항상 보이고, 폰에서는 아래 버튼을 눌러야 올라와요."
          rows={[
            ['작성자', '장진태'],
            ['수정', '2026년 9월 2일'],
            ['크기', '18KB'],
          ]}
        />
      </div>

      <pre><code>{`<SupportingPane.Root paneLabel="문서 정보">
  <SupportingPane.Main>
    <ContractBody />
  </SupportingPane.Main>
  <SupportingPane.Pane>
    <MetadataList />
  </SupportingPane.Pane>
</SupportingPane.Root>`}</code></pre>

      <h2>환경마다 이렇게 보여요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>환경</th><th>모습</th></tr></thead>
          <tbody>
            <tr><td>중간 · 넓은 화면</td><td>본문 옆 고정 패널이에요. 토글 버튼은 숨겨져요.</td></tr>
            <tr><td>작은 화면</td><td>패널이 버튼 뒤로 접혀요. 누르면 아래에서 시트로 올라오고, Escape나 배경 탭으로 닫혀요. 모달이 아니라서 포커스를 가두지 않아요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>접힘 방식은 여러분이 정해요</h2>
      <p>
        보조 내용이 &quot;필요할 때만 보면 되는 것&quot;이면 기본값(시트)을 쓰고,
        &quot;흐름상 본문 다음에 읽혀야 하는 것&quot;이면{' '}
        <code>compact=&quot;stacked&quot;</code>로 본문 아래에 그냥 쌓으세요. 이건 환경이
        아니라 <strong>의미</strong>의 문제라 런타임이 추측하지 않아요. 어느 쪽이든
        마크업은 서버와 클라이언트에서 언제나 같고, 모습은 참고 스타일시트의 CSS가
        정해요 - Navigation 더보기와 같은 원리예요.
      </p>

      <h2>속성</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>타입</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td>Root: paneLabel</td><td>string (필수)</td><td>패널의 접근 이름이자 컴팩트 토글의 라벨이에요.</td></tr>
            <tr><td>Root: compact</td><td>&quot;sheet&quot; (기본) | &quot;stacked&quot;</td><td>작은 화면에서 시트로 접을지, 본문 아래 쌓을지요. stacked면 토글이 아예 렌더되지 않아요.</td></tr>
            <tr><td>Root: open / defaultOpen / onOpenChange</td><td></td><td>시트 열림 상태를 직접 관리할 수도, 맡길 수도 있어요.</td></tr>
            <tr><td>Main · Pane</td><td></td><td>본문과 보조 패널이에요. Pane은 <code>aside</code>(complementary)로 렌더돼요.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
