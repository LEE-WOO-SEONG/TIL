## z-index 속성



z-index란?

: 레이어간 상하관계?를 결정할 수 있는 속성으로 z-index 의 기본값은 0이며,  숫자가 클수록 상단에 위치하게 된다.



###### 요소들의 쌓임 규칙

- mark-up을 나중에 할수록 겹침구조 상 가장 상단에 위치하게 된다.

- position: static이 아닌 값을 가져야만 z-index로 layer 겹침구조의 조절이 가능하다.

- opacity 또는 transform 같은 css 속성들을 설정하면 해당 element는 가장 상단 layer에 위치하게 됨.
- 부모의 z-index 속성은 해당 요소가 포함하는 자식요소들의 layer 구조에 가장 큰 우선순위를 가진다.