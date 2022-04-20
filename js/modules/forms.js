function forms() {
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
}
export default forms;
