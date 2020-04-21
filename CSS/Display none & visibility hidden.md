## display: none vs visibility: hidden



- 공통점

: 해당 특성을 가진 요소는 화면에 나타나지 않는다.



- 차이점

###### display: none

: 단순히 안보여지게 하는 것을 넘어서 <u>아예 해당요소를 "없는 것"</u>으로 만드는 특성이다.

때문에 해당 요소는 포커싱을 받을수도, 공간을 가질수도, 스크린리더와 같은 보조기기에서도 인식이 불가능하다.

**display 속성**

1. inline  

   : 해당요소가 가진 contents 만큼의 크기만 가지며 width ,height와 같은 크기도 조절이 불가능하며, padding/ margin은 좌우만 조절이 가능하다.

   여러개의 요소를 나열할 시 가로정렬된다. 

2. block 

   : width와 height, padding margin 방향에 관계없이 조절이 가능하며, width는 부모가 가진 100%를 기본으로 가지며 height는 특정하지 않는 이상 content의 영역만큼만 가진다.

   여러개의 요소를 나열할 시 세로정렬된다.

3. inline-block 

   :block처럼 크기를 지정할 수 있으나 inline 처럼 가로배치가 가능한 특성을 가진다.

4. none  



###### visibility: hidden

: 단순히 화면에 보이지 않게만 하는 것일 뿐, <u>실제로 해당 요소가 가지고있는 크기와 특성들은 그대로 존재</u>하는 상태이다.

opacity: 0과 visibility: hidden은 동일한 효과를 나타낸다.



**visibility 속성**

1. visible: 기본값으로 요소를 보여준다.
2. hidden
3. collapse: table 요소들에서만 줄 수 있는 값으로, hidden과 비슷하지만 필요에 따라 공백을 없애서 테이블 레이아웃을 자연스럽게 유지한다.



<div style="overflow:hidden;zoom:1;padding:10px;">
	<div style="float:left;width:50%;">
		<div style="font-weight: bold;text-align: center;margin-bottom:10px;">display:none;</div>
		<div style="margin:5px; border:1px dashed #333;padding:5px;background:#fff;text-align:center;">
			<div style="background:#555;color:#fff;padding:5px;margin:5px 0;">A</div>
			<div style="display:none;margin:5px 0;">B</div>
			<div style="background:#555;color:#fff;padding:5px;margin:5px 0;">C</div>
		</div>
	</div>
	<div style="float:left;width:50%;">
		<div style="font-weight: bold;text-align: center;margin-bottom:10px;">visibility:hidden;</div>
		<div style="margin:5px; border:1px dashed #333;padding:5px;background:#fff;text-align:center;">
			<div style="background:#555;color:#fff;padding:5px;margin:5px 0;">A</div>
			<div style="visibility:hidden;margin:5px 0;">B</div>
			<div style="background:#555;color:#fff;padding:5px;margin:5px 0;">C</div>
		</div>
	</div>
</div>

