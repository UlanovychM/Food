function timer() {
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
}
export default timer;
