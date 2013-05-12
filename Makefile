MOCHA_OPTS= --check-leaks
REPORTER = dot

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)

test-watch:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--watch \
		--growl \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS)

test-cov: lib-cov
	@NODULAR_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@jscoverage lib lib-cov

clean:
	rm -f coverage.html
	rm -fr lib-cov

.PHONY: test clean