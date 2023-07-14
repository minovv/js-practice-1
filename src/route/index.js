// Підключаємо технологію express для back-end сервера
const express = require('express');
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class User {
	static #list = [];

	constructor(email, login, password) {
		this.email = email;
		this.login = login;
		this.password = password;
		this.id = User.#list.length + 1; // alternative id
		// this.id = new Date().getTime(); // alternative id
	}

	static add = (user) => {
		this.#list.push(user);
	}

	static getList = () => this.#list;


	static getById = (id) => this.#list.find((user) => user.id === id)
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
	// res.render генерує нам HTML сторінку

	const list = User.getList()

	// ↙️ cюди вводимо назву файлу з сontainer
	res.render('index', {
		// вказуємо назву папки контейнера, в якій знаходяться наші стилі
		style: 'index',

		data: {
			users: {
				list,
				isEmpty: list.length === 0,
			},
		},
	})
	// ↑↑ сюди вводимо JSON дані
})

// ================================================================

router.post('/user-create', function (req, res) {
	const { email, login, password } = req.body

	const user = new User(email, login, password);

	User.add(user);

	console.log(User.getList());

	res.render('success-info', {

		style: 'success-info',
		info: 'User was created successfully',
	})

})

// ================================================================

router.get('/user-delete', function (req, res) {
	const { id } = req.query

	console.log(typeof id)

	const user = User.getById(Number(id))

	if (user) {
		console.log("!!!!")
	}

	res.render('success-info', {

		style: 'success-info',
		info: 'User was deleted successfully',
	})

})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
