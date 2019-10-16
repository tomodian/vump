.PHONY: publish

publish:
	rm -f src/commands/*.spec.ts
	npm publish
	git checkout src/commands/*.spec.ts
