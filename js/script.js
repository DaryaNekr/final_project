(function () {
  var d = document,
    accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
    setAria,
    setAccordionAria,
    switchAccordion,
    touchSupported = ('ontouchstart' in window),
    pointerSupported = ('pointerdown' in window);

  skipClickDelay = function (e) {
    e.preventDefault();
    e.target.click();
  }

  setAriaAttr = function (el, ariaType, newProperty) {
    el.setAttribute(ariaType, newProperty);
  };
  setAccordionAria = function (el1, el2, expanded) {
    switch (expanded) {
      case "true":
        setAriaAttr(el1, 'aria-expanded', 'true');
        setAriaAttr(el2, 'aria-hidden', 'false');
        break;
      case "false":
        setAriaAttr(el1, 'aria-expanded', 'false');
        setAriaAttr(el2, 'aria-hidden', 'true');
        break;
      default:
        break;
    }
  };
  
  //function
  switchAccordion = function (e) {
    console.log("triggered");
    e.preventDefault();
    var thisAnswer = e.target.parentNode.nextElementSibling;
    var thisQuestion = e.target;
    if (thisAnswer.classList.contains('is-collapsed')) {
      setAccordionAria(thisQuestion, thisAnswer, 'true');
    } else {
      setAccordionAria(thisQuestion, thisAnswer, 'false');
    }
    thisQuestion.classList.toggle('is-collapsed');
    thisQuestion.classList.toggle('is-expanded');
    thisAnswer.classList.toggle('is-collapsed');
    thisAnswer.classList.toggle('is-expanded');

    thisAnswer.classList.toggle('animateIn');
  };
  
  for (var i = 0, len = accordionToggles.length; i < len; i++) {
    if (touchSupported) {
      accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
    }
    if (pointerSupported) {
      accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
    }
    accordionToggles[i].addEventListener('click', switchAccordion, false);
  }
})();





document.getElementById('feedback-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const field1 = document.getElementById('field1').value;
  const field2 = document.getElementById('field2').value;

  const formData = new FormData();
  formData.append('first-name', firstName);
  formData.append('last-name', lastName);
  formData.append('phone', phone);
  formData.append('email', email);
  formData.append('field1', field1);
  formData.append('field2', field2);

  fetch('process_form.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Некорректный формат ответа от сервера");
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      document.querySelector('.modal-content p').textContent = "Спасибо за то, что выбрали меня. Скоро я свяжусь с вами для обсуждения деталей, до встречи.";
      
      // Отображение модального окна
      const modal = document.getElementById('modal');
      modal.style.display = "block";

      // Очистка полей формы после отправки
      document.getElementById('feedback-form').reset();
    } else {
      alert("Ошибка: " + data.message);
    }
  })
  .catch(error => {
    //console.error(error);
    alert("Произошла ошибка при отправке формы.");
  });

  document.querySelector('.close-button').addEventListener('click', function () {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
  });

  window.addEventListener('click', function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});








document.querySelector('.burger').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.header__nav').classList.toggle('open');
});

const menuItems = document.querySelectorAll('.header__list .header__item');
function hideMenu() {
  const navMenu = this.closest('.header__nav');
  navMenu.classList.remove('open');
}
menuItems.forEach(item => {
  item.addEventListener('click', hideMenu);
});
