
%.html : %.md
	pandoc -t html -s --mathjax -c riddler.css $< -o $@

all: riddler-2016-08-19.html
