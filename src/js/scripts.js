/* --- Скрол до ID --- */
function ClickButtonScroll() {
	let buttonScroll = document.querySelector('.btn-scroll')
	let targetScroll = document.querySelector('.main-footer')
	buttonScroll.addEventListener('click', () => {
		targetScroll.scrollIntoView({behavior: "smooth"})
	})
}
ClickButtonScroll()

function ClosePopup() {
	let buttonClosePopup = document.querySelector('.close-btn')
	let targetHead = document.querySelector('.main-header')
	buttonClosePopup.addEventListener('click', () => {
		document.querySelector('.popup-message').classList.toggle('active')
		targetHead.scrollIntoView()
	})
}
ClosePopup()

function ButtonClickMessage() {

	var form = document.querySelector('.feedback');
	if (!form) return;

	var	elements	= form.querySelectorAll('.form-control'),
			btn			= document.querySelector('.btn-message'),
			patternName	= /^[a-zA-Zа-яёА-ЯЁ\s]+$/,
			patternMail	= /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,
			patternPhone	= /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
			patternSpam	= /[^\<\>\[\]%\&'`]+$/,
			errorMess	= [
				'Незаполненное поле ввода', // 0
				'Введите Ваше имя', // 1
				'Укажите Вашу электронную почту', // 2
				'Неверный формат электронной почты', // 3
				'Укажите Ваш номер телефона', // 4
				'Неверный формат телефонного номера', // 5
				'Напишите текст сообщения', // 6
				'Ваше сообщение похоже на спам, уберите специальные символы.' // 7
			],
			iserror = false;

	btn.addEventListener('click', validForm);
	form.addEventListener('focus', function() {
		var el = document.activeElement;
		if (el !== btn) cleanError(el);
	}, true);

	function validForm(e) {
		e.preventDefault();
		var formVal = getFormData(form),
			error;

		for (var property in formVal) {
			error = getError(formVal, property);
			if (error.length != 0) {
				iserror = true;
				showError(property, error);
			}
		}

		if (!iserror) {
			sendFormData(formVal);
		}
		return false;
	}

	function getError(formVal, property) {
		var formElement = form.querySelector('[name=' + property + ']'),
				errorElement = formElement.parentElement;
		var error = '',
			validate = {
			'username': function() {
				if (formVal.username.length == 0 || patternName.test(formVal.username) == false) {
					error = errorMess[1];
				} else {
					errorElement.classList.add('no-error');
				}
			},
			'usermail': function() {
				if (formVal.usermail.length == 0) {
					error = errorMess[2];
				} else if (patternMail.test(formVal.usermail) == false) {
					error = errorMess[3];
				} else {
					errorElement.classList.add('no-error');
				}
			},
			'userphone': function() {
				if (formVal.userphone.length == 0) {
					error = errorMess[4];
				} else if (patternPhone.test(formVal.userphone) == false) {
				error = errorMess[5];
				} else {
					errorElement.classList.add('no-error');
				}
			},
			'textmess': function() {
				if (formVal.textmess.length == 0) {
					error = errorMess[6];
				} else if (patternSpam.test(formVal.textmess) == false) {
					error = errorMess[7];
				} else {
					errorElement.classList.add('no-error');
				}
			}
		};
		validate[property]();
		return error;
	}

	[].forEach.call(elements, function(element) {
		element.addEventListener('blur', function(e) {
			var formElement = e.target,
				property = formElement.getAttribute('name'),
				dataField = {};

			dataField[property] = formElement.value;

			var error = getError(dataField, property);
			if (error.length != 0) {
				showError(property, error);
			}
			return false;
		});
	});

	function showError(property, error) {
		var formElement = form.querySelector('[name=' + property + ']'),
				errorElement = formElement.parentElement,
				errorBox = formElement.nextElementSibling;
		errorElement.classList.remove('no-error');
		errorElement.classList.add('error');
		errorBox.innerHTML = error;
	}

	function cleanError(el) {
		el.parentElement.classList.remove('error');
		var noerror = el.nextElementSibling.innerHTML.replace(/[^]/g , '');
		el.nextElementSibling.innerHTML = noerror
	}

	function getFormData(form) {
		var controls = {};
		if (!form.elements) return '';
		for (var i = 0, ln = form.elements.length; i < ln; i++) {
			var element = form.elements[i];
			if (element.tagName.toLowerCase() !== 'button') {
				controls[element.name]= element.value;
			}
		}
		return controls;
	}

	function sendFormData() {
		var popupElement = document.querySelector('.popup-message')
		popupElement.classList.add('active');
		setTimeout(() => {popupElement.classList.remove('active')} , 5000)
		// var xhr 	= new XMLHttpRequest(),
		// 		body 	= 'username=' + encodeURIComponent(formVal.username) +
		// 						'&usermail=' + encodeURIComponent(formVal.usermail) +
		// 						'&userphone=' + encodeURIComponent(formVal.subject) +
		// 						'&textmess=' + encodeURIComponent(formVal.textmess);

		// xhr.open('POST', '/sendmail.php', true);
		// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		// xhr.setRequestHeader('Cache-Control', 'no-cache');
		// xhr.onreadystatechange = function() {
		// 	// callback
		// }
		// xhr.send(body);
		return
	}
}
ButtonClickMessage()