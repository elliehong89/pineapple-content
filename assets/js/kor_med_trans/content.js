// textarea 자동 높이 조절 함수
function autoResizeTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

// textarea에 이벤트 리스너 추가하는 함수
function addTextareaListeners(textarea) {
  // 초기 높이 설정
  autoResizeTextarea(textarea);

  // 입력 이벤트 리스너 추가
  textarea.addEventListener("input", function () {
    autoResizeTextarea(this);
  });
}

// 모든 textarea에 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", function () {
  // 초기 textarea들에 이벤트 리스너 추가
  const textareas = document.querySelectorAll(".qa-text-box-textarea");
  textareas.forEach(addTextareaListeners);

  // 동적으로 추가되는 textarea들을 감시
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            // Element node
            const newTextareas = node.querySelectorAll(".qa-text-box-textarea");
            newTextareas.forEach(addTextareaListeners);
          }
        });
      }
    });
  });

  // content-sandbox를 감시
  const contentSandbox = document.getElementById("content-sandbox");
  if (contentSandbox) {
    observer.observe(contentSandbox, {
      childList: true,
      subtree: true,
    });
  }
});
