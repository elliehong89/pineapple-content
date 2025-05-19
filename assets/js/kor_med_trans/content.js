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

// Q&A 영역 말풍선 추가 함수
function addQaSection() {
  const qaContainer = document.getElementById("qa-container");
  const currentQaCount = qaContainer.querySelectorAll(
    ".lesson-card-component-inner"
  ).length;

  // 3개 이상이면 추가하지 않음
  if (currentQaCount >= 3) {
    alert("추가 질문은 3개까지만 가능합니다.");
    return;
  }

  const newQaInner = document.createElement("div");
  newQaInner.className = "lesson-card-component-inner";
  newQaInner.innerHTML = `
    <div class="dp-grid dp-grid-row-1fr-62px dp-grid-row-1fr-62px-responsive">
      <div class="qa-list-row qa-list-row-question">
        <div class="dp-flex flex-1 dp-flex-align-start">
          <p class="qa-type-box">Q</p>
          <div class="qa-text-box-wrapper w-100 h-45px">
            <span class="bubble-icon icon-left" style="--box-bg-color: #fff"></span>
            <div class="qa-text-box w-100 h-45px">
              <textarea id="qna-set-${currentQaCount + 1}-question"
                class="qa-text-box-textarea qa-text-box-textarea-question h-none" type="text"
                placeholder="질문을 입력하세요." rows="1"></textarea>
              <button type="button"
                class="ai-button lesson-card-ai-button btn-jelly bd-radius-100 btn-question"
                style="--box-bg-color: var(--color-background-ai-btn-pink); --box-border-color: var(--color-border-ai-btn-pink)">
                <i class="fa-solid fa-question"
                  style="color: var(--color-text, var(--color-border-ai-btn-pink));"></i>
                <span class="ai-button-text"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    <div class="dp-grid dp-grid-row-62px-1fr dp-grid-row-62px-1fr-responsive">
      <div></div>
      <div class="qa-list-row qa-list-row-question row-reverse">
        <p class="qa-type-box">A</p>
        <div class="qa-text-box-wrapper w-100">
          <div class="qa-text-box w-100">
            <textarea id="qna-set-${currentQaCount + 1}-answer"
              class="qa-text-box-textarea qa-text-box-textarea-answer"
              placeholder="" rows="3"></textarea>
          </div>
          <span class="bubble-icon icon-right" style="--box-bg-color: #fff"></span>
        </div>
      </div>
    </div>
  `;
  qaContainer.appendChild(newQaInner);

  // 3개가 되면 플러스 버튼 숨기기
  if (currentQaCount + 1 >= 3) {
    const addQaBtn = document.getElementById("qna-set-add-button");
    if (addQaBtn) {
      addQaBtn.style.display = "none";
    }
  }
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

  // Q&A 추가 버튼 이벤트 리스너
  const addQaBtn = document.getElementById("qna-set-add-button");
  if (addQaBtn) {
    addQaBtn.addEventListener("click", addQaSection);
  }
});

// AI 버튼 클릭 이벤트 처리
document.addEventListener("click", function (e) {
  if (e.target.closest(".ai-button")) {
    alert("서비스 준비중입니다.");
  }
});
