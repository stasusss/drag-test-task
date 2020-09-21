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

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  // переносит мяч на координаты (pageX, pageY),
  // дополнительно учитывая изначальный сдвиг относительно указателя мыши
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

  // передвигаем мяч при событии mousemove
  document.addEventListener('mousemove', onMouseMove);

  // отпустить мяч, удалить ненужные обработчики
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
