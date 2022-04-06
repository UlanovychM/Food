window.addEventListener('DOMContentLoaded', () => {
	//Tabs
	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active'); // точку мы не ставим потому и так работаем с класами
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}
	//в ес6 полявилась возможность ставить по умолчанию к примеру мы указываем оргумент i =0 он будет по умолчанию выбирать первое меню при условии если в вызваной функции нет значения

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', event => {
		const target = event.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	//Timer

	const deadLine = '2022-05-05'; // отправная точка
	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date());
		const days = Math.floor(t / (1000 * 60 * 60 * 24));
		const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((t / 1000 / 60) % 60);
		const seconds = Math.floor((t / 1000) % 60);

		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');
		const timeInterval = setInterval(updateClock, 1000);

		updateClock(); // вызвает функцию быстрее что бы не ждать 1 сек setInterval

		function updateClock() {
			const t = getTimeRemaining(endtime); // передает дедлайн( функцию которая показывет на текущий момент сколько остаолсь времени), так же мы передаэем наш обьект

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds); // передает значение в каждый отдельный клас на сайте

			if (t.total <= 0) {
				clearInterval(timeInterval);
			} // очищает инофрмацию если таймер доходит до 0
		} /// обновляет таймер каждую секунду
	}

	setClock('.timer', deadLine); // передает информацию в родительский класс и фукнцию в которую она идет

	//Modal

	const modalTrigger = document.querySelectorAll('[data-model]');
	const modal = document.querySelector('.modal');
	const modalClose = document.querySelector('[data-close]');

	// способ через toggle

	// modalTrigger.addEventListener('click', () => {
	// 	modal.classList.toggle('show');
	// 	document.body.style.overflow = 'hidden';
	// });

	// modalClose.addEventListener('click', () => {
	// 	modal.classList.toggle('show');
	// 	document.body.style.overflow = '';
	// });

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	modalClose.addEventListener('click', closeModal);

	modal.addEventListener('click', e => {
		if (e.target === modal) {
			closeModal();
		}
	});

	document.addEventListener('keydown', e => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 15000);

	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1
		) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);
});
