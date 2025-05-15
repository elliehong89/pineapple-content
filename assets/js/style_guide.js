document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".style-guide-nav a");
  const sections = document.querySelectorAll(".style-guide-section");
  const content = document.querySelector(".style-guide-content");
  const nav = document.querySelector(".style-guide-nav");

  // 네비게이션 높이에 따라 콘텐츠 마진 조정
  function updateContentMargin() {
    const navHeight = nav.offsetHeight;
    content.style.marginTop = `${navHeight}px`;

    // 스크롤 패딩도 함께 조정
    document.documentElement.style.scrollPaddingTop = `${navHeight + 20}px`;
  }

  // 초기 실행
  updateContentMargin();

  // 리사이즈 이벤트 추가
  window.addEventListener("resize", updateContentMargin);

  // localStorage에서 마지막 활성화된 탭 ID 가져오기
  const lastActiveTab = localStorage.getItem("lastActiveTab");

  // 첫 번째 탭을 기본값으로 설정
  let activeTabIndex = 0;

  // localStorage에 저장된 탭이 있으면 해당 탭을 활성화
  if (lastActiveTab) {
    const savedTab = document.querySelector(
      `.style-guide-nav a[href="#${lastActiveTab}"]`
    );
    if (savedTab) {
      activeTabIndex = Array.from(navLinks).indexOf(savedTab);
    }
  }

  // 활성화된 탭과 섹션에 active 클래스 추가
  navLinks[activeTabIndex].classList.add("active");
  sections[activeTabIndex].classList.add("active");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // 모든 탭과 섹션에서 active 클래스 제거
      navLinks.forEach((l) => l.classList.remove("active"));
      sections.forEach((s) => s.classList.remove("active"));

      // 클릭한 탭과 해당 섹션에 active 클래스 추가
      this.classList.add("active");
      const targetId = this.getAttribute("href").substring(1);
      document.getElementById(targetId).classList.add("active");

      // localStorage에 현재 활성화된 탭 ID 저장
      localStorage.setItem("lastActiveTab", targetId);
    });
  });

  // 코드 복사 기능
  const codeCopyElements = document.querySelectorAll(".code-copy");
  const textCopyElements = document.querySelectorAll(".text-copy");

  // code-copy 복사 기능
  codeCopyElements.forEach((element) => {
    element.addEventListener("click", function () {
      // code-copy의 바로 자식 요소의 HTML을 가져옴
      const childElement = this.firstElementChild;
      if (!childElement) return;

      // code-copy 요소에 no-space 클래스가 있는 경우에만 공백 제거
      let html = childElement.outerHTML;
      if (this.classList.contains("no-space")) {
        html = html
          .replace(/>\s+</g, "><") // 불필요한 공백 제거
          .replace(/\s+/g, " ") // 연속된 공백을 하나로
          .trim();
      }

      // 클립보드에 복사
      navigator.clipboard
        .writeText(html)
        .then(() => {
          // 복사 성공 시 UI 피드백
          this.classList.add("copied");
          setTimeout(() => {
            this.classList.remove("copied");
          }, 2000);
        })
        .catch((err) => {
          console.error("복사 실패:", err);
        });
    });
  });

  // text-copy 복사 기능
  textCopyElements.forEach((element) => {
    element.addEventListener("click", function () {
      // text-copy 요소의 내용을 가져옴
      let content = this.innerHTML;

      // 불필요한 공백과 줄바꿈 제거
      content = content
        .replace(/>\s+</g, "><") // 태그 사이의 공백 제거
        .replace(/\s+/g, " ") // 연속된 공백을 하나로
        .trim(); // 앞뒤 공백 제거

      // 클립보드에 복사
      navigator.clipboard
        .writeText(content)
        .then(() => {
          // 복사 성공 시 UI 피드백
          this.classList.add("copied");
          setTimeout(() => {
            this.classList.remove("copied");
          }, 2000);
        })
        .catch((err) => {
          console.error("복사 실패:", err);
        });
    });
  });

  // 폰트 클래스 복사 기능
  const fontElements = document.querySelectorAll('#FONT p[class^="ft-"]');

  fontElements.forEach((element) => {
    element.addEventListener("click", function () {
      const className = this.className;
      navigator.clipboard
        .writeText(className)
        .then(() => {
          // 복사 성공 시 알림 표시
          const notification = document.createElement("div");
          notification.textContent = "클래스명이 복사되었습니다: " + className;
          notification.style.position = "fixed";
          notification.style.left = "50%";
          notification.style.top = "50%";
          notification.style.transform = "translate(-50%, -50%)";
          notification.style.backgroundColor = "#23b24b";
          notification.style.color = "white";
          notification.style.padding = "10px 20px";
          notification.style.borderRadius = "5px";
          notification.style.zIndex = "10000";

          document.body.appendChild(notification);

          // 2초 후 알림 제거
          setTimeout(() => {
            notification.remove();
          }, 2000);
        })
        .catch((err) => {
          console.error("클래스명 복사 실패:", err);
        });
    });
  });
});
