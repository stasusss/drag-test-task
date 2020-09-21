const ball = document.querySelector('.ball');
const container = document.querySelector('.container')

const limits = {
  top: container.offsetTop + ball.offsetHeight / 2,
  right: container.offsetWidth + container.offsetLeft - ball.offsetWidth / 2,
  bottom: container.offsetHeight + container.offsetTop - ball.offsetHeight / 2,
  left: container.offsetLeft + ball.offsetWidth / 2,
};

ball.onmousedown = function(event) {

  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {

    if (pageX > limits.right) {
      pageX = limits.right
    } else if (pageX < limits.left) {
      pageX = limits.left
    }
    
    if (pageY > limits.bottom) {
      pageY = limits.bottom
    } else if (pageY < limits.top) {
      pageY = limits.top
    }

    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

ball.ondragstart = function() {
  return false;
};
