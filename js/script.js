// Проверка, загрузилась ли страница
$(document).ready(function () {
	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');

	let unlock = true;

	// timeout - время анимации в css
	const timeout = 880;

	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener("click", function (e) {
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const currentPopup = document.getElementById(popupName);
				popupOpen(currentPopup);
				e.preventDefault();
			});
		}
	}

	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}

	function popupOpen(currentPopup) {
		if (currentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			$('#check').prop('checked', false);
			$('.popup__alert').hide()
			$('.popup__block-ok').hide()
			$('.popup__form').show()
			$('#input-number').val('')
			currentPopup.classList.add('open');


			currentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			body.classList.remove('_lock');

		}
	}


	function bodyLock() {

		body.classList.add('_lock');

	}

	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	(function () {
		// проверяем поддержку
		if (!Element.prototype.closest) {
			// реализуем
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		// проверяем поддержку
		if (!Element.prototype.matches) {
			// определяем свойства
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();

	$('.popup__btn').click(function (e) {

		$('.popup__alert').hide()
		$('.popup__alert--check').hide()
		$('.popup__alert--number').hide()

		if ($('#check').is(':checked') & $('#input-number').val() != '') {
			$('.popup__alert').hide()
			$('.popup__form').hide()
			$('.popup__block-ok').show()
			e.preventDefault()
		} else {

			if (!$('#check').is(':checked')) {
				$('.popup__alert').show()
				$('.popup__alert--check').show()
				e.preventDefault()
			}
			if ($('#input-number').val() == '') {
				$('.popup__alert').show()
				$('.popup__alert--number').show()
				e.preventDefault()
			}
		}

	});


});