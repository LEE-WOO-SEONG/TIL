# CSS 단위



PX

---

: Pixcel 기준으로 크기를 조절하는 절대적인 단위



% ( percent)

---

: 부모요소의 크기를 기준으로 그에 따른 퍼센트로 크기를 지정하는 단위.



em

---

: 부모요소의 크기를 기준으로 배수의 개념으로 크기를 지정 

(또한 width,height와 같은 크기는 font-size를 기준으로 한다.)

```
<div>
	<p></p>
</div>
```

```
div {
	font-size : 10px;
}

p {
	font-size: 10em;
	width: 2em;
}
```

: p tag의 font-size는 10px의 *10인 100px이 되며, width는 10px * 10(font-size) *2 = 200px이 된다.



rem

---

: 최 상위 조상의 크기를 기준으로 그에따른 배수로 크기를 지정

* 앞서 살펴본 em은 부모-자식 요소가 많아질수록 배수로 크기가 지정되기 때문에 정확한 크기를 찾는데 다소 혼란이 있을 수 있어 rem을 도입.

- 크기가 지정된 조상 태그가 없다면 html문서 내 최 상위 조상은 언제나 html이므로 해당 html의 크기를 지정 해 주면 된다.

```
html {
	font-size: 10px;
}
```



