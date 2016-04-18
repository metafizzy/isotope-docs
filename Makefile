# @desandro only

zip:
	rm -rf build/isotope-docs.zip
	cp -r build isotope-docs
	zip -rq build/isotope-docs.zip isotope-docs/
	rm -rf isotope-docs

deploy:
	s3cmd -c ~/.s3cfg-fizzy sync build/. s3://isotope.metafizzy.co/v2/

gulp:
	gulp

gulp-export:
	rm -rf build/
	gulp export
	make zip

prod: gulp-export gulp deploy
