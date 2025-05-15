// textarea 자동 높이 조절 함수
function autoResizeTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

// 모든 textarea에 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", function () {
  const textareas = document.querySelectorAll(".qa-text-box-textarea");

  textareas.forEach((textarea) => {
    // 초기 높이 설정
    autoResizeTextarea(textarea);

    // 입력 이벤트 리스너 추가
    textarea.addEventListener("input", function () {
      autoResizeTextarea(this);
    });
  });
});
