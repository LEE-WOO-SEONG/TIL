## React의 virtual dom에 대해서 설명 해 주시고 real dom 을 조작하는 것과 비교해서 virtual dom이 갖는 장점을 말해주세요.

virtual dom은 real dom을 빗대어 만든 가상의 dom(document of model) 을 일컫는 것이다.

dom을 조작하면 브라우저는 바뀐 dom의 정보를 바탕으로 render tree를 재 생성하고, 레이아웃, 스타일을 다시 계산하여 그리는 작업인 reflow, repaint 를 거치게 된다. dom을 여러번 수정하면 수정한 횟수만큼의 reflow,repaint와 같은 재계산 작업을 불러일으켜 브라우저에서 발생하는 연산의 양이 증가하게 된다.

하지만 virtual dom을 사용하면 30번의 dom 조작이 있을 경우, 그 변화를 virtual dom에 적용시켜 놓았다가 모든 조작이 끝났을 경우 마지막의 1번만 real dom에 적용시키게 만듭니다. virtual dom에 적용시키는 것 또한 연산이 들지만 real dom을 조작했을 때와는 비교할 수 없이 가벼운 연산이며 virtual에 저장된 정보와 real dom을 자동으로 비교하여 변화된 부분만 실제 dom에 적용시키는 장점이 있어 개발자가 바뀐부분을 일일히 적용시키는 번거로움이 없습니다.

사실, virtual dom을 사용하지 않아도 변화들을 하나로 묶어서 real dom에 전달하는 방식을 사용하면 마지막 1번의 변화만 dom에 적용시킬 수 있으나, 이는 개발자가 수동으로 dom의 변화를 관리하는 방식이므로 자동으로 관리 해 주는 virtual dom과는 차이가 있습니다.

## react 에서 rendering이 발생하는 경우에 대하여 말해보시오.

1. 컴포넌트에서 관리하는 state 혹은 subscribe하는 redux의 상태가 변경되었을 떄,
2. 상위 컴포넌트로부터 전달받는 props가 변경되었을 떄,
3. 자신을 렌더링 하고 있는 부모 컴포넌트가 재 랜더링 될 때,
4. forceUpdate를 사용하여 강제로 랜더링이 가능.

## react에서 state를 변경하여 줄 때 immutable 한 방법을 쓰는 이유?

1. side effect이 없은 프로그래밍이 가능하게 하기 위해서.
2. 얕은비교만으로 상태가 바뀜을 인지하여 cpu의 연산을 줄이기 위해서.

https://estaid.dev/reasons-to-maintain-immutability-with-react/



## redux의 장점

https://www.bangseongbeom.com/redux-benefits-caveats.html

1. 상태의 중앙화
2. 상태는 읽기전용으로 오로지 액션을 디스패치하여 리듀서에서만 변경할 수 있다. (디버깅 용이) / 단방향 데이터 흐름
3. 상태의 변경이 기록되어져 추적이 용이함. (디버깅 용이)

 