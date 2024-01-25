// 显示/隐藏滚动到顶部按钮
window.onscroll = function() {
  showScrollToTopButton();
};

function showScrollToTopButton() {
  var scrollToTopButton = document.getElementById("scrollToTop");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}
function scrollToTop() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
  hideScrollToTopButton();
}


function hideScrollToTopButton() {
  var scrollToTopButton = document.getElementById("scrollToTop");
  setTimeout(function() {
    scrollToTopButton.style.display = "none";
  }, 3000);
}