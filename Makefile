STATIC_DIR = static
TEMPLATES_DIR = templates
VENV_DIR = .venv
BUILD_DIR = build

BUILD_SCRIPT = build.py
JINJA_FILES = $(wildcard ${TEMPLATES_DIR}/*.html)

VENV_BIN = ${VENV_DIR}/bin
VENV_PIP = ${VENV_BIN}/pip
VENV_PYTHON = ${VENV_BIN}/python

${BUILD_DIR}: ${BUILD_DIR}/final

${VENV_DIR}:
	python3 -m venv ${VENV_DIR}
	${VENV_PIP} install --upgrade -r requirements.txt

${BUILD_DIR}/final: ${BUILD_DIR}/jinja ${BUILD_DIR}/static
	rm -rf $@
	mkdir -p $@
	for src_dir in $^; do \
		cp -R "$$src_dir/" $@; \
	done

${BUILD_DIR}/jinja: ${VENV_DIR} ${JINJA_FILES}
	rm -rf $@
	${VENV_PYTHON} ${BUILD_SCRIPT} ${TEMPLATES_DIR} $@

${BUILD_DIR}/static:
	rm -rf $@
	cp -R "${STATIC_DIR}/" $@

.PHONY: launch
launch: build
	open ${BUILD_DIR}/final/index.html

.PHONY: clean
clean:
	rm -rf ${BUILD_DIR}

.PHONY: deepclean
deepclean:
	rm -rf ${VENV_DIR}

.PHONY: rebuild
rebuild: clean build
