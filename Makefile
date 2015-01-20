# @desandro only

zip:
	rm -rf build/isotope-docs.zip
	cp -r build isotope-docs
	zip -rq build/isotope-docs.zip isotope-docs/
	rm -rf isotope-docs

deploy:
	s3cmd -c ~/.s3cfg-desandro sync build/. s3://isotope.metafizzy.co/

grunt:
	grunt

grunt-dev:
	grunt --dev

grunt-template:
	grunt template

prod: grunt-dev zip grunt-template deploy
