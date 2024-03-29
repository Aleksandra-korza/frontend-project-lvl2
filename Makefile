install: #Эта команда полезна при первом клонировании репозитория
	npm ci

publish: #Для отладки публикации не нужно добавлять пакет в основной каталог NPM. На протяжении всего проекта используйте аргумент --dry-run
	npm publish --dry-run

lint: #проверка кода по стандарту Airbnb
	npx eslint . --fix

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test:
	npm run test

run:
	bin/nodejs-package.js 10

.PHONY: test