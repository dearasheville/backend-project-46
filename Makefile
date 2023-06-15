install:
	npm ci

lint:
	npx eslint .

test:
	npm test

test-coverage:
	# TODO: set global flag --experimental-test-coverage
	npm test

publish:
	npm publish --dry-run
