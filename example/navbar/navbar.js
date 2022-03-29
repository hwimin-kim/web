
/* html의 태그 요소를 얻는 방법 */
// id 값을 이용하여 얻으려면 document.getelementbyid를
// class 값을 이용하여 얻으려면 document.querySelector
const toggleBtn = document.querySelector('.navbar_toggleBtn');
const menu= document.querySelector('.navbar_menu');
const icons= document.querySelector('.navbar_icons');

/* classList 메소드 */
// classList.toggle(클래스명): 클래스가 존재하면 제거, 없으면 추가
// classList.add(클래스명): 명시된 클래스를 추가
// classList.remove(클래스명): 명시된 클래스를 제거
toggleBtn.addEventListener('click',()=>{
    menu.classList.toggle('active');
    icons.classList.toggle('active');
});
