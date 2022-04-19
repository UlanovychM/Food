'use strict';
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

	const modalTrigger = document.querySelectorAll('[data-modal]');
	const modal = document.querySelector('.modal');

	// способ через toggle

	// modalTrigger.addEventListener('click', () => {
	// 	modal.classList.toggle('show');
	// 	document.body.style.overflow = 'hidden';
	// });

	// modalClose.addEventListener('click', () => {
	// 	modal.classList.toggle('show');
	// 	document.body.style.overflow = '';
	// });

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	modal.addEventListener('click', e => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', e => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);

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

	//Menu of day

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
						<img src=${this.src} alt=${this.alt} />
						<h3 class="menu__item-subtitle">${this.title}</h3>
						<div class="menu__item-descr">
							${this.descr}
						</div>
						<div class="menu__item-divider"></div>
						<div class="menu__item-price">
							<div class="menu__item-cost">Цена:</div>
							<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
						</div>`;
			this.parent.append(element);
		}
	}

	const getResource = async url => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	// getResource('http://localhost:3000/menu').then(data => {
	// data.forEach(({ img, altimg, title, descr, price }) => {
	// 	new MenuCard(
	// 		img,
	// 		altimg,
	// 		title,
	// 		descr,
	// 		price,
	// 		'.menu .container'
	// 	).render();
	// });
	// });

	// getResource('http://localhost:3000/menu').then(data => createCard(data));
	// function createCard(data) {
	// 	data.forEach(({ img, altimg, title, descr, price }) => {
	// 		const element = document.createElement('div');
	// 		element.classList.add('menu__item');
	// 		element.innerHTML = `
	// 					<img src=${img} alt=${altimg} />
	// 					<h3 class="menu__item-subtitle">${title}</h3>
	// 					<div class="menu__item-descr">
	// 						${descr}
	// 					</div>
	// 					<div class="menu__item-divider"></div>
	// 					<div class="menu__item-price">
	// 						<div class="menu__item-cost">Цена:</div>
	// 						<div class="menu__item-total"><span>${price}</span> грн/день</div>
	// 					</div>`;

	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }  // 2 способ перебор элементов и создание карточек на сайте

	// const div = new MenuCard();
	// div.render();

	axios.get('http://localhost:3000/menu').then(data => {
		data.data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(
				img,
				altimg,
				title,
				descr,
				price,
				'.menu .container'
			).render();
		});
	});

	//Forms
	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner.svg',
		succes: 'Спасибо, мы скоро с Вами свяжемся',
		failure: 'Что-то пошло не так.... ',
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-type': 'application/JSON' },
			body: data,
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', e => {
			e.preventDefault();

			const statusMassage = document.createElement('img');
			statusMassage.src = message.loading;
			statusMassage.style.cssText = `
			display: block; 
			margin: 0 auto;`;

			form.insertAdjacentElement('afterend', statusMassage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
				.then(data => data.text())
				.then(data => {
					console.log(data);
					showThanksModal(message.succes);
					form.reset();
					statusMassage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(messege) {
		const prevModalDialog = document.querySelector('.modal__dialog ');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
		<div class="modal__close" data-close>×</div>
		<div class="modal__title">${messege}</div>
		</div>`;

		document.querySelector('modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	fetch('http://localhost:3000/menu')
		.then(data => data.json())
		.then(res => console.log(res));

	//Slider

	let slideIndex = 1;
	let offset = 0;

	const slides = document.querySelectorAll('.offer__slide');
	const slider = document.querySelector('.offer__slider');
	const prev = document.querySelector('.offer__slider-prev');
	const next = document.querySelector('.offer__slider-next');
	const total = document.querySelector('#total');
	const current = document.querySelector('#current');
	const slidesWrapper = document.querySelector('.offer__slider-wrapper');
	const slidesField = document.querySelector('.offer__slider-inner');
	const width = window.getComputedStyle(slidesWrapper).width;

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';
	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	function sliderD() {
		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}
	}

	sliderD();

	slider.style.position = 'relative';

	const indicators = document.createElement('ol');

	const dots = [];

	indicators.classList.add('carousel-indicators');

	slider.append(indicators);

	function sliderDots() {
		dots.forEach(dot => {
			dot.style.opacity = '.5';
		});
		dots[slideIndex - 1].style.opacity = 1;
	}

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	function deleteNotDigets(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener('click', () => {
		if (offset == deleteNotDigets(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigets(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		sliderD();

		sliderDots();
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigets(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigets(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		sliderD();

		sliderDots();
	});

	dots.forEach(dot => {
		dot.addEventListener('click', e => {
			const slideTo = e.target.getAttribute('data-slide-to');
			slideIndex = slideTo;
			offset = deleteNotDigets(width) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			sliderD();

			sliderDots();
		});
	});
	// showSlides(slideIndex);

	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// function showSlides(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach(item => (item.style.display = 'none'));

	// 	slides[slideIndex - 1].style.display = 'block';

	// 	if (slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// function plusSlides(n) {
	// 	showSlides((slideIndex += n));
	// }

	// prev.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });

	// next.addEventListener('click', () => {
	// 	plusSlides(1);
	// });

	//Calculate
	const result = document.querySelector('.calculating__result span');
	let sex = 'female';
	let height;
	let weight;
	let age;
	let ratio = 1.35;

	function caclTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;
		}

		if (sex === 'female') {
			result.textContent = Math.round(
				(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
			);
		} else {
			result.textContent = Math.round(
				(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
			);
		}
	}

	caclTotal();

	function gerStaticInformation(perentSelector, activeClass) {
		const elements = document.querySelectorAll(`${perentSelector} div`);

		elements.forEach(elem => {
			elem.addEventListener('click', e => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
				} else {
					sex = e.target.getAttribute('id');
				}

				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});

				e.target.classList.add(activeClass);

				caclTotal();
			});
		});

		document.querySelector(perentSelector);
	}

	gerStaticInformation('#gender', 'calculating__choose-item_active');
	gerStaticInformation(
		'.calculating__choose_big',
		'calculating__choose-item_active'
	);

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);
		input.addEventListener('input', () => {
			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			caclTotal();
		});
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
});
